# Lab Mitigasi Bencana — Lab Maya

Laboratorium maya simulasi kebencanaan: murid memilih jenis bangunan & wilayah,
mengatur kekuatan gempa, mengamati dampak secara real-time, lalu menerapkan
langkah mitigasi dan membandingkan hasilnya — dikaitkan dengan letak Indonesia di
jalur *Ring of Fire*.

- **Festival:** Festival Biru Putih 2026 — Direktorat SMP, Kemendikdasmen.
- **Kategori:** Lab Maya.
- **Mapel / Jenjang:** IPS (Geografi) — SMP, Fase D, **Kelas VIII**.

## Pemetaan Kurikulum (dari ATP IPS Fase D — Mina Holilah dkk)

- **CP (Pemahaman Konsep):** "…faktor aktivitas manusia terhadap perubahan iklim
  dan potensi bencana alam; memprediksi dampak… serta merefleksikan pola adaptasi
  … dan upaya mitigasi bencana untuk menunjang *sustainable development goals*
  (SDGs)…"
- **TP utama (Kelas VIII #8):** *Menjelaskan potensi bencana alam.*
- **TP pendukung (mitigasi/SDGs):** *Merefleksikan upaya mitigasi bencana untuk
  menunjang sustainable development goals (SDGs).*

Tujuan pembelajaran karya: setelah bereksperimen, murid dapat (1) menjelaskan
mengapa Indonesia rawan gempa (letak tektonik/Ring of Fire), (2) memprediksi
dampak gempa terhadap bangunan/masyarakat, (3) mengevaluasi efektivitas langkah
mitigasi.

## Aturan Teknis Build (WAJIB dipatuhi — Lab Maya)

- **Satu berkas `index.html`** di root, aplikasi **SPA** (tanpa `redirect`).
- **Vanilla JS + HTML5 + CSS**; kompatibel Chrome/Firefox/Safari/Edge; **tanpa**
  plugin pihak ketiga.
- **DILARANG menaut aset / URL eksternal.** Simulasi digambar dengan **Canvas
  atau SVG inline** (bangunan, gelombang seismik, meteran magnitudo). Bila perlu
  gambar, pakai **data-URI** atau `assets/` relatif.
- **Rasio 16:9**, responsif laptop/tablet/smartphone.
- **Waktu respons < 2 detik** tiap interaksi; **error-free** (semua tombol/alat
  simulasi berfungsi).
- Desain **bersih & terstruktur**, visual **proporsional & realistis**, warna
  selaras, tombol/alat/indikator mudah dikenali lewat label/ikon konsisten.

## Struktur & Alur (SPA)

Komponen wajib Lab Maya: **Laman Muka → Panduan langkah → Aktivitas Interaktif
(area simulasi) → Indikator Progres ("Langkah 1 dari 4") → Navigasi Ulang
(tiap tahap dapat diakses tanpa mengulang dari awal).**

1. **Laman Muka** — judul, tujuan pembelajaran, petunjuk penggunaan Lab.
2. **Panduan langkah** — instruksi menjalankan eksperimen.
3. **Area simulasi (aktivitas interaktif):**
   - **Interaksi 1 — Pengaturan variabel:** pilih jenis bangunan (kayu/bata/beton
     bertulang) & jenis tanah/wilayah; atur **magnitudo gempa** via slider.
   - **Interaksi 2 — Jalankan simulasi:** amati dampak real-time (getaran,
     tingkat kerusakan, indikator korban/kerugian) — respons visual + teks.
   - **Interaksi 3 — Terapkan mitigasi:** aktifkan langkah (struktur tahan gempa,
     jalur evakuasi, tas siaga) → jalankan ulang & **bandingkan skenario** sebelum
     vs. sesudah mitigasi (eksplorasi lanjutan).
   - (≥ 3 interaksi yang memungkinkan eksplorasi lanjut — syarat minimal terpenuhi.)
4. **Indikator progres** — "Langkah x dari 4"; setiap tahap bisa diulang/diakses
   ulang.
5. **Pertanyaan penerapan** — studi kasus/refleksi (mis. "Rekomendasikan mitigasi
   untuk sekolahmu") yang mendorong penerapan ilmu.
6. **Ringkasan hasil** — kesimpulan efektivitas mitigasi (kaitkan ke SDGs 11 —
   Kota & Permukiman Berkelanjutan).

## Prinsip Keilmuan (jaga akurasi)

- Alur simulasi mengikuti prinsip fisik yang wajar: magnitudo ↑ → energi/kerusakan
  ↑; struktur beton bertulang & desain tahan gempa mengurangi kerusakan; tanah
  lunak memperkuat guncangan. Hindari klaim keliru; sederhanakan tanpa menyesatkan.

## Struktur Folder

```
lab-mitigasi-bencana/
├── index.html        # seluruh aplikasi (HTML+CSS+JS inline, SPA)
├── assets/           # hanya jika ada aset lokal (data-URI lebih disukai)
├── panduan.pdf       # user guide + penjelasan teknis simulasi (WAJIB)
├── demo.mp4          # video demo ≤ 3 menit cara pakai Lab (WAJIB)
└── CLAUDE.md
```

## Kriteria Penilaian (target build)

- **Substansi 60%** — Kesesuaian Kurikulum 15 · Akurasi Keilmuan 15 · Kedalaman
  Materi 10 · Kemandirian Belajar 10 · Asesmen 10.
- **Media 25%** — Fungsionalitas Simulasi 8 · Kualitas Visual 5 · Interaktivitas
  4 · Umpan Balik 4 · Navigasi 4.
- **Inovasi & Kreativitas 15%** — Orisinalitas 5 · Kontekstualisasi 5 · Daya
  Tarik 5.

## Deliverables Pengumpulan

- `.zip` berisi `index.html` (di root) + aset. Zip aset inti **≤ 25 MB**
  (total maks 150 MB).
- **panduan.pdf** (user guide + penjelasan teknis simulasi) — wajib.
- **demo.mp4** — video demo cara pakai (maks 3 menit) — wajib.

## Definition of Done (checklist)

- [ ] Buka `index.html` langsung — jalan penuh tanpa internet.
- [ ] Pengaturan variabel + jalankan + bandingkan skenario (≥ 3 interaksi).
- [ ] Indikator "Langkah x dari 4" & navigasi ulang berfungsi.
- [ ] Respons real-time < 2 detik; error-free; rasio 16:9; responsif.
- [ ] Ada pertanyaan penerapan/refleksi; kaitan SDGs jelas.
- [ ] Akurasi keilmuan seismik/mitigasi diverifikasi.
- [ ] Tanpa URL/aset eksternal; bukan multi-halaman; tidak redirect.

## Cara Preview

Buka `index.html` di browser. Untuk uji lintas perangkat: `python3 -m http.server`
lalu buka `http://localhost:8000`.
