var CACHE_NAME = 'ct-worker';

var urlsToCache = [
  '/',
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    // open the named cache
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log(`--Opened cache: ${CACHE_NAME}`);
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    // see if request exists in cache -- returns undefined if not found
    caches.match(event.request)
      .then(function(response) {
        // if found in cache, return response
        if (response) {
          return response;
        }
        // if not, get the resource, return it
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});