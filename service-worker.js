const CACHE_NAME = 'bp3mi-welder-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './BP3MI.png',
    './icon-32.png',
    './icon-72.png',
    './icon-96.png',
    './icon-128.png',
    './icon-144.png',
    './icon-152.png',
    './apple-touch-icon.png',
    './icon-192.png',
    './icon-384.png',
    './icon-512.png',
    './icon-maskable-512.png',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap'
];

// Install Event - Pre-cache essential resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching offline assets v3');
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                console.warn('[Service Worker] Pre-caching warning:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Network first for HTML documents, Cache first for static assets
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const isHTML = event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html');

    if (isHTML) {
        // Network First for HTML to ensure latest 100 questions are loaded immediately
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(event.request).then((cached) => cached || caches.match('./index.html'));
                })
        );
        return;
    }

    // Cache First for static media / fonts
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            });
        })
    );
});
