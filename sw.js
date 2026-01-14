// Nome della cache (puoi cambiarlo per forzare l'aggiornamento dell'app)
const CACHE_NAME = 'kingspan-v1';

// File da salvare per l'uso offline
const assets = [
  './',
  './index.html',
  // Se aggiungerai icone o loghi in futuro, andranno elencati qui
];

// Installazione del Service Worker e salvataggio file in cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache aperta, salvataggio file...');
      return cache.addAll(assets);
    })
  );
});

// Gestione delle richieste: prova a caricare dalla cache, se non c'è usa la rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Pulizia delle vecchie cache quando aggiorni la versione
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
