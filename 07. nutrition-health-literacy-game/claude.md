# Gim Literasi Kesehatan: Gizi Seimbang
> Dokumen pengembangan konten interaktif untuk Ruang Murid, Rumah Pendidikan  
> Pendidikan Kesetaraan Paket B — Tema: Keterampilan Hidup & Kesehatan

---

## Ringkasan Konten

| Atribut | Detail |
|---|---|
| Nama konten | Gim Literasi Kesehatan: Gizi Seimbang |
| Jenis | Gim Edukasi (drag-and-drop + simulasi) |
| Sasaran | Paket B (setara SMP) |
| Durasi per sesi | 25–40 menit |
| Jumlah level | 5 level, 14 tantangan |
| Mode belajar | Mandiri & keluarga |
| Platform | Browser (tanpa instalasi), multiplatform |
| Asesmen | Otomatis (skor gizi real-time + lencana) + jurnal refleksi |
| Bahasa | Bahasa Indonesia penuh |
| Referensi gizi | TKPI Kemenkes RI, AKG Permenkes No. 28/2019 |
| Status | ✅ Diimplementasikan (Juni 2026) |

---

## Status Implementasi

Versi berjalan penuh tersedia sebagai file statis (`index.html`, `style.css`, `app.js`, `data.js`, `levels.js`). Dapat dibuka langsung di browser tanpa server atau instalasi tambahan.

**Teknologi yang digunakan:**
- HTML5 + CSS3 + JavaScript (vanilla — tanpa framework)
- Drag & drop: HTML5 DnD API (desktop) + tap-to-pick / tap-to-place (mobile)
- Penyimpanan: `localStorage` (key: `gim-gizi-v1`) — skor, lencana, tantangan selesai, jurnal
- Kompatibilitas: Chrome, Firefox, Safari — mobile & desktop

**Fitur yang sudah berjalan:**
- 5 level × 2–3 tantangan = 14 tantangan total
- 40+ bahan makanan dari TKPI Kemenkes RI (emoji sebagai representasi visual)
- Drag-and-drop makanan dari rak ke zona piring + validasi kategori ketat (makanan hanya bisa masuk zona yang sesuai)
- Umpan balik visual saat drag ke zona salah: kartu merah + animasi goyang + pesan edukatif
- Perhitungan gizi real-time: kalori, protein, karbohidrat, lemak, serat
- Skor gizi 0–100 per penyajian
- Anggaran belanja (level 2 & 5B) dengan indikator real-time
- Panel gizi (bar chart) update otomatis saat makanan ditambah/dihapus
- Antarmuka tab mobile: panel Bahan / Piring / Gizi
- Tap-to-pick + tap-to-place untuk layar sentuh
- 3 lencana: Ahli Gizi Keluarga, Belanja Cerdas, Skor 300+
- Jurnal refleksi (2 pertanyaan) setiap kali satu level selesai, tersimpan di `localStorage`
- Petunjuk (hint) per tantangan
- Thumbnail: `thumbnail.svg` (1200×630px)

**Navigasi & keterbacaan (revisi Juli 2026):**
- Onboarding "Cara Bermain" 3 langkah, tampil otomatis pada kunjungan pertama
- Satu tombol utama di beranda: melanjutkan ke tantangan pertama yang belum selesai
- Penunjuk langkah (stepper) menggantikan tab tantangan: tantangan berikutnya terkunci sampai yang sekarang selesai
- Daftar syarat tantangan yang hidup di bawah piring — menunjukkan apa yang sudah dan belum terpenuhi, termasuk progres bonus
- Tombol "Sajikan / Kosongkan / Petunjuk" pindah ke bar bawah yang selalu terlihat di semua tab
- Tombol lanjut pada layar hasil menyebutkan tujuan berikutnya secara eksplisit
- Ukuran teks minimum 12px (isi 16px); ukuran tidak dikecilkan di layar kecil, hanya jaraknya yang dirapatkan
- Zona piring tersusun 2×2 di layar ≤768px; zona interaktif ditempatkan sebelum piring dekoratif agar terlihat tanpa menggulir
- Sasaran sentuh minimal 44×44px; animasi dinonaktifkan bila `prefers-reduced-motion` aktif

**Fitur yang belum diimplementasikan (rencana ke depan):**
- Ilustrasi gambar makanan (saat ini menggunakan emoji)
- Export Kartu Menu PNG/PDF
- Narasi audio nama makanan
- Mode offline PWA
- Database 200+ item makanan nusantara
- Sinkronisasi ke akun Ruang Murid

---

## Deskripsi Konten

Gim Literasi Kesehatan: Gizi Seimbang adalah gim edukasi berbasis drag-and-drop di mana peserta menyusun menu makan sehari-hari ke dalam **Piring Isi Piringku** — pedoman gizi resmi Kemenkes RI. Setiap pilihan makanan dihitung kandungan gizinya secara otomatis dan ditampilkan sebagai grafik batang real-time.

Peserta belajar melalui konteks cerita: membantu Rani sarapan sebelum ke sekolah, membantu Pak Budi belanja di pasar dengan anggaran terbatas, hingga menyusun menu untuk anggota keluarga dengan kondisi gizi khusus.

---

## Tujuan Pembelajaran

1. **Memahami pedoman Isi Piringku** — Peserta mampu menjelaskan 4 komponen piring sehat beserta proporsinya.
2. **Membaca informasi nilai gizi** — Peserta dapat mengidentifikasi kandungan kalori, protein, karbohidrat, lemak, dan serat dari bahan makanan sehari-hari.
3. **Merencanakan menu seimbang** — Peserta mampu menyusun menu bergizi dalam keterbatasan anggaran dan ketersediaan bahan lokal.
4. **Menghubungkan gizi dengan kondisi khusus** — Peserta dapat menyesuaikan pilihan makanan untuk kelompok rentan (ibu hamil, lansia, remaja aktif).

---

## Profil Warga Belajar

- **Sasaran utama:** Warga belajar Paket B (setara SMP)
- **Konteks kehidupan:** Ibu rumah tangga, orang tua muda, remaja, pekerja harian
- **Relevansi langsung:** Materi dapat langsung diterapkan saat belanja dan memasak di rumah
- **Inklusivitas:** Makanan lokal Indonesia, pilihan halal, tampilan ramah layar sentuh

---

## Panduan Isi Piringku

Setiap piring dalam gim menggunakan pembagian visual berikut, sesuai pedoman resmi Kemenkes RI 2014.

```
+--------------------------------+
|   SAYURAN        | MAKANAN     |
|   1/3 piring     | POKOK       |
|   🥬             | 1/3 piring  |
|------------------| 🍚          |
|  LAUK   | BUAH  |             |
|  1/6    | 1/6   |             |
|  🍗     | 🍌    |             |
+--------------------------------+
  + 💧 1 gelas air per sajian
  + 🏃 30 menit aktivitas fisik/hari
```

Peserta berinteraksi melalui dua komponen terpisah:
1. **Piring dekoratif** (SVG, visual saja) — menunjukkan proporsi Isi Piringku
2. **Kartu drop zone** (4 kartu interaktif) — tempat peserta meletakkan makanan

### Zat gizi yang dilacak

| Zat Gizi | Sumber target |
|---|---|
| Kalori (kkal) | AKG Kemenkes 2019 |
| Protein (gram) | AKG per kelompok usia |
| Karbohidrat (gram) | AKG per kelompok usia |
| Lemak (gram) | AKG per kelompok usia |
| Serat (gram) | AKG per kelompok usia |

### Indikator visual per zat gizi

- **Hijau (✅ Cukup)** — 80–120% kebutuhan
- **Kuning (⚠️ Kurang/Sedikit berlebih)** — 60–79% atau 121–140%
- **Merah (❌ Sangat kurang)** — di bawah 40%
- **Oranye (🔺 Berlebih)** — di atas 140%

Setiap indikator selalu disertai ikon dan teks — tidak bergantung warna saja (aksesibilitas).

### Penyajian informasi gizi

Informasi gizi muncul di tiga tempat, masing-masing dengan peran berbeda:

| Tempat | Isi |
|---|---|
| **Kartu bahan** (rak) | Kalori & protein tercetak langsung di kartu, beserta ukuran porsi dan harga. Tooltip memuat kelima zat gizi. |
| **Panel Gizi** (piring berjalan) | Skor gizi, batang per zat gizi dengan penanda target 100%, persentase, selisih ke target, bahan penyumbang terbesar, dan sumber rujukan. |
| **Layar hasil** (setelah Sajikan) | Tabel isi vs target untuk kelima zat gizi + satu saran perbaikan konkret. |

Batang gizi digambar hingga skala 160% dengan garis penanda di posisi target, sehingga
**asupan berlebih tetap terlihat** — sebelumnya batang dipotong di 100% dan 154% tampak sama
dengan 100%. Angka desimal memakai koma sesuai kaidah Bahasa Indonesia (26,2 g).

---

## Database Makanan (40+ Item)

### Makanan Pokok (10 item)
Nasi Putih, Nasi Merah, Roti Gandum, Roti Tawar, Mie Telur, Singkong Rebus, Ubi Jalar, Jagung Rebus, Ketupat, Bubur Ayam

### Lauk-Pauk (11 item)
Tempe Goreng, Tahu Goreng, Telur Rebus, Telur Ceplok, Ayam Goreng, Ikan Kembung, Ikan Asin, Ikan Lele Goreng, Daging Sapi, Udang Rebus, Hati Ayam

### Sayuran (10 item)
Bayam Rebus, Kangkung Tumis, Wortel, Brokoli Kukus, Tomat, Kacang Panjang, Daun Singkong, Terong Tumis, Timun Segar, Pare Tumis

### Buah-Buahan (10 item)
Pisang Ambon, Pepaya, Jeruk Manis, Mangga, Semangka, Apel, Alpukat, Jambu Biji, Nanas, Salak

> Data nilai gizi per sajian bersumber dari TKPI Kemenkes RI. Harga mengacu rata-rata pasar tradisional Indonesia.

---

## Alur Aktivitas (1 Sesi = 25–40 Menit)

### Tahap 1 — Baca Misi (1–2 menit)
Setiap tantangan dibuka dengan strip misi bergambar: ikon karakter, konteks situasi, dan instruksi yang harus dipenuhi.

### Tahap 2 — Pilih & Susun Makanan (15–22 menit)
Peserta memilih makanan dari rak (panel kiri) dan meletakkannya ke kartu zona piring yang sesuai. Sistem memblokir penempatan yang salah kategori dengan animasi + pesan edukatif.

### Tahap 3 — Cek Gizi Real-Time (seiring langkah 2)
Panel gizi (panel kanan / tab Gizi di mobile) menampilkan bar progres setiap zat gizi, skor gizi 0–100, dan saran otomatis ("Tambahkan sayuran hijau untuk meningkatkan serat").

### Tahap 4 — Sajikan & Lihat Hasil (2–3 menit)
Peserta klik "✅ Sajikan!" untuk melihat hasil penilaian, poin yang diperoleh, dan umpan balik naratif dari karakter cerita.

### Tahap 5 — Refleksi (2–3 menit, setelah selesai satu level)
Peserta mengisi 2 pertanyaan jurnal gizi yang tersimpan otomatis di localStorage.

---

## Level & Tantangan

### Level 1 — Sarapan Keluarga Rani 🍳
**Konsep:** Mengenal 4 komponen Isi Piringku

Rani perlu sarapan bergizi sebelum berangkat ke sekolah kejar paket.

**Target gizi:** Anak (533 kkal, 17g protein, 89g karbo, 18g lemak, 10g serat per sajian)

| ID | Judul | Kondisi Khusus |
|---|---|---|
| 1A | Sarapan Hari Kerja | Maks. 2 item per zona |
| 1B | Sarapan Hari Libur | Maks. 3 item, bonus jika ≥7 item total |
| 1C | Sarapan Super Cepat! | Maks. 4 item total, tetap harus 4 zona terisi |

---

### Level 2 — Belanja di Pasar Pagi 🛒
**Konsep:** Nilai gizi vs harga, belanja cerdas

Pak Budi ke pasar dengan anggaran terbatas. Capai skor gizi tertinggi dalam anggaran.

**Target gizi:** Anak (default)

| ID | Judul | Anggaran |
|---|---|---|
| 2A | Anggaran Rp 30.000 | Rp 30.000 |
| 2B | Anggaran Rp 20.000 | Rp 20.000 |
| 2C | Anggaran Rp 15.000 | Rp 15.000 |

**Insight pedagogi:** Tempe + tahu + sayuran lokal = sumber gizi paling terjangkau.

---

### Level 3 — Menu 7 Hari 📅
**Konsep:** Keanekaragaman pangan

Ibu Ani merencanakan menu makan siang keluarga. Tantangan mendorong variasi bahan.

| ID | Judul | Kondisi Khusus |
|---|---|---|
| 3A | Hari 1–3: Mulai Merencanakan | Bonus jika ≥5 jenis bahan berbeda |
| 3B | Hari 4: Kejutan! | Bahan terbatas (stok kulkas saja) |
| 3C | Hari 5–7: Selesaikan Menu! | Gunakan bahan yang belum dipakai sebelumnya |

---

### Level 4 — Gizi untuk Kondisi Khusus 💊
**Konsep:** Kebutuhan gizi berbeda per kelompok

Setiap anggota keluarga punya kebutuhan gizi yang berbeda.

| ID | Karakter | Target Gizi |
|---|---|---|
| 4A | Ibu Dewi (hamil 7 bulan) | Ibu Hamil (700 kkal, 25g protein) |
| 4B | Kakek Soni (65 tahun) | Lansia (450 kkal, 13g serat) |
| 4C | Budi (15 tahun, atlet voli) | Remaja Aktif (700 kkal, 22g protein) |

---

### Level 5 — Ahli Gizi Keluargaku 🏆
**Konsep:** Gabungan semua — kebebasan penuh + efisiensi anggaran

Peserta membuktikan kemampuan dengan tantangan bebas dan anggaran ketat.

| ID | Judul | Kondisi |
|---|---|---|
| 5A | Menu Bebas Terbaik | Semua bahan tersedia, skor min. 75 (bonus jika ≥85) |
| 5B | Menu Hemat & Sehat | Anggaran Rp 25.000, skor min. 70 |

---

## Sistem Skor & Lencana

### Poin per tantangan
| Kondisi | Poin |
|---|---|
| Pertama kali selesai (skor ≥ minimum) | 70 |
| Pertama kali selesai (skor < minimum) | 40 |
| Bonus (jika tantangan ada syarat bonus) | +15 |
| Mengulang (berhasil) | 15 |
| Mengulang (gagal) | 5 |

### Syarat bonus per tantangan
| ID | Syarat bonus |
|---|---|
| 1B | Sajikan ≥7 makanan |
| 3A | Pakai ≥5 jenis bahan berbeda |
| 3C | Pakai ≥4 bahan yang belum dipakai di tantangan 3A/3B |
| 5A | Skor gizi menembus 85 |

Progres bonus ditampilkan langsung pada daftar syarat di bawah piring.

### Skor gizi 0–100
Dihitung otomatis dari rasio tiap zat gizi terhadap target:
- 90–110% → 100 poin per zat gizi
- 70–89% / 111–120% → 70 poin
- 50–69% / 121–140% → 40 poin
- di luar rentang → 15 poin
- Rata-rata 5 zat gizi = skor gizi akhir

### Lencana
| Pencapaian | Lencana |
|---|---|
| Menyelesaikan semua tantangan | 🏆 Ahli Gizi Keluarga |
| Menyelesaikan semua tantangan Level 2 | 🛒 Belanja Cerdas |
| Skor total ≥ 300 | ⭐ Skor 300+ |

---

## Validasi Kategori Makanan

Makanan hanya dapat ditempatkan di zona yang sesuai kategorinya. Penempatan salah diblokir dengan:

1. **Saat drag (desktop):** zona berubah merah, kursor ⊘
2. **Saat drop salah:** kartu zona goyang (animasi shake) + pesan edukatif:
   > `❌ "Nasi Putih" adalah Pokok, bukan Sayuran! Taruh ke bagian Makanan Pokok 🍚.`
3. **Mobile (tap salah zona):** pickup tetap aktif, peserta bisa tap zona yang benar

---

## Spesifikasi Teknis (Implementasi Saat Ini)

### File
| File | Fungsi |
|---|---|
| `index.html` | Struktur UI: home screen, game screen, modal |
| `style.css` | Tema warna hijau-hangat, responsive, mobile tabs |
| `data.js` | Database 40+ makanan + target gizi per kelompok |
| `levels.js` | Data semua level & tantangan |
| `app.js` | Logika permainan, DnD, mobile pickup, scoring |
| `thumbnail.svg` | Preview konten 1200×630px |

### Antarmuka
- **Desktop:** 3 panel side-by-side (Pilih Bahan | Piring | Gizi)
- **Mobile (≤768px):** 3 tab yang bisa diswitch (Bahan / Piring / Gizi)
- **Piring:** SVG dekoratif (visual saja) + 4 kartu drop zone di bawahnya
- **Drop zone:** efek hover naik + border solid saat makanan melayang di atasnya
- **Item makanan:** emoji besar + badge kategori warna-warni + harga (jika ada)

### Penyimpanan (localStorage)
```js
key: 'gim-gizi-v1'
nilai: { score, completedChallenges, levelScores, badges, reflections }
```

### Kompatibilitas
- Browser: Chrome, Firefox, Safari (2 tahun terakhir)
- Layar minimum: 320px lebar
- Protokol: dapat dibuka via `file://` maupun HTTP

---

## Prinsip Umpan Balik Edukatif

Setiap kesalahan memunculkan pesan edukatif — bukan notifikasi error yang menakutkan.

| Situasi | Umpan balik |
|---|---|
| Drag ke zona salah | `❌ "[Nama makanan]" adalah [kategori], bukan [zona]! Taruh ke bagian [kategori].` |
| Anggaran habis | `❌ Anggaran tidak cukup! Pilih bahan yang lebih murah.` |
| Gizi kurang | `💡 Tambahkan sayuran hijau atau buah segar untuk meningkatkan serat.` |
| Gizi sudah seimbang | `✅ Gizi sudah hampir seimbang! Klik "Sajikan" jika sudah siap.` |

Prinsip bahasa:
- Gunakan kata "coba" bukan "salah"
- Selalu tawarkan solusi konkret
- Maksimal 2 kalimat per pesan

---

## Standar Kualitas Konten (Ruang Murid)

### Keamanan
Konten tidak boleh mengandung:
- [ ] Radikalisme atau ujaran kebencian
- [ ] Bullying atau perundungan
- [ ] Diskriminasi SARA
- [ ] Promosi komersial produk/merek makanan tertentu
- [ ] Klaim kesehatan yang tidak berdasar ilmiah

### Substansi Materi
- [ ] Data gizi bersumber dari TKPI Kemenkes RI
- [ ] Bersifat student-facing (langsung digunakan peserta)
- [ ] Saran gizi tidak menggantikan konsultasi tenaga kesehatan (ada disclaimer)

### Kebahasaan
- [ ] Komunikatif dan mudah dipahami tanpa bimbingan
- [ ] Santun dan tidak menghakimi pilihan makan peserta
- [ ] Sesuai tingkat baca warga belajar Paket B

### Inklusivitas
- [ ] Makanan lokal Indonesia, tidak bias Jawa
- [ ] Tersedia pilihan halal untuk semua kategori
- [ ] Harga mengacu pasar tradisional, bukan supermarket

---

## Checklist Sebelum Unggah ke Ruang Murid

```
KONTEN
☑ Semua 5 level (14 tantangan) dapat dimainkan tanpa error
☑ Validasi kategori berfungsi (makanan diblokir masuk zona salah)
☑ Sistem perhitungan gizi real-time akurat
☑ Lencana dan skor tersimpan di localStorage
☑ Jurnal refleksi tersimpan
☑ Disclaimer "bukan pengganti konsultasi dokter/ahli gizi" terpasang
☐ Semua tantangan diuji dengan 10+ kombinasi menu

DATA GIZI
☑ Nilai gizi 40+ item diverifikasi terhadap TKPI Kemenkes RI
☑ Target gizi per kelompok sesuai AKG Permenkes No. 28/2019
☐ Data gizi diverifikasi oleh ahli gizi/tenaga kesehatan

TEKNIS
☑ Berjalan di Chrome, Firefox, Safari (mobile & desktop)
☑ Drag-and-drop berfungsi di desktop
☑ Tap-to-pick + tap-to-place berfungsi di layar sentuh
☑ Telah diuji pada layar 320px
☑ Thumbnail tersedia (thumbnail.svg, 1200×630px)
☐ Waktu muat < 5 detik pada koneksi 3G (belum diuji)
☐ Mode offline PWA (belum diimplementasikan)

STANDAR RUANG MURID
☑ Label keterangan AI dicantumkan
☐ Telah diverifikasi oleh pendidik kesetaraan
☐ Metadata konten lengkap (judul, deskripsi, tag, sasaran paket)
☐ Thumbnail dikonversi ke PNG 1200×630px (saat ini SVG)
```

---

## Referensi Pengembangan

- **Pedoman Gizi Seimbang** — Kemenkes RI 2014
- **Tabel Komposisi Pangan Indonesia (TKPI)** — Kemenkes RI
- **Pedoman visual Isi Piringku** — Kemenkes RI
- **Angka Kecukupan Gizi (AKG)** — Permenkes No. 28 Tahun 2019
- **Kurikulum Merdeka Paket B** — Muatan IPA Terapan / Keterampilan Hidup
- **Panduan Teknis Ruang Murid 2025** — standar format dan unggah konten

---

*Dokumen ini mencerminkan status implementasi Juni 2026. Seluruh saran gizi dalam konten wajib diverifikasi oleh tenaga gizi sebelum diunggah ke Ruang Murid.*
