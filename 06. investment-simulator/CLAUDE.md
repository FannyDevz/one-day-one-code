# Pasar Saham Virtual: Investasi Pertamamu
**Dokumen Referensi Pengembang** — Pendidikan Kesetaraan Paket C | Lab Maya | Ruang Murid, Rumah Pendidikan

---

## Ringkasan Proyek

| Atribut | Detail |
|---|---|
| Jenis Konten | Lab Maya — Simulasi Interaktif Investasi |
| Target Paket | Paket C (Setara SMA) — Usia 16 tahun ke atas |
| Tema Utama | Kewirausahaan & Literasi Keuangan |
| Durasi Belajar | 5–7 sesi @ 30–45 menit (mandiri atau terbimbing) |
| Platform | Web & Mobile — Ruang Murid, Rumah Pendidikan |
| Format Output | SCORM 1.2 |

Warga belajar mendapatkan **modal virtual Rp 10.000.000** untuk diinvestasikan ke saham lokal, reksa dana pasar uang, dan emas virtual. Harga bergerak berdasarkan skenario berita ekonomi Indonesia.

---

## Tujuan Pembelajaran

Setelah menyelesaikan seluruh sesi, warga belajar mampu:

1. Menjelaskan perbedaan antara menabung dan berinvestasi
2. Mengidentifikasi minimal 3 instrumen investasi dasar dan karakteristiknya
3. Memahami konsep risiko dan imbal hasil (risk & return) secara praktis
4. Membuat keputusan investasi sederhana berdasarkan analisis skenario ekonomi
5. Menyusun portofolio investasi dasar yang terdiversifikasi
6. Menunjukkan sikap bijak dalam mengelola keuangan pribadi

---

## Struktur 5 Sesi

### Sesi 1 — Tabungan vs Investasi: Uang yang Bekerja (30 menit)
- **Mekanik:** Kalkulator interaktif inflasi & simulasi visual "uang Rp 1 juta dalam 10 tahun" (ditabung vs diinvestasikan vs dibelanjakan)
- **Refleksi:** Warga belajar menjawab "Apa yang akan kamu lakukan dengan Rp 500.000 jika mendapatkannya hari ini?" — dijawab sebelum dan sesudah simulasi

### Sesi 2 — Kenalan dengan Instrumen Investasi (35 menit)
- **Mekanik:** Kartu instrumen interaktif (4 instrumen: saham, reksa dana pasar uang, SBN, emas) + matching quiz (drag instrumen ke profil investor)
- **Refleksi:** Warga belajar mengisi "Profil Investorku": konservatif / moderat / agresif (5 pertanyaan skenario)

### Sesi 3 — Simulasi Inti: Investasi Pertamamu! (45 menit) ⭐ *Sesi Utama*
- **Mekanik:** Dashboard portofolio interaktif — slider alokasi 4 aset, grafik harga real-time (disimulasikan), feed berita ekonomi 5 ronde
- **Refleksi:** "Keputusan mana yang paling berpengaruh pada portofoliomu? Apa yang akan kamu ubah jika mengulang dari awal?"

### Sesi 4 — Analisis & Evaluasi Portofolio (30 menit)
- **Mekanik:** Laporan portofolio otomatis — grafik perubahan nilai, tabel keuntungan/kerugian per aset, perbandingan strategi (top 3 anonim)
- **Refleksi:** "3 pelajaran yang aku dapat dari simulasi ini dan bagaimana aku akan menerapkannya dalam kehidupan nyata"

### Sesi 5 — Investasi Nyata: Langkah Pertama (35 menit)
- **Mekanik:** Panduan click-through pembukaan rekening efek + reksa dana online + SBN Ritel. Kuis waspada investasi bodong. Daftar aplikasi legal OJK.
- **Refleksi:** Warga belajar menyusun "Rencana Investasi Pribadi" (instrumen, nominal bulanan, target 1 tahun)

---

## Komponen UI Simulasi Inti (Sesi 3)

| Komponen | Deskripsi |
|---|---|
| Dashboard Modal | Sisa modal, total nilai portofolio saat ini, persentase perubahan. Update tiap ronde. |
| Slider Alokasi Aset | 4 slider (Saham, Reksa Dana, Emas, Kas) — total harus 100%. Ada tombol "Alokasi Otomatis" untuk pemula. |
| Feed Berita Ekonomi | Notifikasi singkat (maks 2 kalimat) per ronde. Ikon kategori: pertanian, energi, ekspor, moneter, global. |
| Grafik Portofolio | Grafik garis nilai total per ronde. Hover untuk melihat nilai per aset. |
| Tombol Aksi | Beli / Jual / Tahan per instrumen. Muncul konfirmasi + penjelasan singkat dampak. |
| Papan Skor | Perbandingan dengan median kelas (anonim). |

### User Flow Sesi 3

1. Warga belajar masuk → pilih konten "Pasar Saham Virtual"
2. Animasi pembuka: "Kamu punya Rp 10.000.000. Bagaimana cara terbaik mengelolanya?"
3. Kuis profil investor (5 pertanyaan, 2 menit)
4. Sistem merekomendasikan alokasi awal sesuai profil (bisa dimodifikasi)
5. Ronde 1–5: berita muncul → warga belajar aksi (Beli/Jual/Tahan) → penjelasan singkat
6. Laporan Akhir Portofolio ditampilkan
7. Warga belajar mengisi refleksi 3 pertanyaan terbuka
8. Sertifikat penyelesaian tersimpan di profil Ruang Murid

---

## Skenario 5 Ronde Berita

| Ronde | Skenario | Dampak Aset | Pelajaran Kunci |
|---|---|---|---|
| 1 | BI menaikkan suku bunga acuan 0,25% | Saham turun moderat; obligasi/deposito menarik; emas stabil | Suku bunga mempengaruhi seluruh pasar modal |
| 2 | Harga BBM bersubsidi naik 15% | Saham transportasi turun; saham energi & emas naik | Kebijakan pemerintah berdampak sektoral berbeda |
| 3 | Ekspor kelapa sawit melonjak 30% (permintaan Eropa) | Saham agrikultur/CPO naik signifikan; rupiah menguat | Berita positif sektoral = peluang saham terkait |
| 4 | Rupiah melemah ke Rp 16.500/USD | Emas naik; saham importir turun; eksportir naik | Diversifikasi mata uang via emas melindungi portofolio |
| 5 | Program infrastruktur Rp 500 triliun diluncurkan | Saham konstruksi & material naik tajam; reksa dana campuran membaik | Kebijakan fiskal berdampak besar pada sektor tertentu |

---

## Struktur Data

### Model Portofolio

```js
portofolio = {
  modal_awal: 10000000,
  alokasi: { saham: 0, reksa_dana: 0, emas: 0, kas: 100 },
  nilai_saat_ini: { saham: 0, reksa_dana: 0, emas: 0, kas: 10000000 },
  history_ronde: [],
  profil_investor: "konservatif" | "moderat" | "agresif"
}
```

### Model Berita & Dampak per Ronde

```js
ronde = {
  id: 1,
  berita: "Bank Indonesia menaikkan suku bunga acuan 0,25%...",
  dampak: { saham: -0.03, reksa_dana: +0.01, emas: 0, kas: +0.002 },
  kategori: "moneter",
  penjelasan_setelah: "Kenaikan suku bunga membuat...",
  pelajaran_kunci: "Suku bunga mempengaruhi seluruh pasar modal"
}
```

### Algoritma Harga Aset

```js
nilai_baru = nilai_lama × (1 + dampak_berita + variasi_acak)
variasi_acak = Math.random() × 0.02 - 0.01  // ±1% noise

// Dampak berita dibatasi antara -0.15 dan +0.15 (±15%)
// Emas selalu bergerak berlawanan dengan saham (safe haven)
// variasi_acak membuat setiap sesi berbeda
```

---

## Spesifikasi Teknis

| Aspek | Spesifikasi |
|---|---|
| Format File | HTML5 + CSS3 + JavaScript (Vanilla atau React). SCORM 1.2. |
| Ukuran Maksimal | ≤ 50 MB total. Gambar WebP, audio MP3 128kbps. |
| Resolusi Target | Mobile-first: 360×640px minimum. Responsif hingga 1920px. Grafik: SVG atau Canvas. |
| Bahasa Pemrograman | JavaScript ES6+. Maks 2 library eksternal. |
| Aksesibilitas | WCAG 2.1 Level AA: kontras min 4.5:1, alt text, navigasi keyboard penuh, aria-label. |
| Bahasa Antarmuka | Bahasa Indonesia komunikatif. Istilah keuangan selalu disertai penjelasan. |
| Offline Support | Service Worker (PWA). Harus bisa diakses dengan koneksi 2G. |
| SCORM Tracking | `cmi.core.score.raw`, `cmi.core.lesson_status`, `cmi.suspend_data`. Completion threshold: **70% kuis benar**. |
| Loading Target | < 3 detik pada koneksi 3G (Lighthouse/PageSpeed). |

---

## Penilaian (Formatif)

| Komponen | Instrumen | Bobot |
|---|---|---|
| Kuis Pengetahuan (Sesi 1, 2, 5) | Pilihan ganda, true/false, matching | 30% |
| Kualitas Keputusan Investasi (Sesi 3) | Rubrik per ronde | 40% |
| Refleksi & Rencana Pribadi (Sesi 4, 5) | Rubrik tulisan refleksi & rencana investasi | 30% |

### Rubrik Keputusan Investasi (per ronde)

| Dimensi | 1 — Belum Berkembang | 2 — Berkembang | 3 — Mahir | 4 — Unggul |
|---|---|---|---|---|
| Analisis Berita | Keputusan acak, abaikan berita | Perhatikan berita, analisis kurang tepat | Mengaitkan berita dengan sektor terdampak | Analisis dampak multi-level dan lintas aset |
| Diversifikasi | Semua di 1 aset | 2 aset, dominasi >80% | 3–4 aset berimbang | Alokasi dinamis sesuai kondisi & profil risiko |
| Manajemen Risiko | Tidak pertimbangkan risiko | Sadar risiko, tanpa mitigasi | Seimbangkan aset berisiko tinggi/rendah | Lindung nilai (hedge) via emas & kas |
| Konsistensi Strategi | Berubah tanpa alasan | Ada pola tapi inkonsisten | Konsisten dengan profil investor | Adaptif: konsisten pada tujuan, fleksibel pada taktik |

### Rubrik Refleksi & Rencana Investasi Pribadi

| Aspek | 1–2 Perlu Bimbingan | 3 Cukup | 4–5 Baik–Sangat Baik |
|---|---|---|---|
| Kedalaman Refleksi | Sebut hasil tanpa analisis | Identifikasi 1–2 penyebab | Analisis 3+ keputusan dengan kausalitas jelas |
| Koneksi ke Kehidupan Nyata | Hanya dalam konteks simulasi | 1 koneksi ke kehidupan nyata | Koneksi kuat dan spesifik ke situasi finansial pribadi |
| Rencana Investasi | Tidak ada atau sangat umum | Ada rencana tanpa nominal & timeline | Konkret: instrumen, nominal bulanan, target waktu |

### Umpan Balik Otomatis Platform

- **Kuis benar:** konfirmasi + penjelasan mengapa tepat
- **Kuis salah:** hint bertahap 3 level sebelum tampilkan jawaban
- **Alokasi sangat berisiko:** peringatan kuning "Hati-hati: alokasi ini berisiko tinggi..."
- **Portofolio rugi besar:** pesan motivasi + analisis "Apa yang bisa dipelajari"
- **Portofolio terbaik kelas:** animasi apresiasi + leaderboard anonim

---

## Checklist Kualitas Sebelum Upload

- [ ] Semua data keuangan akurat dan bersumber dari OJK/BEI/BI
- [ ] Tidak ada promosi atau rekomendasi produk investasi nyata tertentu
- [ ] Semua aset visual orisinal atau berlisensi bebas royalti
- [ ] Konten berfungsi di Chrome, Firefox, Safari, dan aplikasi Ruang Murid
- [ ] Waktu loading < 3 detik pada koneksi 3G (Lighthouse)
- [ ] Tidak ada bahasa yang bias gender, suku, agama, atau ras (review 2+ orang)
- [ ] Setiap layar simulasi mencantumkan disclaimer "ini adalah simulasi, bukan saran investasi nyata"
- [ ] SCORM tracking berfungsi: skor, completion, suspend_data tersimpan (SCORM Cloud)
- [ ] Aksesibilitas: navigasi keyboard dan screen reader berfungsi (NVDA/VoiceOver)
- [ ] Keterangan jelas jika aset dibuat dengan bantuan AI generatif

---

## Timeline Pengembangan

| Minggu | Aktivitas | Output |
|---|---|---|
| 1–2 | Riset & desain instruksional: validasi skenario berita, peta alur, wireframe | Dokumen desain & wireframe |
| 3–4 | Pengembangan prototipe simulasi inti (Sesi 3) + integrasi algoritma harga | Prototipe interaktif simulasi |
| 5 | Pengembangan Sesi 1, 2, 4, 5 (kuis, refleksi, panduan langkah) | Konten 5 sesi lengkap |
| 6 | Uji coba internal: bug fixing, akurasi data, aksesibilitas, SCORM integration | Laporan QA internal |
| 7 | Uji coba dengan warga belajar Paket C (usability test 5–10 orang) | Catatan revisi dari pengguna nyata |
| 8 | Revisi final, pengemasan SCORM, penulisan metadata konten Ruang Murid | Paket SCORM siap upload |

---

## Disclaimer Wajib

Sertakan teks berikut di **halaman pembuka simulasi** dan **halaman akhir**:

> *"Konten ini adalah simulasi pembelajaran untuk tujuan pendidikan semata. Semua instrumen investasi, harga, dan skenario bersifat fiktif dan tidak mencerminkan kondisi pasar nyata. Konten ini bukan merupakan saran investasi. Untuk investasi nyata, konsultasikan dengan penasihat keuangan berlisensi OJK."*

---

*Referensi: PasarSahamVirtual_PaketC_DokumenPengembangan.docx — Pendidikan Kesetaraan Paket C | Ruang Murid, Rumah Pendidikan*
