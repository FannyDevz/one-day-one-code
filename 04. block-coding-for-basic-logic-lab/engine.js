// engine.js — Block definitions, state classes, and interpreter

// ─────────────────────────────────────────────
// BLOCK TYPE DEFINITIONS
// ─────────────────────────────────────────────
const BLOCK_TYPES = {
  // ACTION (orange) ─────────────────────────
  maju:                { label:'Maju',                  icon:'→',  color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  'belok-kiri':        { label:'Belok Kiri',            icon:'↰',  color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  'belok-kanan':       { label:'Belok Kanan',           icon:'↱',  color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  petik:               { label:'Petik Buah',            icon:'✋', color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  masukkan:            { label:'Masukkan ke Keranjang', icon:'🧺', color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  kembalikan:          { label:'Beri Kembalian',        icon:'💰', color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  'minta-tambah':      { label:'Minta Tambahan',        icon:'🙏', color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  'stok-habis':        { label:'Tampilkan Stok Habis',  icon:'🚫', color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  'konfirmasi-pesanan':{ label:'Konfirmasi Pesanan',    icon:'✅', color:'#059669', bg:'#ECFDF5', cat:'action' },
  'beri-diskon':       { label:'Beri Diskon 10%',       icon:'🎁', color:'#7C3AED', bg:'#F5F3FF', cat:'action' },
  'proses-pembayaran': { label:'Proses Pembayaran',     icon:'💳', color:'#EA580C', bg:'#FFF7ED', cat:'action' },
  'nyalakan-merah':    { label:'Nyalakan Merah',        icon:'🔴', color:'#EA580C', bg:'#FFF7ED', cat:'action', param:'detik', paramDefault:30 },
  'nyalakan-kuning':   { label:'Nyalakan Kuning',       icon:'🟡', color:'#EA580C', bg:'#FFF7ED', cat:'action', param:'detik', paramDefault:5  },
  'nyalakan-hijau':    { label:'Nyalakan Hijau',        icon:'🟢', color:'#EA580C', bg:'#FFF7ED', cat:'action', param:'detik', paramDefault:25 },
  // DATA (blue) ─────────────────────────────
  'tampilkan-salam':   { label:'Tampilkan Salam',       icon:'👋', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  'tampilkan-menu':    { label:'Tampilkan Menu',        icon:'📋', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  'tampilkan-harga':   { label:'Tampilkan Harga',       icon:'💬', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  'tampilkan-stok':    { label:'Tampilkan Stok',        icon:'📦', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  'tampilkan-total':   { label:'Tampilkan Total',       icon:'🧾', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  'simpan-pesanan':    { label:'Simpan Pesanan',        icon:'📝', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  'ucapkan-terima':    { label:'Ucapkan Terima Kasih',  icon:'🙂', color:'#2563EB', bg:'#EFF6FF', cat:'data' },
  // CONTROL (yellow) ────────────────────────
  ulangi:              { label:'Ulangi',          icon:'↻', color:'#B45309', bg:'#FFFBEB', cat:'loop',         isContainer:true, hasBody:true, param:'n', paramDefault:3 },
  'ulangi-selamanya':  { label:'Ulangi Selamanya',icon:'∞', color:'#B45309', bg:'#FFFBEB', cat:'loop-forever', isContainer:true, hasBody:true },
  jika:                { label:'Jika',            icon:'◆', color:'#B45309', bg:'#FFFBEB', cat:'if',           isContainer:true, hasBody:true, hasElse:true, param:'kondisi' },
  // TERMINAL (green) ────────────────────────
  berhenti:            { label:'Berhenti', icon:'■', color:'#059669', bg:'#ECFDF5', cat:'terminal' },
};

// ─────────────────────────────────────────────
// BLOCK NODE
// ─────────────────────────────────────────────
let _bid = 1;
class BlockNode {
  constructor(type, params) {
    this.id = 'b' + (_bid++);
    this.type = type;
    this.params = params || {};
    const def = BLOCK_TYPES[type] || {};
    if (def.param && this.params[def.param] === undefined)
      this.params[def.param] = def.paramDefault !== undefined ? def.paramDefault : '';
    this.children     = [];
    this.elseChildren = [];
  }
}

// ─────────────────────────────────────────────
// INTERPRETER
// ─────────────────────────────────────────────
class Interpreter {
  constructor(blocks, state, onLog) {
    this.blocks = blocks; this.state = state; this.onLog = onLog;
    this.stopped = false; this.steps = 0; this.MAX = 800;
  }
  stop() { this.stopped = true; }

  async run() { this.stopped = false; this.steps = 0; await this._list(this.blocks); }

  async _list(list) {
    for (const b of list) { if (this.stopped) return; await this._exec(b); }
  }

  async _exec(node) {
    if (this.stopped) return;
    if (++this.steps > this.MAX) {
      this.onLog('⚠️ Terlalu banyak langkah.'); this.stopped = true; return;
    }
    const s = this.state;
    switch (node.type) {
      case 'maju':              await s.maju(this); break;
      case 'belok-kiri':        await s.belokKiri(this); break;
      case 'belok-kanan':       await s.belokKanan(this); break;
      case 'berhenti':          await s.berhenti(this); break;
      case 'petik':             await s.petik(this); break;
      case 'masukkan':          await s.masukkan(this); break;
      case 'kembalikan':        await s.kembalikan(this); break;
      case 'minta-tambah':      await s.mintaTambah(this); break;
      case 'stok-habis':        await s.stokHabis(this); break;
      case 'konfirmasi-pesanan':await s.konfirmasiPesanan(this); break;
      case 'beri-diskon':       await s.beriDiskon(this); break;
      case 'proses-pembayaran': await s.prosesPembayaran(this); break;
      case 'nyalakan-merah':    await s.nyalakanLampu('merah',  parseInt(node.params.detik)||30, this); break;
      case 'nyalakan-kuning':   await s.nyalakanLampu('kuning', parseInt(node.params.detik)||5,  this); break;
      case 'nyalakan-hijau':    await s.nyalakanLampu('hijau',  parseInt(node.params.detik)||25, this); break;
      case 'tampilkan-salam':   await s.tampilkanPesan('salam', this); break;
      case 'tampilkan-menu':    await s.tampilkanMenu(this); break;
      case 'tampilkan-harga':   await s.tampilkanPesan('harga', this); break;
      case 'tampilkan-stok':    await s.tampilkanPesan('stok', this); break;
      case 'tampilkan-total':   await s.tampilkanTotal(this); break;
      case 'simpan-pesanan':    await s.simpanPesanan(this); break;
      case 'ucapkan-terima':    await s.tampilkanPesan('terima', this); break;

      case 'ulangi': {
        const n = parseInt(node.params.n) || 1;
        this.onLog(`↻ Ulangi ${n} kali`);
        for (let i = 0; i < n && !this.stopped; i++) {
          this.onLog(`  — iterasi ke-${i+1}`);
          await this._list(node.children);
        }
        break;
      }
      case 'ulangi-selamanya': {
        const maxL = s.maxForeverLoops || 3;
        this.onLog(`∞ Ulangi Selamanya (maks ${maxL} putaran)`);
        for (let i = 0; i < maxL && !this.stopped; i++) {
          this.onLog(`  — putaran ke-${i+1}`);
          s.foreverCycle = i;
          await this._list(node.children);
        }
        break;
      }
      case 'jika': {
        const k  = node.params.kondisi || '';
        const ok = s.evaluateCondition(k);
        this.onLog(`◆ Jika [${k}] → ${ok ? '✅ YA' : '❌ TIDAK'}`);
        await this._list(ok ? node.children : node.elseChildren);
        break;
      }
      default: this.onLog(`❓ Blok tidak dikenal: ${node.type}`);
    }
  }
}

// ─────────────────────────────────────────────
// GRID STATE  (Level 1 & 2)
// ─────────────────────────────────────────────
class GridState {
  constructor(cfg) { this.cfg = cfg; this.reset(); }
  reset() {
    const c = this.cfg;
    this.pos = {x:c.start[0], y:c.start[1]};
    this.dir = c.startDir || 0;
    this.picked = new Set(); this.hand = 0; this.basket = 0;
    this.success=false; this.finished=false; this.error=null; this.onRender=null; this.maxForeverLoops=1;
  }
  _dv()     { return [[1,0],[0,-1],[-1,0],[0,1]][this.dir]; }
  _dn()     { return ['Timur','Utara','Barat','Selatan'][this.dir]; }
  _wall(x,y){ const c=this.cfg; return x<0||y<0||x>=c.cols||y>=c.rows||(c.walls||[]).some(w=>w[0]===x&&w[1]===y); }
  _tree(x,y){ return (this.cfg.trees||[]).some(t=>t[0]===x&&t[1]===y&&!this.picked.has(`${x},${y}`)); }
  evaluateCondition(){ return false; }
  async _tick(){ if(this.onRender) this.onRender(this); await _delay(380); }

  async maju(interp) {
    const [dx,dy]=this._dv(); const nx=this.pos.x+dx, ny=this.pos.y+dy;
    if (this._wall(nx,ny)) { this.error='Budi menabrak tembok!'; interp.onLog('❌ Menabrak tembok!'); interp.stop(); }
    else {
      this.pos={x:nx,y:ny}; interp.onLog(`→ Maju ke (${nx},${ny})`);
      const c=this.cfg;
      if (c.goal&&nx===c.goal[0]&&ny===c.goal[1]) { this.success=true; this.finished=true; interp.onLog('🎉 Sampai!'); interp.stop(); }
    }
    await this._tick();
  }
  async belokKiri(interp)  { this.dir=(this.dir+1)%4; interp.onLog(`↰ → ${this._dn()}`);  await this._tick(); }
  async belokKanan(interp) { this.dir=(this.dir+3)%4; interp.onLog(`↱ → ${this._dn()}`); await this._tick(); }
  async berhenti(interp) {
    interp.onLog('■ Berhenti');
    const c=this.cfg;
    if (c.goal) { this.success=(this.pos.x===c.goal[0]&&this.pos.y===c.goal[1]); if(!this.success) this.error='Belum sampai tujuan!'; }
    else { this.success=this.basket>=(c.targetBasket||0); if(!this.success) this.error=`Baru ${this.basket}/${c.targetBasket} buah.`; }
    this.finished=true; interp.stop(); await this._tick();
  }
  async petik(interp) {
    const key=`${this.pos.x},${this.pos.y}`;
    if (this._tree(this.pos.x,this.pos.y)) { this.picked.add(key); this.hand++; interp.onLog(`✋ Petik (tangan:${this.hand})`); }
    else { interp.onLog('⚠️ Tidak ada buah!'); }
    await this._tick();
  }
  async masukkan(interp) {
    if (this.hand>0) {
      this.basket+=this.hand; this.hand=0; interp.onLog(`🧺 Keranjang: ${this.basket}`);
      const c=this.cfg;
      if (c.trees&&this.basket>=c.trees.length) { this.success=true; this.finished=true; interp.onLog('🎉 Semua terpanen!'); interp.stop(); }
    } else { interp.onLog('⚠️ Tangan kosong!'); }
    await this._tick();
  }
  // stubs
  async kembalikan(){} async mintaTambah(){} async stokHabis(){} async nyalakanLampu(){}
  async tampilkanPesan(){} async tampilkanMenu(){} async tampilkanTotal(){} async simpanPesanan(){}
  async konfirmasiPesanan(){} async beriDiskon(){} async prosesPembayaran(){}
}

// ─────────────────────────────────────────────
// CASHIER STATE  (Level 3)
// ─────────────────────────────────────────────
class CashierState {
  constructor(cfg) { this.cfg=cfg; this.reset(); }
  reset() {
    const c=this.cfg;
    this.harga=c.harga||10000; this.bayar=c.bayar||12000; this.stok=c.stok!==undefined?c.stok:5;
    this.result=null; this.success=false; this.finished=false; this.error=null; this.onRender=null; this.maxForeverLoops=1;
  }
  evaluateCondition(k) {
    return { bayar_lebih:this.bayar>this.harga, bayar_kurang:this.bayar<this.harga,
             bayar_pas:this.bayar===this.harga, stok_tersedia:this.stok>0, stok_habis:this.stok===0 }[k]||false;
  }
  async _tick() { if(this.onRender) this.onRender(this); await _delay(500); }

  async kembalikan(interp) {
    if (this.bayar>this.harga) { const k=this.bayar-this.harga; this.result={type:'kembalian',amount:k}; interp.onLog(`💰 Kembalian Rp ${k.toLocaleString('id-ID')}`); }
    else interp.onLog('⚠️ Tidak bisa memberi kembalian');
    await this._tick();
  }
  async mintaTambah(interp) {
    if (this.bayar<this.harga) { const k=this.harga-this.bayar; this.result={type:'kurang',amount:k}; interp.onLog(`🙏 Kurang Rp ${k.toLocaleString('id-ID')}`); }
    else interp.onLog('⚠️ Pembayaran cukup');
    await this._tick();
  }
  async stokHabis(interp) {
    if (this.stok===0) { this.result={type:'stok-habis'}; interp.onLog('🚫 Stok habis!'); }
    else interp.onLog('⚠️ Stok masih ada');
    await this._tick();
  }
  async berhenti(interp) {
    const c=this.cfg;
    if (c.stok===0)            this.success=this.result&&this.result.type==='stok-habis';
    else if (this.bayar>this.harga)  this.success=this.result&&this.result.type==='kembalian';
    else if (this.bayar<this.harga)  this.success=this.result&&this.result.type==='kurang';
    else                             this.success=true;
    this.finished=true; if(!this.success) this.error='Keputusan robot tidak tepat!';
    interp.onLog(this.success?'✅ Transaksi berhasil!':'❌ Transaksi salah!');
    interp.stop(); await this._tick();
  }
  async maju(){} async belokKiri(){} async belokKanan(){} async petik(){} async masukkan(){}
  async nyalakanLampu(){} async tampilkanPesan(){} async tampilkanMenu(){} async tampilkanTotal(){}
  async simpanPesanan(){} async konfirmasiPesanan(){} async beriDiskon(){} async prosesPembayaran(){}
}

// ─────────────────────────────────────────────
// TRAFFIC STATE  (Level 4) — enhanced
// ─────────────────────────────────────────────
class TrafficState {
  constructor(cfg) { this.cfg=cfg; this.reset(); }
  reset() {
    const c=this.cfg;
    this.light=null;
    this.sequence=[];   // [{color,secs}]
    this.success=false; this.finished=false; this.error=null;
    this.foreverCycle=0; this.onRender=null; this.maxForeverLoops=3;
    this.carsWaiting={N:3,S:2,E:4,W:1}; // visual only
    this.carsClear=0;
  }

  evaluateCondition(k) {
    const c=this.cfg;
    if (k==='ada_ambulans')  return c.hasAmbulance&&(this.foreverCycle===(c.ambulanceCycle||0));
    if (k==='sensor_padat')  return c.sensorPadat===true;
    if (k==='jam_sibuk')     return c.jamSibuk===true;
    return false;
  }

  async _tick() { if(this.onRender) this.onRender(this); await _delay(700); }

  async nyalakanLampu(color, secs, interp) {
    this.light=color;
    this.sequence.push({color,secs});
    if (color==='hijau') this.carsClear+=Math.floor(secs/10);
    interp.onLog(`🚦 ${color.toUpperCase()} (${secs}s)`);
    await this._tick();
  }

  async berhenti(interp) {
    this._checkSuccess();
    this.finished=true;
    if (!this.success) this.error='Urutan atau durasi lampu belum sesuai!';
    interp.onLog(this.success?'✅ Lampu berhasil!':'❌ Urutan salah!');
    interp.stop(); await this._tick();
  }

  _checkSuccess() {
    const c=this.cfg;
    if (c.checkFn) { this.success=c.checkFn(this); return; }
    const exp=c.expectedSequence||[];
    if (!exp.length) { this.success=this.sequence.length>0; return; }
    let ok=true;
    for (let i=0; i<exp.length&&i<this.sequence.length; i++) {
      const a=this.sequence[i];
      const e=exp[i];
      const ec = typeof e==='object'?e.color:e;
      if ((typeof a==='object'?a.color:a) !== ec) { ok=false; break; }
      if (typeof e==='object'&&e.minSecs&&(typeof a==='object'?a.secs:25)<e.minSecs) { ok=false; break; }
    }
    this.success=ok&&this.sequence.length>=exp.length;
  }

  async maju(){} async belokKiri(){} async belokKanan(){} async petik(){} async masukkan(){}
  async kembalikan(){} async mintaTambah(){} async stokHabis(){} async tampilkanPesan(){}
  async tampilkanMenu(){} async tampilkanTotal(){} async simpanPesanan(){}
  async konfirmasiPesanan(){} async beriDiskon(){} async prosesPembayaran(){}
}

// ─────────────────────────────────────────────
// CHATBOT STATE  (Level 5) — advanced
// ─────────────────────────────────────────────
class ChatbotState {
  constructor(cfg) { this.cfg=cfg; this.reset(); }

  reset() {
    const c=this.cfg;
    const sc=c.scenario||{};
    this.msgs=[];
    this.hasGreeted=false; this.hasMenu=false; this.hasHarga=false;
    this.hasStok=false; this.hasPesanan=false; this.hasTerima=false;
    this.hasDiskon=false; this.hasTotal=false; this.hasPayment=false;
    this.orderTotal=sc.orderTotal||0;
    this.stockOk=sc.stokAda!==false;
    this.success=false; this.finished=false; this.error=null;
    this.onRender=null; this.maxForeverLoops=sc.loops||2;

    if (sc.customerIntro) {
      this.msgs.push({from:'customer', text:sc.customerIntro});
    }
  }

  evaluateCondition(k) {
    const sc=this.cfg.scenario||{};
    return {
      ada_pesanan:  this.hasPesanan,
      total_besar:  this.orderTotal>(sc.discountThreshold||100000),
      stok_cukup:   this.stockOk,
      stok_habis:   !this.stockOk,
      customer_minta_harga:  sc.customerWants==='harga',
      customer_minta_stok:   sc.customerWants==='stok',
      customer_minta_pesan:  sc.customerWants==='pesan',
    }[k]||false;
  }

  async _tick() { if(this.onRender) this.onRender(this); await _delay(450); }

  async tampilkanPesan(type, interp) {
    const map={
      salam: '👋 Halo! Selamat datang di Toko Bu Dewi. Ada yang bisa dibantu?',
      harga: '💰 Daftar Harga:\n• Beras 5kg — Rp 75.000\n• Gula 1kg — Rp 18.000\n• Minyak 1L — Rp 20.000',
      stok:  '📦 Stok:\n• Beras 5kg — 20 karung ✅\n• Gula 1kg — 5 pak ✅\n• Minyak 1L — habis ❌',
      terima:'🙂 Terima kasih sudah belanja! Sampai jumpa lagi!',
    };
    const txt=map[type]||type;
    this.msgs.push({from:'bot',text:txt});
    if (type==='salam')  this.hasGreeted=true;
    if (type==='harga')  this.hasHarga=true;
    if (type==='stok')   this.hasStok=true;
    if (type==='terima') this.hasTerima=true;
    interp.onLog(`💬 ${txt.split('\n')[0]}`);
    await this._tick();
  }

  async tampilkanMenu(interp) {
    const sc=this.cfg.scenario||{};
    const txt='📋 Menu Layanan:\n[1] Info Harga  [2] Cek Stok\n[3] Pesan Barang  [4] Selesai';
    this.msgs.push({from:'bot',text:txt});
    this.hasMenu=true;
    interp.onLog('📋 Tampilkan menu');
    if (sc.customerReply) {
      setTimeout(()=>{ this.msgs.push({from:'customer',text:sc.customerReply}); if(this.onRender)this.onRender(this); }, 300);
    }
    await this._tick();
  }

  async simpanPesanan(interp) {
    this.hasPesanan=true;
    const sc=this.cfg.scenario||{};
    const items=sc.orderItems||[];
    this.orderTotal=items.reduce((s,it)=>s+it.price*it.qty, this.orderTotal);
    const txt=`📝 Pesanan diterima!\n${items.map(it=>`• ${it.name} ×${it.qty}`).join('\n')||'Pesanan umum'}`;
    this.msgs.push({from:'bot',text:txt});
    interp.onLog(`📝 Pesanan disimpan (Rp ${this.orderTotal.toLocaleString('id-ID')})`);
    await this._tick();
  }

  async konfirmasiPesanan(interp) {
    if (this.hasPesanan&&this.stockOk) {
      const txt=`✅ Pesanan dikonfirmasi!\nTotal: Rp ${this.orderTotal.toLocaleString('id-ID')}`;
      this.msgs.push({from:'bot',text:txt});
      interp.onLog(`✅ Konfirmasi (Rp ${this.orderTotal.toLocaleString('id-ID')})`);
    } else if (!this.stockOk) {
      this.msgs.push({from:'bot',text:'❌ Maaf, stok habis. Pesanan tidak bisa diproses.'});
      interp.onLog('❌ Konfirmasi gagal — stok habis');
    } else {
      this.msgs.push({from:'bot',text:'⚠️ Belum ada pesanan yang diterima.'});
    }
    await this._tick();
  }

  async beriDiskon(interp) {
    if (this.orderTotal>0) {
      const diskon=Math.round(this.orderTotal*0.1);
      this.orderTotal-=diskon; this.hasDiskon=true;
      const txt=`🎁 Diskon 10% diterapkan!\n−Rp ${diskon.toLocaleString('id-ID')}\nTotal: Rp ${this.orderTotal.toLocaleString('id-ID')}`;
      this.msgs.push({from:'bot',text:txt});
      interp.onLog(`🎁 Diskon Rp ${diskon.toLocaleString('id-ID')}`);
    } else { interp.onLog('⚠️ Belum ada total'); }
    await this._tick();
  }

  async tampilkanTotal(interp) {
    this.hasTotal=true;
    const txt=this.orderTotal>0
      ?`🧾 Total Belanja: Rp ${this.orderTotal.toLocaleString('id-ID')}`
      :'🧾 Belum ada item yang dipesan.';
    this.msgs.push({from:'bot',text:txt});
    interp.onLog(`🧾 Total: Rp ${this.orderTotal.toLocaleString('id-ID')}`);
    await this._tick();
  }

  async prosesPembayaran(interp) {
    this.hasPayment=true;
    const txt=`💳 Pembayaran Rp ${this.orderTotal.toLocaleString('id-ID')} berhasil!\nSilakan ambil barang Anda.`;
    this.msgs.push({from:'bot',text:txt});
    interp.onLog('💳 Pembayaran diproses');
    await this._tick();
  }

  async berhenti(interp) {
    const req=this.cfg.required||['salam'];
    const map={
      salam:this.hasGreeted, menu:this.hasMenu, harga:this.hasHarga,
      stok:this.hasStok, pesanan:this.hasPesanan, 'terima-kasih':this.hasTerima,
      konfirmasi: this.msgs.some(m=>m.text&&m.text.includes('dikonfirmasi')),
      diskon:this.hasDiskon, total:this.hasTotal, pembayaran:this.hasPayment,
    };
    this.success=req.every(r=>map[r]);
    this.finished=true;
    if (!this.success) {
      const missing=req.filter(r=>!map[r]);
      this.error=`Belum dilakukan: ${missing.join(', ')}`;
    }
    interp.onLog(this.success?'✅ Chatbot berhasil!':'❌ Chatbot belum lengkap');
    interp.stop(); await this._tick();
  }

  async maju(){} async belokKiri(){} async belokKanan(){} async petik(){} async masukkan(){}
  async kembalikan(){} async mintaTambah(){} async stokHabis(){} async nyalakanLampu(){}
}

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────
function _delay(ms) { return new Promise(r=>setTimeout(r,ms)); }

function createState(cls, cfg) {
  return new ({GridState,CashierState,TrafficState,ChatbotState}[cls])(cfg);
}
