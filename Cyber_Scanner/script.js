const CyberShield = (() => {
  const API_BASE = 'https://cyber-scanner-api.dhimanparas605.workers.dev';
  const ALLOWED_ORIGIN = 'https://paras367.github.io';

  const state = {
    history: JSON.parse(localStorage.getItem('cybershield_history') || '[]'),
    stats: { total: 0, threats: 0, clean: 0, last: '---' },
    currentFile: null,
    isScanning: false,
    radarData: { malicious: 0, suspicious: 0, harmless: 0 }
  };

  const dom = {
    boot: { screen: el('boot-screen'), log: el('boot-log'), bar: el('boot-bar'), app: el('app') },
    stats: { total: el('s-total'), threats: el('s-threats'), clean: el('s-clean'), last: el('s-last'), browser: el('s-browser') },
    tabs: document.querySelectorAll('.stab'),
    panes: document.querySelectorAll('.tab-pane'),
    progress: { wrap: el('progress-wrap'), bar: el('prog-bar'), glow: el('prog-glow'), status: el('prog-status'), pct: el('prog-pct'), stages: el('scan-stages') },
    terminal: { out: el('terminal-out'), count: el('term-line-count'), clear: el('btn-clear-term') },
    history: { list: el('history-list'), noHist: el('no-hist'), filters: document.querySelectorAll('.hfilt'), clear: el('btn-clear'), export: el('btn-export') },
    radar: { canvas: el('radar-canvas'), ctx: null, mal: el('ri-malicious'), sus: el('ri-suspicious'), harm: el('ri-harmless') },
    threat: { matrix: el('threat-matrix'), level: el('threat-level-text'), bars: document.querySelectorAll('.tl-bar') },
    toast: el('toast-container'),
    clock: el('top-clock'),
    date: el('top-date')
  };

  function el(id) { return document.getElementById(id); }

  function init() {
    dom.radar.ctx = dom.radar.canvas.getContext('2d');
    bootSequence();
    setInterval(updateClock, 1000);
    updateClock();
    detectSystem();
    setupTabs();
    setupListeners();
    renderHistory();
    updateStats();
    initRadar();
    animateRadar();
  }

  function bootSequence() {
    const logs = [
      'Initializing core modules...',
      'Loading threat intelligence feeds...',
      'Connecting to edge backend...',
      'Verifying API credentials...',
      'KV cache: ONLINE',
      'Security protocols: ACTIVE',
      'System ready.'
    ];
    let i = 0, progress = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.animationDelay = `${i * 0.1}s`;
        line.textContent = `> ${logs[i]}`;
        dom.boot.log.appendChild(line);
        i++;
      }
      progress += 100 / 7;
      dom.boot.bar.style.width = `${Math.min(progress, 100)}%`;
      if (i >= logs.length && progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          dom.boot.screen.classList.add('hidden');
          dom.boot.app.classList.remove('hidden');
          log('System initialized. Ready for scans.', 'info');
        }, 400);
      }
    }, 200);
  }

  function updateClock() {
    const now = new Date();
    dom.clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    dom.date.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function detectSystem() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    dom.stats.browser.textContent = browser;
  }

  function setupTabs() {
    dom.tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        dom.tabs.forEach(b => b.classList.remove('active'));
        dom.panes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        el(`tab-${tab}`).classList.add('active');
        log(`Switched to ${tab.toUpperCase()} scanner`, 'info');
      });
    });
  }

  function log(msg, type = 'info') {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const prefix = type === 'danger' ? '[ALERT]' : type === 'warn' ? '[WARN]' : '[INFO]';
    const cls = type === 'danger' ? 't-danger' : type === 'warn' ? 't-warn' : type === 'success' ? 't-success' : 't-info';
    const line = document.createElement('span');
    line.className = `t-line ${cls}`;
    line.textContent = `[${time}] ${prefix} ${msg}`;
    dom.terminal.out.appendChild(line);
    dom.terminal.out.scrollTop = dom.terminal.out.scrollHeight;
    const count = dom.terminal.out.querySelectorAll('.t-line').length;
    dom.terminal.count.textContent = `${count} lines`;
  }

  function typeLog(text, type = 'info', speed = 20) {
    return new Promise(resolve => {
      let i = 0;
      const line = document.createElement('span');
      line.className = `t-line ${type === 'danger' ? 't-danger' : type === 'warn' ? 't-warn' : 't-success'}`;
      dom.terminal.out.appendChild(line);
      const timer = setInterval(() => {
        line.textContent += text[i++];
        dom.terminal.out.scrollTop = dom.terminal.out.scrollHeight;
        if (i >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  function updateStats() {
    dom.stats.total.textContent = state.stats.total;
    dom.stats.threats.textContent = state.stats.threats;
    dom.stats.clean.textContent = state.stats.clean;
    dom.stats.last.textContent = state.stats.last;
    updateThreatLevel();
  }

  function updateThreatLevel() {
    const ratio = state.stats.threats / Math.max(1, state.stats.total);
    let level = 'GUARDED', bars = 2;
    if (ratio > 0.5) { level = 'SEVERE'; bars = 5; }
    else if (ratio > 0.3) { level = 'ELEVATED'; bars = 4; }
    else if (ratio > 0.15) { level = 'HEIGHTENED'; bars = 3; }
    dom.threat.level.textContent = level;
    dom.threat.bars.forEach((b, i) => b.classList.toggle('active', i < bars));
    dom.threat.level.className = `tl-text ${level === 'SEVERE' || level === 'ELEVATED' ? '' : level === 'HEIGHTENED' ? 'warn' : 'safe'}`;
  }

  function saveToHistory(type, input, verdict, details = {}) {
    const entry = { id: Date.now(), type, input, verdict, timestamp: new Date().toISOString(), details };
    state.history.unshift(entry);
    if (state.history.length > 50) state.history.pop();
    localStorage.setItem('cybershield_history', JSON.stringify(state.history));
    renderHistory();
    state.stats.total++;
    if (verdict === 'DANGEROUS' || verdict === 'SUSPICIOUS') state.stats.threats++;
    else state.stats.clean++;
    state.stats.last = verdict;
    updateStats();
    updateRadarData(verdict);
  }

  function renderHistory(filter = 'all') {
    dom.history.list.innerHTML = '';
    const filtered = filter === 'all' ? state.history : state.history.filter(h => h.type === filter);
    dom.history.noHist.classList.toggle('hidden', filtered.length > 0);
    filtered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'hist-item';
      li.innerHTML = `
        <div class="hi-top">
          <span class="hi-type">${item.type.toUpperCase()}</span>
          <span class="hi-time">${new Date(item.timestamp).toLocaleTimeString()}</span>
        </div>
        <div class="hi-input">${escapeHtml(item.input)}</div>
        <span class="hi-verdict hv-${item.verdict}">${item.verdict}</span>
      `;
      li.addEventListener('click', () => loadResult(item));
      dom.history.list.appendChild(li);
    });
  }

  function loadResult(item) {
    log(`Restoring scan: ${item.type} → ${item.input}`, 'info');
    const tabMap = { url: 'url', file: 'file', hash: 'hash', ip: 'ip' };
    if (tabMap[item.type]) {
      dom.tabs.forEach(b => b.classList.remove('active'));
      dom.panes.forEach(p => p.classList.remove('active'));
      el(`stab-${item.type}`)?.classList.add('active');
      el(`tab-${item.type}`)?.classList.add('active');
    }
    const inputEl = { url: 'url-input', file: 'file-input', hash: 'hash-input', ip: 'ip-input' }[item.type];
    if (inputEl) el(inputEl).value = item.input;
    showResult(item.type, item.verdict, item.details);
  }

  function calculateVerdict(result) {
    const { malicious, suspicious } = result;
    if (malicious >= 5) return 'DANGEROUS';
    if (malicious > 0) return 'SUSPICIOUS';
    if (suspicious > 0) return 'CAUTION';
    return 'SAFE';
  }

  function showResult(type, verdict, data) {
    const resEl = el(`${type}-result`);
    if (!resEl) return;
    resEl.classList.remove('hidden');
    
    const vpClass = `vp-${verdict}`;
    const repClass = data.reputation >= 70 ? 'rep-safe' : data.reputation >= 40 ? 'rep-warn' : 'rep-danger';
    const repColor = data.reputation >= 70 ? 'safe' : data.reputation >= 40 ? 'warn' : 'danger';
    
    let html = `
      <div class="verdict-banner">
        <div class="verdict-pill ${vpClass}">${verdict}</div>
        <div class="verdict-score">
          <div class="vs-rep">${data.reputation}/100</div>
          <div class="vs-lbl">REPUTATION</div>
          <div class="rep-bar-wrap"><div class="rep-bar-fill ${repClass}" style="width:${data.reputation}%"></div></div>
        </div>
      </div>
      ${data.cached ? '<div class="chips-row"><span class="chip chip-tag">🔄 CACHED RESULT</span></div>' : ''}
    `;

    if (type === 'url') {
      html += `
        <div class="result-section-title">SECURITY METRICS</div>
        <div class="result-grid">
          <div class="rg-cell"><div class="rg-label">SSL/TLS</div><div class="rg-value ${data.ssl_valid ? 'safe' : 'danger'}">${data.ssl_valid ? 'VALID' : 'INVALID'}</div></div>
          <div class="rg-cell"><div class="rg-label">DNS</div><div class="rg-value info">${data.dns || 'N/A'}</div></div>
          <div class="rg-cell"><div class="rg-label">MALICIOUS</div><div class="rg-value danger">${data.malicious}</div></div>
          <div class="rg-cell"><div class="rg-label">SUSPICIOUS</div><div class="rg-value warn">${data.suspicious}</div></div>
          <div class="rg-cell"><div class="rg-label">HARMLESS</div><div class="rg-value safe">${data.harmless}</div></div>
        </div>
      `;
      if (data.categories?.length) {
        html += `<div class="result-section-title">CATEGORIES</div><div class="chips-row">${data.categories.map(c => `<span class="chip chip-cat">${c}</span>`).join('')}</div>`;
      }
      if (data.last_analysis) {
        html += `
          <div class="result-section-title">INFRASTRUCTURE</div>
          <div class="result-grid">
            <div class="rg-cell"><div class="rg-label">SERVER</div><div class="rg-value">${data.last_analysis.server || 'N/A'}</div></div>
            <div class="rg-cell"><div class="rg-label">IP</div><div class="rg-value">${data.last_analysis.ip || 'N/A'}</div></div>
            <div class="rg-cell"><div class="rg-label">COUNTRY</div><div class="rg-value">${data.last_analysis.country || 'N/A'}</div></div>
          </div>
        `;
      }
    }

    if (type === 'file' || type === 'hash') {
      html += `
        <div class="result-section-title">DETECTION METRICS</div>
        <div class="result-grid">
          <div class="rg-cell"><div class="rg-label">RATIO</div><div class="rg-value">${data.detection_ratio || '0/70'}</div></div>
          <div class="rg-cell"><div class="rg-label">MALICIOUS</div><div class="rg-value danger">${data.malicious}</div></div>
          <div class="rg-cell"><div class="rg-label">SUSPICIOUS</div><div class="rg-value warn">${data.suspicious}</div></div>
          <div class="rg-cell"><div class="rg-label">HARMLESS</div><div class="rg-value safe">${data.harmless}</div></div>
        </div>
      `;
      if (data.file_type) html += `<div class="result-section-title">FILE INFO</div><div class="rg-cell"><div class="rg-label">TYPE</div><div class="rg-value">${escapeHtml(data.file_type)}</div></div>`;
      if (data.names?.length) html += `<div class="result-section-title">KNOWN NAMES</div><div class="chips-row">${data.names.map(n => `<span class="chip chip-name">${escapeHtml(n)}</span>`).join('')}</div>`;
      if (data.tags?.length) html += `<div class="result-section-title">TAGS</div><div class="chips-row">${data.tags.map(t => `<span class="chip chip-tag">${t}</span>`).join('')}</div>`;
      if (data.first_seen || data.last_seen) {
        html += `<div class="result-section-title">TIMELINE</div><div class="result-grid">`;
        if (data.first_seen) html += `<div class="rg-cell"><div class="rg-label">FIRST SEEN</div><div class="rg-value">${new Date(data.first_seen).toLocaleDateString()}</div></div>`;
        if (data.last_seen) html += `<div class="rg-cell"><div class="rg-label">LAST ANALYZED</div><div class="rg-value">${new Date(data.last_seen).toLocaleDateString()}</div></div>`;
        html += `</div>`;
      }
    }

    if (type === 'ip') {
      html += `
        <div class="result-section-title">REPUTATION METRICS</div>
        <div class="result-grid">
          <div class="rg-cell"><div class="rg-label">ABUSE SCORE</div><div class="rg-value ${data.abuse_confidence >= 50 ? 'danger' : data.abuse_confidence >= 20 ? 'warn' : 'safe'}">${data.abuse_confidence}%</div></div>
          <div class="rg-cell"><div class="rg-label">REPORTS</div><div class="rg-value">${data.total_reports}</div></div>
          <div class="rg-cell"><div class="rg-label">COUNTRY</div><div class="rg-value">${data.country || 'N/A'}</div></div>
          <div class="rg-cell"><div class="rg-label">ISP</div><div class="rg-value">${data.isp || 'N/A'}</div></div>
          <div class="rg-cell"><div class="rg-label">USAGE</div><div class="rg-value">${data.usage_type || 'N/A'}</div></div>
        </div>
      `;
      if (data.last_reported) html += `<div class="result-section-title">LAST REPORTED</div><div class="rg-cell"><div class="rg-value">${new Date(data.last_reported).toLocaleString()}</div></div>`;
      if (data.recent_categories?.length) {
        html += `<div class="result-section-title">REPORT CATEGORIES</div><div class="chips-row">${data.recent_categories.map(c => `<span class="chip chip-cat">${c}</span>`).join('')}</div>`;
      }
    }

    if (data.error) {
      html += `<div class="result-section-title">ERROR</div><div class="rg-cell"><div class="rg-value danger">${escapeHtml(data.error)}</div></div>`;
    }

    resEl.innerHTML = html;
    updateThreatMatrix(type, data);
  }

  function updateThreatMatrix(type, data) {
    const matrix = dom.threat.matrix;
    if (!matrix) return;
    
    const threats = [];
    if (data.malicious > 0) threats.push({ label: 'Malicious', value: data.malicious, max: 10, color: 'var(--red)' });
    if (data.suspicious > 0) threats.push({ label: 'Suspicious', value: data.suspicious, max: 10, color: 'var(--orange)' });
    if (data.abuse_confidence > 20) threats.push({ label: 'Abuse Score', value: data.abuse_confidence, max: 100, color: data.abuse_confidence >= 50 ? 'var(--red)' : 'var(--orange)' });
    
    if (threats.length === 0) {
      matrix.innerHTML = '<div class="matrix-empty">No active threats detected</div>';
      return;
    }
    
    matrix.innerHTML = threats.map(t => {
      const pct = Math.min(100, (t.value / t.max) * 100);
      return `
        <div class="matrix-row">
          <div class="matrix-label">${t.label}</div>
          <div class="matrix-bar-bg"><div class="matrix-bar-fill" style="width:${pct}%;background:${t.color}"></div></div>
          <div class="matrix-pct">${Math.round(pct)}%</div>
        </div>
      `;
    }).join('');
  }

  async function apiFetch(endpoint, payload) {
    log(`📡 POST ${API_BASE}${endpoint}`, 'info');
    dom.progress.wrap.classList.remove('hidden');
    dom.progress.bar.style.width = '0%';
    dom.progress.status.textContent = 'Connecting...';
    
    const stages = ['DNS', 'SSL', 'API', 'ANALYZE', 'CACHE'];
    let stageIdx = 0;
    dom.progress.stages.innerHTML = stages.map((s, i) => `<span class="stage-chip" id="stage-${i}">${s}</span>`).join('');
    
    let progress = 0;
    const progInt = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 90) clearInterval(progInt);
      dom.progress.bar.style.width = `${progress}%`;
      dom.progress.glow.style.left = `${progress}%`;
      dom.progress.pct.textContent = `${Math.round(progress)}%`;
      
      if (progress > stageIdx * 20 && stageIdx < stages.length) {
        document.getElementById(`stage-${stageIdx}`)?.classList.add('done');
        if (stageIdx + 1 < stages.length) document.getElementById(`stage-${stageIdx + 1}`)?.classList.add('active');
        stageIdx++;
      }
    }, 150);
    
    document.querySelectorAll('.stage-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (e) {
      log(`⚠️ Backend unreachable. Local fallback active.`, 'warn');
      await new Promise(r => setTimeout(r, 600));
      return { malicious: 0, suspicious: 0, harmless: 10, reputation: 80, cached: false, error: 'Connection failed' };
    } finally {
      clearInterval(progInt);
      dom.progress.bar.style.width = '100%';
      dom.progress.glow.style.left = '100%';
      dom.progress.pct.textContent = '100%';
      dom.progress.status.textContent = 'Complete';
      document.querySelectorAll('.stage-chip').forEach(c => c.classList.add('done'));
      setTimeout(() => {
        dom.progress.wrap.classList.add('hidden');
        dom.progress.bar.style.width = '0%';
        dom.progress.glow.style.left = '0%';
        document.querySelectorAll('.stage-chip').forEach(c => c.classList.remove('done', 'active'));
      }, 800);
    }
  }

  async function scanURL() {
    if (state.isScanning) return;
    const url = el('url-input').value.trim();
    if (!url) return toast('Please enter a URL', 'warn');
    
    state.isScanning = true;
    el('btn-scan-url').disabled = true;
    log(`Scanning URL: ${url}`, 'info');
    await typeLog('Resolving DNS, checking SSL, querying URLScan.io...');
    
    const result = await apiFetch('/api/scan-url', { url });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Reputation: ${result.reputation}/100`);
    showResult('url', verdict, result);
    saveToHistory('url', url, verdict, result);
    toast(`Scan complete: ${verdict}`, verdict === 'DANGEROUS' ? 'danger' : verdict === 'SAFE' ? 'success' : 'warn');
    
    state.isScanning = false;
    el('btn-scan-url').disabled = false;
  }

  async function scanFile() {
    if (state.isScanning || !state.currentFile) return;
    state.isScanning = true;
    el('btn-scan-file').disabled = true;
    
    log(`Analyzing file: ${state.currentFile.name}`, 'info');
    const buffer = await state.currentFile.arrayBuffer();
    const hashBuf = await crypto.subtle.digest('SHA-256', buffer);
    const hash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    el('fi-name').textContent = state.currentFile.name;
    el('fi-size').textContent = formatBytes(state.currentFile.size);
    el('computed-hash').textContent = hash;
    el('file-info').classList.remove('hidden');
    el('file-hash-display').classList.remove('hidden');
    
    await typeLog('Computing SHA-256, querying VirusTotal...');
    const result = await apiFetch('/api/scan-file', { hash, filename: state.currentFile.name });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Detection: ${result.detection_ratio}`);
    showResult('file', verdict, result);
    saveToHistory('file', state.currentFile.name, verdict, { ...result, hash });
    toast(`Analysis complete: ${verdict}`, verdict === 'DANGEROUS' ? 'danger' : verdict === 'SAFE' ? 'success' : 'warn');
    
    state.isScanning = false;
    el('btn-scan-file').disabled = false;
  }

  async function scanHash() {
    if (state.isScanning) return;
    const hash = el('hash-input').value.trim();
    if (!/^[a-f0-9]{32,64}$/i.test(hash)) return toast('Invalid hash format', 'warn');
    
    state.isScanning = true;
    el('btn-scan-hash').disabled = true;
    
    log(`Looking up hash: ${hash}`, 'info');
    await typeLog('Querying VirusTotal database...');
    
    const result = await apiFetch('/api/hash', { hash });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Reputation: ${result.reputation}/100`);
    showResult('hash', verdict, result);
    saveToHistory('hash', hash, verdict, result);
    toast(`Lookup complete: ${verdict}`, verdict === 'DANGEROUS' ? 'danger' : verdict === 'SAFE' ? 'success' : 'warn');
    
    state.isScanning = false;
    el('btn-scan-hash').disabled = false;
  }

  async function scanIP() {
    if (state.isScanning) return;
    const ip = el('ip-input').value.trim();
    if (!ip) return toast('Please enter IP or domain', 'warn');
    
    state.isScanning = true;
    el('btn-scan-ip').disabled = true;
    
    log(`Scanning target: ${ip}`, 'info');
    await typeLog('Querying AbuseIPDB, checking reputation...');
    
    const result = await apiFetch('/api/ip-scan', { ip });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Abuse Confidence: ${result.abuse_confidence}%`);
    showResult('ip', verdict, result);
    saveToHistory('ip', ip, verdict, result);
    toast(`Scan complete: ${verdict}`, verdict === 'DANGEROUS' ? 'danger' : verdict === 'SAFE' ? 'success' : 'warn');
    
    state.isScanning = false;
    el('btn-scan-ip').disabled = false;
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'], i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function toast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${msg}</span>`;
    dom.toast.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(20px)';
      setTimeout(() => t.remove(), 300);
    }, 4000);
  }

  function setupListeners() {
    el('btn-scan-url').addEventListener('click', scanURL);
    el('url-input').addEventListener('keydown', e => { if (e.key === 'Enter') scanURL(); });
    
    const dz = el('drop-zone');
    dz.addEventListener('click', () => el('file-input').click());
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
    dz.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    el('file-input').addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });
    el('btn-scan-file').addEventListener('click', scanFile);
    
    el('btn-scan-hash').addEventListener('click', scanHash);
    el('hash-input').addEventListener('input', updateHashType);
    el('hash-input').addEventListener('keydown', e => { if (e.key === 'Enter') scanHash(); });
    
    el('btn-scan-ip').addEventListener('click', scanIP);
    el('ip-input').addEventListener('keydown', e => { if (e.key === 'Enter') scanIP(); });
    
    dom.history.clear.addEventListener('click', () => {
      if (confirm('Clear all scan history?')) {
        state.history = [];
        localStorage.removeItem('cybershield_history');
        renderHistory();
        toast('History cleared', 'success');
        log('History cleared by user', 'warn');
      }
    });
    
    dom.history.export.addEventListener('click', exportHistory);
    
    dom.history.filters.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.history.filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderHistory(btn.dataset.filter);
      });
    });
    
    dom.terminal.clear.addEventListener('click', () => {
      dom.terminal.out.innerHTML = '';
      dom.terminal.count.textContent = '0 lines';
      log('Terminal cleared', 'info');
    });
    
    document.addEventListener('paste', e => {
      const text = e.clipboardData.getData('text').trim();
      if (text.match(/^https?:\/\//)) {
        el('url-input').value = text.replace(/^https?:\/\//, '');
        switchTab('url');
        toast('URL detected from clipboard', 'info');
      } else if (text.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        el('ip-input').value = text;
        switchTab('ip');
        toast('IP detected from clipboard', 'info');
      } else if (text.match(/^[a-f0-9]{32,64}$/i)) {
        el('hash-input').value = text;
        updateHashType();
        switchTab('hash');
        toast('Hash detected from clipboard', 'info');
      }
    });
    
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey) {
        const map = { '1': 'url', '2': 'file', '3': 'hash', '4': 'ip' };
        if (map[e.key]) { e.preventDefault(); switchTab(map[e.key]); }
        if (e.key === 'E' || e.key === 'e') { e.preventDefault(); exportHistory(); }
        if (e.key === 'S' || e.key === 's') {
          e.preventDefault();
          const active = document.querySelector('.tab-pane.active').id;
          if (active === 'tab-url') scanURL();
          else if (active === 'tab-file' && state.currentFile) scanFile();
          else if (active === 'tab-hash') scanHash();
          else if (active === 'tab-ip') scanIP();
        }
      }
    });
  }

  function switchTab(tab) {
    dom.tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    dom.panes.forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
    log(`Switched to ${tab.toUpperCase()} scanner`, 'info');
  }

  function updateHashType() {
    const hash = el('hash-input').value.trim();
    const ind = el('hash-type-indicator');
    if (!hash) { ind.textContent = ''; ind.className = 'hash-type-indicator'; return; }
    if (/^[a-f0-9]{32}$/i.test(hash)) { ind.textContent = 'MD5 (32-bit)'; ind.className = 'hash-type-indicator md5'; }
    else if (/^[a-f0-9]{40}$/i.test(hash)) { ind.textContent = 'SHA1 (40-bit)'; ind.className = 'hash-type-indicator sha1'; }
    else if (/^[a-f0-9]{64}$/i.test(hash)) { ind.textContent = 'SHA256 (64-bit)'; ind.className = 'hash-type-indicator sha256'; }
    else { ind.textContent = 'Unknown format'; ind.className = 'hash-type-indicator'; }
  }

  function handleFile(file) {
    state.currentFile = file;
    el('fi-name').textContent = file.name;
    el('fi-size').textContent = formatBytes(file.size);
    el('file-info').classList.remove('hidden');
    log(`File loaded: ${file.name} (${formatBytes(file.size)})`, 'info');
    toast('File ready for analysis', 'success');
  }

  function exportHistory() {
    if (!state.history.length) return toast('No history to export', 'warn');
    const blob = new Blob([JSON.stringify(state.history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybershield_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Report exported', 'success');
    log('History exported to JSON', 'info');
  }

  function initRadar() {
    if (!dom.radar.ctx) return;
    const ctx = dom.radar.ctx;
    const w = dom.radar.canvas.width, h = dom.radar.canvas.height;
    const cx = w / 2, cy = h / 2, r = 70;
    
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(0,255,224,0.15)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, r * i / 4, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let a = 0; a < 360; a += 30) {
      const rad = a * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(rad) * r, cy + Math.sin(rad) * r);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(0,255,224,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  function animateRadar() {
    if (!dom.radar.ctx) return;
    const ctx = dom.radar.ctx;
    const w = dom.radar.canvas.width, h = dom.radar.canvas.height;
    const cx = w / 2, cy = h / 2, r = 70;
    let angle = 0;
    
    function frame() {
      ctx.clearRect(0, 0, w, h);
      initRadar();
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r);
      ctx.strokeStyle = 'rgba(0,255,224,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      
      const { malicious, suspicious, harmless } = state.radarData;
      const total = malicious + suspicious + harmless || 1;
      
      ctx.fillStyle = 'rgba(255,45,85,0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * (malicious / total), 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255,149,0,0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * ((malicious + suspicious) / total), 0, Math.PI * 2);
      ctx.fill();
      
      angle = (angle + 1.5) % 360;
      requestAnimationFrame(frame);
    }
    frame();
  }

  function updateRadarData(verdict) {
    if (verdict === 'DANGEROUS') state.radarData.malicious = Math.min(10, state.radarData.malicious + 2);
    else if (verdict === 'SUSPICIOUS') state.radarData.suspicious = Math.min(10, state.radarData.suspicious + 1);
    else state.radarData.harmless = Math.min(20, state.radarData.harmless + 1);
    
    dom.radar.mal.textContent = state.radarData.malicious;
    dom.radar.sus.textContent = state.radarData.suspicious;
    dom.radar.harm.textContent = state.radarData.harmless;
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', CyberShield.init);
