// app.js — Pasar Saham Virtual: Investasi Pertamamu
"use strict";

// ─── State ───────────────────────────────────────────────────────────────────
const S = {
  screen: "welcome",
  name: "Warga Belajar",
  sessionsCompleted: new Set(),
  badges: new Set(),
  scores: { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },

  portfolio: {
    modalAwal: 10000000,
    alokasi: { saham: 0, reksa_dana: 0, emas: 0, kas: 100 },
    nilaiAset: { saham: 0, reksa_dana: 0, emas: 0, kas: 10000000 },
    historyRonde: [{ ronde: 0, total: 10000000, label: "Awal" }],
    profilInvestor: null,
    currentRonde: 0,
    phase: "allocation",
    decisionScores: [],
  },

  profileAnswers: [],
  s5plan: {
    instr: "reksa_dana",
    amount: 50000,
    time: 12,
    goal: "",
    langkah: "",
  },
  reflections: {
    s1Before: "",
    s1After: "",
    s2InstrPick: "",
    s2Reason: "",
    s3q1: "",
    s3q2: "",
    s3q3: "",
    s4Lessons: "",
  },
};

// ─── LocalStorage Persistence ─────────────────────────────────────────────────
const STORAGE_KEY = "psv_state_v1";

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: S.name,
        sessionsCompleted: [...S.sessionsCompleted],
        badges: [...S.badges],
        scores: S.scores,
        portfolio: S.portfolio,
        profileAnswers: S.profileAnswers,
        s5plan: S.s5plan,
        reflections: S.reflections,
      }),
    );
  } catch (e) {
    /* localStorage unavailable (e.g. SCORM iframe sandbox) */
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    S.name = d.name || "Warga Belajar";
    S.sessionsCompleted = new Set(d.sessionsCompleted || []);
    S.badges = new Set(d.badges || []);
    if (d.scores) S.scores = d.scores;
    if (d.portfolio) S.portfolio = d.portfolio;
    S.profileAnswers = d.profileAnswers || [];
    S.s5plan = d.s5plan || {};
    if (d.reflections) S.reflections = { ...S.reflections, ...d.reflections };
    return true;
  } catch (e) {
    return false;
  }
}

function resetState() {
  if (
    !confirm(
      "Reset semua progress?\nSemua skor, jawaban, dan data simulasi akan terhapus permanen.",
    )
  )
    return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  S.name = "Warga Belajar";
  S.sessionsCompleted = new Set();
  S.badges = new Set();
  S.scores = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 };
  S.portfolio = {
    modalAwal: 10000000,
    alokasi: { saham: 0, reksa_dana: 0, emas: 0, kas: 100 },
    nilaiAset: { saham: 0, reksa_dana: 0, emas: 0, kas: 10000000 },
    historyRonde: [{ ronde: 0, total: 10000000, label: "Awal" }],
    profilInvestor: null,
    currentRonde: 0,
    phase: "allocation",
    decisionScores: [],
  };
  S.profileAnswers = [];
  S.s5plan = {
    instr: "reksa_dana",
    amount: 50000,
    time: 12,
    goal: "",
    langkah: "",
  };
  S.reflections = {
    s1Before: "",
    s1After: "",
    s2InstrPick: "",
    s2Reason: "",
    s3q1: "",
    s3q2: "",
    s3q3: "",
    s4Lessons: "",
  };
  renderCover();
  renderWelcome();
  renderSidebar();
  navigate("screen-cover");
  showToast("Progress direset. Mulai dari awal!", "");
}

// ─── SCORM Wrapper ────────────────────────────────────────────────────────────
const SCORM = {
  api: null,
  init() {
    if (window.API) {
      this.api = window.API;
      this.api.LMSInitialize("");
    }
  },
  finish(score) {
    if (!this.api) return;
    this.api.LMSSetValue("cmi.core.score.raw", String(score));
    this.api.LMSSetValue(
      "cmi.core.lesson_status",
      score >= 70 ? "passed" : "failed",
    );
    this.api.LMSSetValue(
      "cmi.suspend_data",
      JSON.stringify({ scores: S.scores, completed: [...S.sessionsCompleted] }),
    );
    this.api.LMSCommit("");
    this.api.LMSFinish("");
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const idr = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");
const pct = (n) => (n >= 0 ? "+" : "") + (n * 100).toFixed(1) + "%";
const clamp = (v, mn, mx) => Math.min(Math.max(v, mn), mx);

function showToast(msg, type = "", dur = 2800) {
  const t = $("toast");
  t.textContent = msg;
  t.className = "toast show" + (type ? " " + type : "");
  setTimeout(() => {
    t.className = "toast";
  }, dur);
}

// ─── Perayaan & Animasi ───────────────────────────────────────────────────────
// Hormati preferensi sistem: jika pengguna minta gerakan dikurangi, semua
// animasi dilewati dan hasil akhirnya langsung ditampilkan.
const reduceMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CONFETTI_COLORS = [
  "#1a56db",
  "#057a55",
  "#d97706",
  "#7e3af2",
  "#e02424",
  "#fbbf24",
];

function confetti(count = 36) {
  if (reduceMotion()) return;
  const layer = el("div", "confetti-layer");
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const piece = el("div", "confetti-piece");
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.cssText = `
      left:${Math.random() * 100}%;
      background:${color};
      animation-delay:${Math.random() * 0.35}s;
      animation-duration:${1.5 + Math.random() * 1.2}s;
      --drift:${(Math.random() - 0.5) * 220}px;
      --spin:${Math.random() * 900 - 450}deg;
      ${Math.random() > 0.5 ? "border-radius:50%;" : ""}
    `;
    layer.appendChild(piece);
  }
  setTimeout(() => layer.remove(), 3200);
}

// Angka berhitung dari nilai lama ke nilai baru — membuat perubahan
// portofolio terasa "hidup" alih-alih melompat begitu saja.
function countUp(elem, from, to, dur = 900, fmt = idr) {
  if (!elem) return;
  if (reduceMotion() || from === to) {
    elem.textContent = fmt(to);
    return;
  }
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    elem.textContent = fmt(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── Lencana ──────────────────────────────────────────────────────────────────
const badgeQueue = [];
let badgeShowing = false;

function unlockBadge(id) {
  if (S.badges.has(id)) return; // sudah pernah didapat
  const badge = BADGES.find((b) => b.id === id);
  if (!badge) return;
  S.badges.add(id);
  saveState();
  // Papan lencana bisa sedang tampil di layar (mis. menu baru saja dirender
  // oleh celebrateSession) — segarkan agar hitungannya langsung ikut naik.
  refreshBadgeShelves();
  renderSidebar();
  badgeQueue.push(badge);
  flushBadgeQueue();
}

// Beberapa lencana bisa terbuka bersamaan (mis. di layar akhir).
// Tampilkan bergantian supaya tidak saling menimpa.
function flushBadgeQueue() {
  if (badgeShowing || !badgeQueue.length) return;
  badgeShowing = true;
  const badge = badgeQueue.shift();

  const pop = el("div", "badge-pop");
  pop.setAttribute("role", "status");
  pop.innerHTML = `
    <div class="bp-icon" style="background:${badge.warna}">${badge.icon}</div>
    <div class="bp-text">
      <div class="bp-label">Lencana Terbuka!</div>
      <div class="bp-name">${badge.nama}</div>
    </div>
  `;
  document.body.appendChild(pop);
  confetti(28);

  setTimeout(() => {
    pop.classList.add("out");
    setTimeout(() => {
      pop.remove();
      badgeShowing = false;
      renderSidebar();
      flushBadgeQueue();
    }, 400);
  }, 2400);
}

// Penutup setiap sesi: konfetti, notifikasi poin, lalu kembali ke menu.
function celebrateSession(n, poin) {
  confetti(48);
  showToast(`Sesi ${n} selesai! +${poin} poin 🎉`, "success");
  renderMenu();
  navigate("screen-menu");
}

// Set .value on DOM inputs safely (no HTML parsing risk)
function restoreInputs(map) {
  Object.entries(map).forEach(([id, val]) => {
    const el = $(id);
    if (el && val !== undefined && val !== "") el.value = val;
  });
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function totalPortfolio() {
  return Object.values(S.portfolio.nilaiAset).reduce((a, b) => a + b, 0);
}

function changePercent() {
  return (totalPortfolio() - S.portfolio.modalAwal) / S.portfolio.modalAwal;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigate(screenId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  const screenEl = $(screenId);
  if (screenEl) {
    screenEl.classList.add("active");
  }
  const sc = $("screen-container");
  if (sc) sc.scrollTop = 0;
  S.screen = screenId;
  updateHeader(screenId);
  renderSidebar();
}

function updateHeader(screenId) {
  const header = $("app-header");
  const titleEl = $("header-title");
  const scoreEl = $("header-score");
  const backBtn = $("btn-back");

  if (screenId === "screen-cover" || screenId === "screen-welcome") {
    header.classList.add("hidden");
    return;
  }
  header.classList.remove("hidden");

  const titles = {
    "screen-menu": "Pasar Saham Virtual",
    "screen-quiz": Quiz.label || "Kuis",
    "screen-s1": "Sesi 1 — Tabungan vs Investasi",
    "screen-s2": "Sesi 2 — Instrumen Investasi",
    "screen-s3-profile": "Sesi 3 — Profil Investor",
    "screen-s3-sim": "Sesi 3 — Simulasi",
    "screen-s3-reflect": "Sesi 3 — Refleksi",
    "screen-s4": "Sesi 4 — Analisis Portofolio",
    "screen-s5": "Sesi 5 — Investasi Nyata",
    "screen-complete": "Selamat!",
  };
  titleEl.textContent = titles[screenId] || "Pasar Saham Virtual";

  const noBack = ["screen-menu", "screen-complete"];
  backBtn.classList.toggle("hidden", noBack.includes(screenId));

  const done = S.sessionsCompleted.size;
  $("progress-fill").style.width = Math.round((done / 5) * 100) + "%";

  const total = Object.values(S.scores).reduce((a, b) => a + b, 0);
  scoreEl.textContent = total > 0 ? `${total} poin` : "";
}

$("btn-back").addEventListener("click", () => {
  if (S.screen === "screen-quiz") {
    navigate(Quiz.backScreen || "screen-menu");
    return;
  }
  const map = {
    "screen-s1": "screen-menu",
    "screen-s2": "screen-menu",
    "screen-s3-profile": "screen-menu",
    "screen-s3-sim": "screen-menu",
    "screen-s3-reflect": "screen-s3-sim",
    "screen-s4": "screen-menu",
    "screen-s5": "screen-menu",
  };
  navigate(map[S.screen] || "screen-menu");
});

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
function renderSidebar() {
  const sidebar = $("desktop-sidebar");
  if (!sidebar) return;

  const sessions = [
    { id: "s1", n: 1, title: "Tabungan vs Investasi", icon: "⏱️" },
    { id: "s2", n: 2, title: "Instrumen Investasi", icon: "📋" },
    { id: "s3", n: 3, title: "Simulasi Inti", icon: "🎯" },
    { id: "s4", n: 4, title: "Analisis Portofolio", icon: "📊" },
    { id: "s5", n: 5, title: "Investasi Nyata", icon: "🚀" },
  ];

  const totalScore = Object.values(S.scores).reduce((a, b) => a + b, 0);
  const prof = S.portfolio.profilInvestor
    ? RECOMMENDED_ALLOCATIONS[S.portfolio.profilInvestor]
    : null;

  const navItems = sessions
    .map((ses, i) => {
      const done = S.sessionsCompleted.has(ses.id);
      const locked =
        i > 0 && !S.sessionsCompleted.has(sessions[i - 1].id) && !done;
      const isActive = S.screen.includes(ses.id === "s3" ? "s3" : ses.id);
      const iconCls = done ? "done" : isActive ? "active-icon" : "idle";
      const onClick = locked ? "" : `goSession('${ses.id}')`;
      return `
      <div class="sb-item${isActive ? " active" : ""}${locked ? " locked" : ""}"
           onclick="${onClick}" role="button" tabindex="${locked ? -1 : 0}"
           aria-label="Sesi ${ses.n}: ${ses.title}${done ? " (selesai)" : locked ? " (terkunci)" : ""}">
        <div class="sb-item-icon ${iconCls}">${done ? "✓" : ses.icon}</div>
        <div class="sb-item-text">
          <div class="sb-item-title">Sesi ${ses.n}: ${ses.title}</div>
        </div>
        ${locked ? '<span style="font-size:11px;color:rgba(255,255,255,0.3);">🔒</span>' : ""}
      </div>
    `;
    })
    .join("");

  sidebar.innerHTML = `
    <div class="sb-brand">
      <div class="sb-logo">📊</div>
      <div class="sb-title">Pasar Saham Virtual</div>
      <div class="sb-sub"></div>
    </div>

    ${
      S.name !== "Warga Belajar"
        ? `
    <div class="sb-user">
      <div class="sb-user-label">Warga Belajar</div>
      <div class="sb-user-name">${S.name}</div>
      ${prof ? `<div class="sb-user-profile">${prof.emoji} Profil: ${prof.label}</div>` : ""}
    </div>`
        : ""
    }

    <div class="sb-section-label">Sesi Pembelajaran</div>
    ${navItems}

    ${
      totalScore > 0
        ? `
    <div class="sb-score">
      <div class="sb-score-label">Total Skor</div>
      <div class="sb-score-num">${totalScore} <span style="font-size:14px;opacity:0.5;font-weight:400;">/ 100</span></div>
      <div class="sb-score-sub">${S.sessionsCompleted.size} dari 5 sesi selesai</div>
      <div class="sb-score-bar"><div class="sb-score-fill" style="width:${totalScore}%"></div></div>
    </div>`
        : ""
    }

    <div class="sb-footer">
      <p>Simulasi pendidikan semata. Bukan saran investasi nyata. © Fanny Bagus Ramadhan</p>
      <button onclick="resetState()"
        style="margin-top:10px;width:100%;padding:7px 12px;background:rgba(239,68,68,0.12);color:#fca5a5;border:1.5px solid rgba(239,68,68,0.25);border-radius:var(--radius-sm);font-size:12px;font-weight:700;cursor:pointer;transition:0.2s;"
        onmouseover="this.style.background='rgba(239,68,68,0.25)'"
        onmouseout="this.style.background='rgba(239,68,68,0.12)'">
        ↺ Reset Progress
      </button>
    </div>
  `;
}

// ─── Unified Quiz System ──────────────────────────────────────────────────────
// When a quiz starts, it REPLACES the full screen — no other content visible.
const Quiz = {
  questions: [],
  idx: 0,
  score: 0,
  answered: false,
  label: "",
  backScreen: "",
  onComplete: null,

  start(questions, label, backScreen, onComplete) {
    this.questions = questions;
    this.idx = 0;
    this.score = 0;
    this.answered = false;
    this.label = label;
    this.backScreen = backScreen;
    this.onComplete = onComplete;
    this._render();
    navigate("screen-quiz");
  },

  _render() {
    const q = this.questions[this.idx];
    const total = this.questions.length;
    const pctBar = Math.round(((this.idx + 1) / total) * 100);

    $("screen-quiz").innerHTML = `
      <div class="quiz-focus-wrap">
        <div class="qf-label">${this.label}</div>
        <div class="qf-track"><div class="qf-fill" style="width:${pctBar}%"></div></div>
        <div class="qf-counter">Soal ${this.idx + 1} dari ${total}</div>
        <div class="qf-question">${q.pertanyaan}</div>
        <div class="qf-options" id="qf-options">
          ${q.opsi.map((o, i) => `<button class="quiz-opt" onclick="Quiz.answer(${i})">${o}</button>`).join("")}
        </div>
        <div id="qf-feedback" style="margin-top:16px;"></div>
      </div>
    `;
    this.answered = false;
  },

  answer(idx) {
    if (this.answered) return;
    this.answered = true;
    const q = this.questions[this.idx];
    const opts = document.querySelectorAll("#qf-options .quiz-opt");
    opts.forEach((o) => o.classList.add("disabled"));
    const correct = idx === q.jawaban;
    opts[idx].classList.add(correct ? "correct" : "wrong");
    if (!correct) opts[q.jawaban].classList.add("correct");
    if (correct) this.score++;

    $("qf-feedback").innerHTML = `
      <div class="feedback-box ${correct ? "correct" : "wrong"}">
        <strong>${correct ? "✅ Tepat sekali!" : "❌ Belum tepat"}</strong>
        ${q.penjelasan}
      </div>
      <button class="btn btn-secondary" style="margin-top:14px;" onclick="Quiz.next()">
        ${this.idx < this.questions.length - 1 ? "Soal Berikutnya →" : "Lihat Hasil →"}
      </button>
    `;
  },

  next() {
    this.idx++;
    if (this.idx < this.questions.length) {
      this._render();
      return;
    }
    this._showResult();
  },

  _showResult() {
    const { score, questions, label } = this;
    const pct100 = Math.round((score / questions.length) * 100);
    const pass = pct100 >= 70;

    $("screen-quiz").innerHTML = `
      <div class="quiz-focus-wrap">
        <div class="qf-label">${label} — Selesai</div>
        <div class="qf-result">
          <div class="big-emoji">${pass ? "🎉" : "📘"}</div>
          <div>
            <span class="score-big">${score}</span>
            <span class="score-denom"> / ${questions.length}</span>
          </div>
          <div class="score-pct">${pct100}% jawaban benar</div>
          <div class="score-msg ${pass ? "pass" : "fail"}">
            ${pass ? "✓ Pemahaman tercapai!" : "Coba pelajari ulang materinya"}
          </div>
          <button class="btn btn-primary" style="margin-top:28px;" onclick="Quiz.complete(${score}, ${questions.length}, ${pct100})">
            Lanjutkan →
          </button>
        </div>
      </div>
    `;

    if (pass) confetti(pct100 === 100 ? 64 : 40);
  },

  complete(score, total, pct100) {
    if (this.onComplete) this.onComplete(score, total, pct100);
  },
};

// ─── Modal (Tujuan Pembelajaran / Author) ─────────────────────────────────────
const MODALS = {
  tujuan: () => `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-head">
        <h2 id="modal-title">🎯 Tujuan Pembelajaran</h2>
        <button class="modal-close" onclick="closeModal()" aria-label="Tutup">✕</button>
      </div>
      <div class="modal-body">
        <p class="text-muted mb-12" style="font-size:13px;">
          Setelah menyelesaikan seluruh 5 sesi, kamu diharapkan mampu:
        </p>
        <div class="goal-list">
          ${LEARNING_GOALS.map(
            (g, i) => `
            <div class="goal-item">
              <div class="goal-num">${i + 1}</div>
              <div class="goal-text">${g}</div>
            </div>`,
          ).join("")}
        </div>
      </div>
    </div>
  `,

  author: () => `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-head">
        <h2 id="modal-title">© Author</h2>
        <button class="modal-close" onclick="closeModal()" aria-label="Tutup">✕</button>
      </div>
      <div class="modal-body">
        <div class="author-card">
          <div class="author-avatar" aria-hidden="true">${AUTHOR.inisial}</div>
          <div class="author-name">${AUTHOR.nama}</div>
          <div class="author-role">${AUTHOR.peran}</div>
          <a class="author-link" href="${AUTHOR.website}" target="_blank" rel="noopener noreferrer">
            🌐 ${AUTHOR.website.replace(/^https?:\/\//, "")} <span aria-hidden="true">↗</span>
          </a>
          <p class="author-copy">
            © ${new Date().getFullYear()} ${AUTHOR.nama}. Seluruh hak cipta dilindungi.<br>
            Dikembangkan untuk <strong>Pendidikan Kesetaraan Paket C</strong> —
            Lab Maya, Ruang Murid, Rumah Pendidikan.
          </p>
        </div>
      </div>
    </div>
  `,
};

let modalOpener = null;

function openModal(key) {
  const build = MODALS[key];
  if (!build) return;
  modalOpener = document.activeElement;
  const root = $("modal-root");
  root.innerHTML = build();
  root.classList.add("open");
  root.setAttribute("aria-hidden", "false");
  root.querySelector(".modal-close")?.focus();
}

function closeModal() {
  const root = $("modal-root");
  root.classList.remove("open");
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = "";
  modalOpener?.focus();
  modalOpener = null;
}

// Klik backdrop menutup modal
$("modal-root").addEventListener("click", (e) => {
  if (e.target === $("modal-root")) closeModal();
});

// Escape menutup modal; Tab dikurung di dalam modal (WCAG 2.1 — keyboard trap)
document.addEventListener("keydown", (e) => {
  const root = $("modal-root");
  if (!root.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeModal();
    return;
  }
  if (e.key !== "Tab") return;

  const focusables = root.querySelectorAll("button, a[href]");
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

// ─── Cover / Halaman Pembuka ──────────────────────────────────────────────────
function hasProgress() {
  return S.sessionsCompleted.size > 0 || S.name !== "Warga Belajar";
}

function renderCover() {
  const resuming = hasProgress();
  $("screen-cover").innerHTML = `
    <div class="cover-wrap">
      <div class="cover-art">
        <picture>
          <source srcset="pasar-saham.webp" type="image/webp">
          <img src="pasar-saham.png" width="1536" height="1024" fetchpriority="high"
               alt="Sampul Pasar Saham Virtual: Investasi Pertamamu. Seorang pelajar memantau dashboard portofolio berisi alokasi saham, reksa dana, emas, dan kas, dengan modal virtual Rp 10.000.000.">
        </picture>
        <button class="cover-start" onclick="enterApp()">
          ${resuming ? "Lanjutkan Belajar" : "Mulai Belajar"} <span aria-hidden="true">→</span>
        </button>
      </div>
      <div class="cover-actions">
        <button class="cover-btn" onclick="openModal('tujuan')">🎯 Tujuan Pembelajaran</button>
        <button class="cover-btn" onclick="openModal('author')">© Author</button>
      </div>
      <p class="cover-note">
        Simulasi pembelajaran untuk tujuan pendidikan semata — bukan saran investasi nyata.
      </p>
    </div>
  `;
}

// Dari cover masuk ke sistem: lanjut ke menu jika sudah ada progress,
// selain itu ke halaman sambutan (input nama + disclaimer).
function enterApp() {
  if (hasProgress()) {
    renderMenu();
    navigate("screen-menu");
    return;
  }
  navigate("screen-welcome");
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────
function renderWelcome() {
  $("screen-welcome").innerHTML = `
    <div class="welcome-hero">
      <span class="hero-emoji">📊</span>
      <h1>Pasar Saham Virtual</h1>
      <p class="subtitle">Investasi Pertamamu</p>
  
    </div>
    <div class="welcome-body">
      <div class="info-grid">
        <div class="info-card"><div class="ic-label">Modal Virtual</div><div class="ic-value">Rp 10.000.000</div></div>
        <div class="info-card"><div class="ic-label">Jumlah Sesi</div><div class="ic-value">5 Sesi</div></div>
        <div class="info-card"><div class="ic-label">Durasi</div><div class="ic-value">5–7 jam</div></div>
        <div class="info-card"><div class="ic-label">Level</div><div class="ic-value">Paket C</div></div>
      </div>
      <div class="disclaimer-box">
        <strong>⚠️ Perhatian Penting</strong>
        Konten ini adalah simulasi pembelajaran untuk tujuan pendidikan semata. Semua instrumen, harga, dan skenario bersifat fiktif. Ini bukan saran investasi. Untuk investasi nyata, konsultasikan dengan penasihat keuangan berlisensi OJK.
      </div>
      <div class="mb-16">
        <label class="calc-label" for="learner-name">Nama Kamu</label>
        <input class="calc-input" id="learner-name" type="text" placeholder="Masukkan namamu..." maxlength="40"
               value="${S.name !== "Warga Belajar" ? S.name : ""}">
      </div>
      <button class="btn btn-primary" onclick="startApp()">Mulai Belajar →</button>
    </div>
  `;
}

function startApp() {
  const n = $("learner-name");
  S.name = n && n.value.trim() ? n.value.trim() : "Warga Belajar";
  saveState();
  renderMenu();
  navigate("screen-menu");
}

// ─── Menu Screen ──────────────────────────────────────────────────────────────
function renderMenu() {
  const sessions = [
    {
      id: "s1",
      title: "Tabungan vs Investasi",
      sub: "30 menit · Kalkulator Inflasi",
      icon: "⏱️",
      bg: "#e1effe",
    },
    {
      id: "s2",
      title: "Instrumen Investasi",
      sub: "35 menit · Kartu & Kuis",
      icon: "📋",
      bg: "#fef3c7",
    },
    {
      id: "s3",
      title: "Simulasi Inti ⭐",
      sub: "45 menit · Investasi Pertamamu!",
      icon: "🎯",
      bg: "#def7ec",
    },
    {
      id: "s4",
      title: "Analisis Portofolio",
      sub: "30 menit · Laporan & Evaluasi",
      icon: "📊",
      bg: "#ede9fe",
    },
    {
      id: "s5",
      title: "Investasi Nyata",
      sub: "35 menit · Langkah Pertama",
      icon: "🚀",
      bg: "#fde8e8",
    },
  ];

  const totalScore = Object.values(S.scores).reduce((a, b) => a + b, 0);

  const listHTML = sessions
    .map((ses, i) => {
      const done = S.sessionsCompleted.has(ses.id);
      const locked =
        i > 0 && !S.sessionsCompleted.has(sessions[i - 1].id) && !done;
      const badge = locked
        ? `<span class="session-badge badge-lock">🔒 Terkunci</span>`
        : done
          ? `<span class="session-badge badge-done">✓ Selesai</span>`
          : `<span class="session-badge badge-next">Mulai</span>`;

      return `
      <div class="session-card ${done ? "completed" : ""} ${locked ? "locked" : ""}"
           style="animation-delay:${i * 70}ms"
           onclick="${locked ? `showToast('Selesaikan sesi sebelumnya dulu','warning')` : `goSession('${ses.id}')`}"
           role="button" tabindex="0">
        <div class="session-icon" style="background:${ses.bg}">${ses.icon}</div>
        <div class="session-info">
          <h3>Sesi ${i + 1} — ${ses.title}</h3>
          <p>${ses.sub}</p>
        </div>
        ${badge}
      </div>
    `;
    })
    .join("");

  $("screen-menu").innerHTML = `
    <div class="menu-header">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
        <div>
          <h2>Halo, ${S.name}! 👋</h2>
          <p>${S.sessionsCompleted.size > 0 ? `${S.sessionsCompleted.size}/5 sesi selesai.` : "Pilih sesi untuk mulai belajar!"}
             ${totalScore > 0 ? `<strong style="color:var(--blue)"> · ${totalScore} poin</strong>` : ""}</p>
        </div>
        <button onclick="resetState()" title="Hapus semua progress"
          style="flex-shrink:0;margin-top:4px;padding:6px 12px;background:var(--red-light);color:var(--red);border:1.5px solid #fca5a5;border-radius:var(--radius-sm);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:var(--transition);"
          onmouseover="this.style.background='var(--red)';this.style.color='white'"
          onmouseout="this.style.background='var(--red-light)';this.style.color='var(--red)'">
          ↺ Reset
        </button>
      </div>
    </div>
    <div class="session-list">${listHTML}</div>
    <div class="page-pad mt-16">
      ${renderBadgeShelf()}
    </div>
    ${
      S.sessionsCompleted.size === 5
        ? `
      <div class="page-pad mt-16">
        <button class="btn btn-success" onclick="renderComplete();navigate('screen-complete')">Lihat Sertifikat 🎓</button>
      </div>`
        : ""
    }
    <div style="height:24px"></div>
  `;
}

// Papan lencana — yang terkunci tetap ditampilkan (abu-abu) supaya
// warga belajar tahu apa yang masih bisa diraih.
// Dibungkus mount point agar bisa disegarkan saat lencana baru terbuka,
// tanpa harus merender ulang seluruh layar.
function renderBadgeShelf() {
  return `<div class="badge-shelf-mount">${badgeShelfHTML()}</div>`;
}

function refreshBadgeShelves() {
  document.querySelectorAll(".badge-shelf-mount").forEach((mount) => {
    mount.innerHTML = badgeShelfHTML();
  });
}

function badgeShelfHTML() {
  const owned = S.badges.size;
  return `
    <div class="card">
      <div class="card-title">🏅 Lencanaku <span class="badge-count">${owned}/${BADGES.length}</span></div>
      <p class="text-muted mb-12" style="font-size:12px;">Kumpulkan lencana dengan membuat keputusan investasi yang cerdas.</p>
      <div class="badge-grid">
        ${BADGES.map((b, i) => {
          const got = S.badges.has(b.id);
          return `
          <div class="badge-chip ${got ? "unlocked" : "locked"}"
               style="--bc:${b.warna};animation-delay:${i * 45}ms"
               tabindex="0" role="img"
               aria-label="${b.nama} — ${got ? "terbuka" : "terkunci"}. ${b.syarat}">
            <div class="bc-icon">${got ? b.icon : "🔒"}</div>
            <div class="bc-name">${b.nama}</div>
            <div class="bc-req">${b.syarat}</div>
          </div>`;
        }).join("")}
      </div>
    </div>
  `;
}

function goSession(id) {
  const map = {
    s1: renderS1,
    s2: renderS2,
    s3: renderS3,
    s4: renderS4,
    s5: renderS5,
  };
  if (map[id]) map[id]();
}

// ─── SESSION 1 — Tabungan vs Investasi ───────────────────────────────────────
function renderS1() {
  $("screen-s1").innerHTML = `
    <div class="session-header">
      <div style="font-size:12px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Sesi 1 dari 5</div>
      <h2 class="section-title">Tabungan vs Investasi: Uang yang Bekerja</h2>
      <p class="section-sub">Pelajari perbedaan menabung dan berinvestasi, serta bagaimana uang bisa tumbuh melampaui inflasi.</p>
    </div>
    <div class="page-pad">
      <div class="card">
        <div class="card-title">💡 Refleksi Awal</div>
        <p class="text-muted mb-12">Sebelum mulai, jawab pertanyaan ini:</p>
        <p style="font-size:15px;font-weight:600;margin-bottom:12px;">"Jika kamu mendapat Rp 500.000 hari ini, apa yang akan kamu lakukan?"</p>
        <textarea class="reflect-textarea" id="reflect-before" placeholder="Tuliskan jawabanmu di sini..." rows="3"
          oninput="S.reflections.s1Before=this.value;saveState()"></textarea>
      </div>
      <div class="card">
        <div class="card-title">🧮 Kalkulator Investasi</div>
        <p class="text-muted mb-12">Lihat bagaimana uangmu berkembang dalam berbagai skenario.</p>
        <div class="calc-input-group">
          <label class="calc-label" for="calc-amount">Jumlah Uang (Rp)</label>
          <input class="calc-input" id="calc-amount" type="number" value="1000000" min="100000" step="100000" oninput="updateCalc()">
        </div>
        <div class="calc-input-group">
          <label class="calc-label" for="calc-years">Jangka Waktu (Tahun)</label>
          <input class="calc-input" id="calc-years" type="number" value="10" min="1" max="30" oninput="updateCalc()">
        </div>
        <div id="calc-results"></div>
      </div>
      <div class="card">
        <div class="card-title">📚 Konsep Dasar</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="background:var(--blue-light);border-radius:var(--radius);padding:14px;">
            <div style="font-weight:700;color:var(--blue);margin-bottom:4px;">📌 Menabung</div>
            <div style="font-size:13px;color:var(--gray-700);">Menyimpan uang di bank dengan aman. Bunga 2–4%/tahun. Cocok untuk dana darurat (3–6 bulan pengeluaran). Modal dijamin LPS.</div>
          </div>
          <div style="background:var(--green-light);border-radius:var(--radius);padding:14px;">
            <div style="font-weight:700;color:var(--green);margin-bottom:4px;">📌 Berinvestasi</div>
            <div style="font-size:13px;color:var(--gray-700);">Menempatkan uang di instrumen yang tumbuh lebih cepat dari inflasi. Ada risiko, tapi potensi imbal hasil jauh lebih tinggi.</div>
          </div>
          <div style="background:var(--gold-light);border-radius:var(--radius);padding:14px;">
            <div style="font-weight:700;color:var(--gold);margin-bottom:4px;">📌 Inflasi</div>
            <div style="font-size:13px;color:var(--gray-700);">Harga barang naik rata-rata 3–5%/tahun di Indonesia. Jika uangmu tidak tumbuh lebih cepat dari inflasi, daya belimu berkurang!</div>
          </div>
        </div>
      </div>
      <div id="s1-quiz-result"></div>
      <div id="s1-reflect-after" class="hidden card">
        <div class="card-title">💭 Refleksi Akhir</div>
        <p style="font-size:15px;font-weight:600;margin-bottom:12px;">"Setelah melihat simulasi ini, apakah jawabanmu berubah? Mengapa?"</p>
        <textarea class="reflect-textarea" id="reflect-after" placeholder="Bandingkan dengan jawabanmu di awal tadi..." rows="3"
          oninput="S.reflections.s1After=this.value;saveState()"></textarea>
        <button class="btn btn-success mt-16" onclick="completeS1()">Selesaikan Sesi 1 ✓</button>
      </div>
      <button class="btn btn-primary" id="s1-btn-quiz" onclick="startS1Quiz()">Lanjut ke Kuis →</button>
    </div>
  `;
  navigate("screen-s1");
  updateCalc();
  // Restore saved inputs
  restoreInputs({ "reflect-before": S.reflections.s1Before });
  // If quiz already done, restore its state
  if (S.scores.s1 > 0) {
    $("s1-btn-quiz").classList.add("hidden");
    $("s1-quiz-result").innerHTML =
      `<div class="card"><div class="quiz-score-box"><p>✅ Kuis sudah dikerjakan — skor tersimpan.</p></div></div>`;
    $("s1-reflect-after").classList.remove("hidden");
    restoreInputs({ "reflect-after": S.reflections.s1After });
  }
}

function updateCalc() {
  const amount = parseFloat($("calc-amount").value) || 1000000;
  const years = parseInt($("calc-years").value) || 10;
  const inflasi = 0.04,
    bungaBank = 0.03,
    investReturn = 0.08;

  const saved = amount * Math.pow(1 + bungaBank, years);
  const savedReal = amount * Math.pow(1 + bungaBank - inflasi, years);
  const invested = amount * Math.pow(1 + investReturn, years);
  const investedReal = amount * Math.pow(1 + investReturn - inflasi, years);
  const max = invested;

  const bars = [
    { label: "🛒 Dihabiskan", val: amount * 0.05, color: "#e02424" },
    { label: "🏦 Ditabung", val: saved, color: "#d97706" },
    { label: "📈 Diinvestasikan", val: invested, color: "#057a55" },
  ];

  $("calc-results").innerHTML = `
    <div class="calc-scenarios">
      <div class="scenario-card spent">
        <div class="sc-label" style="color:#991b1b">🛒 Dihabiskan Hari Ini</div>
        <div class="sc-amount" style="color:#991b1b">Rp 0</div>
        <div class="sc-desc">Tidak ada yang tersisa setelah ${years} tahun</div>
      </div>
      <div class="scenario-card saved">
        <div class="sc-label" style="color:#92400e">🏦 Ditabung (${(bungaBank * 100).toFixed(0)}%/tahun)</div>
        <div class="sc-amount" style="color:#92400e">${idr(saved)}</div>
        <div class="sc-desc">Daya beli riil hanya ${idr(savedReal)} setelah inflasi ${(inflasi * 100).toFixed(0)}%</div>
      </div>
      <div class="scenario-card invested">
        <div class="sc-label" style="color:#065f46">📈 Diinvestasikan (${(investReturn * 100).toFixed(0)}%/tahun)</div>
        <div class="sc-amount" style="color:#065f46">${idr(invested)}</div>
        <div class="sc-desc">Daya beli riil ${idr(investedReal)} — uangmu mengalahkan inflasi!</div>
      </div>
    </div>
    <div class="bar-chart">
      ${bars
        .map(
          (b) => `
        <div class="bar-row">
          <div class="bar-label">${b.label}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${Math.max(2, Math.round((b.val / max) * 100))}%;background:${b.color}">${idr(b.val)}</div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
    <p class="text-muted" style="font-size:11px;text-align:center;margin-top:4px;">*Ilustrasi edukatif. Imbal hasil aktual dapat berbeda.</p>
  `;
}

function startS1Quiz() {
  $("s1-btn-quiz").classList.add("hidden");
  Quiz.start(
    QUIZ_S1,
    "Kuis Sesi 1 · Tabungan & Investasi",
    "screen-s1",
    (score, total, pct100) => {
      S.scores.s1 = Math.round(pct100 * 0.3);
      saveState();
      navigate("screen-s1");
      $("s1-quiz-result").innerHTML = `
      <div class="card">
        <div class="quiz-score-box">
          <div class="score-num">${score}/${total}</div>
          <p>${pct100}% benar — ${pct100 >= 70 ? "Bagus! Lanjutkan ke refleksi." : "Tetap semangat!"}</p>
        </div>
      </div>
    `;
      $("s1-reflect-after").classList.remove("hidden");
      setTimeout(
        () =>
          $("screen-container").scrollTo({ top: 99999, behavior: "smooth" }),
        100,
      );
    },
  );
}

function completeS1() {
  S.sessionsCompleted.add("s1");
  saveState();
  celebrateSession(1, S.scores.s1);
  unlockBadge("langkah_pertama");
}

// ─── SESSION 2 — Instrumen Investasi ─────────────────────────────────────────
function renderS2() {
  $("screen-s2").innerHTML = `
    <div class="session-header">
      <div style="font-size:12px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Sesi 2 dari 5</div>
      <h2 class="section-title">Kenalan dengan Instrumen Investasi</h2>
      <p class="section-sub">Klik kartu instrumen untuk melihat detail: risiko, potensi imbal hasil, dan cocok untuk siapa.</p>
    </div>
    <div class="instrument-grid" id="instr-grid"></div>
    <div id="instr-detail-box"></div>
    <div class="page-pad">
      <div id="s2-quiz-result"></div>
      <div id="s2-reflect-section" class="hidden">
        <div class="card">
          <div class="card-title">🤔 Profil Investorku</div>
          <p class="text-muted mb-12">Berdasarkan yang kamu pelajari, instrumen mana yang paling cocok untukmu saat ini?</p>
          <select class="calc-input" id="s2-instr-pick" onchange="S.reflections.s2InstrPick=this.value;saveState()">
            <option value="">-- Pilih instrumen --</option>
            ${INSTRUMENTS.map((i) => `<option value="${i.id}">${i.nama}</option>`).join("")}
          </select>
          <textarea class="reflect-textarea mt-12" id="s2-reason" placeholder="Mengapa kamu memilih instrumen tersebut?" rows="3"
            oninput="S.reflections.s2Reason=this.value;saveState()"></textarea>
          <button class="btn btn-success mt-16" onclick="completeS2()">Selesaikan Sesi 2 ✓</button>
        </div>
      </div>
      <button class="btn btn-primary" id="s2-btn-quiz" onclick="startS2Quiz()">Lanjut ke Kuis →</button>
    </div>
  `;

  const grid = $("instr-grid");
  INSTRUMENTS.forEach((instr) => {
    const card = el("div", "instr-card");
    card.style.cssText = `border-color:${instr.warna};background:${instr.warnaLight}`;
    card.innerHTML = `
      <span class="ic-icon">${instr.icon}</span>
      <div class="ic-name" style="color:${instr.warna}">${instr.nama}</div>
      <span class="ic-risk" style="background:${instr.warna};color:white">Risiko: ${instr.risiko}</span>
      <div class="ic-return">${instr.imbalHasil}</div>
    `;
    card.addEventListener("click", () => showInstrDetail(instr.id));
    grid.appendChild(card);
  });

  navigate("screen-s2");
  // Restore saved inputs and section state
  if (S.scores.s2 > 0) {
    $("s2-btn-quiz").classList.add("hidden");
    $("s2-quiz-result").innerHTML =
      `<div class="card"><div class="quiz-score-box"><p>✅ Kuis sudah dikerjakan — skor tersimpan.</p></div></div>`;
    $("s2-reflect-section").classList.remove("hidden");
    restoreInputs({ "s2-reason": S.reflections.s2Reason });
    if (S.reflections.s2InstrPick)
      $("s2-instr-pick").value = S.reflections.s2InstrPick;
  }
}

function showInstrDetail(id) {
  const instr = INSTRUMENTS.find((i) => i.id === id);
  const box = $("instr-detail-box");
  box.innerHTML = `
    <div class="instr-detail" style="border-color:${instr.warna}">
      <div class="id-header">
        <div class="id-icon">${instr.icon}</div>
        <div>
          <div class="id-name" style="color:${instr.warna}">${instr.nama}</div>
          <div class="id-subtitle">Cocok untuk: investor ${instr.profilCocok}</div>
        </div>
      </div>
      <div class="id-desc">${instr.deskripsi}</div>
      <div class="id-row">
        <div class="id-pill" style="background:${instr.warnaLight}">
          <div class="ip-label">Risiko</div>
          <div class="ip-value" style="color:${instr.warna}">${instr.risiko}</div>
        </div>
        <div class="id-pill" style="background:${instr.warnaLight}">
          <div class="ip-label">Imbal Hasil</div>
          <div class="ip-value" style="color:${instr.warna}">${instr.imbalHasil}</div>
        </div>
      </div>
      <div style="font-size:13px;color:var(--gray-500);margin-bottom:12px;"><strong>Contoh:</strong> ${instr.contoh}</div>
      <div class="pro-con">
        <div><h4 style="color:var(--green)">✓ Keunggulan</h4><ul class="pro-list">${instr.keuntungan.map((k) => `<li>${k}</li>`).join("")}</ul></div>
        <div><h4 style="color:var(--red)">✗ Kelemahan</h4><ul class="con-list">${instr.kerugian.map((k) => `<li>${k}</li>`).join("")}</ul></div>
      </div>
      <button class="btn btn-secondary mt-12" onclick="$('instr-detail-box').innerHTML=''">Tutup ✕</button>
    </div>
  `;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function startS2Quiz() {
  $("s2-btn-quiz").classList.add("hidden");
  Quiz.start(
    QUIZ_S2,
    "Kuis Sesi 2 · Instrumen Investasi",
    "screen-s2",
    (score, total, pct100) => {
      S.scores.s2 = Math.round(pct100 * 0.3);
      saveState();
      if (pct100 >= 70) unlockBadge("kenal_instrumen");
      navigate("screen-s2");
      $("s2-quiz-result").innerHTML = `
      <div class="card">
        <div class="quiz-score-box">
          <div class="score-num">${score}/${total}</div>
          <p>${pct100}% benar — ${pct100 >= 70 ? "Mantap! Lanjutkan ke refleksi." : "Coba tinjau kartu instrumen lagi!"}</p>
        </div>
      </div>
    `;
      $("s2-reflect-section").classList.remove("hidden");
      setTimeout(
        () =>
          $("screen-container").scrollTo({ top: 99999, behavior: "smooth" }),
        100,
      );
    },
  );
}

function completeS2() {
  S.sessionsCompleted.add("s2");
  saveState();
  celebrateSession(2, S.scores.s2);
}

// ─── SESSION 3 — Simulasi Inti ────────────────────────────────────────────────
let profileQIdx = 0;
// Nilai portofolio yang terakhir ditampilkan, agar angkanya bisa "berjalan"
// dari nilai lama ke nilai baru saat dampak berita diterapkan.
let simLastTotal = null;

function renderS3() {
  if (S.portfolio.profilInvestor === null) {
    profileQIdx = 0;
    S.profileAnswers = [];
    renderProfileQuiz();
  } else {
    renderSimulation();
  }
}

function renderProfileQuiz() {
  const q = INVESTOR_PROFILE_QUESTIONS[profileQIdx];
  const total = INVESTOR_PROFILE_QUESTIONS.length;
  const pctBar = Math.round(((profileQIdx + 1) / total) * 100);

  $("screen-s3-profile").innerHTML = `
    <div class="quiz-focus-wrap">
      <div class="qf-label">Sesi 3 · Profil Investor — ${profileQIdx + 1} dari ${total}</div>
      <div class="qf-track"><div class="qf-fill" style="width:${pctBar}%"></div></div>
      <div class="qf-counter">Pertanyaan ${profileQIdx + 1} dari ${total} · ± 2 menit</div>
      <div class="qf-question">${q.pertanyaan}</div>
      <div class="qf-options">
        ${q.opsi
          .map(
            (o, i) => `
          <button class="quiz-opt" onclick="answerProfile(${o.nilai}, ${i})">${o.teks}</button>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
  navigate("screen-s3-profile");
}

function answerProfile(nilai, btnIdx) {
  S.profileAnswers.push(nilai);
  const opts = document.querySelectorAll("#screen-s3-profile .quiz-opt");
  opts.forEach((o) => o.classList.add("disabled"));
  opts[btnIdx].classList.add("correct");
  setTimeout(() => {
    profileQIdx++;
    if (profileQIdx < INVESTOR_PROFILE_QUESTIONS.length) {
      renderProfileQuiz();
      return;
    }
    finishProfileQuiz();
  }, 450);
}

function finishProfileQuiz() {
  const avg =
    S.profileAnswers.reduce((a, b) => a + b, 0) / S.profileAnswers.length;
  S.portfolio.profilInvestor =
    avg <= 2 ? "konservatif" : avg <= 3 ? "moderat" : "agresif";
  saveState();
  const rec = RECOMMENDED_ALLOCATIONS[S.portfolio.profilInvestor];

  $("screen-s3-profile").innerHTML = `
    <div class="quiz-focus-wrap">
      <div class="qf-label">Sesi 3 · Hasil Profil Investor</div>
      <div class="qf-result">
        <div class="big-emoji">${rec.emoji}</div>
        <div style="font-size:28px;font-weight:900;color:${rec.warna};margin-bottom:8px;">${rec.label}</div>
        <div style="font-size:14px;color:var(--gray-600,var(--gray-500));margin-bottom:24px;line-height:1.6;max-width:320px;">${rec.deskripsi}</div>
        <div style="background:var(--gray-50);border-radius:var(--radius-lg);padding:20px;width:100%;max-width:360px;text-align:left;margin-bottom:24px;">
          <div style="font-size:13px;font-weight:700;color:var(--gray-700);margin-bottom:12px;">📊 Rekomendasi Alokasi Awal</div>
          ${INSTRUMENTS.map(
            (i) => `
            <div class="bar-row" style="margin-bottom:10px;">
              <div class="bar-label" style="font-size:12px">${i.icon} ${i.nama.split(" ")[0]}</div>
              <div class="bar-track"><div class="bar-fill" style="background:${i.warna};width:${rec[i.id]}%">${rec[i.id]}%</div></div>
            </div>
          `,
          ).join("")}
        </div>
        <button class="btn btn-primary" onclick="startSimulation()">
          Mulai Simulasi dengan Modal ${idr(S.portfolio.modalAwal)} →
        </button>
      </div>
    </div>
  `;
}

function startSimulation() {
  const rec = RECOMMENDED_ALLOCATIONS[S.portfolio.profilInvestor];
  S.portfolio.alokasi = {
    saham: rec.saham,
    reksa_dana: rec.reksa_dana,
    emas: rec.emas,
    kas: rec.kas,
  };
  S.portfolio.nilaiAset = {
    saham: (S.portfolio.modalAwal * rec.saham) / 100,
    reksa_dana: (S.portfolio.modalAwal * rec.reksa_dana) / 100,
    emas: (S.portfolio.modalAwal * rec.emas) / 100,
    kas: (S.portfolio.modalAwal * rec.kas) / 100,
  };
  S.portfolio.historyRonde = [
    { ronde: 0, total: S.portfolio.modalAwal, label: "Awal" },
  ];
  S.portfolio.currentRonde = 1;
  S.portfolio.phase = "allocation";
  S.portfolio.decisionScores = [];
  simLastTotal = null;
  saveState();
  renderSimulation();
}

function renderSimulation() {
  navigate("screen-s3-sim");
  updateSimUI();
}

function updateSimUI() {
  const ronde = S.portfolio.currentRonde;
  const phase = S.portfolio.phase;
  const total = totalPortfolio();
  const change = changePercent();
  const news = ronde <= 5 ? NEWS_ROUNDS[ronde - 1] : null;

  const chgClass = change > 0.005 ? "up" : change < -0.005 ? "down" : "flat";
  const chgStr =
    change > 0.005
      ? "+" + (change * 100).toFixed(2) + "%"
      : change < -0.005
        ? (change * 100).toFixed(2) + "%"
        : "±0%";

  const dots = Array.from({ length: 5 }, (_, i) => {
    const r = i + 1;
    const cls = r < ronde ? "done" : r === ronde ? "active" : "";
    return `<div class="round-dot ${cls}">${r < ronde ? "✓" : r}</div>`;
  }).join("");

  let phaseHTML = "";

  if (ronde > 5) {
    phaseHTML = `
      <div class="card" style="text-align:center;">
        <div style="font-size:56px;margin-bottom:12px;">🏁</div>
        <h3 style="font-size:20px;font-weight:800;margin-bottom:8px;">5 Ronde Selesai!</h3>
        <div style="font-size:28px;font-weight:900;color:${change >= 0 ? "var(--green)" : "var(--red)"};margin:8px 0;">${idr(total)}</div>
        <div style="color:${change >= 0 ? "var(--green)" : "var(--red)"};font-weight:700;font-size:16px;margin-bottom:16px;">${chgStr} dari modal awal</div>
        <button class="btn btn-primary" onclick="goToReflectS3()">Lanjut ke Refleksi →</button>
      </div>
    `;
  } else if (phase === "allocation") {
    const highRisk = S.portfolio.alokasi.saham > 70;
    phaseHTML = `
      ${highRisk ? `<div class="warning-box"><strong>⚠️ Hati-hati!</strong> Alokasi saham sangat tinggi (${S.portfolio.alokasi.saham}%). Pertimbangkan diversifikasi ke aset lain.</div>` : ""}
      <div class="card">
        <div class="card-title">🎛️ Atur Alokasi — Ronde ${ronde}</div>
        <p class="text-muted mb-12" style="font-size:13px;">Total alokasi harus tepat 100%. Geser slider lalu tekan Konfirmasi.</p>
        <div class="sliders-wrap" id="sliders-wrap"></div>
        <div class="action-grid" style="margin-bottom:14px;">
          ${INSTRUMENTS.slice(0, 3)
            .map(
              (i) => `
            <div>
              <div style="font-size:11px;font-weight:700;color:${i.warna};text-align:center;margin-bottom:5px;">${i.icon} ${i.nama.split(" ")[0]}</div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <button class="action-btn buy" onclick="adjustSlider('${i.id}',10)">+ Beli</button>
                <button class="action-btn hold" onclick="showToast('Tahan posisi ${i.nama.split(" ")[0]}','')">= Tahan</button>
                <button class="action-btn sell" onclick="adjustSlider('${i.id}',-10)">− Jual</button>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        <button class="btn btn-secondary mb-12" onclick="autoAllocate()">⚡ Alokasi Otomatis (profil ${RECOMMENDED_ALLOCATIONS[S.portfolio.profilInvestor].label})</button>
        <button class="btn btn-primary" onclick="confirmRound()">Konfirmasi &amp; Lihat Dampak Berita Ronde ${ronde} →</button>
      </div>
    `;
  } else {
    // Result phase
    const n = news;
    const prevTotal =
      S.portfolio.historyRonde[S.portfolio.historyRonde.length - 2]?.total ||
      S.portfolio.modalAwal;
    const roundChange = (total - prevTotal) / prevTotal;
    const rndClass =
      roundChange > 0.005
        ? "positive"
        : roundChange < -0.005
          ? "negative"
          : "neutral";

    phaseHTML = `
      <div class="news-card ${n.kategori}">
        <div class="news-header"><div class="news-ikon">${n.ikon}</div><div class="news-judul">${n.judul}</div></div>
        <div class="news-body">${n.berita}</div>
      </div>
      <div class="result-panel ${rndClass}">
        <h3>📊 Hasil Ronde ${ronde}</h3>
        ${INSTRUMENTS.map((i, ix) => {
          const imp = n.dampak[i.id];
          const noise = Math.random() * 0.02 - 0.01;
          const ti = clamp(imp + noise, -0.15, 0.15);
          const arrow = ti > 0.002 ? "⬆️" : ti < -0.002 ? "⬇️" : "➡️";
          const cl = ti > 0.002 ? "up" : ti < -0.002 ? "down" : "flat";
          return `
            <div class="asset-result-row" style="animation-delay:${ix * 90}ms">
              <span>${i.icon} ${i.nama}</span>
              <span style="font-weight:600">${idr(S.portfolio.nilaiAset[i.id])}
              <span class="ar-change ${cl}">${arrow} ${pct(ti)}</span></span>
            </div>
          `;
        }).join("")}
      </div>
      <div style="background:var(--gray-50);border-radius:var(--radius);padding:14px;margin-bottom:12px;">
        <div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;margin-bottom:8px;">Analisis per Aset</div>
        ${Object.entries(n.analisisAset)
          .map(
            ([, v]) =>
              `<div style="font-size:13px;padding:4px 0;border-bottom:1px solid var(--gray-100);">${v}</div>`,
          )
          .join("")}
      </div>
      <div class="lesson-box">${n.pelajaranKunci}</div>
      ${
        ronde < 5
          ? `<button class="btn btn-primary" onclick="nextRound()">Lanjut ke Ronde ${ronde + 1} →</button>`
          : `<button class="btn btn-success" onclick="nextRound()">Selesaikan Simulasi ✓</button>`
      }
    `;
  }

  // Angka mulai dari nilai lama lalu berjalan ke nilai baru
  const startFrom = simLastTotal === null ? total : simLastTotal;

  $("screen-s3-sim").innerHTML = `
    <div class="portfolio-dashboard">
      <div style="height:16px"></div>
      <div class="portfolio-summary">
        <div class="ps-row">
          <div><div class="ps-label">Nilai Portofolio</div><div class="ps-amount" id="ps-amount">${idr(startFrom)}</div></div>
          <div class="ps-change ${chgClass}">${chgStr}</div>
        </div>
        <div class="ps-sub">Modal awal: ${idr(S.portfolio.modalAwal)} · ${ronde <= 5 ? `Ronde ${ronde} dari 5` : "Selesai!"}</div>
      </div>
      <div class="round-indicator">${dots}</div>
      ${S.portfolio.historyRonde.length >= 2 ? renderChart() : ""}
      ${phaseHTML}
      <p class="text-muted" style="text-align:center;font-size:11px;padding:0;margin:8px 0 16px;">⚠️ Simulasi pendidikan — bukan saran investasi nyata</p>
    </div>
  `;

  if (startFrom !== total) countUp($("ps-amount"), startFrom, total, 1100);
  simLastTotal = total;

  if (phase === "allocation") setupSliders();
}

function renderChart() {
  const history = S.portfolio.historyRonde;
  const W = 320,
    H = 110,
    padL = 8,
    padR = 8,
    padT = 10,
    padB = 20;
  const vals = history.map((h) => h.total);
  const minV = Math.min(...vals) * 0.97;
  const maxV = Math.max(...vals) * 1.03;
  const xStep = (W - padL - padR) / Math.max(1, history.length - 1);
  const toX = (i) => padL + i * xStep;
  const toY = (v) =>
    padT + (1 - (v - minV) / (maxV - minV)) * (H - padT - padB);
  const points = history.map((h, i) => `${toX(i)},${toY(h.total)}`).join(" ");
  const areaPoints = `${padL},${H - padB} ${points} ${toX(history.length - 1)},${H - padB}`;
  const color = vals[vals.length - 1] >= vals[0] ? "#057a55" : "#e02424";
  const labels = history
    .map(
      (h, i) =>
        `<text x="${toX(i)}" y="${H - 3}" text-anchor="middle" font-size="9" fill="#9ca3af">${h.label}</text>`,
    )
    .join("");

  return `
    <div class="chart-wrap">
      <div class="chart-title">📈 Grafik Nilai Portofolio</div>
      <svg id="portfolio-chart" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
        </linearGradient></defs>
        <polygon class="chart-area" points="${areaPoints}" fill="url(#cg)"/>
        <polyline class="chart-line" points="${points}" pathLength="1" fill="none" stroke="${color}"
                  stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        ${history
          .map(
            (h, i) =>
              `<circle class="chart-dot" cx="${toX(i)}" cy="${toY(h.total)}" r="4" fill="${color}"
                       stroke="white" stroke-width="2" style="animation-delay:${300 + i * 130}ms"/>`,
          )
          .join("")}
        ${labels}
      </svg>
    </div>
  `;
}

function setupSliders() {
  const wrap = $("sliders-wrap");
  if (!wrap) return;
  wrap.innerHTML = `
    ${INSTRUMENTS.map(
      (i) => `
      <div class="slider-row">
        <div class="slider-header">
          <div class="slider-name" style="color:${i.warna}">${i.icon} ${i.nama}</div>
          <div>
            <span class="slider-pct" id="pct-${i.id}">${S.portfolio.alokasi[i.id]}%</span>
            <span class="slider-val" id="val-${i.id}"> · ${idr(S.portfolio.nilaiAset[i.id])}</span>
          </div>
        </div>
        <input type="range" id="sl-${i.id}" min="0" max="100" value="${S.portfolio.alokasi[i.id]}"
               style="accent-color:${i.warna}" oninput="onSliderChange('${i.id}')">
      </div>
    `,
    ).join("")}
    <div class="total-badge" id="total-badge"></div>
  `;
  refreshTotalBadge();
}

function onSliderChange(id) {
  const val = parseInt($(`sl-${id}`).value);
  S.portfolio.alokasi[id] = val;
  const totalVal = totalPortfolio();
  S.portfolio.nilaiAset[id] = totalVal > 0 ? (totalVal * val) / 100 : 0;
  $(`pct-${id}`).textContent = val + "%";
  $(`val-${id}`).textContent = " · " + idr(S.portfolio.nilaiAset[id]);
  refreshTotalBadge();
  // Risk warning
  const existing = document.querySelector(".warning-box");
  if (S.portfolio.alokasi.saham > 70) {
    if (!existing) {
      const w = el(
        "div",
        "warning-box",
        `<strong>⚠️ Hati-hati!</strong> Alokasi saham ${S.portfolio.alokasi.saham}% — risiko sangat tinggi. Pertimbangkan diversifikasi.`,
      );
      const card = document.querySelector("#screen-s3-sim .card");
      if (card) card.insertBefore(w, card.firstChild);
    }
  } else if (existing) {
    existing.remove();
  }
}

function refreshTotalBadge() {
  const t = Object.values(S.portfolio.alokasi).reduce((a, b) => a + b, 0);
  const badge = $("total-badge");
  if (!badge) return;
  badge.className = `total-badge ${t === 100 ? "ok" : t > 100 ? "over" : "under"}`;
  badge.textContent =
    t === 100
      ? "✓ Total 100% — siap dikonfirmasi!"
      : t > 100
        ? `⚠️ Total ${t}% — kurangi ${t - 100}% lagi`
        : `📊 Total ${t}% — tambah ${100 - t}% lagi`;
}

function adjustSlider(id, delta) {
  const newVal = clamp((S.portfolio.alokasi[id] || 0) + delta, 0, 100);
  S.portfolio.alokasi[id] = newVal;
  const slEl = $(`sl-${id}`);
  if (slEl) {
    slEl.value = newVal;
    onSliderChange(id);
  }
}

function autoAllocate() {
  const rec = RECOMMENDED_ALLOCATIONS[S.portfolio.profilInvestor];
  S.portfolio.alokasi = {
    saham: rec.saham,
    reksa_dana: rec.reksa_dana,
    emas: rec.emas,
    kas: rec.kas,
  };
  setupSliders();
  showToast("Alokasi otomatis sesuai profil " + rec.label, "success");
}

function confirmRound() {
  const total = Object.values(S.portfolio.alokasi).reduce((a, b) => a + b, 0);
  if (total !== 100) {
    showToast(`Alokasi harus tepat 100% (sekarang ${total}%)`, "error");
    return;
  }

  const ronde = S.portfolio.currentRonde;
  const news = NEWS_ROUNDS[ronde - 1];
  const totalVal = totalPortfolio();

  INSTRUMENTS.forEach((i) => {
    const noise = Math.random() * 0.02 - 0.01;
    const impact = clamp(news.dampak[i.id] + noise, -0.15, 0.15);
    const nilaiSebelum = (totalVal * S.portfolio.alokasi[i.id]) / 100;
    S.portfolio.nilaiAset[i.id] = nilaiSebelum * (1 + impact);
  });

  S.portfolio.historyRonde.push({
    ronde,
    total: totalPortfolio(),
    label: `R${ronde}`,
  });

  // Score: diversification quality
  const diversified = Object.values(S.portfolio.alokasi).filter(
    (v) => v > 5,
  ).length;
  S.portfolio.decisionScores.push(
    diversified >= 3 ? 4 : diversified === 2 ? 2 : 1,
  );

  S.portfolio.phase = "result";
  saveState();
  updateSimUI();

  // Lencana: menyebar modal ke keempat aset sekaligus
  if (diversified === 4) unlockBadge("diversifikator");
  // Lencana: berlindung di emas tepat saat rupiah melemah (Ronde 4)
  if (ronde === 4 && S.portfolio.alokasi.emas >= 15) unlockBadge("tameng_emas");
}

function nextRound() {
  S.portfolio.currentRonde++;
  S.portfolio.phase = "allocation";
  // Normalize alokasi from current nilaiAset
  const total = totalPortfolio();
  INSTRUMENTS.forEach((i) => {
    S.portfolio.alokasi[i.id] = Math.round(
      (S.portfolio.nilaiAset[i.id] / total) * 100,
    );
  });
  // Fix rounding drift
  const sum = Object.values(S.portfolio.alokasi).reduce((a, b) => a + b, 0);
  if (sum !== 100) S.portfolio.alokasi.kas += 100 - sum;
  saveState();
  updateSimUI();
}

function goToReflectS3() {
  const avg =
    S.portfolio.decisionScores.length > 0
      ? S.portfolio.decisionScores.reduce((a, b) => a + b, 0) /
        S.portfolio.decisionScores.length
      : 2;
  S.scores.s3 = Math.round((avg / 4) * 40);
  saveState();
  if (changePercent() > 0) unlockBadge("cuan_pertama");

  $("screen-s3-reflect").innerHTML = `
    <div class="session-header">
      <div style="font-size:12px;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Sesi 3 — Refleksi</div>
      <h2 class="section-title">💭 Refleksi Simulasi</h2>
      <p class="section-sub">Renungkan pengalamanmu — ini bagian terpenting dari belajar investasi.</p>
    </div>
    <div class="page-pad">
      <div class="card">
        <div class="card-title">📊 Hasil Akhir Simulasimu</div>
        <div style="text-align:center;padding:16px 0;">
          <div style="font-size:34px;font-weight:900;color:${changePercent() >= 0 ? "var(--green)" : "var(--red)"};">${idr(totalPortfolio())}</div>
          <div style="font-size:16px;font-weight:700;color:${changePercent() >= 0 ? "var(--green)" : "var(--red)"};">${pct(changePercent())} dari modal awal</div>
        </div>
        ${changePercent() < -0.05 ? `<div class="lesson-box">💡 Portofolio merugi, tapi ini pelajaran berharga! Investor terbaik pun pernah rugi — yang penting: apa yang bisa dipelajari?</div>` : ""}
        ${changePercent() > 0.1 ? `<div class="lesson-box" style="background:var(--green-light);border-color:#6ee7b7;color:#064e3b;">🎉 Portofolio bertumbuh! Pertahankan kebiasaan analisis sebelum keputusan investasi.</div>` : ""}
      </div>
      <div class="reflect-form">
        <div class="reflect-block">
          <div class="reflect-question">1. Keputusan mana yang paling berpengaruh pada portofoliomu? Mengapa?</div>
          <textarea class="reflect-textarea" id="ref3-1" placeholder="Ceritakan pengalamanmu..." rows="3"
            oninput="S.reflections.s3q1=this.value;saveState()"></textarea>
        </div>
        <div class="reflect-block">
          <div class="reflect-question">2. Apa yang akan kamu ubah jika mengulang simulasi dari awal?</div>
          <textarea class="reflect-textarea" id="ref3-2" placeholder="Strategi apa yang ingin kamu coba?" rows="3"
            oninput="S.reflections.s3q2=this.value;saveState()"></textarea>
        </div>
        <div class="reflect-block">
          <div class="reflect-question">3. Pelajaran paling berharga yang kamu dapat dari simulasi ini?</div>
          <textarea class="reflect-textarea" id="ref3-3" placeholder="Apa insight terpentingmu?" rows="3"
            oninput="S.reflections.s3q3=this.value;saveState()"></textarea>
        </div>
        <button class="btn btn-success" onclick="completeS3()">Selesaikan Sesi 3 ✓</button>
      </div>
    </div>
  `;
  navigate("screen-s3-reflect");
  restoreInputs({
    "ref3-1": S.reflections.s3q1,
    "ref3-2": S.reflections.s3q2,
    "ref3-3": S.reflections.s3q3,
  });
}

function completeS3() {
  S.sessionsCompleted.add("s3");
  saveState();
  celebrateSession(3, S.scores.s3);
}

// ─── SESSION 4 — Analisis Portofolio ─────────────────────────────────────────
function renderS4() {
  if (!S.sessionsCompleted.has("s3")) {
    showToast("Selesaikan Sesi 3 dulu", "warning");
    return;
  }

  const total = totalPortfolio();
  const change = changePercent();
  const modalAwal = S.portfolio.modalAwal;

  const peers = [
    {
      label: "Portofolio Terbaik (Anonim)",
      total: modalAwal * 1.14,
      strategi: "Agresif — Saham & sektoral infrastruktur",
    },
    {
      label:
        total > modalAwal * 1.05
          ? "Portofoliomu 🌟"
          : "Portofolio ke-2 (Anonim)",
      total: Math.max(total, modalAwal * 1.03),
      strategi: "Moderat — Diversifikasi merata",
    },
    {
      label:
        total > modalAwal * 1.05 ? "Portofolio ke-3 (Anonim)" : "Portofoliomu",
      total,
      strategi: `${RECOMMENDED_ALLOCATIONS[S.portfolio.profilInvestor || "moderat"].label} — Profilmu`,
    },
  ].sort((a, b) => b.total - a.total);

  $("screen-s4").innerHTML = `
    <div class="report-hero">
      <div class="rh-label">Nilai Akhir Portofoliomu</div>
      <div class="rh-amount">${idr(total)}</div>
      <div class="rh-change ${change >= 0 ? "up" : "down"}">${change >= 0 ? "+" : ""}${(change * 100).toFixed(2)}% ${change >= 0 ? "▲" : "▼"} dari modal awal</div>
    </div>
    <div class="page-pad">
      <div class="card">
        <div class="card-title">📋 Rincian per Aset</div>
        <table class="asset-table">
          <thead><tr><th>Aset</th><th>Nilai Akhir</th><th>Gain/Loss</th></tr></thead>
          <tbody>
            ${INSTRUMENTS.map((i) => {
              const nilaiAkhir = S.portfolio.nilaiAset[i.id];
              const nilaiAwal = (modalAwal * S.portfolio.alokasi[i.id]) / 100;
              const gain = nilaiAkhir - nilaiAwal;
              const gainPct =
                nilaiAwal > 0 ? ((gain / nilaiAwal) * 100).toFixed(1) : "0.0";
              return `<tr>
                <td>${i.icon} ${i.nama}</td>
                <td>${idr(nilaiAkhir)}</td>
                <td class="${gain >= 0 ? "gain" : "loss"}">${gain >= 0 ? "+" : ""}${idr(gain)}<br><small>${gainPct}%</small></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">🏆 Perbandingan Strategi (Anonim)</div>
        ${peers
          .map(
            (p, i) => `
          <div class="comparison-row">
            <div class="cr-rank ${["r1", "r2", "r3"][i]}">${i + 1}</div>
            <div class="cr-info"><div class="cr-label">${p.label}</div><div class="cr-sub">${p.strategi}</div></div>
            <div class="cr-amount" style="color:${p.total >= modalAwal ? "var(--green)" : "var(--red)"}">${idr(p.total)}</div>
          </div>
        `,
          )
          .join("")}
      </div>
      ${renderChart()}
      <div class="card">
        <div class="card-title">💭 3 Pelajaran dari Simulasi Ini</div>
        <div class="reflect-form">
          <div class="reflect-block">
            <div class="reflect-question">Tuliskan 3 pelajaran dari simulasi ini dan bagaimana kamu akan menerapkannya dalam kehidupan nyata.</div>
            <textarea class="reflect-textarea" id="ref4-lessons" placeholder="1. Pelajaran pertama...&#10;2. Pelajaran kedua...&#10;3. Pelajaran ketiga..." rows="5"
              oninput="S.reflections.s4Lessons=this.value;saveState()"></textarea>
          </div>
          <button class="btn btn-success" onclick="completeS4()">Selesaikan Sesi 4 ✓</button>
        </div>
      </div>
    </div>
  `;
  navigate("screen-s4");
  restoreInputs({ "ref4-lessons": S.reflections.s4Lessons });
}

function completeS4() {
  const w = ($("ref4-lessons")?.value || "")
    .split(/\s+/)
    .filter(Boolean).length;
  S.scores.s4 = w > 30 ? 20 : w > 10 ? 12 : 6;
  S.sessionsCompleted.add("s4");
  saveState();
  celebrateSession(4, S.scores.s4);
  if (w > 30) unlockBadge("perenung");
}

// ─── SESSION 5 — Investasi Nyata ──────────────────────────────────────────────
function renderS5() {
  $("screen-s5").innerHTML = `
    <div class="session-header">
      <div style="font-size:12px;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Sesi 5 dari 5</div>
      <h2 class="section-title">Investasi Nyata: Langkah Pertama</h2>
      <p class="section-sub">Kamu sudah berlatih. Sekarang pelajari cara memulai investasi nyata yang aman dan legal.</p>
    </div>
    <div class="page-pad">
      <div class="card">
        <div class="card-title">🪜 Langkah Memulai Investasi</div>
      </div>
    </div>
    <div class="guide-steps">
      ${[
        {
          title: "Siapkan Dana Darurat Dulu",
          desc: "Sebelum investasi, pastikan punya dana darurat 3–6 bulan pengeluaran di tabungan/deposito. Dana ini jangan diinvestasikan.",
          tag: "✓ Wajib",
        },
        {
          title: "Tentukan Tujuan Investasi",
          desc: "Untuk apa uangmu? Dana pendidikan? Beli kendaraan? Tujuan jelas membantu memilih instrumen dan horizon waktu yang tepat.",
          tag: "🎯 Penting",
        },
        {
          title: "Verifikasi Legalitas Platform",
          desc: "Pastikan platform terdaftar dan diawasi OJK (cek di ojk.go.id atau telepon 157). Platform tidak terdaftar OJK = ilegal!",
          tag: "🔒 Wajib",
        },
        {
          title: "Buka Rekening Investasi",
          desc: "Untuk saham: buka rekening efek di sekuritas berizin OJK. Reksa dana: daftar di aplikasi legal. SBN: melalui bank atau aplikasi resmi.",
          tag: "📱 Cara",
        },
        {
          title: "Mulai Kecil, Belajar Terus",
          desc: 'Gunakan dana yang siap "hilang" saat belajar. Banyak platform mulai dari Rp 10.000–100.000. Investasi adalah skill — terus berlatih.',
          tag: "💡 Tips",
        },
      ]
        .map(
          (s, i) => `
        <div class="guide-step">
          <div class="gs-num">${i + 1}</div>
          <div class="gs-content"><h3>${s.title}</h3><p>${s.desc}</p><span class="gs-tag">${s.tag}</span></div>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="page-pad">
      <div class="card">
        <div class="card-title">📱 Aplikasi Investasi Legal Terdaftar OJK</div>
        <p class="text-muted mb-12" style="font-size:11px;">*Verifikasi legalitas terkini selalu di ojk.go.id sebelum berinvestasi.</p>
      </div>
    </div>
    <div class="app-list">
      ${[
        {
          icon: "📊",
          nama: "Bibit",
          tipe: "Reksa Dana",
          desc: "Rekomendasi otomatis sesuai profil risiko",
        },
        {
          icon: "🌱",
          nama: "Bareksa",
          tipe: "Reksa Dana + SBN",
          desc: "Platform terlengkap untuk reksa dana",
        },
        {
          icon: "🏦",
          nama: "BNI Sekuritas",
          tipe: "Saham",
          desc: "Rekening efek bank pemerintah",
        },
        {
          icon: "💛",
          nama: "Ajaib",
          tipe: "Saham + Reksa Dana",
          desc: "Interface ramah pemula",
        },
        {
          icon: "🏅",
          nama: "Pegadaian Digital",
          tipe: "Emas",
          desc: "Tabungan emas mulai 0,01 gram",
        },
      ]
        .map(
          (a) => `
        <div class="app-item">
          <div class="app-icon">${a.icon}</div>
          <div class="app-info"><h4>${a.nama}</h4><p>${a.tipe} — ${a.desc}</p></div>
          <div class="app-ojk">OJK ✓</div>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="page-pad mt-16">
      <div class="card">
        <div class="card-title">🚨 Kenali Ciri Investasi Bodong</div>
      </div>
    </div>
    <div class="scam-list">
      ${[
        {
          bad: true,
          text: "❌ Menjanjikan keuntungan tetap sangat tinggi (>10%/bulan)",
        },
        {
          bad: true,
          text: "❌ Tidak ada izin OJK — hanya via WhatsApp/Telegram",
        },
        {
          bad: true,
          text: "❌ Menggunakan skema piramida / referral berlebihan",
        },
        {
          bad: true,
          text: '❌ Menekan untuk investasi segera: "penawaran terbatas!"',
        },
        {
          bad: false,
          text: "✓ Terdaftar & diawasi OJK (cek ojk.go.id atau telepon 157)",
        },
        {
          bad: false,
          text: "✓ Ada prospektus, laporan keuangan, dan alamat kantor jelas",
        },
      ]
        .map(
          (s) =>
            `<div class="scam-item ${s.bad ? "bad" : "good"}">${s.text}</div>`,
        )
        .join("")}
    </div>
    <div class="page-pad mt-16">
      <div id="s5-quiz-result"></div>
      <div id="s5-plan-section" class="hidden">
        <div class="card">
          <div class="card-title">📝 Rencana Investasi Pribadiku</div>
          <p class="text-muted mb-12" style="font-size:13px;">Buat rencana konkret — bahkan yang kecil pun bermakna!</p>
          <div class="plan-row">
            <div class="plan-field">
              <label>Instrumen Pilihan</label>
              <select id="plan-instr" onchange="S.s5plan.instr=this.value;saveState();updatePlanProjection()">
                ${INSTRUMENTS.map((i) => `<option value="${i.id}">${i.nama}</option>`).join("")}
              </select>
            </div>
            <div class="plan-field">
              <label>Target Waktu</label>
              <select id="plan-time" onchange="S.s5plan.time=this.value;saveState();updatePlanProjection()">
                <option value="6">6 bulan</option>
                <option value="12">1 tahun</option>
                <option value="24">2 tahun</option>
                <option value="36">3 tahun</option>
                <option value="60">5 tahun</option>
              </select>
            </div>
          </div>
          <div class="plan-row">
            <div class="plan-field">
              <label>Nominal per Bulan (Rp)</label>
              <input type="number" id="plan-amount" value="50000" min="10000" step="10000"
                oninput="S.s5plan.amount=this.value;saveState();updatePlanProjection()">
            </div>
            <div class="plan-field">
              <label>Tujuan</label>
              <input type="text" id="plan-goal" placeholder="cth: dana kuliah"
                oninput="S.s5plan.goal=this.value;saveState()">
            </div>
          </div>
          <div id="plan-projection" style="background:var(--green-light);border-radius:var(--radius);padding:14px;margin:12px 0;font-size:13px;color:#064e3b;"></div>
          <input type="text" class="calc-input mb-12" id="plan-langkah" placeholder="Langkah pertama yang akan saya ambil minggu ini..." style="margin-top:8px;"
            oninput="S.s5plan.langkah=this.value;saveState()">
          <button class="btn btn-success" onclick="completeS5()">Selesaikan Semua Sesi ✓ 🎓</button>
        </div>
      </div>
      <button class="btn btn-primary" id="s5-btn-quiz" onclick="startS5Quiz()">Lanjut ke Kuis Waspada Investasi →</button>
    </div>
  `;
  navigate("screen-s5");
  // Restore plan section if quiz already done
  if (S.scores.s5 > 0) {
    $("s5-btn-quiz").classList.add("hidden");
    $("s5-quiz-result").innerHTML =
      `<div class="card"><div class="quiz-score-box"><p>✅ Kuis sudah dikerjakan — skor tersimpan.</p></div></div>`;
    $("s5-plan-section").classList.remove("hidden");
    // Restore plan input values
    restoreInputs({
      "plan-amount": S.s5plan.amount,
      "plan-goal": S.s5plan.goal,
      "plan-langkah": S.s5plan.langkah,
    });
    if (S.s5plan.instr) $("plan-instr").value = S.s5plan.instr;
    if (S.s5plan.time) $("plan-time").value = S.s5plan.time;
    updatePlanProjection();
  }
}

function startS5Quiz() {
  $("s5-btn-quiz").classList.add("hidden");
  Quiz.start(
    QUIZ_S5,
    "Kuis Sesi 5 · Waspada Investasi Bodong",
    "screen-s5",
    (score, total, pct100) => {
      S.scores.s5 = Math.round(pct100 * 0.3);
      saveState();
      if (pct100 === 100) unlockBadge("anti_bodong");
      navigate("screen-s5");
      $("s5-quiz-result").innerHTML = `
      <div class="card">
        <div class="quiz-score-box">
          <div class="score-num">${score}/${total}</div>
          <p>${pct100}% benar — ${pct100 >= 70 ? "Kamu bisa mengenali investasi bodong!" : "Pelajari ciri-ciri investasi bodong di atas!"}</p>
        </div>
      </div>
    `;
      $("s5-plan-section").classList.remove("hidden");
      restoreInputs({
        "plan-amount": S.s5plan.amount,
        "plan-goal": S.s5plan.goal,
        "plan-langkah": S.s5plan.langkah,
      });
      if (S.s5plan.instr) $("plan-instr").value = S.s5plan.instr;
      if (S.s5plan.time) $("plan-time").value = S.s5plan.time;
      updatePlanProjection();
      setTimeout(
        () =>
          $("screen-container").scrollTo({ top: 99999, behavior: "smooth" }),
        100,
      );
    },
  );
}

function updatePlanProjection() {
  const instrEl = $("plan-instr"),
    amountEl = $("plan-amount"),
    timeEl = $("plan-time"),
    projEl = $("plan-projection");
  if (!instrEl || !projEl) return;
  const instr = INSTRUMENTS.find((i) => i.id === instrEl.value);
  const monthly = parseFloat(amountEl?.value) || 50000;
  const months = parseInt(timeEl?.value) || 12;
  const rate =
    { saham: 0.08, reksa_dana: 0.05, emas: 0.06, kas: 0.03 }[instr?.id] || 0.05;
  const mr = rate / 12;
  const projection = monthly * ((Math.pow(1 + mr, months) - 1) / mr);
  projEl.innerHTML = `📊 <strong>${idr(monthly)}/bulan × ${months} bulan</strong> = ${idr(monthly * months)} diinvestasikan<br>
    Estimasi dengan imbal hasil ~${(rate * 100).toFixed(0)}%/tahun: <strong style="color:var(--green)">${idr(projection)}</strong>`;
}

function completeS5() {
  S.scores.s5 = Math.min(S.scores.s5 + 10, 40);
  S.sessionsCompleted.add("s5");
  saveState();
  unlockBadge("investor_bersertifikat");
  showToast("Semua sesi selesai! Luar biasa! 🎉", "success", 3000);
  setTimeout(() => {
    renderComplete();
    navigate("screen-complete");
    confetti(80);
  }, 600);
}

// ─── Completion Screen ────────────────────────────────────────────────────────
function renderComplete() {
  const totalScore = Object.values(S.scores).reduce((a, b) => a + b, 0);
  const passed = totalScore >= 70;
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  $("screen-complete").innerHTML = `
    <div class="complete-screen">
      <span class="confetti-emoji">🎓</span>
      <h1>Selamat, ${S.name}!</h1>
      <p>Kamu telah menyelesaikan semua 5 sesi Pasar Saham Virtual — langkah pertama menuju literasi keuangan yang lebih baik!</p>
      <div class="score-card">
        <div class="sc-title">Total Skor Akhir</div>
        <div><span class="sc-score" id="final-score">0</span><span class="sc-max"> / 100</span></div>
        <div class="sc-label">${passed ? "✅ Lulus — Pemahaman investasi dasar tercapai!" : "📘 Terus belajar — ulangi sesi yang perlu diperdalam"}</div>
      </div>
      ${renderBadgeShelf()}
      <div class="certificate">
        <div class="cert-title">Sertifikat Penyelesaian</div>
        <div class="cert-name">${S.name}</div>
        <div class="cert-sub">telah menyelesaikan<br><strong>Pasar Saham Virtual: Investasi Pertamamu</strong><br>Pendidikan Kesetaraan Paket C · ${today}</div>
        <div class="cert-stamp">📜</div>
      </div>
      <div class="card" style="text-align:left;margin-bottom:16px;">
        <div class="card-title">📊 Rincian Skor</div>
        ${[
          ["Kuis Sesi 1 (Tabungan vs Investasi)", S.scores.s1],
          ["Kuis Sesi 2 (Instrumen Investasi)", S.scores.s2],
          ["Kualitas Keputusan Simulasi (Sesi 3)", S.scores.s3],
          ["Refleksi & Analisis (Sesi 4)", S.scores.s4],
          ["Kuis Sesi 5 + Rencana Pribadi", S.scores.s5],
        ]
          .map(
            ([label, sc]) => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:13px;">
            <span>${label}</span><strong style="color:var(--blue)">${sc} poin</strong>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="disclaimer-box">
        <strong>⚠️ Ingat selalu:</strong>
        Semua yang kamu pelajari di sini adalah simulasi pendidikan. Untuk investasi nyata, selalu verifikasi legalitas platform di OJK, mulai dari jumlah kecil, dan konsultasikan dengan penasihat keuangan berlisensi OJK.
      </div>
      <button class="btn btn-secondary" onclick="renderMenu();navigate('screen-menu')">← Kembali ke Menu</button>
      <div style="height:16px"></div>
    </div>
  `;

  countUp($("final-score"), 0, totalScore, 1400, (n) => String(Math.round(n)));
  SCORM.finish(totalScore);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  SCORM.init();
  loadState();
  renderCover();
  renderWelcome();
  renderSidebar();
  navigate("screen-cover");
}

document.addEventListener("DOMContentLoaded", init);
