/* =====================================================================
   BANK SOAL PENERAPAN — Lab Mitigasi Bencana (semua soal di file ini)
   ---------------------------------------------------------------------
   Edit / tambah / hapus soal per bencana (gempa, tsunami, gunung, banjir,
   kebakaran), lalu buka ulang. Format tiap soal:
     { "pertanyaan":"...", "opsi":["A","B","C","D"], "jawaban":"B (persis salah satu opsi)", "penjelasan":"..." }
   ===================================================================== */
window.SOAL_LAB = {
  "gempa": [
    {
      "pertanyaan": "Mengapa Indonesia sering gempa?",
      "opsi": [
        "Banyak gunung salju",
        "Pertemuan lempeng tektonik (Ring of Fire)",
        "Dekat kutub",
        "Tidak punya laut"
      ],
      "jawaban": "Pertemuan lempeng tektonik (Ring of Fire)",
      "penjelasan": "Indonesia di pertemuan lempeng & Ring of Fire."
    },
    {
      "pertanyaan": "Bangunan paling tahan gempa pada simulasi?",
      "opsi": [
        "Rumah kayu",
        "Rumah bata tanpa tulangan",
        "Beton bertulang",
        "Semua sama"
      ],
      "jawaban": "Beton bertulang",
      "penjelasan": "Beton bertulang paling tahan karena kuat & lentur."
    },
    {
      "pertanyaan": "Tanah yang memperbesar guncangan?",
      "opsi": [
        "Tanah lunak (aluvial)",
        "Tanah keras",
        "Tidak berpengaruh",
        "Pasir kering"
      ],
      "jawaban": "Tanah lunak (aluvial)",
      "penjelasan": "Tanah lunak memperkuat guncangan (amplifikasi)."
    }
  ],
  "tsunami": [
    {
      "pertanyaan": "Tanda alam awal tsunami yang perlu diwaspadai?",
      "opsi": [
        "Air laut surut tiba-tiba setelah gempa",
        "Langit cerah",
        "Angin sepoi",
        "Air laut tenang"
      ],
      "jawaban": "Air laut surut tiba-tiba setelah gempa",
      "penjelasan": "Surut air laut mendadak sesudah gempa adalah tanda tsunami; segera menjauh ke tempat tinggi."
    },
    {
      "pertanyaan": "Pelindung alami pesisir dari tsunami?",
      "opsi": [
        "Hutan mangrove",
        "Padang pasir",
        "Aspal",
        "Kolam renang"
      ],
      "jawaban": "Hutan mangrove",
      "penjelasan": "Mangrove meredam energi gelombang."
    },
    {
      "pertanyaan": "Saat peringatan tsunami, langkah utama?",
      "opsi": [
        "Berlari ke tempat tinggi/menjauh pantai",
        "Merekam video di pantai",
        "Menunggu di rumah",
        "Berenang"
      ],
      "jawaban": "Berlari ke tempat tinggi/menjauh pantai",
      "penjelasan": "Evakuasi ke tempat tinggi menyelamatkan jiwa."
    }
  ],
  "gunung": [
    {
      "pertanyaan": "Wilayah paling berbahaya saat gunung meletus?",
      "opsi": [
        "KRB III (dekat puncak)",
        "Jauh dari gunung",
        "Di kota besar",
        "Di pantai"
      ],
      "jawaban": "KRB III (dekat puncak)",
      "penjelasan": "KRB III paling dekat puncak & paling berbahaya (awan panas/lava)."
    },
    {
      "pertanyaan": "Bahaya letusan yang terbawa angin jauh dari puncak?",
      "opsi": [
        "Hujan abu vulkanik",
        "Tsunami",
        "Gempa",
        "Kebakaran hutan"
      ],
      "jawaban": "Hujan abu vulkanik",
      "penjelasan": "Abu vulkanik dapat menyebar jauh mengikuti arah angin."
    },
    {
      "pertanyaan": "Mitigasi utama untuk keselamatan jiwa?",
      "opsi": [
        "Ikuti jalur evakuasi & peringatan dini",
        "Mendekat memfoto lava",
        "Abaikan status gunung",
        "Tinggal di KRB III"
      ],
      "jawaban": "Ikuti jalur evakuasi & peringatan dini",
      "penjelasan": "Evakuasi mengikuti peringatan dini menyelamatkan jiwa."
    }
  ],
  "banjir": [
    {
      "pertanyaan": "Penyebab banjir yang bisa dikurangi manusia?",
      "opsi": [
        "Sampah menyumbat & alih fungsi lahan",
        "Rotasi bumi",
        "Fase bulan",
        "Gravitasi"
      ],
      "jawaban": "Sampah menyumbat & alih fungsi lahan",
      "penjelasan": "Sampah menyumbat aliran & hilangnya resapan memperparah banjir."
    },
    {
      "pertanyaan": "Fungsi biopori & sumur resapan?",
      "opsi": [
        "Menyerap air ke tanah",
        "Menampung sampah",
        "Menaikkan air",
        "Mempercepat banjir"
      ],
      "jawaban": "Menyerap air ke tanah",
      "penjelasan": "Resapan mengurangi limpasan air permukaan."
    },
    {
      "pertanyaan": "Hunian paling aman di daerah rawan banjir?",
      "opsi": [
        "Rumah panggung / lantai ditinggikan",
        "Rumah rendah di bantaran",
        "Rumah tanpa drainase",
        "Rumah di cekungan"
      ],
      "jawaban": "Rumah panggung / lantai ditinggikan",
      "penjelasan": "Rumah panggung menjaga ruang huni tetap kering."
    }
  ],
  "kebakaran": [
    {
      "pertanyaan": "Lahan yang paling sulit dipadamkan bila terbakar?",
      "opsi": [
        "Lahan gambut",
        "Batu",
        "Sungai",
        "Sawah tergenang"
      ],
      "jawaban": "Lahan gambut",
      "penjelasan": "Gambut menyimpan api di bawah permukaan sehingga sulit padam."
    },
    {
      "pertanyaan": "Penyebab utama kebakaran hutan di Indonesia?",
      "opsi": [
        "Pembukaan lahan dengan cara membakar",
        "Hujan lebat",
        "Salju",
        "Gelombang laut"
      ],
      "jawaban": "Pembukaan lahan dengan cara membakar",
      "penjelasan": "Membakar untuk membuka lahan saat kemarau memicu kebakaran meluas."
    },
    {
      "pertanyaan": "Mitigasi mencegah api meluas?",
      "opsi": [
        "Membuat sekat bakar",
        "Menyiram bensin",
        "Menebang semua pohon",
        "Membiarkannya"
      ],
      "jawaban": "Membuat sekat bakar",
      "penjelasan": "Sekat bakar memutus jalur rambatan api."
    }
  ]
};
