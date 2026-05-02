/**
 * BHARAT DARSHAN — India Map Educational App
 * script.js
 * Interactive India map with Quiz, Highlight, Routes, Search, Zoom & Pan
 */

'use strict';

const STATE_DATA = {
  JK: {
    name: "Jammu & Kashmir",
    capital: "Srinagar (Summer) / Jammu (Winter)",
    area: "42,241 km²",
    population: "12.5 Million",
    language: "Kashmiri, Dogri, Urdu",
    region: "North India",
    type: "ut",
    coastal: false,
    neighbors: ["HP", "LA", "PB"],
    famous: ["Dal Lake", "Houseboats", "Pashmina Shawls", "Gulmarg Skiing", "Mughal Gardens"],
    emoji: "🏔️",
    regionGroup: "north"
  },
  LA: {
    name: "Ladakh",
    capital: "Leh",
    area: "59,146 km²",
    population: "0.27 Million",
    language: "Ladakhi, Hindi",
    region: "North India (UT)",
    type: "ut",
    coastal: false,
    neighbors: ["JK", "HP"],
    famous: ["Pangong Lake", "Leh Palace", "Monasteries", "Khardung La Pass", "Nubra Valley"],
    emoji: "🏔️",
    regionGroup: "north"
  },
  HP: {
    name: "Himachal Pradesh",
    capital: "Shimla",
    area: "55,673 km²",
    population: "7.4 Million",
    language: "Hindi, Pahari",
    region: "North India",
    type: "state",
    coastal: false,
    neighbors: ["JK", "LA", "PB", "HR", "UK"],
    famous: ["Shimla Hill Station", "Manali", "Spiti Valley", "Apple Orchards", "Rohtang Pass"],
    emoji: "🍎",
    regionGroup: "north"
  },
  PB: {
    name: "Punjab",
    capital: "Chandigarh",
    area: "50,362 km²",
    population: "30.1 Million",
    language: "Punjabi",
    region: "North India",
    type: "state",
    coastal: false,
    neighbors: ["JK", "HP", "HR", "RJ"],
    famous: ["Golden Temple Amritsar", "Bhangra Dance", "Wheat Fields", "Wagah Border", "Langar"],
    emoji: "🌾",
    regionGroup: "north"
  },
  HR: {
    name: "Haryana",
    capital: "Chandigarh",
    area: "44,212 km²",
    population: "28.2 Million",
    language: "Hindi, Haryanvi",
    region: "North India",
    type: "state",
    coastal: false,
    neighbors: ["PB", "HP", "UK", "UP", "RJ", "DL"],
    famous: ["Kurukshetra Battlefield", "Wrestling", "Milk & Dairy", "Auto Industry", "Surajkund Fair"],
    emoji: "🥛",
    regionGroup: "north"
  },
  UK: {
    name: "Uttarakhand",
    capital: "Dehradun",
    area: "53,483 km²",
    population: "11.3 Million",
    language: "Hindi, Garhwali, Kumaoni",
    region: "North India",
    type: "state",
    coastal: false,
    neighbors: ["HP", "UP"],
    famous: ["Char Dham Pilgrimage", "Jim Corbett National Park", "Haridwar Ganga Aarti", "Mussoorie", "Valley of Flowers"],
    emoji: "🙏",
    regionGroup: "north"
  },
  DL: {
    name: "Delhi",
    capital: "New Delhi",
    area: "1,484 km²",
    population: "32.9 Million",
    language: "Hindi, Punjabi, Urdu",
    region: "North India (UT)",
    type: "ut",
    coastal: false,
    neighbors: ["HR", "UP"],
    famous: ["India Gate", "Red Fort", "Qutub Minar", "Chandni Chowk", "Lotus Temple"],
    emoji: "🏛️",
    regionGroup: "north"
  },
  UP: {
    name: "Uttar Pradesh",
    capital: "Lucknow",
    area: "240,928 km²",
    population: "241 Million",
    language: "Hindi, Urdu",
    region: "North India",
    type: "state",
    coastal: false,
    neighbors: ["UK", "HP", "HR", "DL", "RJ", "MP", "CG", "JH", "BR"],
    famous: ["Taj Mahal Agra", "Varanasi Ghats", "Mathura & Vrindavan", "Lucknow Biryani", "Allahabad Kumbh Mela"],
    emoji: "🕌",
    regionGroup: "north"
  },
  RJ: {
    name: "Rajasthan",
    capital: "Jaipur",
    area: "342,239 km²",
    population: "81.0 Million",
    language: "Hindi, Rajasthani",
    region: "West India",
    type: "state",
    coastal: false,
    neighbors: ["PB", "HR", "UP", "MP", "GJ"],
    famous: ["Jaipur Pink City", "Thar Desert", "Mehrangarh Fort", "Pushkar Camel Fair", "Jaisalmer Sand Dunes"],
    emoji: "🏜️",
    regionGroup: "west"
  },
  GJ: {
    name: "Gujarat",
    capital: "Gandhinagar",
    area: "196,024 km²",
    population: "63.9 Million",
    language: "Gujarati",
    region: "West India",
    type: "state",
    coastal: true,
    neighbors: ["RJ", "MP", "MH", "DD", "DN"],
    famous: ["Statue of Unity", "Rann of Kutch", "Gir Lion Sanctuary", "Ahmedabad Textiles", "Garba Dance"],
    emoji: "🦁",
    regionGroup: "west"
  },
  MH: {
    name: "Maharashtra",
    capital: "Mumbai",
    area: "307,713 km²",
    population: "125 Million",
    language: "Marathi",
    region: "West India",
    type: "state",
    coastal: true,
    neighbors: ["GJ", "MP", "CG", "AP", "KA", "GA", "DN", "DD"],
    famous: ["Mumbai — Financial Capital", "Bollywood", "Ajanta & Ellora Caves", "Gateway of India", "Lonavala Hill Station"],
    emoji: "🎬",
    regionGroup: "west"
  },
  MP: {
    name: "Madhya Pradesh",
    capital: "Bhopal",
    area: "308,252 km²",
    population: "85.1 Million",
    language: "Hindi",
    region: "Central India",
    type: "state",
    coastal: false,
    neighbors: ["RJ", "UP", "CG", "MH", "GJ"],
    famous: ["Khajuraho Temples", "Bandhavgarh Tiger Reserve", "Bhedaghat Marble Rocks", "Sanchi Stupa", "Panna Diamond Mines"],
    emoji: "🐯",
    regionGroup: "central"
  },
  CG: {
    name: "Chhattisgarh",
    capital: "Raipur",
    area: "135,192 km²",
    population: "32.2 Million",
    language: "Hindi, Chhattisgarhi",
    region: "Central India",
    type: "state",
    coastal: false,
    neighbors: ["MP", "MH", "AP", "TS", "OD", "JH", "UP"],
    famous: ["Chitrakote Waterfalls", "Bastar Tribal Culture", "Steel City Bhilai", "Dandakaranya Forest", "Sirpur Ruins"],
    emoji: "🌿",
    regionGroup: "central"
  },
  JH: {
    name: "Jharkhand",
    capital: "Ranchi",
    area: "79,716 km²",
    population: "39.1 Million",
    language: "Hindi, Santali",
    region: "East India",
    type: "state",
    coastal: false,
    neighbors: ["BR", "WB", "OD", "CG", "UP"],
    famous: ["Hundru Falls", "Deoghar Baidyanath Temple", "Tribal Handicrafts", "Steel & Coal Mining", "Dalma Wildlife Sanctuary"],
    emoji: "⛏️",
    regionGroup: "east"
  },
  BR: {
    name: "Bihar",
    capital: "Patna",
    area: "94,163 km²",
    population: "128 Million",
    language: "Hindi, Maithili, Bhojpuri",
    region: "East India",
    type: "state",
    coastal: false,
    neighbors: ["UP", "JH", "WB", "SK"],
    famous: ["Bodh Gaya (Buddhism birthplace)", "Nalanda Ancient University", "Chhath Puja", "Patna Heritage", "Muzaffarpur Litchi"],
    emoji: "🪔",
    regionGroup: "east"
  },
  WB: {
    name: "West Bengal",
    capital: "Kolkata",
    area: "88,752 km²",
    population: "99.6 Million",
    language: "Bengali",
    region: "East India",
    type: "state",
    coastal: true,
    neighbors: ["SK", "BR", "JH", "OD", "AS"],
    famous: ["Kolkata — City of Joy", "Durga Puja Festival", "Darjeeling Tea", "Sundarbans Delta", "Rabindranath Tagore"],
    emoji: "🎭",
    regionGroup: "east"
  },
  OD: {
    name: "Odisha",
    capital: "Bhubaneswar",
    area: "155,707 km²",
    population: "46.9 Million",
    language: "Odia",
    region: "East India",
    type: "state",
    coastal: true,
    neighbors: ["WB", "JH", "CG", "AP"],
    famous: ["Puri Jagannath Temple", "Konark Sun Temple", "Chilika Lake", "Odissi Dance", "Tribal Handicrafts"],
    emoji: "🌊",
    regionGroup: "east"
  },
  AP: {
    name: "Andhra Pradesh",
    capital: "Amaravati",
    area: "162,975 km²",
    population: "54.0 Million",
    language: "Telugu",
    region: "South India",
    type: "state",
    coastal: true,
    neighbors: ["OD", "CG", "TS", "KA", "TN"],
    famous: ["Tirupati Temple", "Vijayawada Kanaka Durga", "Kuchipudi Dance", "Spicy Andhra Cuisine", "Araku Valley Coffee"],
    emoji: "🙏",
    regionGroup: "south"
  },
  TS: {
    name: "Telangana",
    capital: "Hyderabad",
    area: "112,077 km²",
    population: "38.5 Million",
    language: "Telugu, Urdu",
    region: "South India",
    type: "state",
    coastal: false,
    neighbors: ["MH", "CG", "OD", "AP", "KA"],
    famous: ["Charminar Hyderabad", "Biryani Capital", "Golconda Fort", "Ramoji Film City", "Warangal Fort"],
    emoji: "🍚",
    regionGroup: "south"
  },
  KA: {
    name: "Karnataka",
    capital: "Bengaluru",
    area: "191,791 km²",
    population: "67.5 Million",
    language: "Kannada",
    region: "South India",
    type: "state",
    coastal: true,
    neighbors: ["MH", "TS", "AP", "TN", "KL", "GA"],
    famous: ["IT Capital Bengaluru", "Mysore Palace", "Hampi Ruins", "Coorg Coffee", "Jog Falls"],
    emoji: "💻",
    regionGroup: "south"
  },
  KL: {
    name: "Kerala",
    capital: "Thiruvananthapuram",
    area: "38,852 km²",
    population: "35.7 Million",
    language: "Malayalam",
    region: "South India",
    type: "state",
    coastal: true,
    neighbors: ["KA", "TN"],
    famous: ["Backwaters Houseboat", "Ayurveda Healing", "Kathakali Dance", "Munnar Tea Gardens", "100% Literacy"],
    emoji: "🌴",
    regionGroup: "south"
  },
  TN: {
    name: "Tamil Nadu",
    capital: "Chennai",
    area: "130,058 km²",
    population: "78.8 Million",
    language: "Tamil",
    region: "South India",
    type: "state",
    coastal: true,
    neighbors: ["AP", "KA", "KL"],
    famous: ["Ancient Dravidian Temples", "Bharatanatyam Dance", "Chennai Marina Beach", "Ooty Hill Station", "Idli & Dosa"],
    emoji: "🏛️",
    regionGroup: "south"
  },
  AS: {
    name: "Assam",
    capital: "Dispur",
    area: "78,438 km²",
    population: "35.6 Million",
    language: "Assamese, Bengali",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["AR", "NL", "MN", "MZ", "TR", "ML", "WB", "SK"],
    famous: ["Kaziranga Rhinos", "Assam Tea", "Brahmaputra River", "Bihu Dance", "Majuli Island"],
    emoji: "🦏",
    regionGroup: "northeast"
  },
  AR: {
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    area: "83,743 km²",
    population: "1.6 Million",
    language: "Nyishi, Adi, Bengali",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["AS", "NL"],
    famous: ["Land of Rising Sun", "Tawang Monastery", "Namdapha National Park", "Ziro Music Festival", "Tribal Cultures"],
    emoji: "🌅",
    regionGroup: "northeast"
  },
  ML: {
    name: "Meghalaya",
    capital: "Shillong",
    area: "22,429 km²",
    population: "3.7 Million",
    language: "Khasi, Garo",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["AS"],
    famous: ["Living Root Bridges", "Cherrapunji (Wettest Place)", "Elephant Falls", "Shillong Music Scene", "Matrilineal Society"],
    emoji: "🌧️",
    regionGroup: "northeast"
  },
  NL: {
    name: "Nagaland",
    capital: "Kohima",
    area: "16,579 km²",
    population: "2.2 Million",
    language: "Nagamese, English",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["AR", "AS", "MN"],
    famous: ["Hornbill Festival", "Kohima War Cemetery", "Tribal Warrior Culture", "Naga Cuisine", "Dzukou Valley"],
    emoji: "🦅",
    regionGroup: "northeast"
  },
  MN: {
    name: "Manipur",
    capital: "Imphal",
    area: "22,327 km²",
    population: "3.2 Million",
    language: "Meitei, English",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["NL", "AS", "MZ"],
    famous: ["Loktak Lake Floating Islands", "Manipuri Classical Dance", "Polo Sport Origin", "Kangla Fort", "Ima Keithel Women's Market"],
    emoji: "💃",
    regionGroup: "northeast"
  },
  MZ: {
    name: "Mizoram",
    capital: "Aizawl",
    area: "21,081 km²",
    population: "1.2 Million",
    language: "Mizo, English",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["MN", "AS", "TR"],
    famous: ["Blue Mountains Phawngpui", "Bamboo Industry", "Cheraw Bamboo Dance", "Vantawng Falls", "Highest Literacy NE"],
    emoji: "🎋",
    regionGroup: "northeast"
  },
  TR: {
    name: "Tripura",
    capital: "Agartala",
    area: "10,486 km²",
    population: "4.2 Million",
    language: "Kokborok, Bengali",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["MZ", "AS", "ML"],
    famous: ["Ujjayanta Palace", "Neermahal Water Palace", "Tripura Sundari Temple", "Bamboo Handicrafts", "Wildlife Sanctuaries"],
    emoji: "🏯",
    regionGroup: "northeast"
  },
  SK: {
    name: "Sikkim",
    capital: "Gangtok",
    area: "7,096 km²",
    population: "0.7 Million",
    language: "Nepali, Sikkimese",
    region: "Northeast India",
    type: "state",
    coastal: false,
    neighbors: ["WB", "BR", "AS"],
    famous: ["Kangchenjunga (3rd Highest Peak)", "Rumtek Monastery", "Teesta River Rafting", "Organic Farming State", "Yumthang Valley Flowers"],
    emoji: "🏔️",
    regionGroup: "northeast"
  },
  GA: {
    name: "Goa",
    capital: "Panaji",
    area: "3,702 km²",
    population: "1.6 Million",
    language: "Konkani, English",
    region: "West India",
    type: "state",
    coastal: true,
    neighbors: ["MH", "KA"],
    famous: ["Beaches & Nightlife", "Portuguese Architecture", "Carnival Festival", "Cashew Feni Drink", "Water Sports"],
    emoji: "🏖️",
    regionGroup: "west"
  },
  CH: {
    name: "Chandigarh",
    capital: "Chandigarh",
    area: "114 km²",
    population: "1.2 Million",
    language: "Hindi, Punjabi",
    region: "North India (UT)",
    type: "ut",
    coastal: false,
    neighbors: ["PB", "HR"],
    famous: ["Le Corbusier Architecture", "Rock Garden", "Rose Garden", "City Beautiful", "High Literacy Rate"],
    emoji: "🌹",
    regionGroup: "north"
  },
  PY: {
    name: "Puducherry",
    capital: "Puducherry",
    area: "479 km²",
    population: "1.7 Million",
    language: "Tamil, French",
    region: "South India (UT)",
    type: "ut",
    coastal: true,
    neighbors: ["TN", "KA"],
    famous: ["French Colonial Architecture", "Auroville", "Sri Aurobindo Ashram", "Promenade Beach", "French Cuisine"],
    emoji: "🥐",
    regionGroup: "south"
  },
  AN: {
    name: "Andaman & Nicobar Islands",
    capital: "Port Blair",
    area: "8,249 km²",
    population: "0.4 Million",
    language: "Hindi, Bengali",
    region: "Island Territory (UT)",
    type: "ut",
    coastal: true,
    neighbors: [],
    famous: ["Cellular Jail", "Radhanagar Beach", "Coral Reefs", "Scuba Diving", "Pristine Rainforests"],
    emoji: "🏝️",
    regionGroup: "south"
  },
  LD: {
    name: "Lakshadweep",
    capital: "Kavaratti",
    area: "32 km²",
    population: "0.07 Million",
    language: "Malayalam",
    region: "Island Territory (UT)",
    type: "ut",
    coastal: true,
    neighbors: [],
    famous: ["Coral Atolls", "Lagoon Snorkeling", "Coconut Trees", "Smallest UT by Area", "Marine National Park"],
    emoji: "🌊",
    regionGroup: "south"
  },
  DN: {
    name: "Dadra & Nagar Haveli and Daman & Diu",
    capital: "Daman",
    area: "603 km²",
    population: "0.6 Million",
    language: "Gujarati, Hindi",
    region: "West India (UT)",
    type: "ut",
    coastal: true,
    neighbors: ["GJ", "MH"],
    famous: ["Portuguese Fort Daman", "Tribal Culture", "Diu Beach", "Silvassa Nature Trails"],
    emoji: "🏰",
    regionGroup: "west"
  },
  DD: {
    name: "Daman & Diu (merged)",
    capital: "Daman",
    area: "112 km²",
    population: "0.24 Million",
    language: "Gujarati",
    region: "West India (UT)",
    type: "ut",
    coastal: true,
    neighbors: ["GJ"],
    famous: ["Diu Fort", "Naida Caves", "St. Paul's Church", "Ghoghla Beach"],
    emoji: "⛵",
    regionGroup: "west"
  }
};

const REGION_COLORS = {
  north:     '#3b82f6',
  south:     '#f97316',
  east:      '#22c55e',
  west:      '#eab308',
  central:   '#a855f7',
  northeast: '#ef4444'
};

const QUIZ_STATES = Object.keys(STATE_DATA).filter(k => ['JK','LA','HP','PB','HR','UK','DL','UP','RJ','GJ','MH','MP','CG','JH','BR','WB','OD','AP','TS','KA','KL','TN','AS','AR','ML','NL','MN','SK','GA'].includes(k));

let currentMode = 'explore';
let selectedState = null;
let isDarkMode = false;
let layers = { air: true, sea: true, land: true };
let zoom = 1;
let panX = 0, panY = 0;
let isPanning = false;
let startX = 0, startY = 0;


let quizActive = false;
let quizTarget = null;
let quizScore = 0;
let quizTotal = 0;
let quizUsed = [];

document.addEventListener('DOMContentLoaded', () => {
  initStates();
  initSearch();
  initZoomPan();
  initOriginalColors();
});

function initOriginalColors() {
  document.querySelectorAll('.state').forEach(el => {
    el.dataset.origFill = getComputedStyle(el).fill;
  });
}

function initStates() {
  document.querySelectorAll('.state').forEach(el => {
    const id = el.id;
    if (!STATE_DATA[id]) return;

    el.addEventListener('mouseenter', (e) => onStateHover(e, id));
    el.addEventListener('mouseleave', onStateLeave);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('click', (e) => onStateClick(e, id));
  });
}

let tooltip = document.getElementById('tooltip');
let tooltipText = document.getElementById('tooltipText');

function onStateHover(e, id) {
  if (quizActive) return;
  const data = STATE_DATA[id];
  if (!data) return;
  tooltipText.textContent = `${data.emoji} ${data.name}`;
  tooltip.classList.remove('hidden');
  positionTooltip(e);
}

function onStateLeave() {
  tooltip.classList.add('hidden');
}

function onMouseMove(e) {
  if (!tooltip.classList.contains('hidden')) {
    positionTooltip(e);
  }
}

function positionTooltip(e) {
  const rect = document.getElementById('mapArea').getBoundingClientRect();
  let x = e.clientX - rect.left + 12;
  let y = e.clientY - rect.top - 30;
  if (x + 180 > rect.width) x -= 200;
  if (y < 0) y = 10;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function onStateClick(e, id) {
  e.stopPropagation();
  if (quizActive) {
    handleQuizClick(id);
    return;
  }
  if (currentMode === 'explore') {
    selectState(id);
  }
}

function selectState(id) {
  if (selectedState) {
    const prev = document.getElementById(selectedState);
    if (prev) prev.classList.remove('selected');
  }
  if (selectedState === id) {
    selectedState = null;
    showWelcomePanel();
    return;
  }
  selectedState = id;
  const el = document.getElementById(id);
  if (el) el.classList.add('selected');
  showStateInfo(id);
}

function showStateInfo(id) {
  const data = STATE_DATA[id];
  if (!data) return;

  document.getElementById('welcomePanel').classList.add('hidden');
  const panel = document.getElementById('statePanel');
  panel.classList.remove('hidden');

  document.getElementById('stateEmoji').textContent = data.emoji;
  document.getElementById('stateName').textContent = data.name;
  document.getElementById('stateCapital').textContent = data.capital;
  document.getElementById('stateArea').textContent = data.area;
  document.getElementById('statePop').textContent = data.population;
  document.getElementById('stateLang').textContent = data.language;
  document.getElementById('stateRegion').textContent = data.region;


  const nbWrap = document.getElementById('stateNeighbors');
  nbWrap.innerHTML = '';
  if (data.neighbors.length === 0) {
    nbWrap.innerHTML = '<span class="neighbor-tag">No land neighbors</span>';
  } else {
    data.neighbors.forEach(nb => {
      const nbData = STATE_DATA[nb];
      if (!nbData) return;
      const tag = document.createElement('span');
      tag.className = 'neighbor-tag';
      tag.textContent = nbData.name;
      tag.onclick = () => selectState(nb);
      nbWrap.appendChild(tag);
    });
  }


  const fmWrap = document.getElementById('stateFamous');
  fmWrap.innerHTML = '';
  data.famous.forEach(f => {
    const tag = document.createElement('span');
    tag.className = 'famous-tag';
    tag.textContent = f;
    fmWrap.appendChild(tag);
  });
}

function showWelcomePanel() {
  document.getElementById('welcomePanel').classList.remove('hidden');
  document.getElementById('statePanel').classList.add('hidden');
}

function closePanelInfo() {
  if (selectedState) {
    const el = document.getElementById(selectedState);
    if (el) el.classList.remove('selected');
    selectedState = null;
  }
  showWelcomePanel();
}

function setMode(mode) {
  if (quizActive && mode !== 'quiz') endQuiz();
  currentMode = mode;


  document.querySelectorAll('.mode-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.mode === mode);
  });


  if (mode !== 'highlight') clearHighlight();

  if (mode === 'quiz') {
    startQuiz();
  } else if (mode === 'highlight') {
  }
}


function toggleLayer(layer) {
  layers[layer] = !layers[layer];
  const groups = { air: 'airRoutesGroup', sea: 'seaRoutesGroup', land: 'landBordersGroup' };
  const el = document.getElementById(groups[layer]);
  if (el) el.style.display = layers[layer] ? '' : 'none';
}

function highlightByRegion(region) {
  setMode('highlight');
  document.querySelectorAll('.state').forEach(el => {
    const data = STATE_DATA[el.id];
    if (!data) { el.classList.add('dimmed'); return; }
    if (data.regionGroup === region) {
      el.classList.remove('dimmed');
      el.classList.add('highlighted');
      el.style.fill = REGION_COLORS[region] || '';
    } else {
      el.classList.add('dimmed');
      el.classList.remove('highlighted');
    }
  });
}

function highlightByType(type) {
  setMode('highlight');
  document.querySelectorAll('.state').forEach(el => {
    const data = STATE_DATA[el.id];
    if (!data) { el.classList.add('dimmed'); return; }
    let match = false;
    if (type === 'coastal') match = data.coastal;
    if (type === 'landlocked') match = !data.coastal;
    if (match) {
      el.classList.remove('dimmed');
      el.classList.add('highlighted');
      el.style.fill = type === 'coastal' ? '#06b6d4' : '#a78bfa';
    } else {
      el.classList.add('dimmed');
      el.classList.remove('highlighted');
    }
  });
}

function clearHighlight() {
  document.querySelectorAll('.state').forEach(el => {
    el.classList.remove('dimmed', 'highlighted');
    el.style.fill = '';
  });
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    if (!q) { dropdown.classList.add('hidden'); return; }

    const results = Object.entries(STATE_DATA).filter(([, d]) =>
      d.name.toLowerCase().includes(q) || d.capital.toLowerCase().includes(q)
    );

    if (results.length === 0) { dropdown.classList.add('hidden'); return; }

    results.slice(0, 8).forEach(([id, d]) => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `${d.emoji} <strong>${d.name}</strong> — ${d.capital}`;
      item.onclick = () => {
        input.value = '';
        dropdown.classList.add('hidden');
        setMode('explore');
        zoomToState(id);
        selectState(id);
      };
      dropdown.appendChild(item);
    });
    dropdown.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
      dropdown.classList.add('hidden');
    }
  });
}

function zoomToState(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('selected');
  setTimeout(() => el.classList.remove('selected'), 2000);
}

document.getElementById('darkModeBtn').addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  document.getElementById('darkModeBtn').textContent = isDarkMode ? '☀️' : '🌙';
});

function initZoomPan() {
  const container = document.getElementById('mapContainer');
  const area = document.getElementById('mapArea');


  area.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.15;
    setZoom(zoom * delta, e.clientX, e.clientY);
  }, { passive: false });


  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isPanning = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    container.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyTransform();
  });
  document.addEventListener('mouseup', () => {
    isPanning = false;
    container.style.cursor = 'grab';
  });


  let touches = [];
  let lastDist = 0;
  area.addEventListener('touchstart', (e) => {
    touches = Array.from(e.touches);
    if (touches.length === 1) {
      startX = touches[0].clientX - panX;
      startY = touches[0].clientY - panY;
    }
    if (touches.length === 2) {
      lastDist = Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY);
    }
  }, { passive: true });
  area.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const ts = Array.from(e.touches);
    if (ts.length === 1) {
      panX = ts[0].clientX - startX;
      panY = ts[0].clientY - startY;
      applyTransform();
    }
    if (ts.length === 2) {
      const dist = Math.hypot(ts[1].clientX - ts[0].clientX, ts[1].clientY - ts[0].clientY);
      setZoom(zoom * (dist / lastDist));
      lastDist = dist;
    }
  }, { passive: false });
}

function setZoom(newZoom, cx, cy) {
  const prev = zoom;
  zoom = Math.min(Math.max(newZoom, 0.6), 6);
  const ratio = zoom / prev;
  const area = document.getElementById('mapArea').getBoundingClientRect();
  const px = cx !== undefined ? cx - area.left : area.width / 2;
  const py = cy !== undefined ? cy - area.top : area.height / 2;
  panX = px - ratio * (px - panX);
  panY = py - ratio * (py - panY);
  applyTransform();
}

function applyTransform() {
  document.getElementById('mapContainer').style.transform =
    `translate(${panX}px, ${panY}px) scale(${zoom})`;
}

function zoomIn() { setZoom(zoom * 1.3); }
function zoomOut() { setZoom(zoom / 1.3); }
function zoomReset() {
  zoom = 1; panX = 0; panY = 0;
  applyTransform();
  clearHighlight();
  if (selectedState) {
    document.getElementById(selectedState)?.classList.remove('selected');
    selectedState = null;
    showWelcomePanel();
  }
}

function startQuiz() {
  quizActive = true;
  quizScore = 0;
  quizTotal = 0;
  quizUsed = [];
  clearHighlight();
  document.getElementById('quizOverlay').classList.remove('hidden');
  document.getElementById('quizScore').textContent = 'Score: 0/0';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  quizNextQuestion();
}

function quizNextQuestion() {
  document.querySelectorAll('.state.quiz-correct, .state.quiz-wrong').forEach(el => {
    el.classList.remove('quiz-correct', 'quiz-wrong');
    el.style.fill = '';
  });
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizFeedback').className = 'quiz-feedback';

  const remaining = QUIZ_STATES.filter(id => !quizUsed.includes(id));
  if (remaining.length === 0) {
    endQuiz(true);
    return;
  }
  quizTarget = remaining[Math.floor(Math.random() * remaining.length)];
  const data = STATE_DATA[quizTarget];
  document.getElementById('quizTarget').textContent = data ? data.name : quizTarget;

  const pct = (quizUsed.length / QUIZ_STATES.length) * 100;
  document.getElementById('quizProgress').style.width = pct + '%';
}

function handleQuizClick(id) {
  if (!quizTarget) return;
  const el = document.getElementById(id);
  quizTotal++;

  if (id === quizTarget) {
    quizScore++;
    if (el) { el.classList.add('quiz-correct'); el.style.fill = '#22c55e'; }
    const fb = document.getElementById('quizFeedback');
    fb.textContent = `✓ Correct! ${STATE_DATA[id]?.name}`;
    fb.className = 'quiz-feedback correct';
    quizUsed.push(quizTarget);
    quizTarget = null;
    document.getElementById('quizScore').textContent = `Score: ${quizScore}/${quizTotal}`;
    setTimeout(quizNextQuestion, 900);
  } else {
    if (el) { el.classList.add('quiz-wrong'); el.style.fill = '#ef4444'; }
    const fb = document.getElementById('quizFeedback');
    fb.textContent = `✗ That's ${STATE_DATA[id]?.name || id}. Try again!`;
    fb.className = 'quiz-feedback wrong';
    document.getElementById('quizScore').textContent = `Score: ${quizScore}/${quizTotal}`;
    setTimeout(() => {
      if (el) { el.classList.remove('quiz-wrong'); el.style.fill = ''; }
      document.getElementById('quizFeedback').textContent = '';
    }, 700);
  }
}

function endQuiz(completed = false) {
  quizActive = false;
  quizTarget = null;
  document.getElementById('quizOverlay').classList.add('hidden');
  document.querySelectorAll('.state.quiz-correct, .state.quiz-wrong').forEach(el => {
    el.classList.remove('quiz-correct', 'quiz-wrong');
    el.style.fill = '';
  });

  if (completed || quizTotal > 0) {
    const pct = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;
    const msg = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good job!' : '📚 Keep practicing!';
    alert(`Quiz Complete!\nScore: ${quizScore}/${quizTotal} (${pct}%)\n${msg}`);
  }

  setMode('explore');
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (quizActive) endQuiz();
    closePanelInfo();
    clearHighlight();
    document.getElementById('searchInput').blur();
  }
  if (e.key === '+' || e.key === '=') zoomIn();
  if (e.key === '-') zoomOut();
  if (e.key === '0') zoomReset();
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});

document.getElementById('indiaMap').addEventListener('click', (e) => {
  if (e.target === document.getElementById('indiaMap') || e.target.id === 'oceanBg') {
    if (!quizActive) {
      closePanelInfo();
    }
  }
});
