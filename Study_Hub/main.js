/* ============================================================
   ADAPTIVE STUDY HUB — main.js
   ============================================================ */

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('done');
  }, 900);
});

(function initHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

(function initMobileMenu() {
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
})();


(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    io.observe(el);
  });
})();

const Toast = (() => {
  let container;
  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }
  function show(msg, type = 'info', duration = 3500) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️', xp: '⚡' };
    const c = getContainer();
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => {
      t.classList.add('hide');
      setTimeout(() => t.remove(), 350);
    }, duration);
    return t;
  }
  return { show };
})();
window.Toast = Toast;

const UserState = (() => {
  const KEY = 'ash_user';
  const defaults = {
    name: 'Student',
    xp: 340,
    level: 4,
    streak: 7,
    lastLogin: null,
    badges: ['Early Bird', 'First Test'],
    weakTopics: ['Integration', 'Electrostatics'],
    strongTopics: ['Matrices', 'Mechanics'],
    dailyDone: false,
    totalTests: 12,
    avgAccuracy: 74,
    rank: 142,
  };
  function get() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
    catch { return { ...defaults }; }
  }
  function set(data) {
    const cur = get();
    const next = { ...cur, ...data };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }
  function addXP(amount, reason = '') {
    const cur = get();
    const newXP = cur.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    const next = set({ xp: newXP, level: newLevel });
    Toast.show(`+${amount} XP${reason ? ' — ' + reason : ''}`, 'xp');
    updateNavXP(next);
    return next;
  }
  return { get, set, addXP };
})();
window.UserState = UserState;

function updateNavXP(state) {
  state = state || UserState.get();
  const xpEl = document.getElementById('nav-xp');
  const avEl = document.getElementById('nav-avatar');
  if (xpEl) xpEl.textContent = `⚡ ${state.xp} XP`;
  if (avEl) avEl.textContent = state.name.charAt(0).toUpperCase();
}
document.addEventListener('DOMContentLoaded', () => updateNavXP());

(function checkStreak() {
  const state = UserState.get();
  const today = new Date().toDateString();
  if (state.lastLogin !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = state.lastLogin === yesterday ? state.streak + 1 : 1;
    UserState.set({ lastLogin: today, streak: newStreak, dailyDone: false });
    if (newStreak > 1) {
      setTimeout(() => Toast.show(`🔥 ${newStreak}-day streak! Keep it up!`, 'success'), 1500);
    }
  }
})();

function initTabs(containerSel) {
  const containers = document.querySelectorAll(containerSel || '[data-tabs]');
  containers.forEach(c => {
    const btns = c.querySelectorAll('.tab-btn');
    const contents = c.querySelectorAll('.tab-content');
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        if (contents[i]) contents[i].classList.add('active');
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', () => initTabs());

function animateCounter(el, target, duration = 1500, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}
window.animateCounter = animateCounter;

/* ── Counter Observer ────────────────────────────────────── */
(function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.counter);
        const suffix = e.target.dataset.suffix || '';
        animateCounter(e.target, target, 1400, suffix);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();

let tabSwitchCount = 0;
function enableAntiCheat(onViolation) {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      tabSwitchCount++;
      if (onViolation) onViolation(tabSwitchCount);
      else Toast.show(`⚠️ Tab switch #${tabSwitchCount} detected! Stay focused.`, 'warn');
    }
  });
}
window.enableAntiCheat = enableAntiCheat;

function createTimer(seconds, onTick, onEnd) {
  let remaining = seconds;
  let interval = null;
  function start() {
    interval = setInterval(() => {
      remaining--;
      if (onTick) onTick(remaining);
      if (remaining <= 0) { clearInterval(interval); if (onEnd) onEnd(); }
    }, 1000);
  }
  function stop() { clearInterval(interval); }
  function reset(s) { stop(); remaining = s || seconds; }
  function getTime() { return remaining; }
  function formatTime(s) {
    const m = Math.floor(s / 60), sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }
  return { start, stop, reset, getTime, formatTime };
}
window.createTimer = createTimer;

/* ── Smooth anchor scrolling ─────────────────────────────── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});

/* ── Modal helper ────────────────────────────────────────── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
  if (e.target.closest('.modal-close')) {
    e.target.closest('.modal-overlay').classList.remove('open');
  }
});
window.openModal = openModal;
window.closeModal = closeModal;


function initDarkMode() {
  const btn = document.getElementById('dark-toggle');
  const stored = localStorage.getItem('ash_theme');
  if (stored === 'light') document.documentElement.setAttribute('data-theme','light');
  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ash_theme','dark');
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      } else {
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem('ash_theme','light');
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }
    });
  }
}
document.addEventListener('DOMContentLoaded', initDarkMode);


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.progress-fill[data-width]').forEach(el => {
      el.style.width = el.dataset.width + '%';
    });
  }, 400);
});

console.log('%c📚 Adaptive Study Hub', 'color:#38bdf8;font-size:18px;font-weight:800;');
console.log('%cBuilt for focused, intelligent learning.', 'color:#94a3b8;font-size:12px;');
