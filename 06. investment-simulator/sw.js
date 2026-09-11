// Service Worker — Pasar Saham Virtual (PWA Offline Support)
const CACHE = 'psv-v2';
const ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './js/data.js',
  './js/app.js',
  './manifest.json',
  './pasar-saham.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
