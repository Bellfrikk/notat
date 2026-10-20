
const CACHE_NAME = 'notat-v5';

const FILER = [
    './',
    './index.html',
    './css.css',
    './manifest.json',
    './service-worker.js',
    './app/hoved.js',
    './app/farge.js',
    './app/henteNotat.js',
    './app/tegnNotat.js',  
    './app/lagreNotat.js',
    './app/slett.js',
    './app/slåSamanNotat.js',
    './app/sortereAlfabetisk.js',
    './app/søk.js',
    './app/topplinje.js',
    './app/googlePålogging.js',
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

    // HTML og CSS: prøv serveren først
    if (
        event.request.mode === 'navigate' ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.html')
    ) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        const kopi = response.clone();

                        caches.open(CACHE_NAME).then(cache =>
                            cache.put(event.request, kopi)
                        );
                    }

                    return response;
                })
                .catch(() => caches.match(event.request))
        );

        return;
    }

    // Andre filer: bruk cache først
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