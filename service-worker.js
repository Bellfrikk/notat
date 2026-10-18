
const CACHE_NAME = 'notat-v1';

const FILER = [
    './',
    './index.html',
    './css.css',
    './manifest.json',
    './hoved.js',
    './service-worker.js',
    './farge.js',
    './henteNotat.js',
    './tegnNotat.js',  
    './lagreNotat.js',
    './slett.js',
    './slåSamanNotat.js',
    './sortereAlfabetisk.js',
    './søk.js',
    './topplinje.js',
    './googlePålogging.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILER))
    );

    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(namn =>
            Promise.all(
                namn
                    .filter(namn => namn !== CACHE_NAME)
                    .map(namn => caches.delete(namn))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(lagra => {
            if (lagra) return lagra;

            return fetch(event.request).then(response => {
                if (response.ok) {
                    const kopi = response.clone();

                    caches.open(CACHE_NAME).then(cache =>
                        cache.put(event.request, kopi)
                    );
                }

                return response;
            });
        })
    );
});
