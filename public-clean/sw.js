// Replace the former offline/audio worker and discard its stale lesson cache.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('sanad-academy-')).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});
