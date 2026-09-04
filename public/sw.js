// Service Worker for The Fat Bone Butcher PWA
const CACHE_NAME = 'fatbone-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-32.png',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.svg',
  '/about',
  '/products',
  '/contact',
  '/blog'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('PWA Precache partial fail:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests or browser extension/external analytics
  if (request.method !== 'GET') return;

  // Handle same-origin or google fonts assets
  const isSameOrigin = url.origin === location.origin;
  const isGoogleFont = url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com');

  if (isSameOrigin || isGoogleFont) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Stale-While-Revalidate
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
