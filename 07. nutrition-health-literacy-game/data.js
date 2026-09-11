// data.js — Database makanan & target gizi
// Sumber: Tabel Komposisi Pangan Indonesia (TKPI) Kemenkes RI

const FOODS = {
  // ── MAKANAN POKOK ──────────────────────────
  nasi_putih:   { name:'Nasi Putih',       cat:'pokok', emoji:'🍚', portion:150, price:2000,  kal:195, protein:3.6, karbo:42.9, lemak:0.3,  serat:0.6 },
  nasi_merah:   { name:'Nasi Merah',       cat:'pokok', emoji:'🍚', portion:150, price:3000,  kal:165, protein:3.5, karbo:35.0, lemak:1.3,  serat:2.1 },
  roti_gandum:  { name:'Roti Gandum',      cat:'pokok', emoji:'🍞', portion:80,  price:4000,  kal:185, protein:8.0, karbo:34.0, lemak:2.5,  serat:4.2 },
  roti_tawar:   { name:'Roti Tawar',       cat:'pokok', emoji:'🍞', portion:80,  price:2500,  kal:212, protein:6.4, karbo:40.8, lemak:2.2,  serat:1.0 },
  mie_telur:    { name:'Mie Telur',        cat:'pokok', emoji:'🍜', portion:150, price:3000,  kal:262, protein:8.5, karbo:49.5, lemak:3.3,  serat:1.2 },
  singkong:     { name:'Singkong Rebus',   cat:'pokok', emoji:'🥔', portion:150, price:1500,  kal:160, protein:1.4, karbo:38.1, lemak:0.3,  serat:1.8 },
  ubi_jalar:    { name:'Ubi Jalar',        cat:'pokok', emoji:'🍠', portion:150, price:2000,  kal:125, protein:1.7, karbo:29.3, lemak:0.1,  serat:3.3 },
  jagung_rebus: { name:'Jagung Rebus',     cat:'pokok', emoji:'🌽', portion:150, price:2500,  kal:130, protein:4.8, karbo:28.5, lemak:1.5,  serat:3.6 },
  ketupat:      { name:'Ketupat',          cat:'pokok', emoji:'🍙', portion:150, price:2000,  kal:157, protein:2.9, karbo:34.6, lemak:0.2,  serat:0.4 },
  bubur_ayam:   { name:'Bubur Ayam',       cat:'pokok', emoji:'🥣', portion:200, price:7000,  kal:178, protein:8.2, karbo:28.4, lemak:3.5,  serat:0.5 },

  // ── LAUK-PAUK ──────────────────────────────
  tempe:        { name:'Tempe Goreng',     cat:'lauk',  emoji:'🫘', portion:100, price:2000,  kal:199, protein:19.0, karbo:13.5, lemak:11.0, serat:2.6 },
  tahu_goreng:  { name:'Tahu Goreng',      cat:'lauk',  emoji:'🧊', portion:100, price:2000,  kal:136, protein:10.9, karbo:4.3,  lemak:9.0,  serat:0.2 },
  telur_rebus:  { name:'Telur Rebus',      cat:'lauk',  emoji:'🥚', portion:60,  price:2500,  kal:93,  protein:7.3,  karbo:0.6,  lemak:6.4,  serat:0   },
  telur_ceplok: { name:'Telur Ceplok',     cat:'lauk',  emoji:'🍳', portion:60,  price:2500,  kal:107, protein:6.9,  karbo:0.6,  lemak:8.2,  serat:0   },
  ayam_goreng:  { name:'Ayam Goreng',      cat:'lauk',  emoji:'🍗', portion:100, price:8000,  kal:260, protein:24.5, karbo:5.8,  lemak:15.3, serat:0   },
  ikan_kembung: { name:'Ikan Kembung',     cat:'lauk',  emoji:'🐟', portion:100, price:4000,  kal:158, protein:22.5, karbo:0,    lemak:7.5,  serat:0   },
  ikan_asin:    { name:'Ikan Asin',        cat:'lauk',  emoji:'🐠', portion:30,  price:2000,  kal:193, protein:42.0, karbo:0,    lemak:1.5,  serat:0   },
  ikan_lele:    { name:'Ikan Lele Goreng', cat:'lauk',  emoji:'🐡', portion:100, price:5000,  kal:175, protein:18.7, karbo:4.8,  lemak:8.4,  serat:0   },
  daging_sapi:  { name:'Daging Sapi',      cat:'lauk',  emoji:'🥩', portion:100, price:15000, kal:207, protein:26.5, karbo:0,    lemak:10.9, serat:0   },
  udang_rebus:  { name:'Udang Rebus',      cat:'lauk',  emoji:'🦐', portion:100, price:6000,  kal:91,  protein:19.3, karbo:0.9,  lemak:1.0,  serat:0   },
  hati_ayam:    { name:'Hati Ayam',        cat:'lauk',  emoji:'🍖', portion:75,  price:3500,  kal:119, protein:16.9, karbo:1.4,  lemak:4.8,  serat:0   },

  // ── SAYURAN ────────────────────────────────
  bayam:         { name:'Bayam Rebus',      cat:'sayur', emoji:'🥬', portion:100, price:1500, kal:20,  protein:2.4, karbo:2.3,  lemak:0.3, serat:2.1 },
  kangkung:      { name:'Kangkung Tumis',   cat:'sayur', emoji:'🌿', portion:100, price:1500, kal:29,  protein:3.0, karbo:4.0,  lemak:0.4, serat:2.0 },
  wortel:        { name:'Wortel',           cat:'sayur', emoji:'🥕', portion:100, price:2000, kal:41,  protein:0.9, karbo:9.6,  lemak:0.2, serat:2.8 },
  brokoli:       { name:'Brokoli Kukus',    cat:'sayur', emoji:'🥦', portion:100, price:4000, kal:34,  protein:2.8, karbo:6.6,  lemak:0.4, serat:2.6 },
  tomat:         { name:'Tomat',            cat:'sayur', emoji:'🍅', portion:100, price:2000, kal:18,  protein:0.9, karbo:3.9,  lemak:0.2, serat:1.2 },
  kacang_panjang:{ name:'Kacang Panjang',   cat:'sayur', emoji:'🫛', portion:100, price:2000, kal:35,  protein:2.4, karbo:6.3,  lemak:0.3, serat:3.6 },
  daun_singkong: { name:'Daun Singkong',    cat:'sayur', emoji:'🥗', portion:100, price:1000, kal:39,  protein:3.7, karbo:6.3,  lemak:0.2, serat:2.3 },
  terong:        { name:'Terong Tumis',     cat:'sayur', emoji:'🍆', portion:100, price:2000, kal:24,  protein:1.0, karbo:5.7,  lemak:0.2, serat:3.4 },
  timun:         { name:'Timun Segar',      cat:'sayur', emoji:'🥒', portion:100, price:1500, kal:15,  protein:0.7, karbo:3.6,  lemak:0.1, serat:0.5 },
  pare:          { name:'Pare Tumis',       cat:'sayur', emoji:'🫑', portion:100, price:2000, kal:24,  protein:1.1, karbo:4.3,  lemak:0.2, serat:2.8 },

  // ── BUAH-BUAHAN ────────────────────────────
  pisang_ambon:  { name:'Pisang Ambon',     cat:'buah',  emoji:'🍌', portion:100, price:2000, kal:99,  protein:1.2, karbo:25.8, lemak:0.2, serat:2.6 },
  pepaya:        { name:'Pepaya',           cat:'buah',  emoji:'🍈', portion:150, price:2000, kal:46,  protein:0.6, karbo:11.1, lemak:0.1, serat:1.8 },
  jeruk_manis:   { name:'Jeruk Manis',      cat:'buah',  emoji:'🍊', portion:150, price:3000, kal:47,  protein:0.9, karbo:11.2, lemak:0.2, serat:2.4 },
  mangga:        { name:'Mangga',           cat:'buah',  emoji:'🥭', portion:150, price:4000, kal:66,  protein:0.8, karbo:16.8, lemak:0.4, serat:1.8 },
  semangka:      { name:'Semangka',         cat:'buah',  emoji:'🍉', portion:200, price:3000, kal:30,  protein:0.6, karbo:7.6,  lemak:0.2, serat:0.4 },
  apel:          { name:'Apel',             cat:'buah',  emoji:'🍎', portion:150, price:5000, kal:77,  protein:0.4, karbo:20.6, lemak:0.2, serat:3.3 },
  alpukat:       { name:'Alpukat',          cat:'buah',  emoji:'🥑', portion:100, price:4000, kal:160, protein:2.0, karbo:8.5,  lemak:14.7,serat:6.7 },
  jambu_biji:    { name:'Jambu Biji',       cat:'buah',  emoji:'🍐', portion:100, price:2000, kal:49,  protein:0.9, karbo:12.2, lemak:0.3, serat:5.4 },
  nanas:         { name:'Nanas',            cat:'buah',  emoji:'🍍', portion:150, price:3000, kal:50,  protein:0.5, karbo:13.1, lemak:0.1, serat:1.4 },
  salak:         { name:'Salak',            cat:'buah',  emoji:'🫒', portion:80,  price:2000, kal:77,  protein:0.4, karbo:20.9, lemak:0.4, serat:2.0 },
};

// Target gizi per SAJIAN (≈1/3 kebutuhan harian)
// Sumber: AKG Kemenkes 2019 dibagi 3 sajian/hari
const NUTRITION_TARGETS = {
  default:   { kal:533, protein:17, karbo:89,  lemak:18, serat:10 },
  anak:      { kal:533, protein:17, karbo:89,  lemak:18, serat:10 },
  ibuHamil:  { kal:700, protein:25, karbo:117, lemak:23, serat:12 },
  balita:    { kal:400, protein:13, karbo:67,  lemak:13, serat:7  },
  lansia:    { kal:450, protein:20, karbo:75,  lemak:12, serat:13 },
  remaja:    { kal:700, protein:22, karbo:117, lemak:23, serat:11 },
};

const ZONE_INFO = {
  pokok:  { label:'Makanan Pokok', sublabel:'1/3 piring', color:'#CA8A04', bg:'#FEF9C3', icon:'🍚', desc:'Sumber karbohidrat & energi utama' },
  sayur:  { label:'Sayuran',       sublabel:'1/3 piring', color:'#16A34A', bg:'#DCFCE7', icon:'🥬', desc:'Sumber serat, vitamin & mineral' },
  lauk:   { label:'Lauk-Pauk',     sublabel:'1/6 piring', color:'#EA580C', bg:'#FFF7ED', icon:'🍗', desc:'Sumber protein hewani & nabati' },
  buah:   { label:'Buah-Buahan',   sublabel:'1/6 piring', color:'#DB2777', bg:'#FDF2F8', icon:'🍌', desc:'Sumber vitamin C & antioksidan' },
};

const NUTRIENT_LABELS = {
  kal:     { label:'Kalori', unit:'kkal', icon:'🔥' },
  protein: { label:'Protein', unit:'g', icon:'💪' },
  karbo:   { label:'Karbohidrat', unit:'g', icon:'⚡' },
  lemak:   { label:'Lemak', unit:'g', icon:'🫧' },
  serat:   { label:'Serat', unit:'g', icon:'🌱' },
};
