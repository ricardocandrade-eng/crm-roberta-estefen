// Service Worker — sem cache, sempre busca versão mais recente da rede
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  // Apaga todos os caches antigos ao ativar
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Sempre vai para a rede — sem cache
  e.respondWith(fetch(e.request));
});
