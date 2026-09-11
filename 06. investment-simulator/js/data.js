// data.js — Pasar Saham Virtual: Investasi Pertamamu

const AUTHOR = {
  nama: 'Fanny Bagus Ramadhan',
  peran: 'Pengembang Konten — Lab Maya, Pasar Saham Virtual',
  website: 'https://fanny.dev',
  inisial: 'FB'
};

// Lencana — setiap satu terikat pada perilaku nyata warga belajar,
// bukan sekadar hadiah partisipasi.
const BADGES = [
  {
    id: 'langkah_pertama',
    icon: '🌱',
    nama: 'Langkah Pertama',
    syarat: 'Selesaikan Sesi 1',
    warna: '#057a55'
  },
  {
    id: 'kenal_instrumen',
    icon: '🧭',
    nama: 'Kenal Instrumen',
    syarat: 'Benar ≥ 70% pada kuis Sesi 2',
    warna: '#1a56db'
  },
  {
    id: 'diversifikator',
    icon: '🛡️',
    nama: 'Diversifikator Ulung',
    syarat: 'Sebar modal ke 4 aset sekaligus dalam satu ronde',
    warna: '#7e3af2'
  },
  {
    id: 'tameng_emas',
    icon: '🥇',
    nama: 'Tameng Emas',
    syarat: 'Pegang emas ≥ 15% saat rupiah melemah (Ronde 4)',
    warna: '#d97706'
  },
  {
    id: 'cuan_pertama',
    icon: '📈',
    nama: 'Cuan Pertama',
    syarat: 'Akhiri simulasi dengan portofolio di atas modal awal',
    warna: '#057a55'
  },
  {
    id: 'anti_bodong',
    icon: '🚨',
    nama: 'Anti Investasi Bodong',
    syarat: 'Jawab benar SEMUA soal kuis Sesi 5',
    warna: '#e02424'
  },
  {
    id: 'perenung',
    icon: '✍️',
    nama: 'Perenung Ulung',
    syarat: 'Tulis refleksi Sesi 4 lebih dari 30 kata',
    warna: '#1e429f'
  },
  {
    id: 'investor_bersertifikat',
    icon: '🏆',
    nama: 'Investor Bersertifikat',
    syarat: 'Tuntaskan seluruh 5 sesi',
    warna: '#d97706'
  }
];

const LEARNING_GOALS = [
  'Menjelaskan perbedaan antara menabung dan berinvestasi.',
  'Mengidentifikasi minimal 3 instrumen investasi dasar beserta karakteristiknya.',
  'Memahami konsep risiko dan imbal hasil (risk & return) secara praktis.',
  'Membuat keputusan investasi sederhana berdasarkan analisis skenario ekonomi.',
  'Menyusun portofolio investasi dasar yang terdiversifikasi.',
  'Menunjukkan sikap bijak dalam mengelola keuangan pribadi.'
];

const INSTRUMENTS = [
  {
    id: 'saham',
    nama: 'Saham',
    icon: '📈',
    warna: '#1a56db',
    warnaLight: '#e1effe',
    deskripsi: 'Surat kepemilikan perusahaan yang diperjualbelikan di Bursa Efek Indonesia (BEI).',
    risiko: 'Tinggi',
    risikoLevel: 4,
    imbalHasil: '7–15% per tahun (historis)',
    contoh: 'BRI, Telkom Indonesia, Unilever Indonesia',
    profilCocok: 'Agresif',
    keuntungan: ['Potensi imbal hasil paling tinggi', 'Likuid — bisa dijual kapan saja di jam bursa', 'Hak dividen dan suara dalam RUPS'],
    kerugian: ['Harga bisa turun drastis', 'Memerlukan pengetahuan analisis', 'Dipengaruhi sentimen pasar harian']
  },
  {
    id: 'reksa_dana',
    nama: 'Reksa Dana Pasar Uang',
    icon: '🏦',
    warna: '#057a55',
    warnaLight: '#def7ec',
    deskripsi: 'Dana kolektif yang dikelola manajer investasi profesional, ditempatkan di instrumen pasar uang jangka pendek.',
    risiko: 'Rendah',
    risikoLevel: 1,
    imbalHasil: '4–6% per tahun',
    contoh: 'Bareksa, Bibit, Tokopedia Reksa Dana',
    profilCocok: 'Konservatif',
    keuntungan: ['Risiko sangat rendah', 'Dikelola profesional', 'Bisa mulai dari Rp 10.000'],
    kerugian: ['Imbal hasil lebih rendah dari saham', 'Ada biaya manajemen', 'Tidak dijamin LPS']
  },
  {
    id: 'emas',
    nama: 'Emas Batangan',
    icon: '🥇',
    warna: '#d97706',
    warnaLight: '#fef3c7',
    deskripsi: 'Logam mulia sebagai penyimpan nilai (store of value). Naik saat krisis dan rupiah melemah.',
    risiko: 'Rendah–Sedang',
    risikoLevel: 2,
    imbalHasil: '5–8% per tahun (bergantung kurs)',
    contoh: 'Antam, UBS, Tabungan Emas Pegadaian',
    profilCocok: 'Moderat',
    keuntungan: ['Lindung nilai terhadap inflasi', 'Safe haven saat krisis ekonomi', 'Naik saat rupiah melemah'],
    kerugian: ['Tidak menghasilkan dividen', 'Dipengaruhi kurs dolar AS', 'Perlu biaya penyimpanan (fisik)']
  },
  {
    id: 'kas',
    nama: 'Kas / Deposito',
    icon: '💵',
    warna: '#6b7280',
    warnaLight: '#f3f4f6',
    deskripsi: 'Uang tunai atau simpanan deposito di bank. Paling aman, tapi paling lambat tumbuh.',
    risiko: 'Sangat Rendah',
    risikoLevel: 0,
    imbalHasil: '2–4% per tahun',
    contoh: 'Deposito BRI, BCA, BNI',
    profilCocok: 'Sangat Konservatif',
    keuntungan: ['Dijamin LPS hingga Rp 2 miliar', 'Tidak ada risiko kehilangan modal', 'Likuid penuh'],
    kerugian: ['Imbal hasil terendah dari semua instrumen', 'Tergerus inflasi jika bunga < inflasi', 'Tidak tumbuh signifikan jangka panjang']
  }
];

const NEWS_ROUNDS = [
  {
    id: 1,
    judul: 'BI Naikkan Suku Bunga Acuan 0,25%',
    berita: 'Bank Indonesia menaikkan suku bunga acuan (BI Rate) menjadi 6,25% untuk mengendalikan inflasi yang mulai merangkak naik. Pasar merespons dengan hati-hati.',
    kategori: 'moneter',
    ikon: '🏦',
    dampak: { saham: -0.03, reksa_dana: 0.01, emas: 0.00, kas: 0.002 },
    penjelasan: 'Kenaikan suku bunga membuat deposito & obligasi lebih menarik daripada saham. Biaya pinjaman perusahaan naik, sehingga saham cenderung turun. Reksa dana pasar uang justru diuntungkan karena instrumen di dalamnya ikut naik imbal hasilnya.',
    pelajaranKunci: '📚 Pelajaran: Suku bunga mempengaruhi seluruh pasar modal — investor cerdas memantau kebijakan Bank Indonesia.',
    analisisAset: {
      saham: '⬇️ Turun 3% — biaya modal perusahaan meningkat',
      reksa_dana: '⬆️ Naik 1% — instrumen pasar uang mengikuti kenaikan bunga',
      emas: '➡️ Stabil — tidak langsung terpengaruh BI Rate',
      kas: '⬆️ Naik sedikit — bunga deposito ikut naik'
    }
  },
  {
    id: 2,
    judul: 'Harga BBM Bersubsidi Resmi Naik 15%',
    berita: 'Pemerintah resmi menaikkan harga BBM bersubsidi sebesar 15% mulai hari ini. Kenaikan ini memicu peningkatan biaya logistik di seluruh wilayah Indonesia.',
    kategori: 'energi',
    ikon: '⛽',
    dampak: { saham: -0.025, reksa_dana: -0.005, emas: 0.03, kas: 0.0 },
    penjelasan: 'BBM naik → biaya produksi & distribusi meningkat → margin perusahaan tertekan → saham turun secara umum. Namun saham sektor energi bisa naik. Emas naik karena investor khawatir inflasi akan ikut melambung.',
    pelajaranKunci: '📚 Pelajaran: Kebijakan pemerintah berdampak berbeda-beda tiap sektor — analisis sektoral sangat penting.',
    analisisAset: {
      saham: '⬇️ Turun 2,5% — biaya logistik naik menekan margin usaha',
      reksa_dana: '⬇️ Turun sedikit — pasar secara keseluruhan tertekan',
      emas: '⬆️ Naik 3% — safe haven dari kekhawatiran inflasi',
      kas: '➡️ Aman, tapi nilai riil tergerus inflasi'
    }
  },
  {
    id: 3,
    judul: 'Ekspor Sawit Melonjak 30%! Rupiah Menguat',
    berita: 'Ekspor produk kelapa sawit Indonesia melonjak 30% karena permintaan tinggi dari Eropa dan India. Rupiah menguat ke Rp 15.400 per dolar AS.',
    kategori: 'ekspor',
    ikon: '🌿',
    dampak: { saham: 0.05, reksa_dana: 0.01, emas: -0.02, kas: 0.0 },
    penjelasan: 'Kabar ekspor positif + rupiah menguat = sentimen pasar bagus. Saham agrikultur dan emiten sawit naik signifikan. Emas sedikit turun karena rupiah menguat (emas dihargai dalam dolar, kalau rupiah kuat → harga emas dalam rupiah turun).',
    pelajaranKunci: '📚 Pelajaran: Berita positif sektoral bisa jadi peluang saham terkait — baca berita ekonomi secara rutin.',
    analisisAset: {
      saham: '⬆️ Naik 5% — sentimen pasar positif, saham agrikultur terdongkrak',
      reksa_dana: '⬆️ Naik 1% — ikut menguat bersama pasar',
      emas: '⬇️ Turun 2% — rupiah menguat membuat emas dalam rupiah lebih murah',
      kas: '➡️ Tidak berubah — rugi momentum pertumbuhan pasar'
    }
  },
  {
    id: 4,
    judul: 'Rupiah Melemah ke Rp 16.500 per Dolar',
    berita: 'Rupiah melemah signifikan ke Rp 16.500 per dolar AS akibat ketidakpastian ekonomi global dan arus modal asing keluar dari pasar berkembang.',
    kategori: 'moneter',
    ikon: '💱',
    dampak: { saham: -0.04, reksa_dana: -0.01, emas: 0.06, kas: -0.005 },
    penjelasan: 'Pelemahan rupiah → investor asing menarik dana → saham turun. Emas naik signifikan karena dihargai dalam dolar — ini manfaat nyata diversifikasi ke emas. Perusahaan importir sangat terdampak, eksportir justru diuntungkan.',
    pelajaranKunci: '📚 Pelajaran: Diversifikasi ke emas melindungi portofolio saat rupiah melemah.',
    analisisAset: {
      saham: '⬇️ Turun 4% — modal asing keluar, pasar tertekan',
      reksa_dana: '⬇️ Turun 1% — ikut terpengaruh sentimen negatif',
      emas: '⬆️ Naik 6% — inilah fungsi emas sebagai pelindung portofolio!',
      kas: '⬇️ Nilai riil melemah — rupiah yang kamu pegang daya belinya berkurang'
    }
  },
  {
    id: 5,
    judul: 'Program Infrastruktur Nasional Rp 500 Triliun!',
    berita: 'Pemerintah meluncurkan program infrastruktur nasional senilai Rp 500 triliun. Tender konstruksi jalan tol, pelabuhan, dan bandara dibuka di seluruh Indonesia.',
    kategori: 'fiskal',
    ikon: '🏗️',
    dampak: { saham: 0.07, reksa_dana: 0.02, emas: 0.01, kas: 0.0 },
    penjelasan: 'Belanja pemerintah besar → konstruksi, material bangunan, semen, dan logistik bergairah. Ini suntikan besar untuk pertumbuhan ekonomi. Pasar sangat positif — saham naik signifikan.',
    pelajaranKunci: '📚 Pelajaran: Kebijakan fiskal pemerintah berdampak besar pada sektor-sektor tertentu — pantau APBN dan proyek strategis nasional.',
    analisisAset: {
      saham: '⬆️ Naik 7% — konstruksi & material naik tajam, pasar sangat optimis',
      reksa_dana: '⬆️ Naik 2% — ikut terdongkrak sentimen positif',
      emas: '⬆️ Naik 1% — stabil dengan sedikit kenaikan',
      kas: '➡️ Tidak berubah — rugi momentum besar pertumbuhan pasar'
    }
  }
];

const INVESTOR_PROFILE_QUESTIONS = [
  {
    id: 1,
    pertanyaan: 'Nilai investasimu turun 20% dalam sebulan. Apa yang kamu lakukan?',
    opsi: [
      { nilai: 1, teks: '😰 Jual semuanya — tidak mau rugi lebih banyak!' },
      { nilai: 2, teks: '🤔 Jual sebagian, tahan sisanya sambil menunggu' },
      { nilai: 3, teks: '😐 Tahan dulu, ini fluktuasi biasa' },
      { nilai: 4, teks: '😄 Beli lebih banyak! Harga murah = kesempatan bagus!' }
    ]
  },
  {
    id: 2,
    pertanyaan: 'Apa tujuan utama investasimu saat ini?',
    opsi: [
      { nilai: 1, teks: '🛡️ Menyimpan uang dengan aman — tidak mau rugi sama sekali' },
      { nilai: 2, teks: '📊 Imbal hasil sedikit di atas tabungan, risiko minimal' },
      { nilai: 3, teks: '📈 Pertumbuhan stabil dalam 3–5 tahun ke depan' },
      { nilai: 4, teks: '🚀 Imbal hasil maksimal — siap terima risiko tinggi' }
    ]
  },
  {
    id: 3,
    pertanyaan: 'Berapa lama kamu berencana menyimpan investasi ini?',
    opsi: [
      { nilai: 1, teks: '⏱️ Kurang dari 1 tahun' },
      { nilai: 2, teks: '📅 1–3 tahun' },
      { nilai: 3, teks: '📆 3–5 tahun' },
      { nilai: 4, teks: '🗓️ Lebih dari 5 tahun' }
    ]
  },
  {
    id: 4,
    pertanyaan: 'Ada peluang investasi berisiko tinggi tapi potensi untung 3x lipat. Kamu...',
    opsi: [
      { nilai: 1, teks: '🙅 Tidak tertarik — terlalu berisiko buat saya' },
      { nilai: 2, teks: '🤏 Coba dengan 10% saja dari tabunganku' },
      { nilai: 3, teks: '👍 Masukkan 25–30% dari tabunganku' },
      { nilai: 4, teks: '💪 Masukkan 50% atau lebih dari tabunganku' }
    ]
  },
  {
    id: 5,
    pertanyaan: 'Seberapa stabil penghasilan atau uang sakumu setiap bulan?',
    opsi: [
      { nilai: 1, teks: '😓 Tidak tentu — sering berubah drastis' },
      { nilai: 2, teks: '😕 Cukup stabil tapi sering ada pengeluaran mendadak' },
      { nilai: 3, teks: '🙂 Stabil dengan sedikit variasi' },
      { nilai: 4, teks: '😊 Sangat stabil, punya dana darurat yang cukup' }
    ]
  }
];

const RECOMMENDED_ALLOCATIONS = {
  konservatif: {
    saham: 10, reksa_dana: 50, emas: 20, kas: 20,
    label: 'Konservatif',
    emoji: '🛡️',
    warna: '#057a55',
    deskripsi: 'Kamu prioritaskan keamanan modal di atas imbal hasil tinggi. Strategi ini cocok untuk pemula atau yang butuh dana dalam waktu dekat.'
  },
  moderat: {
    saham: 40, reksa_dana: 30, emas: 20, kas: 10,
    label: 'Moderat',
    emoji: '⚖️',
    warna: '#d97706',
    deskripsi: 'Kamu mencari keseimbangan antara pertumbuhan dan keamanan. Diversifikasi merata adalah kuncinya.'
  },
  agresif: {
    saham: 70, reksa_dana: 15, emas: 10, kas: 5,
    label: 'Agresif',
    emoji: '🚀',
    warna: '#e02424',
    deskripsi: 'Kamu fokus pada pertumbuhan maksimal dan siap menerima fluktuasi besar. Saham mendominasi portofoliomu.'
  }
};

const QUIZ_S1 = [
  {
    pertanyaan: 'Jika inflasi 5%/tahun dan bunga tabungan 3%/tahun, apa yang terjadi dengan daya beli uangmu?',
    opsi: [
      'Meningkat 8% karena ada bunga',
      'Menurun 2% secara riil setiap tahun',
      'Tetap sama karena ada bunga',
      'Tidak bisa dihitung'
    ],
    jawaban: 1,
    penjelasan: 'Daya beli riil turun 2% (inflasi 5% dikurangi bunga 3%). Meski nominalnya bertambah, barang-barang menjadi lebih mahal lebih cepat dari tabunganmu bertumbuh.'
  },
  {
    pertanyaan: 'Perbedaan utama antara menabung dan berinvestasi adalah...',
    opsi: [
      'Menabung hanya untuk orang kaya',
      'Investasi selalu lebih menguntungkan',
      'Menabung lebih aman tapi imbal hasil lebih rendah dari investasi',
      'Tidak ada perbedaan, keduanya sama saja'
    ],
    jawaban: 2,
    penjelasan: 'Menabung menawarkan keamanan modal (dijamin LPS) dengan imbal hasil rendah. Investasi punya potensi imbal hasil lebih tinggi namun disertai risiko kehilangan sebagian modal.'
  },
  {
    pertanyaan: '"Time value of money" (nilai waktu uang) artinya...',
    opsi: [
      'Uang yang disimpan lama nilainya selalu naik otomatis',
      'Rp 1.000.000 hari ini lebih bernilai dari Rp 1.000.000 setahun lagi',
      'Nilai uang tidak berubah sepanjang waktu',
      'Uang harus disimpan selama mungkin untuk tumbuh'
    ],
    jawaban: 1,
    penjelasan: 'Uang yang ada sekarang bisa diinvestasikan untuk menghasilkan lebih banyak. Itulah mengapa Rp 1 juta hari ini lebih bernilai — ia bisa "bekerja" menghasilkan nilai tambah.'
  }
];

const QUIZ_S2 = [
  {
    pertanyaan: 'Instrumen paling cocok untuk pemula yang baru mulai berinvestasi dengan modal kecil adalah...',
    opsi: [
      'Saham perusahaan tunggal yang sedang naik',
      'Reksa Dana Pasar Uang',
      'Obligasi korporasi berbunga tinggi',
      'Emas fisik dalam jumlah besar'
    ],
    jawaban: 1,
    penjelasan: 'Reksa Dana Pasar Uang dikelola profesional, bisa dimulai dari Rp 10.000, risiko rendah. Ini titik awal yang ideal sebelum mempelajari instrumen yang lebih kompleks.'
  },
  {
    pertanyaan: 'Mengapa emas disebut "safe haven"?',
    opsi: [
      'Karena emas tidak bisa dijual kembali',
      'Karena nilai emas selalu naik setiap tahun tanpa pengecualian',
      'Karena emas cenderung naik saat kondisi ekonomi tidak menentu',
      'Karena emas dijamin pemerintah seperti deposito'
    ],
    jawaban: 2,
    penjelasan: 'Saat krisis, investor memindahkan aset ke emas yang dianggap lebih stabil. Ini membuat emas naik saat aset lain turun — berfungsi sebagai "pelindung portofolio".'
  },
  {
    pertanyaan: 'SBN (Surat Berharga Negara) berbeda dengan saham karena...',
    opsi: [
      'SBN tidak bisa dibeli individu biasa',
      'SBN memberikan imbal hasil tetap dan dijamin pemerintah',
      'SBN memiliki risiko lebih tinggi dari saham',
      'SBN tidak menghasilkan imbal hasil apapun'
    ],
    jawaban: 1,
    penjelasan: 'SBN adalah utang negara kepada investor. Pemerintah membayar kupon tetap dan mengembalikan pokok di akhir tenor. Dijamin 100% negara, risiko sangat rendah.'
  }
];

const QUIZ_S5 = [
  {
    pertanyaan: 'Seseorang menawarkan investasi "keuntungan 50% per bulan, sudah terbukti!" Ini kemungkinan besar...',
    opsi: [
      'Kesempatan emas langka — segera ambil!',
      'Investasi legal yang hanya diketahui orang dalam',
      'Skema Ponzi atau penipuan investasi bodong',
      'Reksa dana khusus dengan kinerja sangat baik'
    ],
    jawaban: 2,
    penjelasan: 'Tidak ada investasi legal yang bisa menjamin 50% per bulan. Return pasar saham terbaik di dunia sekitar 15–20% per TAHUN. Janji return tidak wajar adalah tanda penipuan klasik (Ponzi scheme).'
  },
  {
    pertanyaan: 'Hal PERTAMA yang harus kamu cek sebelum berinvestasi di suatu platform adalah...',
    opsi: [
      'Apakah ada selebritis yang mempromosikannya',
      'Apakah terdaftar dan diawasi OJK',
      'Apakah kantornya mewah dan besar',
      'Apakah ada program referral yang menguntungkan'
    ],
    jawaban: 1,
    penjelasan: 'Investasi legal di Indonesia WAJIB terdaftar di OJK. Cek di ojk.go.id atau telepon 157. Platform yang tidak terdaftar OJK beroperasi ilegal dan uangmu tidak dilindungi hukum.'
  },
  {
    pertanyaan: 'Cara paling tepat memulai investasi saham untuk pemula adalah...',
    opsi: [
      'Langsung beli saham viral di media sosial',
      'Pinjam uang sebesar mungkin untuk modal investasi',
      'Buka rekening efek di sekuritas resmi OJK, mulai dari modal kecil',
      'Investasi hanya jika sudah punya modal minimal Rp 100 juta'
    ],
    jawaban: 2,
    penjelasan: 'Mulailah dari sekuritas yang teregulasi OJK, gunakan dana yang tidak dibutuhkan dalam waktu dekat, dan mulai dari modal kecil untuk belajar. Banyak sekuritas yang bisa dimulai dari Rp 100.000.'
  }
];
