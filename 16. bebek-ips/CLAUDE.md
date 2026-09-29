# Bebek IPS — Gim Edukasi

Gim tembak bergaya *pixel-art* (terinspirasi Duck Hunt): pemain menembak **bebek
yang membawa jawaban benar** atas soal IPS yang muncul di panel. Tiga level dengan
tingkat kesulitan bertahap, sistem skor–combo–nyawa, dan pembukaan level
(*unlock*) setelah level sebelumnya tuntas.

- **Festival:** Festival Biru Putih 2026 — Direktorat SMP, Kemendikdasmen.
- **Kategori:** Gim Edukasi.
- **Mapel / Jenjang:** IPS — SMP, Fase D, **Kelas VIII**.

## Pemetaan Kurikulum (ATP IPS Fase D)

Gim menguji Tujuan Pembelajaran (TP) **3.1 – 3.6** yang ditampilkan sebagai label di
atas tiap soal:

- **TP 3.1** — *menganalisis* potensi alam di Indonesia.
- **TP 3.2** — *mengklasifikasikan* pemanfaatan & pelestarian potensi sumber daya alam.
- **TP 3.3** — *menjelaskan* faktor penyebab perubahan potensi sumber daya alam.
- **TP 3.4** — *mendemonstrasikan* penentuan harga & pasar di lingkungan sekitar.
- **TP 3.5** — *menganalisis* potensi Indonesia menjadi negara maju.
- **TP 3.6** — *mendemonstrasikan* interaksi sosial dalam masyarakat.

Tiap permainan berisi **20 soal**, dengan **3–4 soal dari tiap TP**. Tingkat kognitif
naik per level: **Level 1** mengingat & memahami, **Level 2** penerapan pada contoh
kasus, **Level 3** analisis sebab-akibat.

## Mekanik & Aturan Main

- **Tembak bebek** pembawa jawaban benar: klik/ketuk bebeknya atau tekan huruf **A–E**.
- **3 nyawa** (♥♥♥). Salah tembak atau waktu habis → −1 nyawa, lalu jawaban benar
  ditampilkan. Tuntaskan 20 soal sebelum nyawa habis untuk membuka level berikutnya.
- **Skor:** benar = 100 poin + 10 poin/detik sisa; bonus **combo +25/ soal** (maks
  +250). Pengali level: **×1** (L1), **×1,5** (L2), **×2** (L3).
- **Progres/unlock:** Level 1 terbuka sejak awal; Level 2 & 3 terbuka setelah level
  sebelumnya tuntas. Skor tertinggi & status unlock disimpan di **`localStorage`**
  (per-perangkat).
- Tombol: **1–3** pilih level · **P/ESC** jeda · **M** suara on/off · **MENYERAH**
  (klik dua kali) berhenti di tengah permainan.

## Struktur & Alur (SPA)

Semua dalam satu `index.html`: **Laman Muka (cover) → Pilih Level → Aktivitas (kanvas
tembak + panel soal, HUD skor/nyawa/combo + bar waktu) → Jeda → Hasil Akhir (skor,
akurasi, combo terbaik, rekor)**. Tersedia modal **Cara Bermain** dan **Tujuan
Pembelajaran**. Grafik permainan digambar pada **`<canvas>`** (pixel-art).

## Aturan Teknis Build (WAJIB dipatuhi — Gim Edukasi)

- **Satu berkas `index.html`** di root, **SPA** (tanpa redirect).
- **Vanilla JS + HTML5 Canvas + CSS**; tanpa plugin pihak ketiga.
- **DILARANG menaut aset / URL eksternal — harus offline.**
  ⚠️ **PERLU DIPERBAIKI:** saat ini `index.html` masih memuat **Google Fonts**
  (`fonts.googleapis.com` / `fonts.gstatic.com`) untuk font *Press Start 2P* &
  *Pixelify Sans*. Ini melanggar aturan offline. **Sebelum pengumpulan**, font harus
  di-*bundle* lokal (mis. berkas `.woff2` di `assets/` yang dirujuk relatif via
  `@font-face`, atau ganti ke font sistem `monospace`) dan tautan `fonts.google*`
  dihapus.
- **Rasio 16:9**, responsif laptop/tablet/smartphone; waktu muat < 5 detik.
- Kontras tinggi, teks terbaca, animasi/suara secukupnya.

## Asesmen Terintegrasi

Skor, akurasi, combo, dan penuntasan 20 soal mencerminkan penguasaan TP 3.1–3.6.
Umpan balik instan tiap tembakan (benar/salah) + jawaban benar ditampilkan saat
keliru. Bank soal ada di dalam `index.html` (konstanta `LEVELS[].qs`, format
`[topik, pertanyaan, [jawaban benar, pengecoh...]]`; urutan pilihan diacak saat main).

## Struktur Folder

```
bebek-ips/
├── index.html        # seluruh aplikasi (HTML+CSS+JS+Canvas inline, SPA)
├── assets/           # (disarankan) font lokal .woff2 & aset offline lain
├── panduan.pdf       # user guide (WAJIB saat pengumpulan)
├── demo.mp4          # video demo ≤ 3 menit (WAJIB saat pengumpulan)
└── CLAUDE.md
```

## Kriteria Penilaian (target build)

- **Substansi 60%** — Kesesuaian Kurikulum 15 · Akurasi Keilmuan 15 · Kedalaman
  Materi 10 · Kemandirian Belajar 10 · Asesmen Terintegrasi 10.
- **Media 25%** — Fungsionalitas Gim 8 · Kualitas Visual & Audio 5 · Mekanisme
  Permainan 4 · Sistem Umpan Balik 4 · Navigasi & Instruksi 4.
- **Inovasi & Kreativitas 15%** — Orisinalitas 5 · Kontekstualisasi 5 · Daya Tarik 5.

## Deliverables Pengumpulan

- `.zip` berisi `index.html` (di root) + semua aset. Zip inti **≤ 25 MB** (total maks
  150 MB).
- **panduan.pdf** (user guide) — wajib.
- **demo.mp4** — video demo singkat (maks 3 menit) — wajib.

## Definition of Done (checklist)

- [ ] Buka `index.html` langsung dari file (tanpa server) — jalan penuh, **tanpa
      internet** (⚠️ perbaiki dulu ketergantungan Google Fonts).
- [ ] 3 level, 20 soal/permainan, skor–combo–nyawa & unlock berfungsi.
- [ ] Laman Muka, Cara Bermain, Tujuan Pembelajaran, Hasil Akhir ada.
- [ ] Akurasi keilmuan IPS (TP 3.1–3.6) diverifikasi.
- [ ] Rasio 16:9; responsif laptop/tablet/HP; kontras & keterbacaan baik.
- [ ] Tidak ada URL/aset eksternal; bukan multi-halaman; tidak redirect.
- [ ] Metadata & atribusi aset sesuai ketentuan hak cipta.

## Cara Preview

Buka `index.html` di browser (klik dua kali). Untuk uji lintas perangkat:
`python3 -m http.server` lalu buka `http://localhost:8000`.
