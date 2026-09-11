// Khodam list embedded inline so the app works when opened directly (file://) — no fetch/CORS needed.
const KHODAM_LIST = [
  "ayam geprek",
  "mie ayam",
  "nasi goreng",
  "mio mirza",
  "roh baik",
  "roh hitam",
  "teh manis solo",
  "telur asin",
  "bebek",
  "whiskas",
  "ayam warna warni",
  "facebook",
  "tiktok",
  "korek",
  "monitor",
  "crot di dalem",
  "kodomo",
  "oli gardan",
  "oli samping",
  "free fire",
  "alok",
  "kelly",
  "keramik alfamart",
  "siluman based",
  "programmer",
  "ps 4",
  "fuad",
  "si imut",
  "ayam cabe ijo",
  "teh pucuk",
  "karbu vespa",
  "chatgpt",
  "celana sobek",
  "sempak firaun",
  "pepsodent",
  "es buah",
  "kera hitam",
  "vicidior",
  "Rubicon",
  "dudul",
  "kunci stang",
  "ksatria kegelapan",
  "ciki jaguar",
  "ayam broiler",
  "helm scoopy",
  "knalpot beat",
  "kapal karam",
  "the gladiator",
  "kursi goyang mas fuad",
  "basreng",
  "cimol",
  "dino asli sunda",
  "vixion racing",
  "mio mirza",
  "karbu mio",
  "gonzales",
  "tanah sengketa",
  "macan Kemayoran",
  "sendal jepit",
  "batagor isi ayam",
  "piring gacoan",
  "sofa terbang",
  "mia khalifa",
  "momo hirai",
  "twice",
  "aespa",
  "geforce rtx 4060",
  "beat karbu",
  "kentungan pos ronda",
  "megalodon asli jawa",
  "sedot wc",
  "pocong mewinh",
  "nasi goreng",
  "mie ayam",
  "ketoprak",
  "cicak",
  "instagram",
  "bunga angrek asli pontianak",
  "tahu isi",
  "baso beranak",
  "tumbler",
  "singkong bakar",
  "gelombang laut",
  "saber roam",
  "alucard",
  "raja kikir",
  "ratu kikir",
  "orang ganteng, waspadalah",
  "raden kian jantan",
  "sprei bunga",
  "king madrid",
  "udang goreng",
  "tahu sumedang",
  "javascript",
  "ombak banyuwangi",
  "hantu skibidi",
  "modem wifi",
  "fanum tax",
  "suki",
  "raja sigma",
  "keluh basah lele berulah",
  "ratu gyatt"
];

document.addEventListener('DOMContentLoaded', () => {
    loadTableData();
});

document.getElementById('checkButton').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    const resultElement = document.getElementById('result');

    if (name.trim() === "") {
        alert("Masukin namanya anjeng!");
        return;
    }

    const randomKhodam = KHODAM_LIST[Math.floor(Math.random() * KHODAM_LIST.length)];
    resultElement.innerHTML = `Khodam untuk <strong>${name}</strong> adalah: <strong>${randomKhodam}</strong>`;
    resultElement.classList.add('has-result');

    const tableBody = document.getElementById('checkTableBody');
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = randomKhodam;
    saveToLocalStorage(name, randomKhodam);
});

document.getElementById('clearButton').addEventListener('click', function() {
    localStorage.removeItem('khodamData');
    document.getElementById('checkTableBody').innerHTML = '';
});

function saveToLocalStorage(name, khodam) {
    const data = JSON.parse(localStorage.getItem('khodamData')) || [];
    data.push({ name: name, khodam: khodam });
    localStorage.setItem('khodamData', JSON.stringify(data));
}

function loadTableData() {
    const data = JSON.parse(localStorage.getItem('khodamData')) || [];
    const tableBody = document.getElementById('checkTableBody');
    data.forEach(item => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = item.name;
        newRow.insertCell(1).textContent = item.khodam;
    });
}
