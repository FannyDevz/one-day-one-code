# Lab Coding Blok: Logika Dasar
> Dokumen pengembangan konten interaktif untuk Ruang Murid, Rumah Pendidikan  
> Pendidikan Kesetaraan Paket B — Fase D — Keterampilan Koding & Kecerdasan Artifisial

---

## Ringkasan Konten

| Atribut | Detail |
|---|---|
| Nama konten | Lab Coding Blok: Logika Dasar |
| Jenis | Lab Maya (simulasi interaktif) |
| Sasaran | Paket B (setara SMP), Fase D |
| Durasi per sesi | 30–45 menit |
| Jumlah level | 5 level, 15 tantangan |
| Mode belajar | Mandiri |
| Platform | Browser (tanpa instalasi), multiplatform |
| Asesmen | Otomatis (skor & lencana) + jurnal refleksi |
| Bahasa | Bahasa Indonesia penuh |
| Status | ✅ Diimplementasikan (Juni 2026) |

---

## Status Implementasi

Versi berjalan penuh tersedia sebagai file statis (`index.html`, `style.css`, `app.js`, `engine.js`, `levels.js`). Dapat dibuka langsung di browser tanpa server atau instalasi tambahan.

**Teknologi yang digunakan:**
- HTML5 + CSS3 + JavaScript (vanilla — tanpa framework)
- Drag & drop: HTML5 DnD API (desktop) + tap-to-pick / tap-to-place (mobile)
- Penyimpanan: `localStorage` (progress, skor, lencana, jurnal refleksi)
- Kompatibilitas: Chrome, Firefox, Safari — mobile & desktop

**Fitur yang sudah berjalan:**
- 5 level × 3 tantangan = 15 tantangan total
- Blok program: Maju, Belok, Ulangi N, Ulangi Selamanya, Jika-Maka, Jika-Tidak, Variabel, Tampilkan, Berhenti, Mulai
- Drag & drop blok ke area program + nested block (blok di dalam loop/kondisi)
- Animasi simulasi real-time berdasarkan program yang disusun
- Sistem skor otomatis dengan lencana pencapaian
- Jurnal refleksi disimpan di localStorage
- Antarmuka tab mobile: panel Blok / Program / Simulasi
- Tap-to-pick + tap-to-place sebagai pengganti drag-and-drop di layar sentuh
- Thumbnail: `thumbnail.svg` (1200×630px)

**Fitur yang belum diimplementasikan (rencana ke depan):**
- Mode offline PWA
- Narasi audio per instruksi
- Mode kolaborasi dua pemain (Level 4D)
- Galeri karya Level 5
- Sinkronisasi ke akun Ruang Murid

---

## Deskripsi Konten

Lab Coding Blok adalah simulasi visual block-coding berbasis browser — tanpa instalasi, tanpa perlu akun khusus. Warga belajar menyusun blok instruksi bergambar seperti menyusun puzzle, lalu menjalankan animasi untuk melihat hasilnya secara langsung. Jika terjadi kesalahan, mereka bisa mencoba lagi tanpa konsekuensi.

Pendekatan ini membangun **computational thinking** secara intuitif, dimulai dari konteks kehidupan nyata yang familiar: memandu robot melewati rintangan, memanen hasil kebun secara otomatis, atau memprogram lampu lalu lintas.

---

## Tujuan Pembelajaran

1. **Memahami konsep algoritma** — Peserta mampu menjelaskan bahwa komputer bekerja mengikuti urutan instruksi yang tepat dan berurutan.
2. **Menerapkan tiga struktur logika** — Peserta dapat menggunakan sequence, loop, dan if-else untuk menyelesaikan masalah sederhana.
3. **Mengembangkan kemampuan debug** — Peserta dapat menemukan kesalahan dalam program blok dan memperbaikinya secara mandiri.
4. **Menghubungkan coding dengan kehidupan** — Peserta mampu mencontohkan penerapan logika pemrograman dalam teknologi yang mereka gunakan sehari-hari.

---

## Profil Warga Belajar

- **Sasaran utama:** Warga belajar Paket B (setara SMP)
- **Kurikulum:** Fase D — Keterampilan Koding dan Kecerdasan Artifisial
- **Prasyarat:** Tidak perlu pengalaman coding. Cukup bisa menggunakan smartphone atau komputer dasar.
- **Konteks kehidupan:** Pekerja, ibu rumah tangga, pelaku UMKM, pemuda putus sekolah
- **Inklusivitas:** Teks besar, antarmuka Bahasa Indonesia penuh, tersedia di layar sentuh

---

## Alur Aktivitas (1 Sesi = 30–45 Menit)

### Tahap 1 — Baca Misi (1–2 menit)
Setiap tantangan dibuka dengan misi bergambar: karakter, konteks situasi, dan tujuan yang harus dicapai. Tidak ada ceramah pembuka.

### Tahap 2 — Susun Blok (10–15 menit)
Peserta memilih blok dari panel kiri dan menyusunnya di area program. Blok dapat disarang (nested) untuk membuat loop atau kondisi.

### Tahap 3 — Jalankan & Lihat (2–5 menit)
Tombol "Jalankan" menjalankan animasi simulasi sesuai program. Jika program salah, animasi menunjukkan hasil yang lucu/tidak sesuai tujuan — bukan pesan error merah.

### Tahap 4 — Debug & Ulang (5–10 menit)
Peserta merevisi program dan mencoba lagi. Tersedia tombol Petunjuk jika peserta buntu.

### Tahap 5 — Refleksi (2–3 menit)
Setelah menyelesaikan semua tantangan dalam satu level, peserta mengisi 2 pertanyaan jurnal refleksi yang tersimpan otomatis.

---

## Level & Tantangan

### Level 1 — Peta Petualangan 🗺️
**Konsep:** Sequence (urutan instruksi linear)

Karakter harus mencapai tujuan di peta. Peserta menyusun blok gerakan tanpa percabangan atau pengulangan — hanya urutan langkah demi langkah.

**Blok yang tersedia:** `Mulai`, `Maju`, `Belok Kiri`, `Belok Kanan`, `Berhenti`

**Tantangan:** 3 peta dengan kompleksitas bertahap (lurus → belokan → rintangan)

**Representasi blok:**
```
▶ MULAI
  → Maju
  → Belok Kanan
  → Maju
  → Maju
■ BERHENTI
```

---

### Level 2 — Kebun Panen 🌳
**Konsep:** Loop / pengulangan (for loop & while loop)

Karakter memanen hasil kebun. Daripada menulis blok "Petik" berkali-kali, peserta belajar menggunakan blok `Ulangi N kali`.

**Blok baru:** `Ulangi [N] kali`, `Ulangi Selamanya`

**Tantangan:** 3 kebun dengan jumlah tanaman berbeda

**Representasi blok:**
```
▶ MULAI
↻ ULANGI 8 kali:
  │  → Maju
  │  → Petik Buah
↻ AKHIR ULANGI
■ BERHENTI
```

---

### Level 3 — Kasir Warung 🏪
**Konsep:** Percabangan (if-else)

Robot kasir harus memutuskan: jika pelanggan membayar lebih, berikan kembalian; jika kurang, minta tambahan.

**Blok baru:** `Jika [kondisi] maka`, `Jika tidak`, `Akhir Jika`, `Tampilkan [pesan]`

**Tantangan:** 3 skenario dengan jumlah kondisi bertambah

**Representasi blok:**
```
▶ MULAI
◆ JIKA Bayar > Harga:
  │  → Kembalikan (Bayar - Harga)
◆ JIKA TIDAK:
  │  → Minta pembayaran tambahan
◆ AKHIR JIKA
■ BERHENTI
```

---

### Level 4 — Lampu Lalu Lintas 🚦
**Konsep:** Loop + if-else (kombinasi)

Peserta membangun sistem lampu lalu lintas yang terus berulang. Ditambahkan kondisi darurat: jika ambulans terdeteksi, lampu langsung hijau.

**Blok baru:** Kombinasi semua blok sebelumnya + variabel kondisi

**Tantangan:** 3 skenario (timer tetap → timer berbeda → kondisi darurat)

**Representasi blok:**
```
▶ MULAI
↻ ULANGI SELAMANYA:
  │  ◆ JIKA ada_ambulans:
  │  │  → Nyalakan HIJAU
  │  ◆ JIKA TIDAK:
  │  │  → Nyalakan MERAH (30 dtk)
  │  │  → Nyalakan KUNING (5 dtk)
  │  │  → Nyalakan HIJAU (25 dtk)
  │  ◆ AKHIR JIKA
↻ AKHIR ULANGI
```

---

### Level 5 — Asisten Chatbot 🤖
**Konsep:** Sequence + loop + if-else + variabel (gabungan semua)

Peserta membuat "chatbot" sederhana. Tidak ada solusi tunggal — setiap peserta mengembangkan alurnya sendiri.

**Tantangan:** 3 skenario dengan respons chatbot yang berbeda

**Representasi blok:**
```
▶ MULAI
  → Tampilkan "Halo! Ada yang bisa dibantu?"
↻ ULANGI sampai pilihan = "Keluar":
  │  ◆ JIKA pilihan = "1":
  │  │  → Tampilkan daftar harga
  │  ◆ JIKA pilihan = "2":
  │  │  → Cek variabel Stok
  │  ◆ JIKA pilihan = "Keluar":
  │  │  → Keluar dari loop
↻ AKHIR ULANGI
■ BERHENTI
```

---

## Sistem Skor & Lencana

### Poin per tantangan
| Kondisi | Poin |
|---|---|
| Pertama kali selesai (berhasil) | 70 |
| Pertama kali selesai (gagal, kurang dari skor minimum) | 40 |
| Mengulang tantangan yang sudah selesai (berhasil) | 15 |
| Mengulang tantangan yang sudah selesai (gagal) | 5 |

### Lencana
| Pencapaian | Lencana |
|---|---|
| Menyelesaikan semua tantangan | 🏆 Ahli Coding Logika |
| Skor total ≥ 300 | ⭐ Skor 300+ |
| *(lencana tambahan dapat dikembangkan)* | |

---

## Spesifikasi Teknis (Implementasi Saat Ini)

### File
| File | Fungsi |
|---|---|
| `index.html` | Struktur UI: panel palette, program, simulasi, modal |
| `style.css` | Tema warna biru-gelap, responsive, mobile tabs |
| `app.js` | Logika UI: drag-and-drop, tap-to-pick, mobile panel |
| `engine.js` | Eksekusi program blok, animasi simulasi |
| `levels.js` | Data semua level & tantangan |
| `thumbnail.svg` | Preview konten 1200×630px |

### Antarmuka
- **Desktop:** 3 panel side-by-side (Palette | Program | Simulasi)
- **Mobile (≤768px):** 3 tab yang bisa diswitch (Blok / Program / Simulasi)
- **Drag & drop:** HTML5 DnD API — blok bisa di-drop ke gap antar blok, ke body loop/kondisi, atau diurutkan ulang
- **Mobile tap:** Ketuk blok di palette → blok "dipegang" (bar biru muncul di bawah) → ketuk celah hijau di program untuk meletakkan
- **Ukuran blok minimum:** 44×44px (WCAG touch target)

### Penyimpanan (localStorage)
```js
key: 'lab-coding-v1'
nilai: { score, completedChallenges, levelScores, badges, reflections }
```

### Kompatibilitas
- Browser: Chrome, Firefox, Safari (2 tahun terakhir)
- Layar minimum: 320px lebar
- Protokol: dapat dibuka via `file://` maupun HTTP

---

## Rubrik Penilaian

| Dimensi | Bobot | Mahir (85–100) | Berkembang (60–84) | Mulai (0–59) |
|---|---|---|---|---|
| **Ketepatan logika** | 40% | Program berjalan sempurna, semua kondisi terpenuhi | Program berjalan sebagian besar benar, 1–2 kondisi terlewat | Program tidak berjalan atau mayoritas instruksi salah |
| **Efisiensi kode** | 25% | Menggunakan loop dan fungsi untuk menghindari pengulangan | Ada beberapa blok redundan yang bisa disederhanakan | Banyak blok copy-paste tanpa memanfaatkan loop |
| **Proses debug** | 20% | Menemukan dan memperbaiki kesalahan mandiri dalam ≤3 percobaan | Berhasil debug dengan menggunakan fitur hint | Membutuhkan >5 percobaan atau tidak berhasil debug |
| **Refleksi belajar** | 15% | Jurnal menunjukkan pemahaman konsep dan koneksi ke kehidupan nyata | Jurnal ada, menyebutkan konsep yang dipelajari | Jurnal kosong atau hanya satu kata |

---

## Standar Kualitas Konten (Ruang Murid)

### Keamanan
Konten tidak boleh mengandung:
- [ ] Radikalisme atau ujaran kebencian
- [ ] Konten pornografi atau sugesti seksual
- [ ] Bullying atau perundungan
- [ ] Diskriminasi SARA
- [ ] Promosi komersial produk/merek tertentu

### Substansi Materi
- [ ] Faktual dan sesuai dengan kurikulum Paket B Fase D
- [ ] Bersifat student-facing (langsung digunakan peserta)
- [ ] Mengandung asesmen atau refleksi belajar yang terukur
- [ ] Kontekstual dengan kehidupan warga belajar kesetaraan

### Kebahasaan
- [ ] Komunikatif dan mudah dipahami tanpa bimbingan
- [ ] Santun dan tidak merendahkan
- [ ] Sesuai tingkat baca warga belajar Paket B

### Inklusivitas
- [ ] Tidak bias gender, suku, agama, atau wilayah
- [ ] Konteks skenario relevan dengan kehidupan sehari-hari
- [ ] Dapat dioperasikan di layar sentuh maupun mouse

---

## Checklist Sebelum Unggah ke Ruang Murid

```
KONTEN
☑ Semua 5 level (15 tantangan) dapat dimainkan dari awal hingga akhir tanpa error
☑ Sistem skor dan lencana berjalan dengan benar
☑ Jurnal refleksi tersimpan di localStorage
☐ Sertifikat digital muncul setelah semua level selesai
☐ Mode kolaborasi Level 4 berfungsi (belum diimplementasikan)

TEKNIS
☑ Berjalan di Chrome, Firefox, Safari (mobile & desktop)
☑ Drag-and-drop berfungsi di desktop
☑ Tap-to-pick + tap-to-place berfungsi di layar sentuh
☑ Telah diuji pada layar 320px (smartphone kecil)
☑ Thumbnail tersedia (thumbnail.svg, 1200×630px)
☐ Waktu muat < 5 detik pada koneksi 3G (belum diuji)
☐ Mode offline PWA (belum diimplementasikan)

STANDAR RUANG MURID
☑ Tidak ada konten yang melanggar kebijakan keamanan
☑ Label keterangan AI dicantumkan
☐ Telah diverifikasi oleh pendidik kesetaraan
☐ Metadata konten lengkap (judul, deskripsi, tag, sasaran paket)
☐ Thumbnail dikonversi ke PNG 1200×630px (saat ini SVG)
```

---

## Referensi & Inspirasi Pengembangan

- **Scratch** (scratch.mit.edu) — referensi antarmuka block-coding visual
- **Code.org** — referensi struktur level dan skenario kontekstual
- **Kurikulum Merdeka Paket B, Fase D** — acuan kompetensi dasar Keterampilan Koding
- **Panduan Teknis Ruang Murid 2025** — standar format dan unggah konten

---

*Dokumen ini mencerminkan status implementasi Juni 2026. Diperbarui sesuai perkembangan fitur dan platform Ruang Murid.*
