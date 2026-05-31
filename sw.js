/**
 * BLUE AURA - SERVICE WORKER
 * Enables offline support, caching, and PWA install capability
 */

const CACHE_NAME = 'blue-aura-v1.0.1';
const STATIC_CACHE = 'blue-aura-static-v1.0.1';
const DYNAMIC_CACHE = 'blue-aura-dynamic-v1.0.1';

// Core files to cache for offline use
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
];

// ─── Install Event ──────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing Blue Aura PWA...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[ServiceWorker] Caching static assets...');
        // Cache each asset individually to avoid failure if one misses
        return Promise.allSettled(
          STATIC_ASSETS.map(url => cache.add(url).catch(err => {
            console.warn(`[ServiceWorker] Could not cache ${url}:`, err);
          }))
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Static assets cached successfully.');
        return self.skipWaiting();
      })
  );
});

// ─── Activate Event ─────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating Blue Aura PWA...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map(name => {
            console.log('[ServiceWorker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[ServiceWorker] Now controlling all pages.');
      return self.clients.claim();
    })
  );
});

// ─── Fetch Event (Cache-First Strategy) ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Skip API calls — always go to network
  if (url.pathname.includes('/api/')) {
    event.respondWith(fetch(request).catch(() => new Response('Offline', { status: 503 })));
    return;
  }

  const isCritical = request.destination === 'document'
    || request.url.endsWith('/app.js')
    || request.url.endsWith('/styles.css')
    || request.url.endsWith('/index.html');

  if (isCritical) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
            const cloned = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then((cachedResponse) => cachedResponse || caches.match('./index.html')))
    );
    return;
  }

  // Cache-First: serve from cache for other static assets, fall back to network dynamically
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
            const cloned = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
          }
          return networkResponse;
        })
        .catch(() => new Response('Offline content not available.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        }));
    })
  );
});

// ─── Push Notifications (future-ready) ──────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Blue Aura';
  const options = {
    body: data.body || 'You have a new update from Blue Aura.',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || './' },
    actions: [
      { action: 'open', title: 'View Now' },
      { action: 'close', title: 'Dismiss' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || './')
    );
  }
});
