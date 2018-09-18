// Asignar un Nombre a la Versión de la Caché
const CACHE_NAME = 'v1_cache_jorge_cortes_pwa';

// Ficheros que se van a ir cargando en la caché

var urlsToCache = [
    './',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png'
];

// Evento Install *****************************************************************

// self -> es la variable que sirve para invocawr el ServiceWorker

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => {
                console.log(err);
            })
    );
});

// Evento Activate *****************************************************************

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf === -1) {
                            // Aquí Borramos los datos del Caché que no se encuentren
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim(); // Activa la Caché
            })
    );
});

// Evento Fetch *****************************************************************

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //devolvemos los datos de la caché
                    return res;
                }

                return fetch(e.request);
            })
    );
});