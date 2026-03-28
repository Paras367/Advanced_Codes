// ============================================================
//  BookVault — ISBN Collector  |  books.js
//  Google Books API Integration — Full Featured
// ============================================================

// ── Obfuscated API key (XOR + Base64 encoding) ──────────────
const _k = (function () {
  const _e = "QUlhelpSyD6QMeMAs9NDkdUIxrKV-MR3EluxNVsUTo";
  // XOR decode with rolling key
  const _x = [0x42,0x56,0x61,0x75,0x6c,0x74,0x4b,0x65,0x79];
  try {
    // Reconstruct: Base64 decode then XOR
    const raw = atob("QUlhU3lENlFNZU1BczlORGtkVUl4cktWLU1SM0VsdXhOVnNVVG8=");
    let out = "";
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ _x[i % _x.length]);
    }
    return out;
  } catch (_) {
    // Fallback reconstruction
    return atob("QUlhU3lENlFNZU1BczlORGtkVUl4cktWLU1SM0VsdXhOVnNVVG8=")
      .split('').map((c,i) => String.fromCharCode(c.charCodeAt(0) ^ _x[i%_x.length])).join('');
  }
})();

// Direct key (the XOR approach above is obfuscation, not true encryption)
// For production, proxy through your own server!
const API_KEY = "AIzaSyD6QMeMAs9NDkdUIxrKV-MR3EluxNVsUTo";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

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
  if (darkMode) {
    document.documentElement.style.setProperty("--ink", "#f5f0e8");
    document.documentElement.style.setProperty("--paper", "#1a1612");
    document.documentElement.style.setProperty("--cream", "#221e18");
    document.documentElement.style.setProperty("--card-bg", "#24201a");
    document.documentElement.style.setProperty("--border", "#3d3428");
    document.documentElement.style.setProperty("--muted", "#8a7d6a");
    document.documentElement.style.setProperty("--slate", "#c4b8a4");
    document.getElementById("themeBtn").innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.style.setProperty("--ink", "#0d0d0d");
    document.documentElement.style.setProperty("--paper", "#f5f0e8");
    document.documentElement.style.setProperty("--cream", "#faf7f2");
    document.documentElement.style.setProperty("--card-bg", "#fffdf8");
    document.documentElement.style.setProperty("--border", "#d8cfc0");
    document.documentElement.style.setProperty("--muted", "#7a7060");
    document.documentElement.style.setProperty("--slate", "#2c3e50");
    document.getElementById("themeBtn").innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// ── Search Mode ───────────────────────────────────────────────
function setSearchMode(mode, btn) {
  state.mode = mode;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  ["isbnMode","titleMode","authorMode","subjectMode","advancedMode"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });
  document.getElementById(mode + "Mode").style.display = "block";
  // Focus the right input
  setTimeout(() => {
    const map = { isbn:"mainInput", title:"titleInput", author:"authorInput", subject:"subjectInput", advanced:"advTitle" };
    const el = document.getElementById(map[mode]);
    if (el) el.focus();
  }, 50);
}

// ── Quick Search ──────────────────────────────────────────────
function quickSearch(q) {
  setSearchMode("title", document.querySelectorAll(".tab-btn")[1]);
  document.getElementById("titleInput").value = q;
  doSearch();
}

// ── Build Query ───────────────────────────────────────────────
function buildQuery() {
  const mode = state.mode;
  let q = "";

  if (mode === "isbn") {
    const v = document.getElementById("mainInput").value.trim().replace(/[-\s]/g,"");
    if (!v) return null;
    q = `isbn:${v}`;

  } else if (mode === "title") {
    const t = document.getElementById("titleInput").value.trim();
    const a = document.getElementById("titleAuthorInput").value.trim();
    if (!t) return null;
    q = `intitle:${t}`;
    if (a) q += `+inauthor:${a}`;

  } else if (mode === "author") {
    const a = document.getElementById("authorInput").value.trim();
    if (!a) return null;
    q = `inauthor:${a}`;

  } else if (mode === "subject") {
    const s = document.getElementById("subjectInput").value.trim();
    if (!s) return null;
    q = `subject:${s}`;

  } else if (mode === "advanced") {
    const parts = [];
    const t = document.getElementById("advTitle").value.trim();
    const a = document.getElementById("advAuthor").value.trim();
    const p = document.getElementById("advPublisher").value.trim();
    const s = document.getElementById("advSubject").value.trim();
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
  if (!query) { showToast("Please enter a search term", "error"); return; }

  state.currentPage = page;
  state.lastQuery = query;

  const btn = document.getElementById("searchBtn");
  btn.classList.add("loading");
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching…';

  showLoader();
  document.getElementById("toolbar").style.display = "none";
  document.getElementById("pagination").innerHTML = "";

  const maxResults = parseInt(document.getElementById("maxResults").value);
  const lang = document.getElementById("advLang")?.value || "";
  const startIndex = page * maxResults;
  const sortOrder = state.sortBy === "newest" ? "&orderBy=newest" : "&orderBy=relevance";

  let url = `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&startIndex=${startIndex}${sortOrder}&key=${API_KEY}`;
  if (lang) url += `&langRestrict=${lang}`;
  // Get full book info
  url += "&projection=full&printType=books";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();

    state.totalItems = data.totalItems || 0;
    state.results = (data.items || []).map(item => parseBook(item));
    state.perPage = maxResults;

    renderResults();
    renderPagination();
    updateToolbar(query);

  } catch (err) {
    showError(err.message);
    showToast("Search failed: " + err.message, "error");
  } finally {
    btn.classList.remove("loading");
    btn.innerHTML = '<i class="fas fa-magnifying-glass"></i> Search';
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
  // Use HTTPS
  const cover = thumb.replace("http://", "https://");

  return {
    id: item.id,
    title: info.title || "Untitled",
    subtitle: info.subtitle || "",
    authors: info.authors || [],
    publisher: info.publisher || "",
    publishedDate: info.publishedDate || "",
    description: info.description || "",
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
  if (state.sortBy === "title_asc") books.sort((a,b) => a.title.localeCompare(b.title));
  else if (state.sortBy === "title_desc") books.sort((a,b) => b.title.localeCompare(a.title));

  books.forEach((book, i) => {
    const card = createBookCard(book, i);
    grid.appendChild(card);
  });
}

function createBookCard(book, i) {
  const card = document.createElement("div");
  card.className = `book-card${isCollected(book.id) ? " in-collection" : ""}`;
  card.style.setProperty("--i", i);

  const cover = book.cover
    ? `<img src="${book.cover}" alt="${esc(book.title)}" loading="lazy" onerror="this.parentElement.innerHTML=coverPlaceholder()">`
    : coverPlaceholder();

  const genre = book.categories?.[0] || book.language?.toUpperCase() || "";
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
      ${book.description ? `<div class="book-description">${esc(book.description)}</div>` : ""}
      <div class="book-actions">
        <button class="btn-collect${collected ? " collected" : ""}" onclick="toggleCollect('${book.id}', this)" id="btn_${book.id}">
          ${collected ? '<i class="fas fa-check"></i> Collected' : '<i class="fas fa-plus"></i> Collect'}
        </button>
        <button class="btn-detail" onclick="openModal('${book.id}')" title="View Details">
          <i class="fas fa-circle-info"></i>
        </button>
        ${book.previewLink ? `<button class="btn-detail" onclick="window.open('${book.previewLink}','_blank')" title="Preview on Google Books"><i class="fas fa-eye"></i></button>` : ""}
      </div>
    </div>`;

  return card;
}

function coverPlaceholder() {
  return `<div class="cover-placeholder"><i class="fas fa-book"></i><span>No Cover</span></div>`;
}

function renderStars(rating, count) {
  if (!rating) return "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let stars = "";
  for (let i=0;i<full;i++) stars += "★";
  if (half) stars += "½";
  for (let i=0;i<empty;i++) stars += "☆";
  return `<div class="book-rating"><span class="stars">${stars}</span><span class="rating-num">${rating.toFixed(1)} (${count})</span></div>`;
}

// ── Update Toolbar ─────────────────────────────────────────────
function updateToolbar(query) {
  document.getElementById("toolbar").style.display = "flex";
  document.getElementById("resultsInfo").innerHTML =
    `Found <span>${state.totalItems.toLocaleString()}</span> results for "<span>${esc(query)}</span>"`;
}

// ── Pagination ─────────────────────────────────────────────────
function renderPagination() {
  const pg = document.getElementById("pagination");
  pg.innerHTML = "";
  const totalPages = Math.min(Math.ceil(state.totalItems / state.perPage), 10); // API max 10 pages
  if (totalPages <= 1) return;

  const cur = state.currentPage;

  const prev = document.createElement("button");
  prev.className = "page-btn";
  prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prev.disabled = cur === 0;
  prev.onclick = () => doSearch(cur - 1);
  pg.appendChild(prev);

  for (let i = 0; i < totalPages; i++) {
    if (totalPages > 7 && Math.abs(i - cur) > 2 && i !== 0 && i !== totalPages-1) {
      if (i === 1 || i === totalPages-2) {
        const dots = document.createElement("span");
        dots.style.cssText = "padding:0 8px;color:var(--muted);font-family:'Space Mono',monospace";
        dots.textContent = "…";
        pg.appendChild(dots);
      }
      continue;
    }
    const btn = document.createElement("button");
    btn.className = `page-btn${i === cur ? " active" : ""}`;
    btn.textContent = i + 1;
    btn.onclick = () => doSearch(i);
    pg.appendChild(btn);
  }

  const next = document.createElement("button");
  next.className = "page-btn";
  next.innerHTML = '<i class="fas fa-chevron-right"></i>';
  next.disabled = cur >= totalPages - 1;
  next.onclick = () => doSearch(cur + 1);
  pg.appendChild(next);
}

// ── Collection Management ─────────────────────────────────────
function isCollected(id) {
  return state.collection.some(b => b.id === id);
}

function toggleCollect(id, btn) {
  const book = state.results.find(b => b.id === id);
  if (!book) return;

  if (isCollected(id)) {
    state.collection = state.collection.filter(b => b.id !== id);
    btn.className = "btn-collect";
    btn.innerHTML = '<i class="fas fa-plus"></i> Collect';
    btn.closest(".book-card").classList.remove("in-collection");
    showToast(`"${book.title}" removed from collection`, "info");
  } else {
    state.collection.push({ ...book, status: "wishlist", addedAt: new Date().toISOString() });
    btn.className = "btn-collect collected";
    btn.innerHTML = '<i class="fas fa-check"></i> Collected';
    btn.closest(".book-card").classList.add("in-collection");
    showToast(`📚 "${book.title}" added to collection!`, "success");
  }

  saveCollection();
  updateCollectionCount();
  renderSidebar();
}

function removeFromCollection(id) {
  const book = state.collection.find(b => b.id === id);
  state.collection = state.collection.filter(b => b.id !== id);
  saveCollection();
  updateCollectionCount();
  renderSidebar();
  // Update card if visible
  const btn = document.getElementById(`btn_${id}`);
  if (btn) {
    btn.className = "btn-collect";
    btn.innerHTML = '<i class="fas fa-plus"></i> Collect';
    btn.closest(".book-card")?.classList.remove("in-collection");
  }
  if (book) showToast(`"${book.title}" removed`, "info");
}

function updateReadStatus(id, status) {
  const book = state.collection.find(b => b.id === id);
  if (book) {
    book.status = status;
    saveCollection();
    renderSidebar();
  }
}

function saveCollection() {
  localStorage.setItem("bookVault_collection", JSON.stringify(state.collection));
}

function updateCollectionCount() {
  const count = state.collection.length;
  document.getElementById("collectionCount").textContent = count;
  document.getElementById("totalBooks").textContent = count;
  document.getElementById("readCount").textContent = state.collection.filter(b=>b.status==="read").length;
  document.getElementById("readingCount").textContent = state.collection.filter(b=>b.status==="reading").length;
  document.getElementById("wishlistCount").textContent = state.collection.filter(b=>b.status==="wishlist").length;
}

// ── Sidebar ────────────────────────────────────────────────────
function openCollection() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("overlay").classList.add("active");
  renderSidebar();
}

function closeCollection() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("active");
}

function filterCollection(filter, btn) {
  state.collectionFilter = filter;
  document.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderSidebar();
}

function renderSidebar() {
  updateCollectionCount();
  const list = document.getElementById("sidebarList");
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
    <div class="collection-item" style="animation-delay:${i*0.04}s">
      <div class="coll-thumb">
        ${b.cover ? `<img src="${b.cover}" alt="" loading="lazy">` : `<div style="width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:1.2rem">📖</div>`}
      </div>
      <div class="coll-info">
        <div class="coll-title">${esc(b.title)}</div>
        <div class="coll-author">${esc(b.authors?.join(", ") || "—")}</div>
        <div class="coll-isbn">${b.isbn13 || b.isbn10 || b.id}</div>
      </div>
      <div class="coll-status">
        <select class="status-select" onchange="updateReadStatus('${b.id}', this.value)">
          <option value="wishlist"${b.status==="wishlist"?" selected":""}>📌 Wishlist</option>
          <option value="reading"${b.status==="reading"?" selected":""}>📖 Reading</option>
          <option value="read"${b.status==="read"?" selected":""}>✅ Read</option>
        </select>
      </div>
      <button class="remove-btn" onclick="removeFromCollection('${b.id}')"><i class="fas fa-xmark"></i></button>
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
  // Update all cards
  document.querySelectorAll(".book-card.in-collection").forEach(card => {
    card.classList.remove("in-collection");
    const btn = card.querySelector(".btn-collect");
    if (btn) { btn.className = "btn-collect"; btn.innerHTML = '<i class="fas fa-plus"></i> Collect'; }
  });
}

// ── Modal (Book Detail) ────────────────────────────────────────
function openModal(id) {
  const book = state.results.find(b => b.id === id);
  if (!book) return;

  document.getElementById("modalCover").innerHTML = book.cover
    ? `<img src="${book.cover}" alt="${esc(book.title)}" onerror="this.src=''">`
    : `<div style="width:100%;height:100%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:2rem">📚</div>`;

  document.getElementById("modalTitle").textContent = book.title;
  if (book.subtitle) document.getElementById("modalTitle").textContent += `: ${book.subtitle}`;
  document.getElementById("modalAuthor").innerHTML = `<i class="fas fa-user-pen" style="margin-right:6px;opacity:0.5"></i>${book.authors?.join(", ") || "Unknown Author"}`;

  const badges = document.getElementById("modalBadges");
  badges.innerHTML = "";
  if (book.isbn13) badges.innerHTML += `<span class="badge amber">ISBN-13: ${book.isbn13}</span>`;
  if (book.isbn10) badges.innerHTML += `<span class="badge">ISBN-10: ${book.isbn10}</span>`;
  if (book.language) badges.innerHTML += `<span class="badge">${book.language.toUpperCase()}</span>`;
  if (book.isEbook) badges.innerHTML += `<span class="badge sage">eBook</span>`;
  if (book.epub) badges.innerHTML += `<span class="badge sage">EPUB</span>`;
  if (book.pdf) badges.innerHTML += `<span class="badge sage">PDF</span>`;

  document.getElementById("modalRating").innerHTML = book.rating ? renderStars(book.rating, book.ratingsCount) : "";

  document.getElementById("modalDetails").innerHTML = `
    <div class="detail-item"><div class="detail-label">Publisher</div><div class="detail-val">${esc(book.publisher || "—")}</div></div>
    <div class="detail-item"><div class="detail-label">Published</div><div class="detail-val">${esc(book.publishedDate || "—")}</div></div>
    <div class="detail-item"><div class="detail-label">Pages</div><div class="detail-val">${book.pages || "—"}</div></div>
    <div class="detail-item"><div class="detail-label">Categories</div><div class="detail-val">${book.categories?.join(", ") || "—"}</div></div>
    <div class="detail-item"><div class="detail-label">Google ID</div><div class="detail-val" style="font-family:'Space Mono',monospace;font-size:0.8rem">${book.id}</div></div>
    <div class="detail-item"><div class="detail-label">Maturity</div><div class="detail-val">${book.maturity || "—"}</div></div>
  `;

  document.getElementById("modalDesc").textContent = book.description || "No description available.";

  const collected = isCollected(book.id);
  document.getElementById("modalActions").innerHTML = `
    <button class="btn-primary${collected ? "" : ""}" onclick="toggleCollect('${book.id}', this); this.innerHTML = isCollected('${book.id}') ? '<i class=\\'fas fa-check\\'></i> Collected' : '<i class=\\'fas fa-plus\\'></i> Add to Collection'; this.className = isCollected('${book.id}') ? 'btn-primary' : 'btn-primary'">
      <i class="${collected ? "fas fa-check" : "fas fa-plus"}"></i> ${collected ? "Collected" : "Add to Collection"}
    </button>
    ${book.previewLink ? `<a href="${book.previewLink}" target="_blank" class="btn-secondary"><i class="fas fa-eye"></i> Preview</a>` : ""}
    ${book.infoLink ? `<a href="${book.infoLink}" target="_blank" class="btn-secondary"><i class="fas fa-arrow-up-right-from-square"></i> Google Books</a>` : ""}
    ${book.buyLink ? `<a href="${book.buyLink}" target="_blank" class="btn-secondary" style="border-color:var(--sage);color:var(--sage)"><i class="fas fa-cart-shopping"></i> Buy</a>` : ""}
    <button class="btn-secondary" onclick="copyISBN('${book.isbn13 || book.isbn10}')"><i class="fas fa-copy"></i> Copy ISBN</button>
    <button class="btn-secondary" onclick="shareBook('${book.id}')"><i class="fas fa-share-nodes"></i> Share</button>
  `;

  document.getElementById("modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("modal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

function copyISBN(isbn) {
  if (!isbn) { showToast("No ISBN available", "error"); return; }
  navigator.clipboard.writeText(isbn).then(() => showToast(`ISBN ${isbn} copied!`, "success"));
}

function shareBook(id) {
  const book = state.results.find(b => b.id === id);
  if (!book) return;
  const text = `📚 "${book.title}" by ${book.authors?.join(", ") || "Unknown"}\nISBN: ${book.isbn13 || book.isbn10 || "—"}\n${book.infoLink}`;
  if (navigator.share) {
    navigator.share({ title: book.title, text, url: book.infoLink });
  } else {
    navigator.clipboard.writeText(text).then(() => showToast("Book info copied to clipboard!", "success"));
  }
}

// ── View & Sort ────────────────────────────────────────────────
function setView(view, btn) {
  state.view = view;
  document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderResults();
}

function sortResults() {
  state.sortBy = document.getElementById("sortSelect").value;
  if (state.sortBy === "newest") {
    doSearch(state.currentPage); // API-level sort
  } else {
    renderResults(); // Client-level sort
  }
}

// ── Export ─────────────────────────────────────────────────────
function exportCSV() {
  if (!state.collection.length) { showToast("Your collection is empty", "error"); return; }
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
  downloadFile(csv, "bookvault_collection.csv", "text/csv");
  showToast(`Exported ${state.collection.length} books as CSV`, "success");
}

function exportJSON() {
  if (!state.collection.length) { showToast("Your collection is empty", "error"); return; }
  const json = JSON.stringify(state.collection, null, 2);
  downloadFile(json, "bookvault_collection.json", "application/json");
  showToast(`Exported ${state.collection.length} books as JSON`, "success");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── UI Helpers ─────────────────────────────────────────────────
function showLoader() {
  const grid = document.getElementById("resultsGrid");
  grid.innerHTML = `<div class="loader">
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
    <div class="loader-dot"></div>
  </div>`;
}

function showError(msg) {
  document.getElementById("resultsGrid").innerHTML = `<div class="empty-state">
    <div class="empty-icon">⚠️</div>
    <div class="empty-title">Something went wrong</div>
    <div class="empty-sub">${esc(msg)}</div>
  </div>`;
}

function showToast(msg, type = "info") {
  const container = document.getElementById("toasts");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icons = { success: "fa-circle-check", info: "fa-circle-info", error: "fa-circle-exclamation" };
  toast.innerHTML = `<i class="fas ${icons[type]||icons.info}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}

// ── Keyboard Shortcuts ─────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); closeCollection(); }
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    document.getElementById("mainInput")?.focus();
  }
});

// ── Init ───────────────────────────────────────────────────────
updateCollectionCount();
renderSidebar();
console.log("%c📚 BookVault", "font-size:2rem;font-weight:bold;color:#d4820a");
console.log("%cISBN Collector | Google Books API", "color:#7a7060");
