const CACHE_NAME = "punchmeter";
const CACHE_VERSION = 1;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME + CACHE_VERSION.toString())
    .then(function(cache) {
      return cache.addAll([
        '/main.js',
        '/sw.js',
        '/script.js',
        '../gauge/gauge.js',
        '../stylesheets/styles.css',
        '../stylesheets/style.scss',
        '../../views/layout.hbs',
        '../../views/error.hbs',
        '../../views/index.hbs',
        '../../views/not-found.hbs',
        '../../routes/index.js',
        '../../app.js',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  //Retrieval from cache
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {  // Found match in cache
      return response;
   } else {
      return fetch(event.request).then(function (response) {
          //Response may be used only once so need to clone it for reuse
          let responseClone = response.clone();
          caches.open(CACHE_VERSION.toString()).then(function (cache) {
             cache.put(event.request, responseClone);
          });
          return response;
      });
   }
 }));
});