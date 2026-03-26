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
  // Navegação (index.html): sempre busca da rede sem cache
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request, { cache: 'no-store' }));
    return;
  }
  // Demais recursos: vai para a rede normalmente
  e.respondWith(fetch(e.request));
});
