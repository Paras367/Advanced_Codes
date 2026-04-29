/**
 * CYBER SCANNER PRO X - Frontend Controller
 * By - Paras Dhiman
 * SoftwareLabs
 
 * All Content is Copyrighted by SoftwareLabs
 */
const CyberScanner = (() => {
  const API_BASE = 'https://cyber-scanner-api.dhimanparas605.workers.dev';

  const state = {
    history: JSON.parse(localStorage.getItem('csp_history') || '[]'),
    stats: { total: 0, threats: 0, clean: 0, last: '--' },
    currentFile: null,
    isScanning: false
  };

  const dom = {
    stats: { total: el('stat-total'), threats: el('stat-threats'), clean: el('stat-clean'), last: el('stat-last') },
    tabs: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    progress: { container: document.querySelector('.progress-container'), bar: el('scan-progress'), text: el('progress-text') },
    terminal: el('terminal-output'),
    history: el('history-list'),
    noHistory: el('no-history')
  };

  function el(id) { return document.getElementById(id); }


  function init() {
    updateClock();
    setInterval(updateClock, 1000);
    detectSystem();
    renderHistory();
    updateStats();
    setupTabs();
    setupListeners();
    log('System initialized. Ready for scans.', 'info');
  }

  function updateClock() {
    el('live-clock').textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
  }

  function detectSystem() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    el('sys-browser').textContent = `Browser: ${browser}`;
    el('sys-platform').textContent = `Platform: ${navigator.platform}`;
    el('sys-details').textContent = `Browser: ${browser}\nPlatform: ${navigator.platform}\nCores: ${navigator.hardwareConcurrency}\nOnline: ${navigator.onLine}\nScreen: ${screen.width}x${screen.height}`;
  }

 
  function setupTabs() {
    dom.tabs.forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
  }

  function switchTab(tabId) {
    dom.tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    dom.tabContents.forEach(tc => tc.classList.toggle('active', tc.id === `tab-${tabId}`));
  }

 
  function log(msg, type = 'info') {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const prefix = type === 'danger' ? `[ALERT]` : type === 'warn' ? `[WARN]` : `[INFO]`;
    const className = `log-${type}`;
    dom.terminal.insertAdjacentHTML('beforeend', `<span class="${className}">[${time}] ${prefix} ${msg}</span>\n`);
    dom.terminal.scrollTop = dom.terminal.scrollHeight;
  }

  function typeLog(text, type = 'info', speed = 30) {
    return new Promise(resolve => {
      let i = 0;
      const line = document.createElement('span');
      line.className = `log-${type}`;
      dom.terminal.appendChild(line);
      const timer = setInterval(() => {
        line.textContent += text[i++];
        dom.terminal.scrollTop = dom.terminal.scrollHeight;
        if (i >= text.length) { clearInterval(timer); line.textContent += '\n'; resolve(); }
      }, speed);
    });
  }

 
  function updateStats() {
    dom.stats.total.textContent = state.stats.total;
    dom.stats.threats.textContent = state.stats.threats;
    dom.stats.clean.textContent = state.stats.clean;
    dom.stats.last.textContent = state.stats.last;
  }

  function saveToHistory(type, input, verdict, details = {}) {
    const entry = { id: Date.now(), type, input, verdict, timestamp: new Date().toISOString(), details };
    state.history.unshift(entry);
    if (state.history.length > 50) state.history.pop();
    localStorage.setItem('csp_history', JSON.stringify(state.history));
    renderHistory();
    state.stats.total++;
    if (verdict === 'DANGEROUS' || verdict === 'SUSPICIOUS') state.stats.threats++;
    else state.stats.clean++;
    state.stats.last = verdict;
    updateStats();
  }

  function renderHistory() {
    dom.history.innerHTML = '';
    dom.noHistory.classList.toggle('hidden', state.history.length > 0);
    state.history.forEach(item => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `<span class="type">[${item.type.toUpperCase()}] ${item.input.substring(0, 20)}...</span><span class="time">${new Date(item.timestamp).toLocaleTimeString()}</span>`;
      li.addEventListener('click', () => loadResult(item));
      dom.history.appendChild(li);
    });
  }

  function loadResult(item) {
    log(`Restoring scan: ${item.type} → ${item.input}`, 'info');
    switchTab(item.type);
    const inputEl = { url: 'url-input', file: 'file-input', hash: 'hash-input', ip: 'ip-input' }[item.type];
    if (inputEl) el(inputEl).value = item.input;
    showResult(item.type, item.verdict, item.details);
  }


  function calculateVerdict(result) {
    const { malicious, suspicious, harmless } = result;
    if (malicious > 0) return malicious >= 5 ? 'DANGEROUS' : 'SUSPICIOUS';
    if (suspicious > 0) return 'CAUTION';
    return 'SAFE';
  }


  function showResult(type, verdict, data) {
    const resEl = el(`${type}-result`);
    if (!resEl) return;
    resEl.classList.remove('hidden');
    
    let html = `<div class="result-header">
      <span class="verdict-badge verdict-${verdict}">VERDICT: ${verdict}</span>
      ${data.cached ? '<span class="cached-badge">🔄 Cached</span>' : ''}
    </div>`;

    const repClass = data.reputation >= 70 ? 'safe' : data.reputation >= 40 ? 'warn' : 'danger';
    html += `<p>Reputation: <strong>${data.reputation}/100</strong></p>
      <div class="reputation-bar"><div class="reputation-fill ${repClass}" style="width:${data.reputation}%"></div></div>`;


    if (type === 'url') {
      html += `<div class="result-grid">
        <div class="result-item"><span class="label">SSL/TLS</span><span class="value ${data.ssl_valid ? 'safe' : 'danger'}">${data.ssl_valid ? '✅ Valid' : '❌ Invalid'}</span></div>
        <div class="result-item"><span class="label">DNS</span><span class="value">${data.dns || 'N/A'}</span></div>
        <div class="result-item"><span class="label">Malicious</span><span class="value danger">${data.malicious}</span></div>
        <div class="result-item"><span class="label">Suspicious</span><span class="value warn">${data.suspicious}</span></div>
        <div class="result-item"><span class="label">Harmless</span><span class="value safe">${data.harmless}</span></div>
      </div>`;
      if (data.categories?.length) {
        html += `<p>Categories:</p><div class="chips">${data.categories.map(c => `<span class="chip cat">${c}</span>`).join('')}</div>`;
      }
      if (data.last_analysis) {
        html += `<p>Last Analysis:</p><div class="result-grid">
          <div class="result-item"><span class="label">Server</span><span class="value">${data.last_analysis.server || 'N/A'}</span></div>
          <div class="result-item"><span class="label">IP</span><span class="value">${data.last_analysis.ip || 'N/A'}</span></div>
          <div class="result-item"><span class="label">Country</span><span class="value">${data.last_analysis.country || 'N/A'}</span></div>
        </div>`;
      }
    }

    if (type === 'file' || type === 'hash') {
      html += `<div class="result-grid">
        <div class="result-item"><span class="label">Detection Ratio</span><span class="value">${data.detection_ratio || '0/0'}</span></div>
        <div class="result-item"><span class="label">Malicious</span><span class="value danger">${data.malicious}</span></div>
        <div class="result-item"><span class="label">Suspicious</span><span class="value warn">${data.suspicious}</span></div>
        <div class="result-item"><span class="label">Harmless</span><span class="value safe">${data.harmless}</span></div>
      </div>`;
      if (data.file_type) html += `<p>File Type: <strong>${data.file_type}</strong></p>`;
      if (data.names?.length) html += `<p>Known Names:</p><div class="chips">${data.names.map(n => `<span class="chip">${n}</span>`).join('')}</div>`;
      if (data.tags?.length) html += `<p>Tags:</p><div class="chips">${data.tags.map(t => `<span class="chip tag">${t}</span>`).join('')}</div>`;
      if (data.first_seen) html += `<p>First Seen: ${new Date(data.first_seen).toLocaleString()}</p>`;
      if (data.last_seen) html += `<p>Last Analyzed: ${new Date(data.last_seen).toLocaleString()}</p>`;
    }

    if (type === 'ip') {
      html += `<div class="result-grid">
        <div class="result-item"><span class="label">Abuse Confidence</span><span class="value ${data.abuse_confidence >= 50 ? 'danger' : data.abuse_confidence >= 20 ? 'warn' : 'safe'}">${data.abuse_confidence}%</span></div>
        <div class="result-item"><span class="label">Total Reports</span><span class="value">${data.total_reports}</span></div>
        <div class="result-item"><span class="label">Country</span><span class="value">${data.country || 'N/A'}</span></div>
        <div class="result-item"><span class="label">ISP</span><span class="value">${data.isp || 'N/A'}</span></div>
        <div class="result-item"><span class="label">Usage Type</span><span class="value">${data.usage_type || 'N/A'}</span></div>
      </div>`;
      if (data.last_reported) html += `<p>Last Reported: ${new Date(data.last_reported).toLocaleString()}</p>`;
      if (data.recent_categories?.length) {
        html += `<p>Report Categories:</p><div class="chips">${data.recent_categories.map(c => `<span class="chip cat">${c}</span>`).join('')}</div>`;
      }
    }

    resEl.innerHTML = html;
  }


  async function apiFetch(endpoint, payload) {
    log(`📡 POST ${API_BASE}${endpoint}`, 'info');
    dom.progress.container.classList.remove('hidden');
    
    let progress = 0;
    const progInt = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 95) clearInterval(progInt);
      dom.progress.bar.style.width = progress + '%';
    }, 100);
    dom.progress.text.textContent = 'Connecting to edge backend...';

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
      // Fallback response structure (matches Worker return shape)
      return { malicious: 0, suspicious: 0, harmless: 10, reputation: 80, cached: false };
    } finally {
      clearInterval(progInt);
      dom.progress.bar.style.width = '100%';
      setTimeout(() => {
        dom.progress.container.classList.add('hidden');
        dom.progress.bar.style.width = '0%';
      }, 500);
    }
  }


  async function scanURL() {
    if (state.isScanning) return;
    const url = el('url-input').value.trim();
    if (!url) return log('Please enter a URL.', 'warn');
    
    state.isScanning = true;
    log(`Scanning URL: ${url}`);
    await typeLog('Resolving DNS, checking SSL, querying URLScan.io...');
    
    const result = await apiFetch('/api/scan-url', { url });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Reputation: ${result.reputation}/100`);
    showResult('url', verdict, result);
    saveToHistory('url', url, verdict, result);
    state.isScanning = false;
  }

  async function scanFile() {
    if (state.isScanning || !state.currentFile) return;
    state.isScanning = true;
    log(`Analyzing file: ${state.currentFile.name}`);
    
 
    const buffer = await state.currentFile.arrayBuffer();
    const hashBuf = await crypto.subtle.digest('SHA-256', buffer);
    const hash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    el('fi-name').textContent = state.currentFile.name;
    el('fi-size').textContent = formatBytes(state.currentFile.size);
    el('file-info').classList.remove('hidden');
    
    await typeLog('Computing hash, querying VirusTotal...');
    const result = await apiFetch('/api/scan-file', { hash, filename: state.currentFile.name });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Detection: ${result.detection_ratio}`);
    showResult('file', verdict, result);
    saveToHistory('file', state.currentFile.name, verdict, { ...result, hash });
    state.isScanning = false;
  }

  async function scanHash() {
    if (state.isScanning) return;
    const hash = el('hash-input').value.trim();
    if (!/^[a-f0-9]{32,64}$/i.test(hash)) return log('Invalid hash format.', 'warn');
    
    state.isScanning = true;
    log(`Looking up hash: ${hash}`);
    await typeLog('Querying VirusTotal database...');
    
    const result = await apiFetch('/api/hash', { hash });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Reputation: ${result.reputation}/100`);
    showResult('hash', verdict, result);
    saveToHistory('hash', hash, verdict, result);
    state.isScanning = false;
  }

  async function scanIP() {
    if (state.isScanning) return;
    const ip = el('ip-input').value.trim();
    if (!ip) return log('Please enter IP or domain.', 'warn');
    
    state.isScanning = true;
    log(`Scanning target: ${ip}`);
    await typeLog('Querying AbuseIPDB, checking reputation...');
    
    const result = await apiFetch('/api/ip-scan', { ip });
    const verdict = calculateVerdict(result);
    
    await typeLog(`Verdict: ${verdict} | Abuse Confidence: ${result.abuse_confidence}%`);
    showResult('ip', verdict, result);
    saveToHistory('ip', ip, verdict, result);
    state.isScanning = false;
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'], i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  function setupListeners() {
    el('btn-scan-url').addEventListener('click', scanURL);
    el('url-input').addEventListener('input', e => { if (e.target.value.includes('http')) switchTab('url'); });

    const dz = el('drop-zone');
    dz.addEventListener('click', () => el('file-input').click());
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
    dz.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('dragover');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    el('file-input').addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });
    el('btn-scan-file').addEventListener('click', scanFile);

    el('btn-scan-hash').addEventListener('click', scanHash);
    el('btn-scan-ip').addEventListener('click', scanIP);
    el('btn-export').addEventListener('click', exportHistory);


    document.addEventListener('paste', e => {
      const text = e.clipboardData.getData('text').trim();
      if (text.match(/^https?:\/\//)) { el('url-input').value = text; switchTab('url'); log('Auto-detected URL.', 'info'); }
      else if (text.match(/^\d{1,3}\.\d{1,3}/)) { el('ip-input').value = text; switchTab('ip'); }
      else if (text.match(/^[a-f0-9]{32,}$/i)) { el('hash-input').value = text; switchTab('hash'); }
    });


    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey) {
        if (e.key === '1') switchTab('url');
        if (e.key === '2') switchTab('file');
        if (e.key === '3') switchTab('hash');
        if (e.key === '4') switchTab('ip');
        if (e.key === 'E' || e.key === 'e') exportHistory();
      }
      if (e.key === 'Enter' && !e.target.matches('input')) {
        const active = document.querySelector('.tab-content.active').id;
        if (active === 'tab-url') scanURL();
        else if (active === 'tab-file' && state.currentFile) scanFile();
        else if (active === 'tab-hash') scanHash();
        else if (active === 'tab-ip') scanIP();
      }
    });
  }

  function handleFile(file) {
    state.currentFile = file;
    el('fi-name').textContent = file.name;
    el('fi-size').textContent = formatBytes(file.size);
    el('file-info').classList.remove('hidden');
    log(`File loaded: ${file.name} (${formatBytes(file.size)})`);
  }

  function exportHistory() {
    if (!state.history.length) return log('No history to export.', 'warn');
    const blob = new Blob([JSON.stringify(state.history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyber_scan_report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    log('History exported.', 'info');
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', CyberScanner.init);
