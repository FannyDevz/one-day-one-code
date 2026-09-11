// app.js — UI, drag-and-drop, localStorage, renderers

// ─────────────────────────────────────────────
// MOBILE PANEL SWITCHER
// ─────────────────────────────────────────────
function isMobile() { return window.innerWidth <= 768; }

function switchMobilePanel(name) {
  if (!isMobile()) return;
  const panelMap = { palette:'panel-palette', program:'panel-program', simulation:'panel-simulation' };
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('mobile-active'));
  document.querySelectorAll('.mpanel-btn').forEach(b => b.classList.remove('active'));
  const panelEl = document.querySelector('.' + panelMap[name]);
  const tabEl   = document.getElementById('mpanel-' + name);
  if (panelEl) panelEl.classList.add('mobile-active');
  if (tabEl)   tabEl.classList.add('active');
}

function initMobilePanel() {
  if (isMobile()) switchMobilePanel('program');
}

// ─────────────────────────────────────────────
// MOBILE PICKUP (tap-to-pick, tap-to-place)
// ─────────────────────────────────────────────
let mobilePickup = null; // { from:'palette'|'program', type?, id?, label? }

function setMobilePickup(pickup) {
  mobilePickup = pickup;
  const bar   = document.getElementById('mobile-pickup-bar');
  const label = document.getElementById('mobile-pickup-label');
  if (bar)   bar.classList.add('active');
  if (label) label.textContent = '🧩 ' + (pickup.label || pickup.type || 'Blok') + ' dipilih — ketuk zona hijau';
  document.querySelectorAll('.drop-gap').forEach(g => g.classList.add('pickup-target'));
}

function clearMobilePickup() {
  mobilePickup = null;
  const bar = document.getElementById('mobile-pickup-bar');
  if (bar) bar.classList.remove('active');
  document.querySelectorAll('.drop-gap').forEach(g => g.classList.remove('pickup-target'));
  document.querySelectorAll('.block-picked').forEach(b => b.classList.remove('block-picked'));
}

function applyMobilePickup(arrPath, idx) {
  const targetArr = resolveArr(arrPath);
  if (!targetArr) { clearMobilePickup(); return; }

  if (mobilePickup.from === 'palette') {
    const node = makeNode(mobilePickup.type);
    targetArr.splice(idx, 0, node);
  } else if (mobilePickup.from === 'program') {
    const node = findNode(mobilePickup.id, programBlocks);
    if (!node) { clearMobilePickup(); return; }
    const src = findParent(mobilePickup.id, programBlocks);
    let ins = idx;
    if (src && src.array === targetArr && src.index < idx) ins--;
    removeById(mobilePickup.id, programBlocks);
    const freshArr = resolveArr(arrPath);
    if (freshArr) freshArr.splice(Math.max(0, ins), 0, node);
  }

  clearMobilePickup();
  renderProgram();
}

// ─────────────────────────────────────────────
// CONSTANTS & STATE
// ─────────────────────────────────────────────
const LS_KEY = 'lab-coding-blok-v1';

let currentLevel    = null;
let currentChallIdx = 0;
let programBlocks   = [];
let activeArrPath   = 'main';   // path for click-to-add
let gameState       = null;
let interpreter     = null;
let running         = false;
let score           = 0;
let hintsUsed       = 0;
let completedChallenges = {};
let levelScores         = {};
let badges              = new Set();

// ─────────────────────────────────────────────
// LOCAL STORAGE
// ─────────────────────────────────────────────
function saveData() {
  const data = { score, completedChallenges, levelScores, badges: [...badges], savedAt: Date.now() };
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch(e){}
  flashSaveIndicator();
}

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    score               = d.score || 0;
    completedChallenges = d.completedChallenges || {};
    levelScores         = d.levelScores || {};
    badges              = new Set(d.badges || []);
  } catch(e){}
}

function resetData() {
  if (!confirm('Reset semua progress? Skor dan penyelesaian tantangan akan hilang.')) return;
  localStorage.removeItem(LS_KEY);
  score=0; completedChallenges={}; levelScores={}; badges=new Set();
  renderHome();
}

function flashSaveIndicator() {
  const el = document.getElementById('save-indicator');
  if (!el) return;
  el.style.display = 'inline-flex';
  el.innerHTML = '💾 Tersimpan';
  setTimeout(() => { el.style.display = 'none'; }, 1500);
}

// ─────────────────────────────────────────────
// SCREEN MANAGEMENT
// ─────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────
function renderHome() {
  const grid = document.getElementById('levels-grid');
  grid.innerHTML = '';

  LEVELS.forEach(lv => {
    const done   = lv.challenges.filter(c => completedChallenges[`${lv.id}-${c.id}`]).length;
    const total  = lv.challenges.length;
    const pct    = Math.round(done / total * 100);
    const stars  = Array.from({length:total}, (_,i) => i<done ? '★' : '☆').join('');
    const lscore = levelScores[lv.id] || 0;

    const card = document.createElement('div');
    card.className = 'level-card';
    card.innerHTML = `
      <div class="card-header" style="background:${lv.color}">
        <div class="card-emoji">${lv.emoji}</div>
        <div>
          <div class="level-num">Level ${lv.id}</div>
          <h3>${lv.title}</h3>
        </div>
      </div>
      <div class="card-body">
        <div class="concept-badge"><span>${lv.conceptDesc}</span></div>
        <p>${lv.description}</p>
        <div class="progress-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
      </div>
      <div class="card-footer">
        <span>${done}/${total} tantangan ${pct===100?'✅':''}</span>
        <span style="display:flex;gap:6px;align-items:center">
          <span class="card-stars" style="color:#FBBF24">${stars}</span>
          ${lscore?`<span style="font-size:11px;color:#6B7280">${lscore}pts</span>`:''}
        </span>
      </div>`;
    card.addEventListener('click', () => startLevel(lv.id - 1));
    grid.appendChild(card);
  });

  document.getElementById('total-score').textContent = score;
  document.getElementById('badge-count').textContent = badges.size;
}

// ─────────────────────────────────────────────
// LEVEL MANAGEMENT
// ─────────────────────────────────────────────
function startLevel(idx) {
  currentLevel    = LEVELS[idx];
  currentChallIdx = 0;
  score           = levelScores[currentLevel.id] || score;
  hintsUsed       = 0;
  showScreen('screen-game');
  renderGameHeader();
  renderChallengeTabs();
  loadChallenge(0);
}

function renderGameHeader() {
  const lv = currentLevel;
  document.getElementById('level-title').textContent   = `${lv.emoji} Level ${lv.id}: ${lv.title}`;
  document.getElementById('level-concept').textContent = `Konsep: ${lv.conceptDesc}`;
  updateStats();
}

function updateStats() {
  document.getElementById('score-display').textContent = score;
  document.getElementById('hint-display').textContent  = Math.max(0, 3 - hintsUsed);
}

function renderChallengeTabs() {
  const tabs = document.getElementById('challenge-tabs');
  tabs.innerHTML = '';
  currentLevel.challenges.forEach((ch, i) => {
    const btn = document.createElement('button');
    const done = completedChallenges[`${currentLevel.id}-${ch.id}`];
    btn.className = 'tab-btn' + (i === currentChallIdx ? ' active' : '') + (done ? ' done' : '');
    btn.textContent = ch.title;
    btn.addEventListener('click', () => { if (!running) loadChallenge(i); });
    tabs.appendChild(btn);
  });
}

function loadChallenge(idx) {
  if (running) stopRun();
  currentChallIdx = idx;
  programBlocks   = [];
  activeArrPath   = 'main';
  hintsUsed       = 0;

  renderChallengeTabs();
  const ch = currentLevel.challenges[idx];
  document.getElementById('mission-text').textContent = ch.mission;
  updateStats();

  gameState = createState(currentLevel.stateClass, ch.cfg);
  renderPalette();
  renderProgram();
  renderSimulation();
  initMobilePanel();
}

// ─────────────────────────────────────────────
// DRAG AND DROP SYSTEM
// ─────────────────────────────────────────────
let drag = { active:false, type:null, blockType:null, blockId:null };

/* Tree helpers */
function findNode(id, list) {
  list = list || programBlocks;
  for (const b of list) {
    if (b.id === id) return b;
    const f = findNode(id, b.children) || findNode(id, b.elseChildren);
    if (f) return f;
  }
  return null;
}

function findParent(id, list, path) {
  list = list || programBlocks; path = path || 'main';
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return { array:list, index:i, path };
    let r = findParent(id, list[i].children, list[i].id+'.children');
    if (r) return r;
    r = findParent(id, list[i].elseChildren, list[i].id+'.elseChildren');
    if (r) return r;
  }
  return null;
}

function resolveArr(path) {
  if (path === 'main') return programBlocks;
  const [id, prop] = path.split('.');
  const node = findNode(id);
  return node ? node[prop] : null;
}

function removeById(id, list) {
  list = list || programBlocks;
  const i = list.findIndex(b => b.id === id);
  if (i !== -1) { list.splice(i, 1); return true; }
  return list.some(b => removeById(id, b.children) || removeById(id, b.elseChildren));
}

/* Drag event handlers */
function onPaletteDragStart(e, type) {
  drag = { active:true, type:'palette', blockType:type };
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/plain', 'palette:' + type);
}

function onBlockDragStart(e, id) {
  drag = { active:true, type:'program', blockId:id };
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', 'block:' + id);
  setTimeout(() => { const el = document.querySelector(`[data-bid="${id}"]`); if(el) el.classList.add('block-dragging'); }, 0);
  e.stopPropagation();
}

function onGapDragOver(e, gap) {
  if (!drag.active) return;
  e.preventDefault(); e.stopPropagation();
  document.querySelectorAll('.drop-gap.over').forEach(g => { if (g!==gap) g.classList.remove('over'); });
  gap.classList.add('over');
}

function onGapDrop(e, arrPath, idx) {
  e.preventDefault(); e.stopPropagation();
  document.querySelectorAll('.drop-gap.over').forEach(g => g.classList.remove('over'));
  document.querySelectorAll('.block-dragging').forEach(el => el.classList.remove('block-dragging'));

  const targetArr = resolveArr(arrPath);
  if (!targetArr) { drag={active:false}; return; }

  if (drag.type === 'palette') {
    const node = makeNode(drag.blockType);
    targetArr.splice(idx, 0, node);
  } else if (drag.type === 'program') {
    const node = findNode(drag.blockId);
    if (!node) { drag={active:false}; return; }
    const src = findParent(drag.blockId);
    if (!src)  { drag={active:false}; return; }
    let ins = idx;
    if (src.array === targetArr && src.index < idx) ins--;
    removeById(drag.blockId);
    const freshArr = resolveArr(arrPath);
    if (freshArr) freshArr.splice(Math.max(0,ins), 0, node);
  }

  drag = { active:false };
  renderProgram();
}

function onDragEnd() {
  document.querySelectorAll('.block-dragging').forEach(el => el.classList.remove('block-dragging'));
  document.querySelectorAll('.drop-gap.over').forEach(g => g.classList.remove('over'));
  drag = { active:false };
}

/* Gap element factory */
function makeGap(arrPath, idx) {
  const g = document.createElement('div');
  g.className = 'drop-gap';
  g.addEventListener('dragover',  e => onGapDragOver(e, g));
  g.addEventListener('dragleave', e => { e.stopPropagation(); g.classList.remove('over'); });
  g.addEventListener('drop',      e => onGapDrop(e, arrPath, idx));
  g.addEventListener('click',     e => {
    e.stopPropagation();
    if (isMobile() && mobilePickup) { applyMobilePickup(arrPath, idx); return; }
    activeArrPath = arrPath;
    renderProgram();
  });
  return g;
}

/* Create block node (with auto-condition for single-option jika) */
function makeNode(type) {
  const node = new BlockNode(type);
  const ch   = currentLevel.challenges[currentChallIdx];
  if (type === 'jika' && ch.kondisiOptions && ch.kondisiOptions.length === 1) {
    node.params.kondisi = ch.kondisiOptions[0].value;
  }
  return node;
}

// ─────────────────────────────────────────────
// PALETTE
// ─────────────────────────────────────────────
function renderPalette() {
  const palette = document.getElementById('palette-blocks');
  palette.innerHTML = '';
  currentLevel.availableBlocks.forEach(type => {
    const def = BLOCK_TYPES[type];
    if (!def) return;
    const el = document.createElement('div');
    el.className = 'palette-block';
    el.draggable  = true;
    el.style.cssText = `background:${def.bg};color:${def.color};border-color:${def.color}`;
    el.innerHTML = `<span class="palette-icon">${def.icon}</span><span>${def.label}</span>`;
    el.title = `Klik atau seret untuk menambahkan blok "${def.label}"`;
    el.addEventListener('click',      () => addBlockClick(type));
    el.addEventListener('dragstart',  e  => onPaletteDragStart(e, type));
    el.addEventListener('dragend',    onDragEnd);
    palette.appendChild(el);
  });
}

function addBlockClick(type) {
  if (isMobile()) {
    clearMobilePickup();
    const def = BLOCK_TYPES[type];
    setMobilePickup({ from: 'palette', type, label: def ? def.label : type });
    switchMobilePanel('program');
    return;
  }
  const arr  = resolveArr(activeArrPath) || programBlocks;
  const node = makeNode(type);
  arr.push(node);
  renderProgram();
}

// ─────────────────────────────────────────────
// PROGRAM RENDERING
// ─────────────────────────────────────────────
function renderProgram() {
  renderProgramList(programBlocks, 'main', document.getElementById('user-blocks'));
  // highlight active array path indicator
  document.querySelectorAll('.drop-gap').forEach(g => g.classList.remove('gap-active'));
}

function renderProgramList(list, arrPath, container) {
  container.innerHTML = '';
  container.appendChild(makeGap(arrPath, 0));
  list.forEach((node, i) => {
    container.appendChild(makeBlockEl(node, arrPath));
    container.appendChild(makeGap(arrPath, i + 1));
  });
}

function makeBlockEl(node, arrPath) {
  const def = BLOCK_TYPES[node.type];
  if (!def) return document.createElement('div');
  if (def.isContainer) return makeContainerEl(node, arrPath, def);

  const el = document.createElement('div');
  el.className  = 'prog-block';
  el.draggable  = true;
  el.dataset.bid = node.id;
  el.style.cssText = `background:${def.bg};color:${def.color};border-color:${def.color}88`;

  let html = `<span class="drag-handle" title="Seret untuk memindahkan">⠿⠿</span>
              <span class="prog-block-icon">${def.icon}</span>
              <span class="prog-block-label">${def.label}</span>`;

  if (def.param === 'detik') {
    html += `<input class="prog-block-param" type="number" min="1" max="120"
              value="${node.params.detik||def.paramDefault||5}" data-p="detik" title="Detik">
             <span style="font-size:11px">dtk</span>`;
  }

  html += `<button class="prog-block-del" title="Hapus blok ini">×</button>`;
  el.innerHTML = html;

  el.addEventListener('dragstart', e => onBlockDragStart(e, node.id));
  el.addEventListener('dragend',   onDragEnd);
  el.addEventListener('click', e => {
    if (!isMobile() || e.target.closest('.prog-block-del,.prog-block-param')) return;
    e.stopPropagation();
    if (mobilePickup && mobilePickup.id === node.id) { clearMobilePickup(); return; }
    clearMobilePickup();
    const def2 = BLOCK_TYPES[node.type];
    setMobilePickup({ from: 'program', id: node.id, label: def2 ? def2.label : node.type });
    el.classList.add('block-picked');
  });

  const pEl = el.querySelector('.prog-block-param');
  if (pEl) {
    pEl.addEventListener('change',    () => { node.params[pEl.dataset.p] = parseInt(pEl.value)||1; });
    pEl.addEventListener('mousedown', e  => e.stopPropagation());
    pEl.addEventListener('click',     e  => e.stopPropagation());
  }
  el.querySelector('.prog-block-del').addEventListener('click', e => {
    e.stopPropagation(); clearMobilePickup(); removeById(node.id, programBlocks); renderProgram();
  });

  return el;
}

function makeContainerEl(node, arrPath, def) {
  const outer = document.createElement('div');
  outer.className  = 'prog-container';
  outer.draggable  = true;
  outer.dataset.bid = node.id;
  outer.style.borderColor = def.color;

  // Header
  const hdr = document.createElement('div');
  hdr.className = 'prog-container-header';
  hdr.style.cssText = `background:${def.bg};color:${def.color}`;

  let hh = `<span class="drag-handle">⠿⠿</span>
             <span style="font-size:16px">${def.icon}</span>
             <span style="flex:1;font-weight:700">${def.label}</span>`;

  if (def.param === 'n') {
    hh += `<input class="prog-block-param" type="number" min="1" max="99"
             value="${node.params.n||def.paramDefault||3}" data-p="n" title="Jumlah ulang">
            <span style="font-size:12px">kali</span>`;
  }
  if (def.param === 'kondisi') {
    const ch   = currentLevel.challenges[currentChallIdx];
    const opts = (ch.kondisiOptions||[]).map(o =>
      `<option value="${o.value}" ${node.params.kondisi===o.value?'selected':''}>${o.label}</option>`
    ).join('') || '<option value="">— pilih kondisi —</option>';
    hh += `<select class="prog-block-param-select" data-p="kondisi" style="max-width:130px">${opts}</select>`;
  }
  hh += `<button class="prog-block-del">×</button>`;
  hdr.innerHTML = hh;

  const pEl = hdr.querySelector('[data-p]');
  if (pEl) {
    pEl.addEventListener('change',    () => { node.params[pEl.dataset.p] = pEl.dataset.p==='n' ? parseInt(pEl.value)||1 : pEl.value; });
    pEl.addEventListener('mousedown', e  => e.stopPropagation());
    pEl.addEventListener('click',     e  => e.stopPropagation());
  }
  hdr.querySelector('.prog-block-del').addEventListener('click', e => {
    e.stopPropagation(); clearMobilePickup(); removeById(node.id, programBlocks); renderProgram();
  });
  outer.addEventListener('dragstart', e => onBlockDragStart(e, node.id));
  outer.addEventListener('dragend',   onDragEnd);
  hdr.addEventListener('click', e => {
    if (!isMobile() || e.target.closest('.prog-block-del,[data-p]')) return;
    e.stopPropagation();
    if (mobilePickup && mobilePickup.id === node.id) { clearMobilePickup(); return; }
    clearMobilePickup();
    setMobilePickup({ from: 'program', id: node.id, label: def.label });
    outer.classList.add('block-picked');
  });
  outer.appendChild(hdr);

  // "JIKA YA" or loop body
  const body = document.createElement('div');
  body.className = 'prog-container-body';
  if (def.hasElse) {
    const lab = document.createElement('div');
    lab.className = 'prog-else-label';
    lab.style.color = def.color;
    lab.textContent = 'JIKA YA:';
    body.appendChild(lab);
  }
  const bodyList = document.createElement('div');
  renderProgramList(node.children, node.id+'.children', bodyList);
  body.appendChild(bodyList);
  outer.appendChild(body);

  // "JIKA TIDAK"
  if (def.hasElse) {
    const elseBody = document.createElement('div');
    elseBody.className = 'prog-container-body';
    const lab = document.createElement('div');
    lab.className = 'prog-else-label'; lab.style.color = def.color;
    lab.textContent = 'JIKA TIDAK:';
    elseBody.appendChild(lab);
    const elseList = document.createElement('div');
    renderProgramList(node.elseChildren, node.id+'.elseChildren', elseList);
    elseBody.appendChild(elseList);
    outer.appendChild(elseBody);
  }

  const footer = document.createElement('div');
  footer.className = 'prog-container-footer';
  footer.style.cssText = `background:${def.bg};color:${def.color}99`;
  footer.textContent   = `Akhir ${def.label}`;
  outer.appendChild(footer);

  return outer;
}

// ─────────────────────────────────────────────
// SIMULATION RENDERERS
// ─────────────────────────────────────────────
const canvas  = document.getElementById('game-canvas');
const ctx     = canvas.getContext('2d');
const domSim  = document.getElementById('dom-sim');

function renderSimulation(state) {
  const lv = currentLevel;
  const ch = lv.challenges[currentChallIdx];

  if (lv.stateClass === 'GridState') {
    canvas.parentElement.classList.remove('hidden');
    domSim.classList.remove('active'); domSim.innerHTML = '';
    drawGrid(ch.cfg, state);
  } else {
    canvas.parentElement.classList.add('hidden');
    domSim.classList.add('active');
    if (lv.stateClass === 'CashierState')  renderCashierSim(state, ch.cfg);
    if (lv.stateClass === 'TrafficState')  renderTrafficSim(state, ch.cfg);
    if (lv.stateClass === 'ChatbotState')  renderChatbotSim(state, ch.cfg);
  }
}

// ── Grid canvas ──────────────────────────────
function drawGrid(cfg, state) {
  const CELL = 50;
  const W = cfg.cols * CELL, H = cfg.rows * CELL;
  canvas.width = W; canvas.height = H;

  ctx.fillStyle = '#F1F5F9'; ctx.fillRect(0, 0, W, H);

  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      const x = c*CELL, y = r*CELL;
      ctx.strokeStyle = '#CBD5E1'; ctx.lineWidth = 1;
      ctx.strokeRect(x, y, CELL, CELL);

      if ((cfg.walls||[]).some(w=>w[0]===c&&w[1]===r)) {
        ctx.fillStyle = '#374151'; ctx.fillRect(x+1,y+1,CELL-2,CELL-2);
        ctx.font='22px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('#', x+CELL/2, y+CELL/2);
        continue;
      }

      const picked = state ? state.picked : new Set();
      const isTree = (cfg.trees||[]).some(t=>t[0]===c&&t[1]===r);
      if (isTree) {
        const isPicked = picked&&picked.has(`${c},${r}`);
        ctx.fillStyle = isPicked ? '#D1FAE5' : '#ECFDF5';
        ctx.fillRect(x+1,y+1,CELL-2,CELL-2);
        ctx.font='24px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(isPicked?'🌿':'🌳', x+CELL/2, y+CELL/2);
      }
    }
  }

  if (cfg.goal) {
    const [gc,gr] = cfg.goal;
    ctx.fillStyle='#FEF3C7'; ctx.fillRect(gc*CELL+1,gr*CELL+1,CELL-2,CELL-2);
    ctx.font='24px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🏪', gc*CELL+CELL/2, gr*CELL+CELL/2);
  }

  const pos = state ? state.pos : {x:cfg.start[0],y:cfg.start[1]};
  const dir = state ? state.dir : (cfg.startDir||0);
  const px  = pos.x*CELL+CELL/2, py = pos.y*CELL+CELL/2;
  ctx.font='28px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('🧑', px, py-3);
  const arr=['→','↑','←','↓'][dir];
  ctx.font='bold 11px sans-serif'; ctx.fillStyle='#3B82F6';
  ctx.fillText(arr, px+14, py-14);

  if (state && cfg.trees) {
    ctx.fillStyle='#1F2937'; ctx.font='bold 12px sans-serif';
    ctx.textAlign='left'; ctx.textBaseline='top';
    ctx.fillText(`🧺 ${state.basket}/${cfg.trees.length}`, 6, 6);
  }

  if (state && state.error)   { ctx.fillStyle='rgba(239,68,68,.12)'; ctx.fillRect(0,0,W,H); }
  if (state && state.success) { ctx.fillStyle='rgba(16,185,129,.12)'; ctx.fillRect(0,0,W,H); }
}

// ── Cashier DOM ───────────────────────────────
function renderCashierSim(st, cfg) {
  const harga = cfg.harga, bayar = cfg.bayar, stok = cfg.stok;
  let resultHtml = '<div class="receipt-result" style="background:#F3F4F6;color:#6B7280">⏳ Menunggu program...</div>';

  if (st) {
    if (st.result) {
      if (st.result.type==='kembalian')
        resultHtml = `<div class="receipt-result result-kembalian">💰 Kembalian: Rp ${st.result.amount.toLocaleString('id-ID')}</div>`;
      else if (st.result.type==='kurang')
        resultHtml = `<div class="receipt-result result-kurang">🙏 Kurang: Rp ${st.result.amount.toLocaleString('id-ID')}</div>`;
      else if (st.result.type==='stok-habis')
        resultHtml = `<div class="receipt-result result-stok-habis">🚫 Stok Habis!</div>`;
    } else if (st.bayar===st.harga && st.finished) {
      resultHtml = `<div class="receipt-result result-pas">✅ Bayar Pas!</div>`;
    }
  }

  domSim.innerHTML = `
    <div class="cashier-receipt">
      <div class="receipt-title">🏪 Warung Sari</div>
      <div class="receipt-row"><span>Harga Barang</span><span>Rp ${harga.toLocaleString('id-ID')}</span></div>
      <div class="receipt-row"><span>Pembayaran</span><span>Rp ${bayar.toLocaleString('id-ID')}</span></div>
      <div class="receipt-row"><span>Stok</span><span>${stok>0?stok+' pcs':'❌ Habis'}</span></div>
      <hr class="receipt-divider">
      ${resultHtml}
    </div>`;
}

// ── Traffic Sim DOM ───────────────────────────
function renderTrafficSim(st, cfg) {
  const light     = st ? st.light      : null;
  const seq       = st ? st.sequence   : [];
  const carsClear = st ? st.carsClear  : 0;
  const cycle     = st ? st.foreverCycle : -1;

  const isRed    = light === 'merah';
  const isYellow = light === 'kuning';
  const isGreen  = light === 'hijau';

  // Sequence dots (show last 12 to avoid overflow)
  const recentSeq = seq.slice(-12);
  const dots = recentSeq.map(s => {
    const c = typeof s === 'object' ? s.color : s;
    const t = typeof s === 'object' ? `${s.secs}s` : c;
    return `<div class="seq-dot ${c}" title="${t}"></div>`;
  }).join('');

  // Cars: menunggu saat merah/kuning, bergerak saat hijau
  const totalCars = 4;
  const remaining = Math.max(0, totalCars - carsClear);
  const carHtml = () => {
    let h = '';
    for (let i = 0; i < Math.min(remaining, 4); i++) {
      const delay = (i * 0.12).toFixed(2);
      h += `<span class="${isGreen ? 'car-go' : 'car-wait'}" style="animation-delay:${delay}s">🚗</span>`;
    }
    return h;
  };

  // Scene background reacts to light
  const sceneBg    = light ? {merah:'#FEF2F2',kuning:'#FFFBEB',hijau:'#F0FDF4'}[light] : '#F9FAFB';
  const lightLabel = light ? {merah:'🔴 MERAH — Berhenti',kuning:'🟡 KUNING — Siap',hijau:'🟢 HIJAU — Jalan!'}[light] : '⏸ Menunggu program...';

  // Ambulance: aktif saat cycle === ambulanceCycle
  const ambulanceActive = cfg.hasAmbulance && (cycle === (cfg.ambulanceCycle != null ? cfg.ambulanceCycle : 0));

  // Sensor
  const sensorHtml = (cfg.sensorPadat != null)
    ? `<div class="traf-badge ${cfg.sensorPadat ? 'badge-warn' : 'badge-ok'}">
         ${cfg.sensorPadat ? '🚗🚗🚗 Sensor: PADAT' : '✅ Sensor: Lancar'}
       </div>` : '';

  domSim.innerHTML = `
    <div class="traf-wrap">

      ${ambulanceActive ? `<div class="traf-ambulance">🚑 AMBULANS! — Prioritas Darurat</div>` : ''}

      <div class="traf-scene" style="background:${sceneBg}">

        <!-- Mobil dari kiri menunggu -->
        <div class="traf-cars traf-cars-left">
          ${carHtml()}
          <span class="traf-arrow">→</span>
        </div>

        <!-- Tiang lampu lalu lintas -->
        <div class="traf-pole-wrap">
          <div class="traf-pole-head">
            <div class="traf-bulb ${isRed    ? 'bulb-merah'  : 'bulb-off'}"></div>
            <div class="traf-bulb ${isYellow ? 'bulb-kuning' : 'bulb-off'}"></div>
            <div class="traf-bulb ${isGreen  ? 'bulb-hijau'  : 'bulb-off'}"></div>
          </div>
          <div class="traf-pole-stick"></div>
          <div class="traf-pole-base"></div>
        </div>

        <!-- Mobil dari kanan -->
        <div class="traf-cars traf-cars-right">
          <span class="traf-arrow" style="transform:scaleX(-1)">→</span>
          ${isGreen && carsClear > 0 ? `<span class="car-passed">🚗 +${carsClear}</span>` : ''}
        </div>

      </div>

      <!-- Label status lampu -->
      <div class="traf-status-label" style="background:${sceneBg}">
        ${lightLabel}
      </div>

      <!-- Info row -->
      <div class="traf-info-row">
        ${sensorHtml}
        <div class="traf-badge">
          <div class="traf-badge-title">Urutan Lampu</div>
          <div class="seq-wrap">${dots || '<span style="color:#9CA3AF;font-size:11px">Belum ada</span>'}</div>
        </div>
        ${cycle >= 0 ? `<div class="traf-badge">🔄 Putaran <strong>${cycle + 1}</strong></div>` : ''}
        ${carsClear ? `<div class="traf-badge">🚗 <strong>${carsClear}</strong> mobil lewat</div>` : ''}
      </div>

    </div>`;
}

// ── Chatbot V2 DOM ────────────────────────────
function renderChatbotSim(st, cfg) {
  const req = cfg.required || [];
  const sc  = cfg.scenario  || {};
  const msgs = st ? st.msgs : (sc.customerIntro ? [{from:'customer',text:sc.customerIntro}] : []);

  const checkLabel = {
    salam:'Sambut pelanggan', menu:'Tampilkan menu', harga:'Info harga',
    stok:'Info stok', pesanan:'Terima pesanan', 'terima-kasih':'Ucapan terima kasih',
    konfirmasi:'Konfirmasi pesanan', diskon:'Diskon diterapkan',
    total:'Total ditampilkan', pembayaran:'Pembayaran diproses'
  };
  const map = st ? {
    salam:st.hasGreeted, menu:st.hasMenu, harga:st.hasHarga, stok:st.hasStok,
    pesanan:st.hasPesanan, 'terima-kasih':st.hasTerima, konfirmasi:st.msgs.some(m=>m.text&&m.text.includes('dikonfirmasi')),
    diskon:st.hasDiskon, total:st.hasTotal, pembayaran:st.hasPayment
  } : {};

  const bubbles = msgs.map(m => {
    const isBt = m.from === 'bot';
    return `<div class="chat-bubble ${isBt?'bot':'customer'}">
      <span class="bubble-avatar">${isBt?'🤖':'👤'}</span>
      <div class="bubble-text">${(m.text||'').replace(/\n/g,'<br>').replace(/</g,'&lt;').replace(/&lt;br>/g,'<br>').replace(/&lt;/g,'<').replace(/<br>/g,'<br>')}</div>
    </div>`;
  }).join('');

  // Actually let me fix the escaping:
  const safeBubbles = msgs.map(m => {
    const isBt = m.from === 'bot';
    const safeText = (m.text||'').replace(/</g,'&lt;').replace(/\n/g,'<br>');
    return `<div class="chat-bubble ${isBt?'bot':'customer'}">
      <span class="bubble-avatar">${isBt?'🤖':'👤'}</span>
      <div class="bubble-text">${safeText}</div>
    </div>`;
  }).join('');

  const checklist = req.map(r => {
    const done = map[r] || false;
    return `<div class="check-item">
      <span class="check-icon">${done?'✅':'⬜'}</span>
      <span style="${done?'color:#059669;font-weight:600':''}">${checkLabel[r]||r}</span>
    </div>`;
  }).join('');

  // Order summary for advanced challenges
  let orderHtml = '';
  if (st && st.orderTotal > 0) {
    const items = (sc.orderItems||[]);
    const rows  = items.map(it=>`<div class="order-row"><span>${it.name} ×${it.qty}</span><span>Rp ${(it.price*it.qty).toLocaleString('id-ID')}</span></div>`).join('');
    const discountRow = st.hasDiskon ? `<div class="order-row order-discount"><span>Diskon 10%</span><span>−Rp ${Math.round(items.reduce((s,i)=>s+i.price*i.qty,0)*0.1).toLocaleString('id-ID')}</span></div>` : '';
    orderHtml = `<div class="order-summary">
      <div style="font-weight:700;margin-bottom:4px;font-size:12px">🛒 Pesanan</div>
      ${rows}${discountRow}
      <div class="order-row order-total"><span>Total</span><span>Rp ${st.orderTotal.toLocaleString('id-ID')}</span></div>
    </div>`;
  }

  domSim.innerHTML = `
    <div class="chatbot-v2">
      <div class="chatbot-top-bar">
        <span class="bot-avatar">🤖</span>
        <div>
          <div>Asisten Bu Dewi</div>
          <div class="bot-status">● Online</div>
        </div>
      </div>
      <div class="chatbot-body" id="chat-msgs">
        ${safeBubbles||'<div style="color:#9CA3AF;font-size:13px;padding:8px">Chatbot menunggu program dijalankan...</div>'}
      </div>
      ${orderHtml}
      <div class="chatbot-checklist">
        <div class="checklist-title">Checklist Fitur</div>
        ${checklist}
      </div>
    </div>`;

  setTimeout(() => { const el = document.getElementById('chat-msgs'); if(el) el.scrollTop=el.scrollHeight; }, 50);
}

// ─────────────────────────────────────────────
// RUN / STOP
// ─────────────────────────────────────────────
async function runProgram() {
  if (running) return;
  if (programBlocks.length === 0) { addLog('⚠️ Program kosong! Tambahkan blok dulu.', 'error'); switchMobilePanel('program'); return; }

  running = true;
  clearLog();
  document.getElementById('btn-run').disabled = true;
  gameState.reset();
  switchMobilePanel('simulation');

  gameState.onRender = (st) => {
    if (currentLevel.stateClass === 'GridState')   drawGrid(currentLevel.challenges[currentChallIdx].cfg, st);
    if (currentLevel.stateClass === 'CashierState') renderCashierSim(st, currentLevel.challenges[currentChallIdx].cfg);
    if (currentLevel.stateClass === 'TrafficState') renderTrafficSim(st, currentLevel.challenges[currentChallIdx].cfg);
    if (currentLevel.stateClass === 'ChatbotState') renderChatbotSim(st, currentLevel.challenges[currentChallIdx].cfg);
  };

  interpreter = new Interpreter(programBlocks, gameState, msg => addLog(msg));

  try { await interpreter.run(); } catch(e) { addLog('❌ Error: '+e.message,'error'); }

  running = false;
  document.getElementById('btn-run').disabled = false;

  const st = gameState;
  if (st.finished) {
    setTimeout(() => showResult(st), 500);
  } else {
    addLog('⚠️ Program selesai. Pastikan ada blok Berhenti di akhir!', 'error');
  }
}

function stopRun() {
  if (interpreter) interpreter.stop();
  running = false;
  document.getElementById('btn-run').disabled = false;
}

// ─────────────────────────────────────────────
// RESULTS & BADGES
// ─────────────────────────────────────────────
function showResult(st) {
  const lv  = currentLevel;
  const ch  = lv.challenges[currentChallIdx];
  const key = `${lv.id}-${ch.id}`;

  if (st.success) {
    const firstTime = !completedChallenges[key];
    const bonus     = Math.max(0, 30 - hintsUsed * 10);
    const earned    = firstTime ? 70 + bonus : 20; // bonus only first time
    score += earned;
    levelScores[lv.id] = (levelScores[lv.id] || 0) + (firstTime ? earned : 0);
    completedChallenges[key] = true;

    // Award badges
    checkBadges(lv, ch);
    saveData();
    renderChallengeTabs();
    renderHome();

    document.getElementById('result-icon').textContent    = '🎉';
    document.getElementById('result-title').textContent   = firstTime ? 'Berhasil! 🌟' : 'Berhasil Lagi!';
    document.getElementById('result-message').textContent = `${ch.title} selesai!${firstTime?' Skor pertama: +'+earned+' poin':''}`;
    document.getElementById('result-score').textContent   = `Total skor: ${score}`;
    const allDone = lv.challenges.every(c => completedChallenges[`${lv.id}-${c.id}`]);
    document.getElementById('btn-next').style.display       = currentChallIdx < lv.challenges.length-1 ? 'flex' : 'none';
    document.getElementById('btn-reflection').style.display = allDone ? 'flex' : 'none';
  } else {
    document.getElementById('result-icon').textContent    = '😅';
    document.getElementById('result-title').textContent   = 'Hampir Berhasil!';
    document.getElementById('result-message').textContent = st.error || 'Cek program kamu dan coba lagi!';
    document.getElementById('result-score').textContent   = '';
    document.getElementById('btn-next').style.display       = 'none';
    document.getElementById('btn-reflection').style.display = 'none';
  }

  document.getElementById('modal-result').classList.add('open');
  updateStats();
}

function checkBadges(lv, ch) {
  const key = `${lv.id}-${ch.id}`;
  if (lv.id===1 && ch.id==='1A' && hintsUsed===0) badges.add('penjelajah-pertama');
  if (lv.id===2 && hintsUsed===0) badges.add('master-loop');
  if (lv.id===3 && hintsUsed===0) badges.add('pemikir-logis');
  if (lv.id===4) badges.add('tim-sinkron');
  if (lv.id===5 && ch.id==='5D') badges.add('kreator-kode');
  const allDone = LEVELS.every(l => l.challenges.every(c => completedChallenges[`${l.id}-${c.id}`]));
  if (allDone) badges.add('master-logika');
}

// ─────────────────────────────────────────────
// HINT SYSTEM
// ─────────────────────────────────────────────
function showHint() {
  const ch    = currentLevel.challenges[currentChallIdx];
  const hints = ch.hints || [];
  const idx   = Math.min(hintsUsed, hints.length-1);
  if (!hints.length) return;
  document.getElementById('hint-content').textContent = hints[idx] || 'Tidak ada petunjuk lagi.';
  document.getElementById('hint-level').textContent   = `ke-${idx+1}`;
  document.getElementById('modal-hint').classList.add('open');
  if (hintsUsed < hints.length) hintsUsed++;
  updateStats();
}

// ─────────────────────────────────────────────
// LOG
// ─────────────────────────────────────────────
function addLog(msg, cls) {
  const log  = document.getElementById('log-content');
  const line = document.createElement('div');
  line.className  = 'log-line' + (cls?' '+cls:'');
  line.textContent = msg;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}
function clearLog() { document.getElementById('log-content').innerHTML = ''; }

// ─────────────────────────────────────────────
// EVENT WIRING
// ─────────────────────────────────────────────
document.getElementById('btn-back').addEventListener('click', () => { stopRun(); showScreen('screen-home'); });
document.getElementById('btn-run').addEventListener('click', runProgram);
document.getElementById('btn-reset').addEventListener('click', () => {
  stopRun(); gameState.reset(); renderSimulation(); clearLog(); switchMobilePanel('simulation');
});
document.getElementById('btn-hint').addEventListener('click', showHint);
document.getElementById('btn-clear').addEventListener('click', () => {
  programBlocks=[]; activeArrPath='main'; renderProgram();
  gameState.reset(); renderSimulation(); clearLog(); switchMobilePanel('program');
});

// Program area dragover (allow drop onto the area itself)
document.getElementById('program-scroll').addEventListener('dragover', e => {
  if (drag.active) { e.preventDefault(); e.stopPropagation(); }
});

// Modal: result
document.getElementById('btn-retry').addEventListener('click', () => {
  document.getElementById('modal-result').classList.remove('open');
  gameState.reset(); renderSimulation(); clearLog();
  switchMobilePanel('program');
});
document.getElementById('btn-next').addEventListener('click', () => {
  document.getElementById('modal-result').classList.remove('open');
  loadChallenge(currentChallIdx+1);
});
document.getElementById('btn-home').addEventListener('click', () => {
  document.getElementById('modal-result').classList.remove('open');
  stopRun(); showScreen('screen-home');
});
document.getElementById('btn-reflection').addEventListener('click', () => {
  document.getElementById('modal-result').classList.remove('open');
  document.getElementById('modal-reflection').classList.add('open');
});

// Modal: hint
document.getElementById('btn-close-hint').addEventListener('click', () => {
  document.getElementById('modal-hint').classList.remove('open');
});

// Splash screen
document.getElementById('btn-splash-start').addEventListener('click', () => {
  renderHome();
  showScreen('screen-home');
});
document.getElementById('btn-splash-goals').addEventListener('click', () => {
  document.getElementById('modal-goals').classList.add('open');
});
document.getElementById('btn-splash-author').addEventListener('click', () => {
  document.getElementById('modal-author').classList.add('open');
});
document.getElementById('btn-close-goals').addEventListener('click', () => {
  document.getElementById('modal-goals').classList.remove('open');
});
document.getElementById('btn-close-author').addEventListener('click', () => {
  document.getElementById('modal-author').classList.remove('open');
});
document.getElementById('btn-to-splash').addEventListener('click', () => {
  showScreen('screen-splash');
});

// Modal: reflection
document.getElementById('btn-save-reflection').addEventListener('click', () => {
  const r1 = document.getElementById('reflection-1').value.trim();
  const r2 = document.getElementById('reflection-2').value.trim();
  if (r1 || r2) {
    const reflections = JSON.parse(localStorage.getItem(LS_KEY+'_reflections')||'{}');
    reflections[`level-${currentLevel.id}`] = { q1:r1, q2:r2, savedAt:new Date().toISOString() };
    localStorage.setItem(LS_KEY+'_reflections', JSON.stringify(reflections));
  }
  document.getElementById('modal-reflection').classList.remove('open');
  showScreen('screen-home');
  alert('📝 Jurnal refleksi tersimpan! Terima kasih sudah belajar hari ini. 🎉');
});

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => { if (e.target===modal) modal.classList.remove('open'); });
});

// Reset data button
document.getElementById('btn-reset-data').addEventListener('click', resetData);

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
loadData();
renderHome();
showScreen('screen-splash');
