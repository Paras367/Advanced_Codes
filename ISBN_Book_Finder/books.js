// ============================================================
//  BookVault — ISBN Collector  |  books.js
//  Google Books API via Cloudflare Worker Proxy
//  🔐 API Key: SECURED (server-side only)
// ============================================================

// ── Configuration ────────────────────────────────────────────
const WORKER_BASE_URL = 'https://bookvault-proxy.dhimanparas605.workers.dev';
const WORKER_ENDPOINT = `${WORKER_BASE_URL}/api/books`;

// ── State ────────────────────────────────────────────────────
let state = {
  mode: "isbn",
  results: [],
  collection: JSON.parse(localStorage.getItem("bookVault_collection") || "[]"),
  currentPage: 0,
  totalItems: 0,
  perPage: 20,
  view: "grid",
  sortBy: "relevance",
  lastQuery: "",
  collectionFilter: "all",
};

// ── Dark Mode ─────────────────────────────────────────────────
let darkMode = JSON.parse(localStorage.getItem("bookVault_dark") || "false");
applyTheme();

function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem("bookVault_dark", darkMode);
  applyTheme();
}

function applyTheme() {
  const root = document.documentElement;
  if (darkMode) {
    root.style.setProperty("--ink", "#f5f0e8");
    root.style.setProperty("--paper", "#1a1612");
    root.style.setProperty("--cream", "#221e18");
    root.style.setProperty("--card-bg", "#24201a");
    root.style.setProperty("--border", "#3d3428");
    root.style.setProperty("--muted", "#8a7d6a");
    root.style.setProperty("--slate", "#c4b8a4");
    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    root.style.setProperty("--ink", "#0d0d0d");
    root.style.setProperty("--paper", "#f5f0e8");
    root.style.setProperty("--cream", "#faf7f2");
    root.style.setProperty("--card-bg", "#fffdf8");
    root.style.setProperty("--border", "#d8cfc0");
    root.style.setProperty("--muted", "#7a7060");
    root.style.setProperty("--slate", "#2c3e50");
    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// ── Search Mode ───────────────────────────────────────────────
function setSearchMode(mode, btn) {
  state.mode = mode;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  
  ["isbnMode","titleMode","authorMode","subjectMode","advancedMode"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  const modeEl = document.getElementById(mode + "Mode");
  if (modeEl) modeEl.style.display = "block";
  
  setTimeout(() => {
    const map = { 
      isbn:"mainInput", 
      title:"titleInput", 
      author:"authorInput", 
      subject:"subjectInput", 
      advanced:"advTitle" 
    };
    const el = document.getElementById(map[mode]);
    if (el) { el.focus(); el.select?.(); }
  }, 50);
}

// ── Quick Search ──────────────────────────────────────────────
function quickSearch(q) {
  const titleBtn = document.querySelectorAll(".tab-btn")[1];
  if (titleBtn) setSearchMode("title", titleBtn);
  const input = document.getElementById("titleInput");
  if (input) {
    input.value = q;
    doSearch();
  }
}

// ── Build Query ───────────────────────────────────────────────
function buildQuery() {
  const mode = state.mode;
  let q = "";

  if (mode === "isbn") {
    const input = document.getElementById("mainInput");
    const v = input?.value.trim().replace(/[-\s]/g,"") || "";
    if (!v) return null;
    q = `isbn:${v}`;

  } else if (mode === "title") {
    const t = document.getElementById("titleInput")?.value.trim() || "";
    const a = document.getElementById("titleAuthorInput")?.value.trim() || "";
    if (!t) return null;
    q = `intitle:${t}`;
    if (a) q += `+inauthor:${a}`;

  } else if (mode === "author") {
    const a = document.getElementById("authorInput")?.value.trim() || "";
    if (!a) return null;
    q = `inauthor:${a}`;

  } else if (mode === "subject") {
    const s = document.getElementById("subjectInput")?.value.trim() || "";
    if (!s) return null;
    q = `subject:${s}`;

  } else if (mode === "advanced") {
    const parts = [];
    const t = document.getElementById("advTitle")?.value.trim() || "";
    const a = document.getElementById("advAuthor")?.value.trim() || "";
    const p = document.getElementById("advPublisher")?.value.trim() || "";
    const s = document.getElementById("advSubject")?.value.trim() || "";
    if (t) parts.push(`intitle:${t}`);
    if (a) parts.push(`inauthor:${a}`);
    if (p) parts.push(`inpublisher:${p}`);
    if (s) parts.push(`subject:${s}`);
    if (!parts.length) return null;
    q = parts.join("+");
  }
  return q;
}

// ── Main Search ───────────────────────────────────────────────
async function doSearch(page = 0) {
  const query = buildQuery();
  if (!query) { 
    showToast("Please enter a search term", "error"); 
    return; 
  }

  state.currentPage = page;
  state.lastQuery = query;

  const btn = document.getElementById("searchBtn");
  if (btn) {
    btn.classList.add("loading");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching…';
    btn.disabled = true;
  }

  showLoader();
  const toolbar = document.getElementById("toolbar");
  if (toolbar) toolbar.style.display = "none";
  const pagination = document.getElementById("pagination");
  if (pagination) pagination.innerHTML = "";

  const maxResultsSelect = document.getElementById("maxResults");
  const maxResults = parseInt(maxResultsSelect?.value || "20");
  
  const langSelect = document.getElementById("advLang");
  const lang = langSelect?.value || "";
  
  const startIndex = page * maxResults;
  const sortOrder = state.sortBy === "newest" ? "&orderBy=newest" : "&orderBy=relevance";

  // 🔐 Build URL for Cloudflare Worker (NO API KEY EXPOSED)
  const workerUrl = new URL(WORKER_ENDPOINT);
  workerUrl.searchParams.set('q', query);
  workerUrl.searchParams.set('maxResults', maxResults.toString());
  workerUrl.searchParams.set('startIndex', startIndex.toString());
  if (sortOrder.includes('newest')) {
    workerUrl.searchParams.set('orderBy', 'newest');
  }
  if (lang) workerUrl.searchParams.set('langRestrict', lang);
  
  const url = workerUrl.toString();

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // Add cache busting for development
      cache: 'no-store'
    });
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `API error: ${res.status}`);
    }
    
    const data = await res.json();

    state.totalItems = data.totalItems || 0;
    state.results = (data.items || []).map(item => parseBook(item));
    state.perPage = maxResults;

    renderResults();
    renderPagination();
    updateToolbar(query);

  } catch (err) {
    console.error('Search error:', err);
    showError(err.message || 'Failed to fetch results');
    showToast("Search failed: " + err.message, "error");
  } finally {
    if (btn) {
      btn.classList.remove("loading");
      btn.innerHTML = '<i class="fas fa-magnifying-glass"></i> Search';
      btn.disabled = false;
    }
  }
}

// ── Parse Book Object ─────────────────────────────────────────
function parseBook(item) {
  const info = item.volumeInfo || {};
  const sale = item.saleInfo || {};
  const access = item.accessInfo || {};

  const isbns = (info.industryIdentifiers || []);
  const isbn13 = isbns.find(i => i.type === "ISBN_13")?.identifier || "";
  const isbn10 = isbns.find(i => i.type === "ISBN_10")?.identifier || "";

  const thumb = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || "";
  // Force HTTPS for images
  const cover = thumb ? thumb.replace(/^http:\/\//i, 'https://') : "";

  return {
    id: item.id,
    title: info.title || "Untitled",
    subtitle: info.subtitle || "",
    authors: info.authors || [],
    publisher: info.publisher || "",
    publishedDate: info.publishedDate || "",
    description: (info.description || "").replace(/<[^>]*>/g, ''), // Strip HTML
    pages: info.pageCount || 0,
    categories: info.categories || [],
    language: info.language || "",
    isbn13,
    isbn10,
    cover,
    rating: info.averageRating || 0,
    ratingsCount: info.ratingsCount || 0,
    previewLink: info.previewLink || "",
    infoLink: info.infoLink || "",
    buyLink: sale.buyLink || "",
    isEbook: sale.isEbook || false,
    epub: access.epub?.isAvailable || false,
    pdf: access.pdf?.isAvailable || false,
    maturity: info.maturityRating || "",
    dimensions: info.dimensions || null,
  };
}

// ── Render Results ─────────────────────────────────────────────
function renderResults() {
  const grid = document.getElementById("resultsGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  grid.className = `results-grid${state.view === "list" ? " list-view" : ""}`;

  if (!state.results.length) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🔍</div>
      <div class="empty-title">No books found</div>
      <div class="empty-sub">Try different keywords or check your spelling</div>
    </div>`;
    return;
  }

  // Apply client-side sort
  let books = [...state.results];
  if (state.sortBy === "title_asc") {
    books.sort((a,b) => a.title.localeCompare(b.title));
  } else if (state.sortBy === "title_desc") {
    books.sort((a,b) => b.title.localeCompare(a.title));
  }

  books.forEach((book, i) => {
    const card = createBookCard(book, i);
    grid.appendChild(card);
  });
}

function createBookCard(book, i) {
  const card = document.createElement("div");
  card.className = `book-card${isCollected(book.id) ? " in-collection" : ""}`;
  card.style.setProperty("--i", i);
  card.tabIndex = 0; // Accessibility
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `${book.title} by ${book.authors?.join(', ') || 'Unknown'}`);

  const cover = book.cover
    ? `<img src="${esc(book.cover)}" alt="${esc(book.title)}" loading="lazy" onerror="this.parentElement.innerHTML=coverPlaceholder()">`
    : coverPlaceholder();

  const genre = book.categories?.[0] || (book.language ? book.language.toUpperCase() : "");
  const year = book.publishedDate?.slice(0,4) || "";
  const author = book.authors?.join(", ") || "Unknown Author";
  const isbn = book.isbn13 || book.isbn10 || book.id;
  const stars = renderStars(book.rating, book.ratingsCount);
  const collected = isCollected(book.id);

  card.innerHTML = `
    <div class="book-cover-wrap">
      ${cover}
      ${genre ? `<div class="cover-genre-badge">${esc(genre.substring(0,20))}</div>` : ""}
    </div>
    <div class="book-info">
      <div class="book-title">${esc(book.title)}</div>
      <div class="book-author"><i class="fas fa-user-pen" style="font-size:0.7rem;margin-right:4px;opacity:0.5"></i>${esc(author)}</div>
      <div class="book-meta">
        <div class="book-isbn">${isbn ? isbn.substring(0,13) : "—"}</div>
        ${year ? `<div class="book-year">${year}</div>` : ""}
      </div>
      ${stars}
      ${book.description ? `<div class="book-description">${esc(book.description.substring(0, 150))}${book.description.length > 150 ? '...' : ''}</div>` : ""}
      <div class="book-actions">
        <button class="btn-collect${collected ? " collected" : ""}" onclick="toggleCollect('${book.id}', this)" id="btn_${book.id}" aria-label="${collected ? 'Remove from collection' : 'Add to collection'}">
          ${collected ? '<i class="fas fa-check"></i> Collected' : '<i class="fas fa-plus"></i> Collect'}
        </button>
        <button class="btn-detail" onclick="openModal('${book.id}')" title="View Details" aria-label="View details">
          <i class="fas fa-circle-info"></i>
        </button>
        ${book.previewLink ? `<button class="btn-detail" onclick="event.stopPropagation(); window.open('${esc(book.previewLink)}','_blank')" title="Preview on Google Books"><i class="fas fa-eye"></i></button>` : ""}
      </div>
    </div>`;

  // Add click handler for card (open modal)
  card.addEventListener('click', (e) => {
    // Don't open modal if clicking buttons
    if (!e.target.closest('button')) {
      openModal(book.id);
    }
  });
  
  // Keyboard accessibility
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!e.target.closest('button')) {
        openModal(book.id);
      }
    }
  });

  return card;
}

function coverPlaceholder() {
  return `<div class="cover-placeholder"><i class="fas fa-book"></i><span>No Cover</span></div>`;
}

function renderStars(rating, count) {
  if (!rating || rating <= 0) return "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let stars = "";
  for (let i=0; i<full; i++) stars += "★";
  if (half) stars += "½";
  for (let i=0; i<empty; i++) stars += "☆";
  return `<div class="book-rating"><span class="stars" aria-label="${rating} out of 5 stars">${stars}</span><span class="rating-num">${rating.toFixed(1)} ${count ? `(${count})` : ''}</span></div>`;
}

// ── Update Toolbar ─────────────────────────────────────────────
function updateToolbar(query) {
  const toolbar = document.getElementById("toolbar");
  const resultsInfo = document.getElementById("resultsInfo");
  if (!toolbar || !resultsInfo) return;
  
  toolbar.style.display = "flex";
  resultsInfo.innerHTML = `Found <span>${state.totalItems.toLocaleString()}</span> results for "<span>${esc(query)}</span>"`;
}

// ── Pagination ─────────────────────────────────────────────────
function renderPagination() {
  const pg = document.getElementById("pagination");
  if (!pg) return;
  
  pg.innerHTML = "";
  const totalPages = Math.min(Math.ceil(state.totalItems / state.perPage), 10); // Google API max ~10 pages
  if (totalPages <= 1) return;

  const cur = state.currentPage;

  // Previous button
  const prev = document.createElement("button");
  prev.className = "page-btn";
  prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prev.disabled = cur === 0;
  prev.setAttribute('aria-label', 'Previous page');
  prev.onclick = () => doSearch(cur - 1);
  pg.appendChild(prev);

  // Page numbers
  for (let i = 0; i < totalPages; i++) {
    // Show ellipsis for long pagination
    if (totalPages > 7 && Math.abs(i - cur) > 2 && i !== 0 && i !== totalPages-1) {
      if (i === 1 || i === totalPages-2) {
        const dots = document.createElement("span");
        dots.style.cssText = "padding:0 8px;color:var(--muted);font-family:'Space Mono',monospace";
        dots.textContent = "…";
        dots.setAttribute('aria-hidden', 'true');
        pg.appendChild(dots);
      }
      continue;
    }
    const btn = document.createElement("button");
    btn.className = `page-btn${i === cur ? " active" : ""}`;
    btn.textContent = i + 1;
    btn.setAttribute('aria-label', `Page ${i + 1}`);
    btn.setAttribute('aria-current', i === cur ? 'page' : 'false');
    btn.onclick = () => doSearch(i);
    pg.appendChild(btn);
  }

  // Next button
  const next = document.createElement("button");
  next.className = "page-btn";
  next.innerHTML = '<i class="fas fa-chevron-right"></i>';
  next.disabled = cur >= totalPages - 1;
  next.setAttribute('aria-label', 'Next page');
  next.onclick = () => doSearch(cur + 1);
  pg.appendChild(next);
}

// ── Collection Management ─────────────────────────────────────
function isCollected(id) {
  return state.collection.some(b => b.id === id);
}

function toggleCollect(id, btn) {
  event?.stopPropagation?.(); // Prevent card click
  const book = state.results.find(b => b.id === id);
  if (!book) return;

  if (isCollected(id)) {
    state.collection = state.collection.filter(b => b.id !== id);
    if (btn) {
      btn.className = "btn-collect";
      btn.innerHTML = '<i class="fas fa-plus"></i> Collect';
    }
    const card = btn?.closest?.(".book-card");
    if (card) card.classList.remove("in-collection");
    showToast(`"${book.title}" removed from collection`, "info");
  } else {
    state.collection.push({ 
      ...book, 
      status: "wishlist", 
      addedAt: new Date().toISOString() 
    });
    if (btn) {
      btn.className = "btn-collect collected";
      btn.innerHTML = '<i class="fas fa-check"></i> Collected';
    }
    const card = btn?.closest?.(".book-card");
    if (card) card.classList.add("in-collection");
    showToast(`📚 "${book.title}" added to collection!`, "success");
  }

  saveCollection();
  updateCollectionCount();
  renderSidebar();
}

function removeFromCollection(id) {
  event?.stopPropagation?.();
  const book = state.collection.find(b => b.id === id);
  state.collection = state.collection.filter(b => b.id !== id);
  saveCollection();
  updateCollectionCount();
  renderSidebar();
  
  // Update card if visible in results
  const btn = document.getElementById(`btn_${id}`);
  if (btn) {
    btn.className = "btn-collect";
    btn.innerHTML = '<i class="fas fa-plus"></i> Collect';
    btn.closest(".book-card")?.classList.remove("in-collection");
  }
  if (book) showToast(`"${book.title}" removed`, "info");
}

function updateReadStatus(id, status) {
  event?.stopPropagation?.();
  const book = state.collection.find(b => b.id === id);
  if (book) {
    book.status = status;
    saveCollection();
    renderSidebar();
    showToast(`"${book.title}" marked as ${status}`, "success");
  }
}

function saveCollection() {
  try {
    localStorage.setItem("bookVault_collection", JSON.stringify(state.collection));
  } catch (e) {
    console.warn('Failed to save collection:', e);
    showToast("Could not save collection (storage full?)", "error");
  }
}

function updateCollectionCount() {
  const count = state.collection.length;
  const els = {
    collectionCount: document.getElementById("collectionCount"),
    totalBooks: document.getElementById("totalBooks"),
    readCount: document.getElementById("readCount"),
    readingCount: document.getElementById("readingCount"),
    wishlistCount: document.getElementById("wishlistCount"),
  };
  
  if (els.collectionCount) els.collectionCount.textContent = count;
  if (els.totalBooks) els.totalBooks.textContent = count;
  if (els.readCount) els.readCount.textContent = state.collection.filter(b=>b.status==="read").length;
  if (els.readingCount) els.readingCount.textContent = state.collection.filter(b=>b.status==="reading").length;
  if (els.wishlistCount) els.wishlistCount.textContent = state.collection.filter(b=>b.status==="wishlist").length;
}

// ── Sidebar ────────────────────────────────────────────────────
function openCollection() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (sidebar) sidebar.classList.add("open");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
  renderSidebar();
}

function closeCollection() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function filterCollection(filter, btn) {
  state.collectionFilter = filter;
  document.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderSidebar();
}

function renderSidebar() {
  updateCollectionCount();
  const list = document.getElementById("sidebarList");
  if (!list) return;
  
  let books = state.collection;
  if (state.collectionFilter !== "all") {
    books = books.filter(b => b.status === state.collectionFilter);
  }

  if (!books.length) {
    list.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--muted);font-family:'Space Mono',monospace;font-size:0.8rem">
      ${state.collectionFilter === "all" ? "No books yet. Go search!" : `No ${state.collectionFilter} books.`}
    </div>`;
    return;
  }

  list.innerHTML = books.map((b, i) => `
    <div class="collection-item" style="animation-delay:${i*0.04}s" tabindex="0">
      <div class="coll-thumb">
        ${b.cover ? `<img src="${esc(b.cover)}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:1.2rem\'>📖</div>'">` : `<div style="width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:1.2rem">📖</div>`}
      </div>
      <div class="coll-info">
        <div class="coll-title">${esc(b.title)}</div>
        <div class="coll-author">${esc(b.authors?.join(", ") || "—")}</div>
        <div class="coll-isbn">${esc(b.isbn13 || b.isbn10 || b.id)}</div>
      </div>
      <div class="coll-status">
        <select class="status-select" onchange="updateReadStatus('${esc(b.id)}', this.value)" aria-label="Reading status">
          <option value="wishlist"${b.status==="wishlist"?" selected":""}>📌 Wishlist</option>
          <option value="reading"${b.status==="reading"?" selected":""}>📖 Reading</option>
          <option value="read"${b.status==="read"?" selected":""}>✅ Read</option>
        </select>
      </div>
      <button class="remove-btn" onclick="removeFromCollection('${esc(b.id)}')" title="Remove" aria-label="Remove from collection"><i class="fas fa-xmark"></i></button>
    </div>
  `).join("");
}

function clearCollection() {
  if (!confirm("Clear your entire collection? This can't be undone.")) return;
  state.collection = [];
  saveCollection();
  updateCollectionCount();
  renderSidebar();
  showToast("Collection cleared", "info");
  
  // Update all visible cards
  document.querySelectorAll(".book-card.in-collection").forEach(card => {
    card.classList.remove("in-collection");
    const btn = card.querySelector(".btn-collect");
    if (btn) { 
      btn.className = "btn-collect"; 
      btn.innerHTML = '<i class="fas fa-plus"></i> Collect'; 
    }
  });
}

// ── Modal (Book Detail) ────────────────────────────────────────
function openModal(id) {
  const book = state.results.find(b => b.id === id);
  if (!book) return;

  const modalCover = document.getElementById("modalCover");
  if (modalCover) {
    modalCover.innerHTML = book.cover
      ? `<img src="${esc(book.cover)}" alt="${esc(book.title)}" onerror="this.src=''; this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:2rem\\'>📚</div>'">`
      : `<div style="width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:2rem">📚</div>`;
  }

  const modalTitle = document.getElementById("modalTitle");
  if (modalTitle) {
    modalTitle.textContent = book.title;
    if (book.subtitle) modalTitle.textContent += `: ${book.subtitle}`;
  }
  
  const modalAuthor = document.getElementById("modalAuthor");
  if (modalAuthor) {
    modalAuthor.innerHTML = `<i class="fas fa-user-pen" style="margin-right:6px;opacity:0.5"></i>${esc(book.authors?.join(", ") || "Unknown Author")}`;
  }

  const badges = document.getElementById("modalBadges");
  if (badges) {
    badges.innerHTML = "";
    if (book.isbn13) badges.innerHTML += `<span class="badge amber">ISBN-13: ${esc(book.isbn13)}</span>`;
    if (book.isbn10) badges.innerHTML += `<span class="badge">ISBN-10: ${esc(book.isbn10)}</span>`;
    if (book.language) badges.innerHTML += `<span class="badge">${esc(book.language.toUpperCase())}</span>`;
    if (book.isEbook) badges.innerHTML += `<span class="badge sage">eBook</span>`;
    if (book.epub) badges.innerHTML += `<span class="badge sage">EPUB</span>`;
    if (book.pdf) badges.innerHTML += `<span class="badge sage">PDF</span>`;
  }

  const modalRating = document.getElementById("modalRating");
  if (modalRating) {
    modalRating.innerHTML = book.rating ? renderStars(book.rating, book.ratingsCount) : "";
  }

  const modalDetails = document.getElementById("modalDetails");
  if (modalDetails) {
    modalDetails.innerHTML = `
      <div class="detail-item"><div class="detail-label">Publisher</div><div class="detail-val">${esc(book.publisher || "—")}</div></div>
      <div class="detail-item"><div class="detail-label">Published</div><div class="detail-val">${esc(book.publishedDate || "—")}</div></div>
      <div class="detail-item"><div class="detail-label">Pages</div><div class="detail-val">${book.pages || "—"}</div></div>
      <div class="detail-item"><div class="detail-label">Categories</div><div class="detail-val">${esc(book.categories?.join(", ") || "—")}</div></div>
      <div class="detail-item"><div class="detail-label">Google ID</div><div class="detail-val" style="font-family:'Space Mono',monospace;font-size:0.8rem">${esc(book.id)}</div></div>
      <div class="detail-item"><div class="detail-label">Maturity</div><div class="detail-val">${esc(book.maturity || "—")}</div></div>
    `;
  }

  const modalDesc = document.getElementById("modalDesc");
  if (modalDesc) {
    modalDesc.textContent = book.description || "No description available.";
  }

  const collected = isCollected(book.id);
  const modalActions = document.getElementById("modalActions");
  if (modalActions) {
    modalActions.innerHTML = `
      <button class="btn-primary" onclick="toggleCollect('${esc(book.id)}', this); updateModalCollectBtn(this, '${esc(book.id)}')">
        <i class="${collected ? "fas fa-check" : "fas fa-plus"}"></i> ${collected ? "Collected" : "Add to Collection"}
      </button>
      ${book.previewLink ? `<a href="${esc(book.previewLink)}" target="_blank" rel="noopener" class="btn-secondary"><i class="fas fa-eye"></i> Preview</a>` : ""}
      ${book.infoLink ? `<a href="${esc(book.infoLink)}" target="_blank" rel="noopener" class="btn-secondary"><i class="fas fa-arrow-up-right-from-square"></i> Google Books</a>` : ""}
      ${book.buyLink ? `<a href="${esc(book.buyLink)}" target="_blank" rel="noopener" class="btn-secondary" style="border-color:var(--sage);color:var(--sage)"><i class="fas fa-cart-shopping"></i> Buy</a>` : ""}
      <button class="btn-secondary" onclick="copyISBN('${esc(book.isbn13 || book.isbn10)}')"><i class="fas fa-copy"></i> Copy ISBN</button>
      <button class="btn-secondary" onclick="shareBook('${esc(book.id)}')"><i class="fas fa-share-nodes"></i> Share</button>
    `;
  }

  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  
  // Focus trap for accessibility
  setTimeout(() => {
    const closeBtn = document.querySelector(".modal-close");
    closeBtn?.focus();
  }, 100);
}

// Helper: Update modal collect button state
function updateModalCollectBtn(btn, bookId) {
  const collected = isCollected(bookId);
  btn.innerHTML = `<i class="${collected ? "fas fa-check" : "fas fa-plus"}"></i> ${collected ? "Collected" : "Add to Collection"}`;
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
  
  // Return focus to last focused element (basic implementation)
  const searchInput = document.getElementById("mainInput");
  searchInput?.focus();
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.addEventListener("click", function(e) {
      if (e.target === this) closeModal();
    });
  }
  
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { 
      closeModal(); 
      closeCollection(); 
    }
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("mainInput") || document.getElementById("titleInput");
      input?.focus();
      input?.select();
    }
  });
});

function copyISBN(isbn) {
  event?.stopPropagation?.();
  if (!isbn) { showToast("No ISBN available", "error"); return; }
  navigator.clipboard.writeText(isbn).then(
    () => showToast(`ISBN ${isbn} copied!`, "success"),
    () => showToast("Failed to copy ISBN", "error")
  );
}

function shareBook(id) {
  event?.stopPropagation?.();
  const book = state.results.find(b => b.id === id) || state.collection.find(b => b.id === id);
  if (!book) return;
  
  const text = `📚 "${book.title}" by ${book.authors?.join(", ") || "Unknown"}\nISBN: ${book.isbn13 || book.isbn10 || "—"}\n${book.infoLink}`;
  
  if (navigator.share) {
    navigator.share({ 
      title: book.title, 
      text, 
      url: book.infoLink 
    }).catch(err => {
      if (err.name !== 'AbortError') console.warn('Share failed:', err);
    });
  } else {
    navigator.clipboard.writeText(text).then(
      () => showToast("Book info copied to clipboard!", "success"),
      () => showToast("Failed to copy", "error")
    );
  }
}

// ── View & Sort ────────────────────────────────────────────────
function setView(view, btn) {
  state.view = view;
  document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderResults();
}

function sortResults() {
  const select = document.getElementById("sortSelect");
  if (!select) return;
  
  state.sortBy = select.value;
  if (state.sortBy === "newest") {
    // Re-fetch with API-level sort
    doSearch(state.currentPage);
  } else {
    // Client-side sort only
    renderResults();
  }
}

// ── Export ─────────────────────────────────────────────────────
function exportCSV() {
  if (!state.collection.length) { 
    showToast("Your collection is empty", "error"); 
    return; 
  }
  
  const headers = ["Title","Authors","ISBN-13","ISBN-10","Publisher","Year","Pages","Language","Status","Rating","Categories","Google ID"];
  const rows = state.collection.map(b => [
    `"${(b.title||"").replace(/"/g,'""')}"`,
    `"${(b.authors?.join("; ")||"").replace(/"/g,'""')}"`,
    b.isbn13||"", b.isbn10||"",
    `"${(b.publisher||"").replace(/"/g,'""')}"`,
    b.publishedDate?.slice(0,4)||"",
    b.pages||"",
    b.language||"",
    b.status||"",
    b.rating||"",
    `"${(b.categories?.join("; ")||"").replace(/"/g,'""')}"`,
    b.id||""
  ].join(","));

  const csv = [headers.join(","), ...rows].join("\n");
  downloadFile(csv, `bookvault_collection_${new Date().toISOString().slice(0,10)}.csv`, "text/csv");
  showToast(`Exported ${state.collection.length} books as CSV`, "success");
}

function exportJSON() {
  if (!state.collection.length) { 
    showToast("Your collection is empty", "error"); 
    return; 
  }
  
  const exportData = {
    exportedAt: new Date().toISOString(),
    app: "BookVault",
    version: "1.0",
    books: state.collection
  };
  
  const json = JSON.stringify(exportData, null, 2);
  downloadFile(json, `bookvault_collection_${new Date().toISOString().slice(0,10)}.json`, "application/json");
  showToast(`Exported ${state.collection.length} books as JSON`, "success");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; 
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── UI Helpers ─────────────────────────────────────────────────
function showLoader() {
  const grid = document.getElementById("resultsGrid");
  if (!grid) return;
  grid.innerHTML = `<div class="loader" role="status" aria-live="polite">
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <span class="sr-only">Loading results...</span>
  </div>`;
}

function showError(msg) {
  const grid = document.getElementById("resultsGrid");
  if (!grid) return;
  grid.innerHTML = `<div class="empty-state" role="alert">
    <div class="empty-icon">⚠️</div>
    <div class="empty-title">Something went wrong</div>
    <div class="empty-sub">${esc(msg)}</div>
  </div>`;
}

function showToast(msg, type = "info") {
  const container = document.getElementById("toasts");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  
  const icons = { 
    success: "fa-circle-check", 
    info: "fa-circle-info", 
    error: "fa-circle-exclamation" 
  };
  
  toast.innerHTML = `<i class="fas ${icons[type]||icons.info}"></i> ${esc(msg)}`;
  container.appendChild(toast);
  
  // Auto-remove after delay
  const timeout = setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
  
  // Allow manual dismiss on click
  toast.style.cursor = "pointer";
  toast.onclick = () => {
    clearTimeout(timeout);
    toast.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  };
}

function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize collection count
  updateCollectionCount();
  renderSidebar();
  
  // Log for debugging (remove in production)
  console.log("%c📚 BookVault", "font-size:1.5rem;font-weight:bold;color:#d4820a");
  console.log("%cISBN Collector | Secure Worker Proxy", "color:#7a7060");
  console.log("%cWorker Endpoint:", "font-weight:bold", WORKER_ENDPOINT);
  
  // Add Enter key support for search inputs
  const searchInputs = ["mainInput", "titleInput", "titleAuthorInput", "authorInput", "subjectInput", "advTitle", "advAuthor", "advPublisher", "advSubject"];
  searchInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          doSearch();
        }
      });
    }
  });
  
  // Handle view toggle buttons if they exist
  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const view = this.getAttribute("onclick")?.includes("list") ? "list" : "grid";
      setView(view, this);
    });
  });
});

// Expose functions globally for inline onclick handlers
window.doSearch = doSearch;
window.setSearchMode = setSearchMode;
window.quickSearch = quickSearch;
window.toggleCollect = toggleCollect;
window.openModal = openModal;
window.closeModal = closeModal;
window.openCollection = openCollection;
window.closeCollection = closeCollection;
window.filterCollection = filterCollection;
window.removeFromCollection = removeFromCollection;
window.updateReadStatus = updateReadStatus;
window.clearCollection = clearCollection;
window.copyISBN = copyISBN;
window.shareBook = shareBook;
window.setView = setView;
window.sortResults = sortResults;
window.exportCSV = exportCSV;
window.exportJSON = exportJSON;
window.toggleTheme = toggleTheme;
window.coverPlaceholder = coverPlaceholder;
