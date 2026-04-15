// main.js - Adaptive Study Hub Landing Page Logic
// By - Paras Dhiman

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initTypingEffect();
  initCounters();
  initScrollAnimations();
  initSmoothScroll();
  simulateUX();
});


function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}
function updateThemeIcon(theme) {
  document.querySelector('#theme-toggle i').className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  btn.addEventListener('click', () => nav.classList.toggle('active'));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('active');
  });
}

function initTypingEffect() {
  const el = document.getElementById('typing-text');
  const words = ['Start Adapting.', 'Study Smarter.', 'Level Up.', 'Close Gaps.'];
  let w = 0, c = 0, del = false;
  function type() {
    const current = words[w];
    el.textContent = del ? current.substring(0, c--) : current.substring(0, c++);
    let speed = del ? 50 : 100;
    if (!del && c === current.length + 1) { speed = 2000; del = true; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; speed = 500; }
    setTimeout(type, speed);
  }
  type();
}

function initCounters() {
  const stats = document.querySelectorAll('.stat-number');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); o.unobserve(e.target); } });
  }, { threshold: 0.5 });
  stats.forEach(s => obs.observe(s));
}
function animate(el) {
  const target = +el.dataset.target, dur = 2000, start = performance.now();
  function update(now) {
    const prog = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - prog, 3)) * target).toLocaleString();
    if (prog < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-anim]').forEach(el => obs.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function simulateUX() {
  setTimeout(() => document.querySelectorAll('.fill').forEach(b => b.style.width = b.style.width), 500);
  const streakEl = document.getElementById('current-streak');
  let streak = parseInt(localStorage.getItem('studyStreak') || '0');
  const last = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();
  if (last !== today) { streak++; localStorage.setItem('studyStreak', streak); localStorage.setItem('lastVisit', today); }
  streakEl.textContent = streak;
}

// Paras Dhiman
// __________SoftwareLabs__________

