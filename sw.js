// Service Worker mínimo — necessário para o Chrome reconhecer como PWA instalável
const CACHE = 're-pwa-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/', '/manifest.json', '/icon.png']))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // Passa tudo normalmente — sem cache agressivo para garantir sempre versão atualizada
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
