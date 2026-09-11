// app.js — Gim Literasi Kesehatan: Gizi Seimbang

const ZONES = ['pokok', 'lauk', 'sayur', 'buah'];

const ZONE_NAMES = {
  pokok: 'Makanan Pokok 🍚',
  sayur: 'Sayuran 🥬',
  lauk:  'Lauk-Pauk 🍗',
  buah:  'Buah-Buahan 🍌',
};

const $ = id => document.getElementById(id);
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');

// Angka gaya Indonesia: koma sebagai pemisah desimal, tanpa ",0" yang tak perlu
const fmtNum = v => Number(Number(v).toFixed(1)).toLocaleString('id-ID');

// Batang gizi digambar sampai 160% agar kelebihan asupan tetap terlihat,
// dengan penanda target di posisi 100%.
const BAR_MAX = 160;

// Saran per zat gizi — dipakai panel gizi maupun ringkasan hasil
const NUTRIENT_TIPS = {
  kal:     'Tambahkan makanan pokok seperti nasi atau singkong untuk menambah kalori.',
  protein: 'Proteinnya masih kurang. Coba tambahkan tempe, tahu, atau ikan.',
  karbo:   'Karbohidratnya masih kurang. Coba tambahkan nasi atau ubi jalar.',
  lemak:   'Lemaknya masih rendah. Coba tambahkan alpukat atau telur.',
  serat:   'Seratnya masih kurang. Coba tambahkan sayuran hijau atau buah segar.',
};

const NUTRIENT_TIPS_OVER = {
  kal:     'Kalorinya berlebih. Coba kurangi porsi makanan pokok.',
  protein: 'Proteinnya berlebih. Satu porsi lauk sudah cukup.',
  karbo:   'Karbohidratnya berlebih. Coba kurangi porsi nasi.',
  lemak:   'Lemaknya berlebih. Coba pilih lauk rebus atau kukus daripada goreng.',
  serat:   'Seratnya berlebih. Kurangi sedikit porsi sayur atau buah.',
};

// Status satu zat gizi terhadap targetnya
function nutrientStatus(val, tgt) {
  const pctRaw = tgt ? (val / tgt) * 100 : 0;
  const pct = Math.round(pctRaw);
  let cls = 'nt-good', text = '✅ Cukup', color = '#15803D';
  if      (pct < 40)  { cls = 'nt-vlow'; text = '❌ Sangat kurang';    color = '#B91C1C'; }
  else if (pct < 60)  { cls = 'nt-low';  text = '⚠️ Kurang';           color = '#B45309'; }
  else if (pct < 80)  { cls = 'nt-low';  text = '⚠️ Sedikit kurang';   color = '#B45309'; }
  else if (pct > 140) { cls = 'nt-high'; text = '🔺 Berlebih';         color = '#C2410C'; }
  else if (pct > 120) { cls = 'nt-low';  text = '⚠️ Sedikit berlebih'; color = '#B45309'; }

  const diff = tgt - val;
  let gap;
  if (Math.abs(diff) < 0.05) gap = 'pas dengan target';
  else if (diff > 0) gap = `kurang ${fmtNum(diff)}`;
  else gap = `lebih ${fmtNum(-diff)}`;

  return { pct, cls, text, color, gap, barWidth: Math.min(pct, BAR_MAX) / BAR_MAX * 100 };
}

// Bahan penyumbang terbesar untuk satu zat gizi di piring saat ini
function topContributor(key, unit) {
  const tally = {};
  Object.values(plateItems).flat().forEach(fid => {
    const f = FOODS[fid];
    if (f) tally[fid] = (tally[fid] || 0) + f[key];
  });
  const best = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  if (!best || best[1] <= 0) return null;
  return `${FOODS[best[0]].name} — ${fmtNum(best[1])} ${unit}`;
}

// ── State ──────────────────────────────────────
let score               = 0;
let completedChallenges = {};
let levelScores         = {};
let badges              = new Set();
let reflections         = {};   // levelIdx → { q1, q2 }
let usedFoods           = {};   // challengeId → [foodId]
let seenHowTo           = false;

let currentLevelIdx     = 0;
let currentChallengeIdx = 0;
let plateItems          = { pokok: [], lauk: [], sayur: [], buah: [] };

// ── Pintasan level/tantangan aktif ─────────────
function curLevel()     { return LEVELS[currentLevelIdx]; }
function curChallenge()  { return curLevel().challenges[currentChallengeIdx]; }
function targetOf(ch, lv) {
  return NUTRITION_TARGETS[ch.nutritionTarget || lv.nutritionTarget || 'default'];
}

// ── Modal helper ───────────────────────────────
function openModal(id)  { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }

function setupModalDismiss() {
  document.querySelectorAll('.modal-overlay[data-dismissable]').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-overlay[data-dismissable].open')
      .forEach(ov => ov.classList.remove('open'));
  });
}

// ── Mobile panel switcher ──────────────────────
function isMobile() { return window.innerWidth <= 768; }

function switchMobilePanel(name) {
  if (!isMobile()) return;
  const map = { rack: 'panel-rack', plate: 'panel-plate', nutri: 'panel-nutri' };
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('mobile-active'));
  document.querySelectorAll('.mpanel-btn').forEach(b => b.classList.remove('active'));
  const pel = $(map[name]);
  const bel = $('mpanel-' + name);
  if (pel) pel.classList.add('mobile-active');
  if (bel) bel.classList.add('active');
}

function updateMobileCount() {
  const el = $('mtab-count');
  if (!el) return;
  const total = Object.values(plateItems).flat().length;
  el.textContent = total;
  el.dataset.empty = total === 0 ? 'true' : 'false';
}

// ── Mobile food pickup ─────────────────────────
let mobilePickup = null;

function setMobilePickup(foodId) {
  mobilePickup = foodId;
  const f = FOODS[foodId];
  $('mobile-pickup-bar').classList.add('active');
  $('mobile-pickup-label').textContent =
    (f.emoji || '🍽️') + ' ' + f.name + ' — ketuk kartu piring';
  document.querySelectorAll('.zone-card').forEach(z => z.classList.add('pickup-target'));
  switchMobilePanel('plate');
}

function clearMobilePickup() {
  mobilePickup = null;
  const bar = $('mobile-pickup-bar');
  if (bar) bar.classList.remove('active');
  document.querySelectorAll('.zone-card').forEach(z => z.classList.remove('pickup-target'));
}

// ── Plate DnD listeners ────────────────────────
// Dipasang SEKALI saja: elemen zona bersifat statis, memasangnya ulang
// tiap tantangan akan menumpuk listener dan menggandakan penambahan makanan.
const dragOverCount = { pokok: 0, lauk: 0, sayur: 0, buah: 0 };
let dragFood = null;

function setupPlateListeners() {
  ZONES.forEach(zone => {
    const el = $('zone-' + zone);
    if (!el) return;

    el.addEventListener('dragenter', e => {
      e.preventDefault();
      dragOverCount[zone]++;
      const wrong = dragFood && FOODS[dragFood] && FOODS[dragFood].cat !== zone;
      el.classList.toggle('over', !wrong);
      el.classList.toggle('wrong', wrong);
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      const wrong = dragFood && FOODS[dragFood] && FOODS[dragFood].cat !== zone;
      e.dataTransfer.dropEffect = wrong ? 'none' : 'copy';
    });
    el.addEventListener('dragleave', () => {
      dragOverCount[zone]--;
      if (dragOverCount[zone] <= 0) {
        dragOverCount[zone] = 0;
        el.classList.remove('over', 'wrong');
      }
    });
    el.addEventListener('drop', e => {
      e.preventDefault();
      dragOverCount[zone] = 0;
      el.classList.remove('over', 'wrong');
      const fid = (e.dataTransfer.getData('text/plain') || '').trim() || dragFood;
      if (fid && FOODS[fid]) addToZone(fid, zone);
      dragFood = null;
    });
    el.addEventListener('click', () => {
      if (!mobilePickup) return;
      const placed = addToZone(mobilePickup, zone);
      if (placed) clearMobilePickup();
      // Jika salah zona, pickup tetap aktif agar peserta bisa mencoba zona benar.
    });
  });
}

function resetDragState() {
  dragFood = null;
  ZONES.forEach(zone => {
    dragOverCount[zone] = 0;
    const el = $('zone-' + zone);
    if (el) el.classList.remove('over', 'wrong', 'reject');
  });
}

// ── LocalStorage ───────────────────────────────
const LS_KEY = 'gim-gizi-v1';

function saveData() {
  const d = {
    score, completedChallenges, levelScores,
    badges: [...badges], reflections, usedFoods, seenHowTo,
    savedAt: Date.now(),
  };
  try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch (e) {}
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
    reflections         = d.reflections || {};
    usedFoods           = d.usedFoods || {};
    seenHowTo           = !!d.seenHowTo;
  } catch (e) {}
}

function doResetData() {
  localStorage.removeItem(LS_KEY);
  score = 0;
  completedChallenges = {};
  levelScores = {};
  badges = new Set();
  reflections = {};
  usedFoods = {};
  renderHome();
}

// ── Kunci level & tantangan ────────────────────
function isLevelUnlocked(li) {
  if (li === 0) return true;
  return LEVELS[li - 1].challenges.every(c => completedChallenges[c.id]);
}

function isChallengeUnlocked(li, ci) {
  if (ci === 0) return true;
  const chs = LEVELS[li].challenges;
  return !!completedChallenges[chs[ci - 1].id] || !!completedChallenges[chs[ci].id];
}

// Tantangan pertama yang belum selesai — dipakai tombol "Mulai Bermain"
function nextIncomplete() {
  for (let li = 0; li < LEVELS.length; li++) {
    if (!isLevelUnlocked(li)) break;
    const ci = LEVELS[li].challenges.findIndex(c => !completedChallenges[c.id]);
    if (ci !== -1) return { li, ci };
  }
  return null;
}

// ── Home ───────────────────────────────────────
function renderHome() {
  $('total-score').textContent = score;
  $('badge-count').textContent = badges.size;

  // Tombol lanjut — sebutkan tujuan berikutnya dengan jelas
  const next = nextIncomplete();
  if (next) {
    const lv = LEVELS[next.li];
    const ch = lv.challenges[next.ci];
    const started = Object.keys(completedChallenges).length > 0;
    $('cta-mascot').textContent = lv.storyIcon || lv.icon;
    $('cta-label').textContent  = started ? 'Lanjutkan petualanganmu' : 'Ayo mulai dari sini';
    $('cta-detail').textContent = `${lv.title} · ${ch.title}`;
    $('btn-continue').textContent = started ? '▶ Lanjutkan' : '▶ Ayo Main!';
  } else {
    $('cta-mascot').textContent = '🏆';
    $('cta-label').textContent  = 'Semua petualangan selesai!';
    $('cta-detail').textContent = 'Kamu sudah jadi Ahli Gizi Keluarga!';
    $('btn-continue').textContent = '▶ Main Lagi';
  }

  // Bintang keseluruhan: satu bintang per tantangan yang selesai
  const allCh   = LEVELS.reduce((s, lv) => s + lv.challenges.length, 0);
  const allDone = LEVELS.reduce(
    (s, lv) => s + lv.challenges.filter(c => completedChallenges[c.id]).length, 0);
  $('levels-progress-note').textContent = `⭐ ${allDone} dari ${allCh} bintang terkumpul`;

  const grid = $('levels-grid');
  grid.innerHTML = '';
  LEVELS.forEach((lv, li) => {
    const total  = lv.challenges.length;
    const done   = lv.challenges.filter(ch => completedChallenges[ch.id]).length;
    const locked = !isLevelUnlocked(li);
    const cleared = done === total;

    // Bintang: satu per tantangan — lebih mudah dibaca anak daripada bar persen
    const stars = lv.challenges
      .map(ch => `<span class="lc-star ${completedChallenges[ch.id] ? 'on' : ''}">${
        completedChallenges[ch.id] ? '⭐' : '☆'}</span>`)
      .join('');

    let playLabel;
    if (locked)       playLabel = '🔒 Belum terbuka';
    else if (cleared) playLabel = '🔁 Main Lagi';
    else if (done)    playLabel = '▶ Lanjutkan';
    else              playLabel = '▶ Ayo Main!';

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'level-card' + (locked ? ' locked' : '') + (cleared ? ' cleared' : '');
    card.style.setProperty('--lvl-color', lv.color);
    card.disabled = locked;
    card.innerHTML = `
      <div class="lc-top">
        <span class="lc-num">${lv.id}</span>
        <span class="lc-icon">${locked ? '🔒' : lv.icon}</span>
        ${cleared ? '<span class="lc-ribbon">✅ Selesai</span>' : ''}
      </div>
      <div class="lc-name">${lv.name}</div>
      <div class="lc-concept">${lv.concept}</div>
      <div class="lc-stars" aria-label="${done} dari ${total} tantangan selesai">${stars}</div>
      <div class="lc-status">
        <span>${done}/${total} tantangan</span>
        <span class="lc-points">${levelScores[li] || 0} poin</span>
      </div>
      ${locked
        ? `<div class="level-lock-msg">Selesaikan ${LEVELS[li - 1].title} dulu, ya!</div>`
        : `<div class="lc-story">${lv.story}</div>`}
      <span class="lc-play">${playLabel}</span>
    `;
    if (!locked) card.addEventListener('click', () => startChallenge(li, 0));
    grid.appendChild(card);
  });
}

function startChallenge(li, ci) {
  currentLevelIdx = li;
  currentChallengeIdx = ci;
  showGameScreen();
  loadChallenge();
}

// ── Screen switching ───────────────────────────
function showGameScreen() {
  $('screen-splash').style.display = 'none';
  $('screen-home').style.display = 'none';
  $('screen-game').style.display = 'flex';
}
function showHomeScreen() {
  $('screen-splash').style.display = 'none';
  $('screen-game').style.display = 'none';
  $('screen-home').style.display = 'flex';
  renderHome();
}

// ── Challenge loading ──────────────────────────
function loadChallenge() {
  const lv = curLevel();
  const ch = curChallenge();
  clearMobilePickup();
  resetDragState();

  $('game-level-badge').textContent      = lv.title;
  $('game-level-badge').style.background = lv.color;
  $('game-title').textContent            = lv.name;

  plateItems = { pokok: [], lauk: [], sayur: [], buah: [] };

  renderStepper();
  renderMission();
  renderFoodRack();
  renderAll();
  updateScoreDisplay();

  showNutriTip('💡 Pilih makanan dari daftar bahan, lalu taruh di bagian piring yang sesuai.');
  if (isMobile()) switchMobilePanel('rack');
}

function renderAll() {
  renderPlate();
  renderNutrition();
  renderRequirements();
  updateBudgetDisplay();
  updateMobileCount();
}

function updateScoreDisplay() {
  $('score-display').textContent = score;
}

// ── Penunjuk langkah ───────────────────────────
function renderStepper() {
  const lv = curLevel();
  const stepper = $('stepper');
  stepper.innerHTML = '';

  lv.challenges.forEach((c, i) => {
    const done     = !!completedChallenges[c.id];
    const active   = i === currentChallengeIdx;
    const unlocked = isChallengeUnlocked(currentLevelIdx, i);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'step' + (active ? ' active' : done ? ' done' : '') + (unlocked ? '' : ' locked');
    btn.disabled = !unlocked;
    btn.innerHTML = `
      <span class="step-num">${done && !active ? '✓' : i + 1}</span>
      <span class="step-label">${c.short || c.title}</span>
    `;
    if (unlocked && !active) {
      btn.addEventListener('click', () => { currentChallengeIdx = i; loadChallenge(); });
    }
    stepper.appendChild(btn);
  });

  const ch = curChallenge();
  $('challenge-caption').textContent =
    `Tantangan ${currentChallengeIdx + 1} dari ${lv.challenges.length} · ${ch.title}`;
}

// ── Misi + keterangan syarat ───────────────────
function renderMission() {
  const lv = curLevel();
  const ch = curChallenge();

  $('mission-character').textContent = ch.storyIcon || lv.storyIcon || lv.icon;
  $('mission-context').textContent   = ch.context || '';
  $('mission-text').innerHTML        = ch.mission;

  const chips = [];
  if (ch.requireAllZones) chips.push(['', '🍽️ Isi keempat bagian piring']);
  if (ch.maxTotalItems)   chips.push(['', `🔢 Maksimal ${ch.maxTotalItems} makanan`]);
  if (ch.maxPerZone)      chips.push(['', `📦 Maks. ${ch.maxPerZone} per bagian`]);
  if (ch.budget != null)  chips.push(['chip-budget', `💰 Anggaran ${rupiah(ch.budget)}`]);
  if (ch.minNutriScore)   chips.push(['', `🎯 Skor gizi minimal ${ch.minNutriScore}`]);
  if (ch.days)            chips.push(['chip-days', `📅 Menu untuk ${ch.days} hari`]);
  if (ch.bonus)           chips.push(['chip-bonus', `🎁 Bonus +${ch.bonus.score}: ${ch.bonus.label}`]);

  $('mission-chips').innerHTML = chips
    .map(([cls, text]) => `<span class="chip ${cls}">${text}</span>`)
    .join('');
}

// ── Bonus ──────────────────────────────────────
// Bahan yang sudah dipakai di tantangan LAIN pada level yang sama
function previouslyUsedInLevel() {
  const set = new Set();
  curLevel().challenges.forEach(c => {
    if (c.id === curChallenge().id) return;
    (usedFoods[c.id] || []).forEach(f => set.add(f));
  });
  return set;
}

function bonusState() {
  const ch = curChallenge();
  if (!ch.bonus) return null;

  const all = Object.values(plateItems).flat();
  let current = 0;

  switch (ch.bonus.type) {
    case 'totalItems':
      current = all.length;
      break;
    case 'uniqueFoods':
      current = new Set(all).size;
      break;
    case 'newFoods': {
      const used = previouslyUsedInLevel();
      current = new Set(all.filter(f => !used.has(f))).size;
      break;
    }
    case 'nutriScore':
      current = calcNutriScore(calcNutrients(), targetOf(ch, curLevel()));
      break;
  }

  return { ...ch.bonus, current, done: current >= ch.bonus.target };
}

// ── Daftar syarat (checklist hidup) ────────────
function renderRequirements() {
  const lv = curLevel();
  const ch = curChallenge();
  const list = $('req-list');
  const items = [];

  if (ch.requireAllZones) {
    const filled = ZONES.filter(z => plateItems[z].length > 0).length;
    items.push({
      ok: filled === 4,
      text: `Keempat bagian piring terisi (${filled}/4)`,
    });
  }

  if (ch.maxTotalItems) {
    const total = Object.values(plateItems).flat().length;
    items.push({
      ok: total > 0 && total <= ch.maxTotalItems,
      text: `Maksimal ${ch.maxTotalItems} makanan (sekarang ${total})`,
    });
  }

  if (ch.budget != null) {
    const spent = calcSpent();
    items.push({
      ok: spent > 0 && spent <= ch.budget,
      text: `Belanja dalam anggaran (${rupiah(spent)} dari ${rupiah(ch.budget)})`,
    });
  }

  if (ch.minNutriScore) {
    const sc = calcNutriScore(calcNutrients(), targetOf(ch, lv));
    items.push({
      ok: sc >= ch.minNutriScore,
      text: `Skor gizi minimal ${ch.minNutriScore} (sekarang ${sc})`,
    });
  }

  const b = bonusState();
  if (b) {
    items.push({
      ok: b.done,
      bonus: true,
      text: `Bonus +${b.score}: ${b.label} (${b.current}/${b.target})`,
    });
  }

  list.innerHTML = items.map(it => `
    <div class="req-item ${it.ok ? 'ok' : ''} ${it.bonus ? 'bonus' : ''}">
      <span class="req-mark">${it.ok ? '✅' : it.bonus ? '🎁' : '⬜'}</span>
      <span>${it.text}</span>
    </div>
  `).join('');
}

// ── Food Rack ──────────────────────────────────
function renderFoodRack() {
  const ch = curChallenge();
  let foodIds = ch.availableFoods === '__ALL__' ? Object.keys(FOODS) : ch.availableFoods;

  const catOrder = { pokok: 0, lauk: 1, sayur: 2, buah: 3 };
  foodIds = [...foodIds].sort((a, b) => (catOrder[FOODS[a]?.cat] ?? 9) - (catOrder[FOODS[b]?.cat] ?? 9));

  // Tandai bahan yang sudah dipakai — hanya relevan saat bonus "bahan baru"
  const markUsed = ch.bonus && ch.bonus.type === 'newFoods';
  const used = markUsed ? previouslyUsedInLevel() : new Set();

  const rack = $('food-rack');
  rack.innerHTML = '';
  foodIds.forEach(fid => {
    const f = FOODS[fid];
    if (!f) return;
    const isUsed = used.has(fid);

    const card = document.createElement('div');
    card.className = 'food-card' + (isUsed ? ' used' : '');
    card.draggable = true;
    // Tooltip memuat kelima zat gizi; kartu menampilkan dua yang paling menentukan
    card.title = `${f.name} — per ${f.portion} g: ${f.kal} kkal, protein ${fmtNum(f.protein)} g, ` +
      `karbohidrat ${fmtNum(f.karbo)} g, lemak ${fmtNum(f.lemak)} g, serat ${fmtNum(f.serat)} g`;
    card.innerHTML = `
      ${isUsed ? '<span class="used-tag">sudah dipakai</span>' : ''}
      <span class="food-cat-badge cat-${f.cat}">${catLabel(f.cat)}</span>
      <div class="food-emoji">${f.emoji}</div>
      <div class="food-name">${f.name}</div>
      <div class="food-nutri">
        <span title="Kalori">🔥 ${f.kal} kkal</span>
        <span title="Protein">💪 ${fmtNum(f.protein)} g</span>
      </div>
      <div class="food-meta">
        <span class="food-portion">per ${f.portion} g</span>
        ${f.price ? `<span class="food-price">${rupiah(f.price)}</span>` : ''}
      </div>
    `;

    card.addEventListener('dragstart', e => {
      dragFood = fid;
      e.dataTransfer.setData('text/plain', fid);
      e.dataTransfer.effectAllowed = 'copy';
      requestAnimationFrame(() => card.classList.add('dragging'));
    });
    card.addEventListener('dragend', () => {
      setTimeout(() => { dragFood = null; }, 0);
      card.classList.remove('dragging');
    });
    card.addEventListener('click', () => {
      if (isMobile()) {
        if (mobilePickup === fid) { clearMobilePickup(); return; }
        clearMobilePickup();
        setMobilePickup(fid);
      } else {
        addToZone(fid, f.cat);
      }
    });
    rack.appendChild(card);
  });
}

function catLabel(cat) {
  return { pokok: 'Pokok', lauk: 'Lauk', sayur: 'Sayur', buah: 'Buah' }[cat] || cat;
}

// ── Animasi penolakan ──────────────────────────
function rejectZone(zone) {
  const el = $('zone-' + zone);
  if (!el) return;
  el.classList.remove('reject');
  void el.offsetWidth; // paksa reflow agar animasi bisa diputar ulang
  el.classList.add('reject');
  el.addEventListener('animationend', () => el.classList.remove('reject'), { once: true });
}

// ── Plate logic ────────────────────────────────
// Mengembalikan true jika makanan berhasil diletakkan
let justAdded = null;

function addToZone(foodId, zone) {
  const food = FOODS[foodId];
  const ch   = curChallenge();
  const max  = ch.maxPerZone || 3;

  // ① Validasi kategori
  if (food.cat !== zone) {
    showNutriTip(
      `Ups! ${food.name} termasuk ${catLabel(food.cat)}, ` +
      `bukan ${ZONE_NAMES[zone].split(' ')[0]}. Coba taruh di bagian ${ZONE_NAMES[food.cat]} ya.`
    );
    rejectZone(zone);
    return false;
  }

  // ② Anggaran
  if (ch.budget != null && calcSpent() + (food.price || 0) > ch.budget) {
    showNutriTip(`Anggarannya belum cukup untuk ${food.name}. Coba pilih bahan yang lebih murah ya.`);
    rejectZone(zone);
    return false;
  }

  // ③ Batas total makanan
  if (ch.maxTotalItems && Object.values(plateItems).flat().length >= ch.maxTotalItems) {
    showNutriTip(`Tantangan ini cukup ${ch.maxTotalItems} makanan saja. Coba hapus salah satu dulu ya.`);
    rejectZone(zone);
    return false;
  }

  // ④ Batas per bagian
  if (plateItems[zone].length >= max) {
    showNutriTip(`Bagian ${ZONE_NAMES[zone]} sudah penuh (maks. ${max}). Coba hapus salah satu dulu ya.`);
    rejectZone(zone);
    return false;
  }

  plateItems[zone].push(foodId);
  justAdded = zone;
  renderAll();
  return true;
}

function removeFromZone(foodId, zone) {
  const idx = plateItems[zone].indexOf(foodId);
  if (idx !== -1) plateItems[zone].splice(idx, 1);
  renderAll();
}

function renderPlate() {
  ZONES.forEach(zone => {
    const body = $('items-' + zone);
    const ph   = $('ph-' + zone);
    if (!body) return;

    body.innerHTML = '';
    plateItems[zone].forEach((fid, i) => {
      const f = FOODS[fid];
      if (!f) return;
      const span = document.createElement('span');
      span.className = 'placed-item';
      // Hanya makanan yang baru ditambahkan yang dianimasikan
      if (justAdded === zone && i === plateItems[zone].length - 1) span.classList.add('pop');
      span.title = f.name;

      const emoji = document.createElement('span');
      emoji.textContent = f.emoji;
      span.appendChild(emoji);

      const btn = document.createElement('button');
      btn.className = 'remove-btn';
      btn.type = 'button';
      btn.textContent = '×';
      btn.setAttribute('aria-label', 'Hapus ' + f.name);
      btn.addEventListener('click', e => {
        e.stopPropagation();
        removeFromZone(fid, zone);
      });
      span.appendChild(btn);

      body.appendChild(span);
    });

    if (ph) ph.classList.toggle('hidden', plateItems[zone].length > 0);
  });
  justAdded = null;
}

function calcSpent() {
  return Object.values(plateItems).flat()
    .reduce((s, fid) => s + (FOODS[fid]?.price || 0), 0);
}

function updateBudgetDisplay() {
  const ch = curChallenge();
  const pill = $('budget-pill');
  if (ch.budget == null) { pill.style.display = 'none'; return; }

  pill.style.display = '';
  const rem = ch.budget - calcSpent();
  const el = $('budget-display');
  el.textContent = 'Sisa ' + rupiah(rem);
  el.style.color = rem < 0 ? '#DC2626' : '';
}

// ── Nutrition calculation ──────────────────────
function calcNutrients() {
  const n = { kal: 0, protein: 0, karbo: 0, lemak: 0, serat: 0 };
  Object.values(plateItems).flat().forEach(fid => {
    const f = FOODS[fid];
    if (!f) return;
    n.kal     += f.kal;
    n.protein += f.protein;
    n.karbo   += f.karbo;
    n.lemak   += f.lemak;
    n.serat   += f.serat;
  });
  return n;
}

function calcNutriScore(n, target) {
  let total = 0, count = 0;
  Object.keys(target).forEach(k => {
    const r = n[k] / target[k];
    let s;
    if      (r >= 0.8 && r <= 1.2) s = 100;
    else if (r >= 0.6 && r <= 1.4) s = 70;
    else if (r >= 0.4 && r <= 1.6) s = 40;
    else s = 15;
    total += s; count++;
  });
  return count ? Math.round(total / count) : 0;
}

function renderNutrition() {
  const lv     = curLevel();
  const ch     = curChallenge();
  const target = targetOf(ch, lv);
  const n      = calcNutrients();
  const wrap   = $('nutri-wrap');

  if (!Object.values(plateItems).some(a => a.length > 0)) {
    wrap.innerHTML = '<div class="nutri-empty">Piringmu masih kosong. Pilih makanan dari daftar bahan, ya!</div>';
    return;
  }

  const nutriScore = calcNutriScore(n, target);
  let html = `<div class="nutri-score-box">
    <div class="nutri-score-label">Skor Gizi</div>
    <div class="nutri-score-val">${nutriScore}<span class="nutri-score-unit">/100</span></div>
  </div>
  <div class="nutri-legend">
    <span class="legend-mark"></span> Garis ini menandai <strong>target 100%</strong>
  </div>`;

  Object.entries(NUTRIENT_LABELS).forEach(([key, meta]) => {
    const val = n[key] || 0;
    const tgt = target[key] || 1;
    const s = nutrientStatus(val, tgt);
    const top = topContributor(key, meta.unit);

    html += `<div class="nutri-item">
      <div class="nutri-label-row">
        <span>${meta.icon} ${meta.label}</span>
        <span class="nutri-val-text">${fmtNum(val)} / ${tgt} ${meta.unit}</span>
      </div>
      <div class="nutri-bar-track">
        <div class="nutri-bar-fill ${s.cls}" style="width:${s.barWidth}%"></div>
        <div class="nutri-target-mark"></div>
      </div>
      <div class="nutri-status" style="color:${s.color}">
        ${s.text} · ${s.pct}% · ${s.gap === 'pas dengan target' ? s.gap : s.gap + ' ' + meta.unit}
      </div>
      ${top ? `<div class="nutri-contrib">Penyumbang terbesar: ${top}</div>` : ''}
    </div>`;
  });

  html += `<div class="nutri-source">
    <strong>Target per sajian</strong> mengacu AKG Permenkes No. 28 Tahun 2019
    (±1/3 kebutuhan sehari). Nilai gizi bahan bersumber dari Tabel Komposisi Pangan
    Indonesia (TKPI) Kemenkes RI.
    <br><br>⚕️ Angka ini untuk belajar, <strong>bukan pengganti konsultasi</strong>
    dengan dokter atau tenaga gizi.
  </div>`;

  wrap.innerHTML = html;

  // Saran otomatis: dahulukan zat gizi yang paling jauh dari target
  const lowestKey = Object.keys(target).reduce((a, b) =>
    (n[a] / target[a] < n[b] / target[b]) ? a : b);
  const highestKey = Object.keys(target).reduce((a, b) =>
    (n[a] / target[a] > n[b] / target[b]) ? a : b);

  if ((n[lowestKey] / target[lowestKey]) < 0.8) {
    showNutriTip('💡 ' + NUTRIENT_TIPS[lowestKey]);
  } else if ((n[highestKey] / target[highestKey]) > 1.4) {
    showNutriTip('💡 ' + NUTRIENT_TIPS_OVER[highestKey]);
  } else if (nutriScore >= 80) {
    showNutriTip('✅ Gizinya sudah hampir seimbang! Klik "Sajikan" kalau sudah siap.');
  }
}

function showNutriTip(txt) {
  const el = $('nutri-tip');
  if (el) el.textContent = txt;
}

// ── Submit / Check ─────────────────────────────
function submitPlate() {
  const lv = curLevel();
  const ch = curChallenge();
  const target = targetOf(ch, lv);
  const n = calcNutrients();

  if (Object.values(plateItems).flat().length === 0) {
    showNutriTip('Piringnya masih kosong. Yuk pilih makanan dulu!');
    if (isMobile()) switchMobilePanel('rack');
    return;
  }

  if (ch.requireAllZones) {
    const empty = ZONES.filter(z => plateItems[z].length === 0);
    if (empty.length > 0) {
      const zNames = { pokok: 'Makanan Pokok', lauk: 'Lauk-Pauk', sayur: 'Sayuran', buah: 'Buah' };
      showNutriTip('Masih ada bagian yang kosong: ' + empty.map(z => zNames[z]).join(', ') + '. Yuk lengkapi dulu!');
      if (isMobile()) switchMobilePanel('plate');
      return;
    }
  }

  if (ch.budget != null && calcSpent() > ch.budget) {
    showNutriTip('Belanjaannya melebihi anggaran. Coba kurangi atau pilih bahan yang lebih murah ya.');
    return;
  }

  const nutriScore = calcNutriScore(n, target);
  const passed     = nutriScore >= (ch.minNutriScore || 0);

  // Skor
  let gained = 0;
  const isFirst = !completedChallenges[ch.id];
  if (isFirst) {
    gained = passed ? 70 : 40;
    completedChallenges[ch.id] = true;
  } else {
    gained = passed ? 15 : 5;
  }

  const b = bonusState();
  const bonusEarned = b && b.done;
  if (isFirst && bonusEarned) gained += b.score;

  score += gained;
  levelScores[currentLevelIdx] = (levelScores[currentLevelIdx] || 0) + gained;

  // Catat bahan yang dipakai — dibutuhkan bonus "bahan baru"
  usedFoods[ch.id] = [...new Set(Object.values(plateItems).flat())];

  checkBadges();
  saveData();
  updateScoreDisplay();

  showResult(passed, gained, nutriScore, ch, n, bonusEarned ? b : null);
}

function checkBadges() {
  const allDone = LEVELS.every(lv => lv.challenges.every(c => completedChallenges[c.id]));
  if (allDone && !badges.has('ahli_gizi')) {
    badges.add('ahli_gizi');
    showBadgeToast('🏆 Lencana baru: Ahli Gizi Keluarga!');
  }
  if (LEVELS[1].challenges.every(c => completedChallenges[c.id]) && !badges.has('belanja_cerdas')) {
    badges.add('belanja_cerdas');
    showBadgeToast('🛒 Lencana baru: Belanja Cerdas!');
  }
  if (score >= 300 && !badges.has('skor300')) {
    badges.add('skor300');
    showBadgeToast('⭐ Lencana baru: Skor 300+!');
  }
}

function showBadgeToast(msg) {
  const t = document.createElement('div');
  t.className = 'badge-toast';
  t.setAttribute('role', 'status');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function showResult(passed, gained, nutriScore, ch, n, bonus) {
  const lv = curLevel();

  $('result-char').textContent  = ch.storyIcon || lv.storyIcon || lv.icon;
  $('result-icon').textContent  = passed ? '🎉' : '🤔';
  $('result-title').textContent = passed ? 'Piring Gizi Seimbang!' : 'Sudah dekat! Coba lagi, ya';
  $('result-message').innerHTML = (passed ? ch.feedbackGood : ch.feedbackBad) +
    (bonus ? `<br><strong>🎁 Bonus +${bonus.score} poin: ${bonus.label}!</strong>` : '');

  $('result-score-row').innerHTML = `
    <div class="score-chip"><div class="score-chip-val">+${gained}</div><div class="score-chip-label">Poin diperoleh</div></div>
    <div class="score-chip"><div class="score-chip-val">${nutriScore}</div><div class="score-chip-label">Skor Gizi /100</div></div>
    <div class="score-chip"><div class="score-chip-val">${score}</div><div class="score-chip-label">Total Skor</div></div>
  `;

  // Rekap gizi sebagai tabel: isi piring vs target, lengkap dengan status
  const target = targetOf(ch, lv);
  const rows = Object.entries(NUTRIENT_LABELS).map(([k, m]) => {
    const s = nutrientStatus(n[k] || 0, target[k]);
    const mark = s.text.split(' ')[0];   // ikon status, agar tak bergantung warna saja
    return `<tr>
      <th scope="row">${m.icon} ${m.label}</th>
      <td class="rt-amount">${fmtNum(n[k] || 0)} <span class="rt-unit">/ ${target[k]} ${m.unit}</span></td>
      <td class="rt-pct" style="color:${s.color}">${mark} ${s.pct}%</td>
      <td class="rt-status" style="color:${s.color}">${s.text}</td>
    </tr>`;
  }).join('');

  // Saran perbaikan berdasarkan zat gizi terjauh dari target
  const keys = Object.keys(target);
  const lowest  = keys.reduce((a, b) => (n[a] / target[a] < n[b] / target[b]) ? a : b);
  const highest = keys.reduce((a, b) => (n[a] / target[a] > n[b] / target[b]) ? a : b);
  let advice = '';
  if ((n[lowest] / target[lowest]) < 0.8)       advice = NUTRIENT_TIPS[lowest];
  else if ((n[highest] / target[highest]) > 1.4) advice = NUTRIENT_TIPS_OVER[highest];
  else advice = 'Kelima zat gizi sudah dekat dengan target. Pertahankan pola seperti ini!';

  $('result-nutri-summary').innerHTML = `
    <div class="result-table-wrap">
      <table class="result-table">
        <caption>Kandungan gizi piringmu dibanding target satu sajian</caption>
        <thead>
          <tr><th scope="col">Zat gizi</th><th scope="col">Isi / target</th>
              <th scope="col">%</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="result-advice">💡 ${advice}</div>
  `;

  // Beri tahu dengan jelas apa yang terjadi setelah tombol ini ditekan
  const btnNext = $('btn-next');
  const isLastChallenge = currentChallengeIdx === lv.challenges.length - 1;
  const levelDone = lv.challenges.every(c => completedChallenges[c.id]);
  const isLastLevel = currentLevelIdx === LEVELS.length - 1;

  if (!isLastChallenge) {
    btnNext.textContent = 'Tantangan Berikutnya →';
  } else if (!levelDone) {
    btnNext.textContent = 'Selesaikan Tantangan yang Tersisa →';
  } else if (isLastLevel) {
    btnNext.textContent = '📓 Jurnal Refleksi & Selesai';
  } else {
    btnNext.textContent = `📓 Jurnal Refleksi → ${LEVELS[currentLevelIdx + 1].title}`;
  }

  renderStepper();
  openModal('modal-result');
}

// ── Alur setelah satu level selesai ────────────
function afterLevelComplete() {
  if (currentLevelIdx < LEVELS.length - 1) {
    currentLevelIdx++;
    currentChallengeIdx = 0;
    loadChallenge();
  } else {
    showHomeScreen();
    showBadgeToast('🎉 Selamat! Kamu menyelesaikan seluruh level.');
  }
}

// ── Jurnal Refleksi ────────────────────────────
let afterReflection = null;

function openReflection(li, next) {
  afterReflection = next;
  const saved = reflections[li] || {};
  $('reflection-intro').textContent =
    `Selamat, kamu menyelesaikan ${LEVELS[li].title}: ${LEVELS[li].name}! Yuk refleksikan apa yang kamu pelajari.`;
  $('reflection-1').value = saved.q1 || '';
  $('reflection-2').value = saved.q2 || '';
  openModal('modal-reflection');
}

function closeReflection(save) {
  if (save) {
    reflections[currentLevelIdx] = {
      q1: $('reflection-1').value.trim(),
      q2: $('reflection-2').value.trim(),
      at: Date.now(),
    };
    saveData();
  }
  closeModal('modal-reflection');
  const next = afterReflection;
  afterReflection = null;
  if (next) next();
}

// ── Hint ───────────────────────────────────────
function showHint() {
  const ch = curChallenge();
  const empty = ZONES.filter(z => plateItems[z].length === 0);

  let hint = ch.hint || 'Pastikan setiap bagian piring terisi: Makanan Pokok, Lauk-Pauk, Sayuran, dan Buah.';
  if (empty.length > 0) {
    hint += '\n\n🍽️ Bagian piring yang masih kosong:\n' + empty.map(z => '• ' + ZONE_NAMES[z]).join('\n');
  }
  const b = bonusState();
  if (b && !b.done) {
    hint += `\n\n🎁 Bonus +${b.score} poin: ${b.label}. Sekarang ${b.current} dari ${b.target}.`;
  }

  $('hint-content').textContent = hint;
  openModal('modal-hint');
}

// ── Cara Bermain ───────────────────────────────
const HOWTO_SLIDES = [
  {
    emoji: '🍽️',
    title: 'Kenali Isi Piringku',
    body: `<ul>
      <li>Setiap piring punya <strong>4 bagian</strong>: Makanan Pokok, Sayuran, Lauk-Pauk, dan Buah.</li>
      <li>Sayuran dan makanan pokok masing-masing <strong>1/3 piring</strong>.</li>
      <li>Lauk dan buah masing-masing <strong>1/6 piring</strong>.</li>
      <li>Jangan lupa <strong>air putih</strong> dan <strong>aktivitas fisik</strong> setiap hari.</li>
    </ul>`,
  },
  {
    emoji: '🖐️',
    title: 'Cara Menaruh Makanan',
    body: `<ul>
      <li>Di <strong>komputer</strong>: seret kartu makanan ke kartu bagian piring, atau cukup klik kartunya.</li>
      <li>Di <strong>HP</strong>: ketuk bahan makanan, lalu ketuk kartu bagian piring yang sesuai.</li>
      <li>Makanan hanya bisa masuk ke bagian yang <strong>sesuai kategorinya</strong>.</li>
      <li>Ketuk tombol <strong>×</strong> pada makanan untuk menghapusnya.</li>
    </ul>`,
  },
  {
    emoji: '📊',
    title: 'Cek Gizi lalu Sajikan',
    body: `<ul>
      <li>Panel <strong>Gizi</strong> menampilkan skor 0–100 dan kandungan kalori, protein, karbohidrat, lemak, serta serat.</li>
      <li>Daftar <strong>Syarat tantangan</strong> di bawah piring menunjukkan apa yang masih kurang.</li>
      <li>Bingung? Tekan <strong>💡 Petunjuk</strong> kapan saja.</li>
      <li>Kalau sudah siap, tekan <strong>✅ Sajikan!</strong> untuk melihat hasilnya.</li>
    </ul>`,
  },
];
let howtoIdx = 0;

function renderHowTo() {
  const s = HOWTO_SLIDES[howtoIdx];
  $('howto-slide').innerHTML = `<div class="howto-emoji">${s.emoji}</div><h2>${s.title}</h2>${s.body}`;
  $('howto-dots').innerHTML = HOWTO_SLIDES
    .map((_, i) => `<span class="howto-dot ${i === howtoIdx ? 'active' : ''}"></span>`).join('');
  $('btn-howto-prev').style.visibility = howtoIdx === 0 ? 'hidden' : 'visible';
  $('btn-howto-next').textContent = howtoIdx === HOWTO_SLIDES.length - 1 ? 'Mulai Bermain!' : 'Lanjut →';
}

function openHowTo() {
  howtoIdx = 0;
  renderHowTo();
  openModal('modal-howto');
}

function closeHowTo() {
  closeModal('modal-howto');
  seenHowTo = true;
  saveData();
}

// ── Events ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderHome();
  setupPlateListeners();   // sekali saja
  setupModalDismiss();

  // Halaman pembuka — onboarding baru dibuka setelah peserta menekan "Mulai"
  $('btn-splash-start').addEventListener('click', () => {
    showHomeScreen();
    if (!seenHowTo) openHowTo();
  });
  $('btn-to-splash').addEventListener('click', () => {
    $('screen-home').style.display = 'none';
    $('screen-game').style.display = 'none';
    $('screen-splash').style.display = 'flex';
  });
  $('btn-splash-goals').addEventListener('click', () => openModal('modal-goals'));
  $('btn-splash-author').addEventListener('click', () => openModal('modal-author'));
  $('btn-close-goals').addEventListener('click', () => closeModal('modal-goals'));
  $('btn-close-author').addEventListener('click', () => closeModal('modal-author'));

  // Home
  $('btn-continue').addEventListener('click', () => {
    const next = nextIncomplete();
    startChallenge(next ? next.li : 0, next ? next.ci : 0);
  });
  $('btn-howto').addEventListener('click', openHowTo);
  $('btn-reset-data').addEventListener('click', () => openModal('modal-confirm'));
  $('btn-confirm-reset').addEventListener('click', () => { closeModal('modal-confirm'); doResetData(); });
  $('btn-cancel-reset').addEventListener('click', () => closeModal('modal-confirm'));

  // Cara bermain
  $('btn-howto-prev').addEventListener('click', () => { howtoIdx--; renderHowTo(); });
  $('btn-howto-next').addEventListener('click', () => {
    if (howtoIdx === HOWTO_SLIDES.length - 1) { closeHowTo(); return; }
    howtoIdx++;
    renderHowTo();
  });

  // Game
  $('btn-back').addEventListener('click', () => { clearMobilePickup(); showHomeScreen(); });
  $('btn-submit').addEventListener('click', submitPlate);
  $('btn-hint-game').addEventListener('click', showHint);
  $('btn-close-hint').addEventListener('click', () => closeModal('modal-hint'));
  $('btn-cancel-pickup').addEventListener('click', clearMobilePickup);

  $('btn-reset-plate').addEventListener('click', () => {
    plateItems = { pokok: [], lauk: [], sayur: [], buah: [] };
    clearMobilePickup();
    renderAll();
    showNutriTip('Piring dikosongkan. Silakan mulai lagi!');
  });

  document.querySelectorAll('.mpanel-btn').forEach(btn => {
    btn.addEventListener('click', () => switchMobilePanel(btn.dataset.panel));
  });

  // Modal hasil
  $('btn-next').addEventListener('click', () => {
    closeModal('modal-result');
    const lv = curLevel();

    if (currentChallengeIdx < lv.challenges.length - 1) {
      currentChallengeIdx++;
      loadChallenge();
      return;
    }
    // Tantangan terakhir di level ini
    const remaining = lv.challenges.findIndex(c => !completedChallenges[c.id]);
    if (remaining !== -1) {
      currentChallengeIdx = remaining;
      loadChallenge();
      return;
    }
    openReflection(currentLevelIdx, afterLevelComplete);
  });

  $('btn-retry').addEventListener('click', () => {
    closeModal('modal-result');
    plateItems = { pokok: [], lauk: [], sayur: [], buah: [] };
    renderAll();
    showNutriTip('💡 Coba susun ulang piringnya. Perhatikan daftar syarat di bawah piring.');
    if (isMobile()) switchMobilePanel('rack');
  });

  $('btn-home-result').addEventListener('click', () => {
    closeModal('modal-result');
    showHomeScreen();
  });

  // Jurnal refleksi
  $('btn-save-reflection').addEventListener('click', () => closeReflection(true));
  $('btn-skip-reflection').addEventListener('click', () => closeReflection(false));
});
