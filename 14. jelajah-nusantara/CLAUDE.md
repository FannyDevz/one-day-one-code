# Jelajah Nusantara — Gim Edukasi

Gim edukasi peta interaktif: pemain menempatkan pulau/provinsi Indonesia pada
posisinya lalu menjawab kuis kekhasan tiap daerah, naik level per pulau, dan
mengumpulkan skor "Penjelajah Nusantara".

- **Festival:** Festival Biru Putih 2026 — Direktorat SMP, Kemendikdasmen.
- **Kategori:** Gim Edukasi.
- **Mapel / Jenjang:** IPS (Geografi) — SMP, Fase D, **Kelas VII**.

## Pemetaan Kurikulum (dari ATP IPS Fase D — Mina Holilah dkk)

- **CP (Pemahaman Konsep):** "…menjelaskan keberagaman kondisi geografis
  Indonesia, konektivitas antarruang terhadap upaya pemanfaatan dan pelestarian
  potensi sumber daya alam…"
- **TP utama (Kelas VII #1):** *Menjelaskan keberagaman kondisi geografis
  Indonesia.*
- **TP pendukung:** mengaitkan kondisi geografis dengan potensi sumber daya alam
  daerah.

Tujuan pembelajaran karya: setelah bermain, murid dapat (1) mengidentifikasi
letak pulau & provinsi utama Indonesia, (2) menyebutkan minimal satu kekhasan
geografis/SDA tiap wilayah, (3) menjelaskan keberagaman kondisi geografis
antarwilayah.

## Aturan Teknis Build (WAJIB dipatuhi — Gim Edukasi)

- **Satu berkas `index.html`** di root folder, aplikasi berupa **SPA** (tanpa
  pindah/`redirect` ke halaman html lain).
- **Vanilla JS + HTML5 + CSS** standar. **Tidak** bergantung plugin pihak ketiga.
- **DILARANG menaut aset / URL eksternal.** Semua aset harus offline. Gunakan
  **SVG inline** (peta & ikon digambar sebagai SVG) atau **Canvas**, atau, bila
  perlu gambar, sisipkan sebagai **data-URI** / letakkan di `assets/` dan rujuk
  secara **relatif**. Peta Indonesia digambar sebagai SVG (path per pulau) —
  tidak menarik tile peta online.
- **Rasio layar 16:9**, responsif: berjalan baik di **laptop, tablet, smartphone**.
- **Waktu muat < 5 detik per level.** Bebas bug: tidak ada tautan mati, transisi
  antarlevel mulus.
- Kontras warna tinggi, teks mudah dibaca, animasi/suara secukupnya (tidak
  menutupi materi inti). Ukuran tombol proporsional.

## Struktur & Alur (SPA)

Komponen wajib gim: **Laman Muka → Panduan → Aktivitas/Misi → Pathway →
Indikator Progres → Hasil Akhir.**

1. **Laman Muka** — judul, tujuan pembelajaran singkat, tombol *Mulai*.
2. **Panduan** — cara bermain (drag pulau/provinsi, jawab kuis) sebelum misi.
3. **Level per pulau** (Sumatra → Jawa → Kalimantan → Sulawesi → Papua, dst.):
   - **Interaksi 1 — Seret & lepas:** tempatkan potongan pulau/provinsi ke peta.
   - **Interaksi 2 — Kuis kekhasan:** pilih jawaban tentang SDA/iklim/relief.
   - **Interaksi 3 — Cocokkan/urutkan:** cocokkan daerah dengan komoditas/ciri.
   - (≥ 3 interaksi bermakna per rangkaian — syarat minimal terpenuhi.)
4. **Indikator progres** — mis. "Level 2 dari 5", bintang/poin, nyawa opsional.
5. **Umpan balik instan** — respons visual & (opsional) audio tiap tindakan.
6. **Reward** — lencana pulau terbuka mendorong lanjut.
7. **Hasil Akhir** — skor + gelar "Penjelajah Nusantara", ringkasan capaian.

## Asesmen Terintegrasi

Skor & level mencerminkan penguasaan (min 3 pertanyaan berbobot). Simpan skor di
memori/`localStorage` (per-perangkat) untuk indikator progres — bukan untuk data
lintas perangkat.

## Struktur Folder

```
jelajah-nusantara/
├── index.html        # seluruh aplikasi (HTML+CSS+JS inline, SPA)
├── assets/           # hanya jika ada aset lokal (data-URI lebih disukai)
├── panduan.pdf       # user guide (WAJIB saat pengumpulan)
├── demo.mp4          # video demo ≤ 3 menit (WAJIB saat pengumpulan)
└── CLAUDE.md
```

## Kriteria Penilaian (target build)

- **Substansi 60%** — Kesesuaian Kurikulum 15 · Akurasi Keilmuan 15 · Kedalaman
  Materi 10 · Kemandirian Belajar 10 · Asesmen Terintegrasi 10.
- **Media 25%** — Fungsionalitas Gim 8 · Kualitas Visual & Audio 5 · Mekanisme
  Permainan 4 · Sistem Umpan Balik 4 · Navigasi & Instruksi 4.
- **Inovasi & Kreativitas 15%** — Orisinalitas 5 · Kontekstualisasi 5 · Daya
  Tarik 5.

## Deliverables Pengumpulan

- `.zip` berisi `index.html` (di root) + semua aset. Zip inti **≤ 25 MB**
  (total maks 150 MB).
- **panduan.pdf** (user guide) — wajib.
- **demo.mp4** — video demo singkat (maks 3 menit) — wajib.

## Definition of Done (checklist)

- [ ] Buka `index.html` langsung dari file (tanpa server) — jalan penuh, tanpa
      internet.
- [ ] ≥ 3 interaksi bermakna per rangkaian; navigasi intuitif.
- [ ] Laman Muka, Panduan, Indikator Progres, Hasil Akhir ada.
- [ ] Akurasi keilmuan geografi diverifikasi (letak, SDA, ciri wilayah).
- [ ] Rasio 16:9; responsif laptop/tablet/HP; kontras & keterbacaan baik.
- [ ] Tidak ada URL/aset eksternal; bukan multi-halaman; tidak redirect.
- [ ] Metadata & atribusi aset sesuai ketentuan hak cipta (bila memakai gambar).

## Cara Preview

Buka `index.html` di browser (klik dua kali). Untuk uji cepat lintas perangkat,
boleh jalankan `python3 -m http.server` lalu buka `http://localhost:8000`.
