importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

var cacheName = 'pwaTeste+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
        './calendar.html',
        './mapa.html',

        
        './Styles/index.css',
        './Styles/calendar.css',
        './Styles/mapa.css',
        
        './mapa.js',
        './calendar.js',
        './Academias.json',
        
        '.Assets/calendar-fill.svg',
        '.Assets/geo-alt-fill.svg',
        '.Assets/grafico.png',
        '.Assets/house-door-fill.svg',
        '.Assets/MapaFitBuddy.png',
        '.Assets/search.svg',
        '.Assets/person-circle.svg',
        '.Assets/marker-icon-2x-red.png',

        '.icons/16.png',
        '.icons/29.png',
        '.icons/32.png',
        '.icons/40.png',
        '.icons/57.png',
        '.icons/58.png',
        '.icons/60.png',
        '.icons/64.png',
        '.icons/80.png',
        '.icons/87.png',
        '.icons/114.png',
        '.icons/120.png',
        '.icons/128.png',
        '.icons/180.png',
        '.icons/256.png',
        '.icons/512.png',
        '.icons/1024.png',
        
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());

  //Atualizacao cache
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );

});