/* =====================================================================
   BANK SOAL — Jelajah Nusantara  (semua soal ada di file ini)
   ---------------------------------------------------------------------
   Edit / tambah / hapus soal langsung di sini (format JSON), lalu buka
   ulang game. Tidak perlu menyentuh index.html.

   single_player (pilih salah satu "tipe"):
     { "tipe":"tebak_lokasi", "pertanyaan":"...", "jawaban":"Sumatra|Kalimantan|Jawa|Sulawesi|Papua", "penjelasan":"..." }
     { "tipe":"pilihan_ganda", "pertanyaan":"...", "opsi":["A","B","C","D"], "jawaban":"B (tulis persis sama dg salah satu opsi)", "penjelasan":"..." }
     { "tipe":"benar_salah",   "pernyataan":"...", "jawaban":"Benar|Salah", "penjelasan":"..." }
   multiplayer_benar_salah:
     { "pernyataan":"...", "jawaban":"Benar|Salah", "penjelasan":"..." }

   Catatan: isi "penjelasan" sebaiknya menjelaskan ALASAN/fakta, bukan sekadar
   "Benar." atau "Salah.", supaya murid belajar dari setiap soal.
   ===================================================================== */
window.SOAL_JELAJAH = {
  "single_player": [
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Pulau berbentuk huruf K, penghasil nikel, ada Taman Laut Bunaken.",
      "jawaban": "Sulawesi",
      "penjelasan": "Sulawesi berbentuk seperti huruf K karena memiliki empat semenanjung. Pulau ini penghasil nikel terbesar dan punya Taman Laut Bunaken di Sulawesi Utara yang terkenal akan terumbu karangnya."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Pulau terbesar Indonesia, hutan hujan luas, dilalui Sungai Kapuas.",
      "jawaban": "Kalimantan",
      "penjelasan": "Kalimantan adalah pulau terbesar di Indonesia. Sungai Kapuas yang melintasinya (±1.143 km) merupakan sungai terpanjang di Indonesia, dan hutan hujannya menjadi paru-paru dunia."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Penduduk terpadat, banyak gunung api aktif sehingga tanahnya subur.",
      "jawaban": "Jawa",
      "penjelasan": "Jawa berpenduduk terpadat di Indonesia. Banyaknya gunung api aktif membuat abu vulkaniknya menyuburkan tanah, sehingga cocok untuk pertanian padi."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Dilintasi Pegunungan Bukit Barisan dan memiliki Danau Toba.",
      "jawaban": "Sumatra",
      "penjelasan": "Pegunungan Bukit Barisan membentang dari utara ke selatan Sumatra. Danau Toba di Sumatra Utara adalah danau vulkanik terbesar di Indonesia, terbentuk dari letusan super-vulkan."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Terdapat Pegunungan Jayawijaya yang bersalju dan burung cendrawasih.",
      "jawaban": "Papua",
      "penjelasan": "Papua memiliki Pegunungan Jayawijaya, tempat puncak tertinggi Indonesia yang bersalju abadi meski di daerah tropis. Cendrawasih, burung khas Papua, sering disebut 'burung surga'."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Lokasi Candi Borobudur, candi Buddha terbesar di dunia.",
      "jawaban": "Jawa",
      "penjelasan": "Candi Borobudur berada di Magelang, Jawa Tengah. Dibangun sekitar abad ke-8, ia menjadi candi Buddha terbesar di dunia dan warisan budaya bangsa."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Lokasi wisata bahari terkenal, Kepulauan Raja Ampat.",
      "jawaban": "Papua",
      "penjelasan": "Raja Ampat berada di Papua Barat Daya. Perairannya memiliki keanekaragaman hayati laut tertinggi di dunia, menjadikannya surga penyelam."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Habitat asli Harimau Sumatra dan Orangutan Sumatra.",
      "jawaban": "Sumatra",
      "penjelasan": "Harimau Sumatra dan Orangutan Sumatra adalah satwa endemik yang hanya hidup liar di Pulau Sumatra, dan keduanya kini berstatus terancam punah."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Lokasi Ibu Kota Nusantara (IKN) yang baru.",
      "jawaban": "Kalimantan",
      "penjelasan": "Ibu Kota Nusantara (IKN) dibangun di Kalimantan Timur sebagai calon pengganti Jakarta, dipilih karena letaknya di tengah Indonesia dan minim risiko gempa besar."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Terkenal dengan Tana Toraja dan bentuk pulau bercabang empat.",
      "jawaban": "Sulawesi",
      "penjelasan": "Tana Toraja di Sulawesi Selatan terkenal dengan rumah adat Tongkonan dan tradisi pemakamannya. Pulau Sulawesi berbentuk unik seperti huruf K dengan empat semenanjung."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Sungai terpanjang di Indonesia adalah…",
      "opsi": [
        "Sungai Musi",
        "Sungai Kapuas",
        "Bengawan Solo",
        "Sungai Mahakam"
      ],
      "jawaban": "Sungai Kapuas",
      "penjelasan": "Sungai Kapuas di Kalimantan Barat (±1.143 km) adalah sungai terpanjang di Indonesia. Bengawan Solo terpanjang di Jawa, tetapi lebih pendek dari Kapuas."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Puncak tertinggi di Indonesia berada di…",
      "opsi": [
        "Gunung Semeru",
        "Gunung Rinjani",
        "Pegunungan Jayawijaya",
        "Gunung Kerinci"
      ],
      "jawaban": "Pegunungan Jayawijaya",
      "penjelasan": "Puncak tertinggi Indonesia (±4.884 m) berada di Pegunungan Jayawijaya, Papua, dan diselimuti salju abadi. Gunung Kerinci adalah gunung berapi tertinggi, sedangkan Semeru tertinggi di Jawa."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Danau vulkanik terbesar di Indonesia adalah…",
      "opsi": [
        "Danau Toba",
        "Danau Poso",
        "Danau Sentani",
        "Danau Kelimutu"
      ],
      "jawaban": "Danau Toba",
      "penjelasan": "Danau Toba di Sumatra Utara adalah danau vulkanik (kaldera) terbesar di Indonesia, terbentuk dari letusan super-vulkan ribuan tahun lalu. Di tengahnya terdapat Pulau Samosir."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Pulau terbesar di wilayah Indonesia adalah…",
      "opsi": [
        "Sumatra",
        "Jawa",
        "Kalimantan",
        "Sulawesi"
      ],
      "jawaban": "Kalimantan",
      "penjelasan": "Kalimantan adalah pulau terbesar di Indonesia (dan terbesar ketiga di dunia). Wilayahnya dibagi bersama Malaysia dan Brunei Darussalam."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Hasil tambang utama dari Sulawesi adalah…",
      "opsi": [
        "Nikel",
        "Timah",
        "Intan",
        "Belerang"
      ],
      "jawaban": "Nikel",
      "penjelasan": "Sulawesi (terutama Sulawesi Tenggara dan Morowali) adalah penghasil nikel utama Indonesia, bahan penting untuk baja tahan karat dan baterai kendaraan listrik. Timah banyak di Bangka Belitung."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Perkebunan kelapa sawit terluas umumnya di pulau…",
      "opsi": [
        "Jawa",
        "Sumatra",
        "Bali",
        "Papua"
      ],
      "jawaban": "Sumatra",
      "penjelasan": "Sumatra adalah sentra perkebunan kelapa sawit terluas di Indonesia karena iklim tropis basah dan lahan yang luas, disusul Kalimantan."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Gunung api aktif di dekat Yogyakarta adalah…",
      "opsi": [
        "Gunung Merapi",
        "Gunung Tambora",
        "Gunung Krakatau",
        "Gunung Rinjani"
      ],
      "jawaban": "Gunung Merapi",
      "penjelasan": "Gunung Merapi di perbatasan DIY–Jawa Tengah adalah salah satu gunung api paling aktif di Indonesia. Tambora ada di NTB, Krakatau di Selat Sunda, Rinjani di Lombok."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Fauna endemik khas Papua adalah…",
      "opsi": [
        "Komodo",
        "Cendrawasih",
        "Harimau",
        "Badak"
      ],
      "jawaban": "Cendrawasih",
      "penjelasan": "Cendrawasih adalah burung endemik Papua yang terkenal dengan bulu indahnya. Komodo khas NTT, sedangkan harimau dan badak ada di Sumatra/Jawa."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Bentuk Pulau Sulawesi menyerupai huruf…",
      "opsi": [
        "O",
        "T",
        "K",
        "I"
      ],
      "jawaban": "K",
      "penjelasan": "Pulau Sulawesi berbentuk seperti huruf K karena memiliki empat semenanjung yang memanjang ke arah berbeda, hasil pertemuan lempeng tektonik."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Ibu Kota Nusantara (IKN) dibangun di pulau…",
      "opsi": [
        "Jawa",
        "Sumatra",
        "Kalimantan",
        "Sulawesi"
      ],
      "jawaban": "Kalimantan",
      "penjelasan": "IKN dibangun di Kalimantan Timur untuk memeratakan pembangunan dan mengurangi beban Pulau Jawa. Lokasinya relatif aman dari gempa besar."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Kalimantan adalah pulau terbesar di Indonesia.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Kalimantan adalah pulau terbesar di Indonesia sekaligus terbesar ketiga di dunia, dan wilayahnya dibagi dengan Malaysia serta Brunei."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Puncak tertinggi Indonesia berada di Pulau Jawa.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Puncak tertinggi Indonesia berada di Pegunungan Jayawijaya, Papua. Puncak tertinggi di Jawa hanyalah Gunung Semeru (3.676 m)."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Sungai Kapuas adalah sungai terpanjang di Indonesia.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Sungai Kapuas di Kalimantan Barat (±1.143 km) adalah sungai terpanjang di Indonesia dan menjadi jalur transportasi penting warga."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Sulawesi berbentuk menyerupai huruf O.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Sulawesi menyerupai huruf K, bukan O, karena memiliki empat semenanjung yang menjorok ke berbagai arah."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Pulau Jawa berpenduduk paling sedikit di Indonesia.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Justru sebaliknya, Jawa adalah pulau berpenduduk terpadat di Indonesia — lebih dari separuh penduduk Indonesia tinggal di sini."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Burung cendrawasih adalah fauna khas Papua.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Cendrawasih adalah burung endemik Papua yang dilindungi dan menjadi simbol kekayaan hayati wilayah timur Indonesia."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Danau Toba terletak di Pulau Sumatra.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Danau Toba berada di Sumatra Utara dan merupakan danau vulkanik terbesar di Indonesia dengan Pulau Samosir di tengahnya."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Pegunungan Bukit Barisan membentang di Kalimantan.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Pegunungan Bukit Barisan membentang di sepanjang Pulau Sumatra dari Aceh hingga Lampung, bukan di Kalimantan."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Taman Laut Bunaken berada di Sulawesi.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Taman Laut Bunaken berada di Sulawesi Utara dan terkenal dengan dinding karang serta keanekaragaman ikan lautnya."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Gunung Merapi berada di Pulau Papua.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Gunung Merapi berada di Pulau Jawa, di perbatasan DIY dan Jawa Tengah, dan merupakan salah satu gunung api teraktif di dunia."
    },
    {
      "tipe": "tebak_lokasi",
      "pertanyaan": "Pulau lokasi Tana Toraja & Danau Poso.",
      "jawaban": "Sulawesi",
      "penjelasan": "Tana Toraja (Sulawesi Selatan) dan Danau Poso (Sulawesi Tengah) sama-sama berada di Pulau Sulawesi, pulau berbentuk huruf K."
    },
    {
      "tipe": "pilihan_ganda",
      "pertanyaan": "Selat yang memisahkan Pulau Jawa dan Bali adalah…",
      "opsi": [
        "Selat Sunda",
        "Selat Bali",
        "Selat Lombok",
        "Selat Madura"
      ],
      "jawaban": "Selat Bali",
      "penjelasan": "Selat Bali memisahkan Jawa (Banyuwangi) dengan Bali. Selat Sunda memisahkan Jawa–Sumatra, Selat Lombok memisahkan Bali–Lombok."
    },
    {
      "tipe": "benar_salah",
      "pernyataan": "Pulau Kalimantan berbatasan dengan Malaysia dan Brunei Darussalam.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Kalimantan adalah satu-satunya pulau Indonesia yang berbatasan darat langsung dengan negara lain, yaitu Malaysia dan Brunei Darussalam."
    }
  ],
  "multiplayer_benar_salah": [
    {
      "pernyataan": "Indonesia adalah negara kepulauan terbesar di dunia.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Dengan lebih dari 17.000 pulau, Indonesia adalah negara kepulauan terbesar di dunia."
    },
    {
      "pernyataan": "Ibu Kota Nusantara (IKN) yang baru berada di Kalimantan.",
      "jawaban": "Benar",
      "penjelasan": "Benar. IKN dibangun di Kalimantan Timur untuk memeratakan pembangunan dan mengurangi beban Pulau Jawa."
    },
    {
      "pernyataan": "Pulau Jawa adalah pulau terbesar di Indonesia.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Pulau terbesar di Indonesia adalah Kalimantan; Jawa justru padat penduduk namun luasnya lebih kecil."
    },
    {
      "pernyataan": "Danau Toba terletak di Pulau Sumatra.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Danau Toba di Sumatra Utara adalah danau vulkanik terbesar di Indonesia, dengan Pulau Samosir di tengahnya."
    },
    {
      "pernyataan": "Puncak tertinggi di Indonesia berada di Pegunungan Jayawijaya, Papua.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Puncak tertinggi Indonesia (±4.884 m) ada di Pegunungan Jayawijaya, Papua, dan diselimuti salju abadi walau beriklim tropis."
    },
    {
      "pernyataan": "Sungai terpanjang di Indonesia adalah Bengawan Solo.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Sungai terpanjang di Indonesia adalah Sungai Kapuas di Kalimantan (±1.143 km); Bengawan Solo terpanjang di Jawa saja."
    },
    {
      "pernyataan": "Komodo hidup secara alami di Pulau Jawa.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Komodo hidup alami di Nusa Tenggara Timur (Pulau Komodo, Rinca, dan sekitar Flores), bukan di Jawa."
    },
    {
      "pernyataan": "Indonesia dilalui garis khatulistiwa.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Garis khatulistiwa melintasi Indonesia (mis. di Pontianak), sehingga Indonesia beriklim tropis dan hangat sepanjang tahun."
    },
    {
      "pernyataan": "Indonesia memiliki dua musim: hujan dan kemarau.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Karena beriklim tropis, Indonesia hanya mengenal musim hujan dan kemarau, bukan empat musim seperti negara subtropis."
    },
    {
      "pernyataan": "Selat Sunda memisahkan Pulau Jawa dan Sumatra.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Selat Sunda memisahkan Jawa dan Sumatra; di selat inilah terdapat Gunung Krakatau."
    },
    {
      "pernyataan": "Burung cendrawasih adalah satwa khas Kalimantan.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Cendrawasih adalah satwa endemik Papua. Satwa khas Kalimantan misalnya orangutan dan bekantan."
    },
    {
      "pernyataan": "Pulau Sulawesi berbentuk menyerupai huruf K.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Sulawesi berbentuk seperti huruf K karena memiliki empat semenanjung, hasil pertemuan beberapa lempeng tektonik."
    },
    {
      "pernyataan": "Bali termasuk salah satu pulau di Indonesia.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Bali adalah pulau di Indonesia bagian tengah, terkenal sebagai destinasi wisata budaya dan alam dunia."
    },
    {
      "pernyataan": "Indonesia berbatasan darat langsung dengan Australia.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Indonesia dan Australia dipisahkan oleh laut (a.l. Laut Timor dan Laut Arafuru), jadi tidak berbatasan darat."
    },
    {
      "pernyataan": "Candi Borobudur berada di Jawa Tengah.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Candi Borobudur berada di Magelang, Jawa Tengah, dan merupakan candi Buddha terbesar di dunia."
    },
    {
      "pernyataan": "Mata uang Indonesia adalah Ringgit.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Mata uang Indonesia adalah Rupiah. Ringgit adalah mata uang Malaysia."
    },
    {
      "pernyataan": "Papua berada di bagian barat Indonesia.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Papua berada di bagian paling timur Indonesia (zona waktu WIT). Bagian barat ditempati Sumatra dan Aceh."
    },
    {
      "pernyataan": "Gunung Merapi terletak di dekat Yogyakarta.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Gunung Merapi berada di perbatasan DIY–Jawa Tengah dan termasuk gunung api paling aktif di Indonesia."
    },
    {
      "pernyataan": "Laut Jawa berada di sebelah utara Pulau Jawa.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Laut Jawa terletak di utara Pulau Jawa dan menjadi jalur pelayaran serta perikanan yang ramai."
    },
    {
      "pernyataan": "Indonesia memiliki lebih dari 17.000 pulau.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Indonesia memiliki lebih dari 17.000 pulau, menjadikannya negara kepulauan terbesar di dunia."
    },
    {
      "pernyataan": "Timah banyak dihasilkan dari Pulau Bangka.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Kepulauan Bangka Belitung adalah penghasil timah utama Indonesia dan salah satu terbesar di dunia."
    },
    {
      "pernyataan": "Orangutan hidup liar di Sumatra dan Kalimantan.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Orangutan liar hanya ada di dua pulau ini: Orangutan Sumatra dan Orangutan Kalimantan, keduanya terancam punah."
    },
    {
      "pernyataan": "Kota Jakarta terletak di Pulau Sumatra.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Jakarta, ibu kota Indonesia saat ini, terletak di bagian barat laut Pulau Jawa."
    },
    {
      "pernyataan": "Indonesia terletak di antara Benua Asia dan Australia.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Letak Indonesia di antara Benua Asia dan Australia disebut letak geografis yang strategis untuk perdagangan."
    },
    {
      "pernyataan": "Indonesia terletak di antara Samudra Hindia dan Pasifik.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Indonesia diapit Samudra Hindia dan Samudra Pasifik, membuatnya kaya potensi laut dan jalur pelayaran dunia."
    },
    {
      "pernyataan": "Nikel banyak ditambang di Sulawesi.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Sulawesi (mis. Morowali dan Sulawesi Tenggara) adalah penghasil nikel utama, bahan baku baja dan baterai kendaraan listrik."
    },
    {
      "pernyataan": "Gunung Krakatau berada di antara Jawa dan Sumatra.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Gunung Krakatau berada di Selat Sunda, di antara Jawa dan Sumatra, dan letusan dahsyatnya tahun 1883 terdengar sampai jauh."
    },
    {
      "pernyataan": "Bahasa resmi Indonesia adalah bahasa Inggris.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Bahasa resmi Indonesia adalah Bahasa Indonesia, sebagai bahasa pemersatu bangsa yang beragam suku."
    },
    {
      "pernyataan": "Pulau Sumatra terletak di sebelah barat Pulau Jawa.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Sumatra berada di sebelah barat–barat laut Jawa, dipisahkan oleh Selat Sunda."
    },
    {
      "pernyataan": "Indonesia adalah negara agraris sekaligus maritim.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Tanah subur membuat Indonesia negara agraris, sedangkan luasnya laut menjadikannya negara maritim."
    },
    {
      "pernyataan": "Hutan hujan tropis terluas Indonesia ada di Kalimantan dan Papua.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Kalimantan dan Papua memiliki hutan hujan tropis terluas di Indonesia, penting sebagai penyerap karbon dunia."
    },
    {
      "pernyataan": "Seluruh wilayah Indonesia memiliki satu zona waktu yang sama.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Indonesia memiliki tiga zona waktu: WIB, WITA, dan WIT, karena wilayahnya sangat luas dari barat ke timur."
    },
    {
      "pernyataan": "Waktu Indonesia Timur (WIT) lebih cepat daripada WIB.",
      "jawaban": "Benar",
      "penjelasan": "Benar. WIT lebih cepat 2 jam dari WIB. Saat di Jakarta pukul 07.00 (WIB), di Papua sudah pukul 09.00 (WIT)."
    },
    {
      "pernyataan": "Kota Surabaya berada di Provinsi Jawa Timur.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Surabaya adalah ibu kota Provinsi Jawa Timur dan kota terbesar kedua di Indonesia."
    },
    {
      "pernyataan": "Sabang berada di ujung timur Indonesia.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Sabang (Aceh) berada di ujung paling barat Indonesia. Ujung timur ditandai oleh Merauke — 'dari Sabang sampai Merauke'."
    },
    {
      "pernyataan": "Merauke berada di ujung timur Indonesia.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Merauke di Papua adalah ujung paling timur Indonesia, seperti dalam ungkapan 'dari Sabang sampai Merauke'."
    },
    {
      "pernyataan": "Danau Toba terbentuk dari letusan gunung berapi.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Danau Toba adalah kaldera vulkanik, terbentuk dari letusan super-vulkan raksasa puluhan ribu tahun lalu."
    },
    {
      "pernyataan": "Indonesia tidak pernah mengalami gempa bumi.",
      "jawaban": "Salah",
      "penjelasan": "Salah. Indonesia berada di jalur Ring of Fire (Cincin Api Pasifik), sehingga sering mengalami gempa bumi dan letusan gunung api."
    },
    {
      "pernyataan": "Raja Ampat terkenal dengan keindahan bawah lautnya.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Raja Ampat di Papua memiliki keanekaragaman hayati laut tertinggi di dunia dan menjadi tujuan wisata selam favorit."
    },
    {
      "pernyataan": "Taman Laut Bunaken berada di Sulawesi.",
      "jawaban": "Benar",
      "penjelasan": "Benar. Taman Laut Bunaken di Sulawesi Utara terkenal dengan dinding karang curam dan ratusan spesies ikan."
    }
  ]
};
