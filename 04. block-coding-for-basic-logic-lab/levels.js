// levels.js — All 5 level definitions

const LEVELS = [

  // ══════════════════════════════════════════
  // LEVEL 1 — Ajari Budi Jalan ke Pasar
  // ══════════════════════════════════════════
  {
    id:1, title:'Ajari Budi Jalan ke Pasar',
    concept:'Sequence', conceptDesc:'Urutan Instruksi', emoji:'🚶', color:'#3B82F6',
    description:'Budi ingin pergi ke pasar tapi tidak tahu jalannya! Susun instruksi langkah demi langkah.',
    stateClass:'GridState',
    availableBlocks:['maju','belok-kiri','belok-kanan','berhenti'],
    challenges:[
      { id:'1A', title:'Jalan Lurus',
        mission:'Bantu Budi berjalan lurus ke pasar! Susun instruksi agar Budi mencapai tanda P (Pasar).',
        cfg:{ cols:6, rows:5, start:[0,2], startDir:0, goal:[5,2], walls:[] }, kondisiOptions:[],
        hints:['💡 Budi menghadap ke arah Timur (kanan). Gunakan blok Maju untuk melangkah satu kotak.',
               '💡 Hitung berapa kotak dari B ke P — itulah jumlah blok Maju yang diperlukan.',
               '💡 Solusi: [Maju × 5] lalu [Berhenti]'] },
      { id:'1B', title:'Satu Belokan',
        mission:'Kali ini jalan tidak lurus! Budi perlu belok sekali untuk sampai ke pasar.',
        cfg:{ cols:6, rows:5, start:[0,3], startDir:0, goal:[3,0], walls:[] }, kondisiOptions:[],
        hints:['💡 Budi perlu berjalan ke kanan dulu, kemudian belok ke atas.',
               '💡 Gunakan Belok Kiri untuk menghadap ke Utara (atas layar).',
               '💡 Solusi: [Maju × 3] → [Belok Kiri] → [Maju × 3] → [Berhenti]'] },
      { id:'1C', title:'Ada Tembok!',
        mission:'Ada tembok (#) yang menghalangi jalan lurus! Budi harus mencari jalan memutar.',
        cfg:{ cols:7, rows:5, start:[0,2], startDir:0, goal:[6,2], walls:[[3,0],[3,1],[3,2],[3,3]] }, kondisiOptions:[],
        hints:['💡 Jalan lurus diblokir tembok di kolom ke-3. Coba lewat bawah tembok!',
               '💡 Maju 2 langkah, belok kanan (ke bawah), lewati tembok, belok kiri, terus ke tujuan.',
               '💡 Solusi: Maju×2 → BelokKanan → Maju×2 → BelokKiri → Maju×4 → BelokKiri → Maju×2 → BelokKanan → Maju×1 → Berhenti'] }
    ]
  },

  // ══════════════════════════════════════════
  // LEVEL 2 — Panen di Kebun Pak Hasan
  // ══════════════════════════════════════════
  {
    id:2, title:'Panen di Kebun Pak Hasan',
    concept:'Loop', conceptDesc:'Pengulangan', emoji:'🌳', color:'#10B981',
    description:'Pak Hasan punya banyak pohon buah! Gunakan blok Ulangi untuk memanen lebih efisien.',
    stateClass:'GridState',
    availableBlocks:['maju','ulangi','petik','masukkan','berhenti'],
    challenges:[
      { id:'2A', title:'5 Pohon Tomat',
        mission:'Ada 5 pohon tomat berjajar. Petik semua! Gunakan blok Ulangi — jauh lebih efisien.',
        cfg:{ cols:7, rows:3, start:[0,1], startDir:0, goal:null, trees:[[1,1],[2,1],[3,1],[4,1],[5,1]], targetBasket:5 }, kondisiOptions:[],
        hints:['💡 Tanpa loop: 15 blok! Dengan Ulangi: cukup 4 blok.',
               '💡 Isi dalam Ulangi: Maju → Petik Buah → Masukkan ke Keranjang.',
               '💡 Solusi: [Ulangi 5 kali { Maju, Petik, Masukkan }] → [Berhenti]'] },
      { id:'2B', title:'8 Pohon Jagung',
        mission:'Sekarang ada 8 pohon jagung. Gunakan Ulangi dengan angka yang tepat!',
        cfg:{ cols:10, rows:3, start:[0,1], startDir:0, goal:null, trees:[[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]], targetBasket:8 }, kondisiOptions:[],
        hints:['💡 Sama seperti 2A, tapi berapa kali harus diulangi?',
               '💡 Hitung pohonnya: 8 pohon → Ulangi 8 kali.',
               '💡 Solusi: [Ulangi 8 kali { Maju, Petik, Masukkan }] → [Berhenti]'] },
      { id:'2C', title:'12 Pohon Cabai',
        mission:'Kebun terbesar! 12 pohon cabai menanti. Atur angka Ulangi dengan benar.',
        cfg:{ cols:14, rows:3, start:[0,1], startDir:0, goal:null, trees:[[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1]], targetBasket:12 }, kondisiOptions:[],
        hints:['💡 Pola sama, angkanya berbeda. Berapa pohon?',
               '💡 12 pohon → Ulangi 12 kali.',
               '💡 Solusi: [Ulangi 12 kali { Maju, Petik, Masukkan }] → [Berhenti]'] }
    ]
  },

  // ══════════════════════════════════════════
  // LEVEL 3 — Robot Kasir Warung Sari
  // ══════════════════════════════════════════
  {
    id:3, title:'Robot Kasir Warung Sari',
    concept:'If-Else', conceptDesc:'Percabangan', emoji:'🏪', color:'#F59E0B',
    description:'Robot kasir perlu membuat keputusan! Jika bayar lebih → kembalikan. Jika kurang → minta tambahan.',
    stateClass:'CashierState',
    availableBlocks:['jika','kembalikan','minta-tambah','stok-habis','berhenti'],
    challenges:[
      { id:'3A', title:'Bayar Lebih atau Kurang?',
        mission:'Pelanggan bayar Rp 12.000 untuk barang Rp 10.000. Robot harus memutuskan: kembalikan atau minta tambahan?',
        cfg:{ harga:10000, bayar:12000, stok:5 },
        kondisiOptions:[{value:'bayar_lebih',label:'Bayar > Harga'},{value:'bayar_kurang',label:'Bayar < Harga'}],
        hints:['💡 Bayar (12.000) > Harga (10.000). Kondisi yang benar: "Bayar > Harga".',
               '💡 Jika Bayar > Harga → Beri Kembalian. Jika Tidak → Minta Tambahan.',
               '💡 Solusi: [Jika bayar_lebih { Kembalikan } Jika Tidak { Minta Tambah }] → [Berhenti]'] },
      { id:'3B', title:'Cek Stok Dulu!',
        mission:'Stok barang habis (stok=0)! Robot harus cek stok sebelum proses pembayaran.',
        cfg:{ harga:15000, bayar:20000, stok:0 },
        kondisiOptions:[{value:'stok_habis',label:'Stok = 0 (Habis)'},{value:'stok_tersedia',label:'Stok > 0 (Ada)'},{value:'bayar_lebih',label:'Bayar > Harga'},{value:'bayar_kurang',label:'Bayar < Harga'}],
        hints:['💡 Cek stok dulu! Jika [Stok = 0] → Tampilkan Stok Habis.',
               '💡 Jika tidak ada stok, tidak perlu proses pembayaran sama sekali.',
               '💡 Solusi: [Jika stok_habis { Stok Habis } Jika Tidak { Kembalikan }] → [Berhenti]'] },
      { id:'3C', title:'Bayar Pas Banget!',
        mission:'Pelanggan bayar tepat Rp 10.000 untuk barang Rp 10.000. Tidak perlu kembalian, tidak perlu minta tambah!',
        cfg:{ harga:10000, bayar:10000, stok:5 },
        kondisiOptions:[{value:'bayar_lebih',label:'Bayar > Harga'},{value:'bayar_kurang',label:'Bayar < Harga'},{value:'bayar_pas',label:'Bayar = Harga'}],
        hints:['💡 Bayar sama dengan harga → transaksi langsung selesai.',
               '💡 Kamu bisa langsung Berhenti tanpa perlu Jika apapun.',
               '💡 Solusi terpendek: [Berhenti] saja!'] }
    ]
  },

  // ══════════════════════════════════════════
  // LEVEL 4 — Lampu Lalu Lintas Otomatis  (ADVANCED)
  // ══════════════════════════════════════════
  {
    id:4, title:'Lampu Lalu Lintas Otomatis',
    concept:'Loop + If-Else', conceptDesc:'Kombinasi Kompleks', emoji:'🚦', color:'#EF4444',
    description:'Bangun sistem lampu lalu lintas cerdas! Dari siklus dasar, sensor lalu lintas, hingga kondisi darurat ambulans.',
    stateClass:'TrafficState',
    availableBlocks:['ulangi-selamanya','ulangi','nyalakan-merah','nyalakan-kuning','nyalakan-hijau','jika','berhenti'],
    challenges:[
      { id:'4A', title:'Siklus Dasar',
        mission:'Buat siklus lampu lalu lintas yang terus berulang: Merah (30s) → Kuning (5s) → Hijau (25s).',
        cfg:{ hasAmbulance:false, sensorPadat:false, expectedSequence:['merah','kuning','hijau','merah','kuning','hijau'] },
        kondisiOptions:[],
        hints:['💡 Gunakan Ulangi Selamanya agar siklus berputar terus.',
               '💡 Di dalam loop, nyalakan berurutan: Merah → Kuning → Hijau.',
               '💡 Solusi: [Ulangi Selamanya { Merah(30s), Kuning(5s), Hijau(25s) }] → [Berhenti]'] },
      { id:'4B', title:'Jalan Utama & Jalan Samping',
        mission:'Jalan utama (NS) butuh hijau 45s, jalan samping (EW) hanya 20s. Buat dua fase berbeda dalam satu siklus!',
        cfg:{ hasAmbulance:false, sensorPadat:false,
              expectedSequence:['hijau','kuning','merah','hijau','kuning','merah'],
              checkFn:(st)=>{
                // Phase 1: hijau lama, merah pendek; then merah lama, hijau pendek
                const s=st.sequence;
                if (s.length<6) return false;
                const h1=s.find(x=>x.color==='hijau');
                const h2=[...s].reverse().find(x=>x.color==='hijau');
                // At least one green should be >= 40s (main road)
                return h1&&h1.secs>=40||h2&&h2.secs>=40;
              }},
        kondisiOptions:[],
        hints:['💡 Fase 1 (Jalan Utama): Hijau lama (≥40s) → Kuning → Merah pendek.',
               '💡 Fase 2 (Jalan Samping): Merah → Kuning → Hijau pendek (20s).',
               '💡 Gunakan Ulangi 2 kali dengan isi berbeda, ATAU Ulangi Selamanya dengan 2 phase di dalam.'] },
      { id:'4C', title:'Sensor Lalu Lintas',
        mission:'Sensor mendeteksi jalanan padat. Jika [sensor_padat] → perpanjang hijau ke 60s. Jika tidak → hijau normal 25s.',
        cfg:{ hasAmbulance:false, sensorPadat:true,
              expectedSequence:[{color:'merah',minSecs:20},{color:'kuning',minSecs:3},{color:'hijau',minSecs:45}]},
        kondisiOptions:[{value:'sensor_padat',label:'Sensor Padat 🚗🚗🚗'}],
        hints:['💡 Gunakan Jika [sensor_padat] → Nyalakan Hijau (60s), Jika Tidak → Hijau (25s).',
               '💡 Sensor saat ini mendeteksi padat, jadi hijau harus minimal 45 detik.',
               '💡 Solusi: [Ulangi Selamanya { Merah(30s) Kuning(5s) Jika sensor_padat { Hijau(60s) } Jika Tidak { Hijau(25s) } }]'] },
      { id:'4D', title:'Darurat Ambulans!',
        mission:'Putaran ke-2: ambulans terdeteksi! Jika [ada_ambulans] → LANGSUNG nyalakan hijau (60s). Jika tidak → siklus normal.',
        cfg:{ hasAmbulance:true, ambulanceCycle:1, sensorPadat:false,
              checkFn:(st)=>{
                // Berhasil jika ada 'hijau' yang muncul LANGSUNG setelah 'hijau' lain
                // (akhir siklus normal → hijau darurat ambulan tanpa merah/kuning di antara)
                const s=st.sequence;
                for(let i=1;i<s.length;i++){
                  const prev=(s[i-1].color||s[i-1]);
                  const curr=(s[i].color||s[i]);
                  if(prev==='hijau'&&curr==='hijau') return true;
                }
                return false;
              }},
        kondisiOptions:[{value:'ada_ambulans',label:'Ada Ambulans 🚑'}],
        hints:['💡 Di dalam Ulangi Selamanya: cek Jika [ada_ambulans] di bagian PALING ATAS loop.',
               '💡 Jika ada ambulans → langsung Hijau(60s). Jika tidak → Merah(30s) Kuning(5s) Hijau(25s).',
               '💡 Ambulans muncul di putaran ke-2. Urutan hasilnya: [Merah,Kuning,Hijau] → [Hijau,60s] → [Merah,Kuning,Hijau]'] }
    ]
  },

  // ══════════════════════════════════════════
  // LEVEL 5 — Asisten Pintar Bu Dewi  (ADVANCED)
  // ══════════════════════════════════════════
  {
    id:5, title:'Asisten Pintar Bu Dewi',
    concept:'Proyek Nyata', conceptDesc:'Sistem Chatbot E-Commerce', emoji:'🤖', color:'#8B5CF6',
    description:'Bangun chatbot e-commerce sungguhan untuk Bu Dewi! Dari layanan dasar, menu interaktif, sistem pesanan, hingga diskon otomatis.',
    stateClass:'ChatbotState',
    availableBlocks:['tampilkan-salam','tampilkan-menu','tampilkan-harga','tampilkan-stok','simpan-pesanan','konfirmasi-pesanan','beri-diskon','tampilkan-total','proses-pembayaran','ucapkan-terima','ulangi','ulangi-selamanya','jika','berhenti'],
    challenges:[
      { id:'5A', title:'Chatbot Dasar',
        mission:'Buat chatbot yang menyapa pelanggan, menampilkan harga & stok, lalu mengucapkan terima kasih. Susun urutannya!',
        cfg:{ required:['salam','harga','terima-kasih'], scenario:{ customerIntro:'Halo Bu Dewi, saya mau tanya-tanya dulu!' } },
        kondisiOptions:[],
        hints:['💡 Mulai dengan Tampilkan Salam agar chatbot menyambut pelanggan.',
               '💡 Tambahkan Tampilkan Harga untuk info produk.',
               '💡 Akhiri dengan Ucapkan Terima Kasih, lalu Berhenti.'] },
      { id:'5B', title:'Menu Interaktif',
        mission:'Pelanggan bertanya tentang harga dulu, lalu ingin memesan. Buat chatbot yang bisa tampilkan menu, cek kondisi pilihan pelanggan, dan simpan pesanan.',
        cfg:{ required:['salam','menu','pesanan','terima-kasih'],
              scenario:{ customerIntro:'Halo! Saya mau pesan barang.', customerReply:'Saya pilih opsi 3 (Pesan Barang)', customerWants:'pesan',
                         orderItems:[{name:'Beras 5kg',qty:2,price:75000}] } },
        kondisiOptions:[{value:'customer_minta_harga',label:'Pelanggan minta harga'},{value:'customer_minta_pesan',label:'Pelanggan mau pesan'},{value:'customer_minta_stok',label:'Pelanggan cek stok'}],
        hints:['💡 Mulai dengan Salam, lalu Tampilkan Menu agar pelanggan bisa memilih.',
               '💡 Gunakan Jika [Pelanggan mau pesan] → Simpan Pesanan.',
               '💡 Solusi: Salam → Menu → Jika customer_minta_pesan { Simpan Pesanan } → Ucapkan Terima Kasih → Berhenti'] },
      { id:'5C', title:'Cek Stok Sebelum Konfirmasi',
        mission:'Pelanggan sudah pesan 3 karung beras. Tapi stok hanya 2 karung! Robot harus cek stok dulu sebelum konfirmasi pesanan.',
        cfg:{ required:['salam','pesanan','terima-kasih'],
              scenario:{ customerIntro:'Saya mau pesan 3 karung beras ya!', stokAda:false,
                         orderItems:[{name:'Beras 5kg',qty:3,price:75000}] } },
        kondisiOptions:[{value:'stok_cukup',label:'Stok Cukup ✅'},{value:'stok_habis',label:'Stok Habis ❌'},{value:'ada_pesanan',label:'Ada Pesanan'}],
        hints:['💡 Pertama sapa pelanggan, lalu simpan pesanannya.',
               '💡 Gunakan Jika [Stok Habis] → tampilkan Stok Habis, Jika Tidak → Konfirmasi Pesanan.',
               '💡 Solusi: Salam → Simpan Pesanan → Jika stok_habis { Stok Habis } Jika Tidak { Konfirmasi Pesanan } → Terima Kasih → Berhenti'] },
      { id:'5D', title:'Sistem Diskon Otomatis',
        mission:'Pelanggan memesan barang senilai Rp 150.000. Jika total > Rp 100.000 → berikan diskon 10% otomatis! Tampilkan total akhir setelah diskon.',
        cfg:{ required:['salam','pesanan','diskon','total','pembayaran'],
              scenario:{ customerIntro:'Saya mau pesan beras 2 karung dan gula 5 pak!',
                         orderItems:[{name:'Beras 5kg',qty:2,price:75000},{name:'Gula 1kg',qty:5,price:18000}],
                         discountThreshold:100000 } },
        kondisiOptions:[{value:'total_besar',label:'Total > Rp 100.000 💰'},{value:'ada_pesanan',label:'Ada Pesanan'}],
        hints:['💡 Simpan pesanan dulu agar total dihitung otomatis (Beras: Rp 150.000 + Gula: Rp 90.000 = Rp 240.000).',
               '💡 Gunakan Jika [Total > Rp 100.000] → Beri Diskon 10% sebelum Tampilkan Total.',
               '💡 Solusi: Salam → Simpan Pesanan → Jika total_besar { Beri Diskon } → Tampilkan Total → Proses Pembayaran → Terima Kasih → Berhenti'] }
    ]
  }
];
