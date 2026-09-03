// =========================================================================
// SERVICE WORKER - SISTEM ABSENSI KUTUBUTTURATS MA'HAD AL-AQSHA
// Cache-First Static Strategy & Offline Queue Handling Engine
// =========================================================================

const CACHE_VERSION = 'kutubutturats-cache-v2';
const DYNAMIC_CACHE = 'kutubutturats-dynamic-v2';

// Static App Shell & Core Assets to Cache on Installation
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Install Event: Pre-cache static assets with resilience
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      console.log('[SW] Pre-caching static assets for Offline-First capability...');
      // Use map with catch so one failing CDN does not fail the entire SW install
      const cachePromises = STATIC_ASSETS.map(async (url) => {
        try {
          const response = await fetch(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' });
          if (response && response.ok) {
            await cache.put(url, response);
          }
        } catch (err) {
          console.warn('[SW] Could not pre-cache asset:', url, err);
        }
      });
      await Promise.all(cachePromises);
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting obsolete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Implement Cache-First strategy for static assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Exclude non-GET requests and external API calls (e.g., Google Apps Script) from cache-first handling
  if (req.method !== 'GET' || url.hostname.includes('script.google.com') || url.hostname.includes('script.googleusercontent.com')) {
    return;
  }

  // Cache-First Strategy with Background Update (Stale-While-Revalidate / Cache-First)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch background update for cache freshness if online
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(req, networkResponse.clone());
            });
          }
        }).catch(() => {
          // Network offline, serving cached version
        });
        return cachedResponse;
      }

      // Not in cache: fetch from network and store in dynamic cache
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(req, responseClone);
        });

        return networkResponse;
      }).catch(async (error) => {
        console.warn('[SW] Fetch failed, serving offline fallback if available for:', req.url, error);
        
        // Navigation fallback to index.html if offline
        if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
          const fallback = await caches.match('./index.html') || await caches.match('./');
          if (fallback) return fallback;
        }

        return new Response('Mode Offline Aktif. Konten tidak tersedia di memori cache.', {
          status: 503,
          statusText: 'Service Unavailable (Offline)',
          headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
        });
      });
    })
  );
});

// Message listener for manual cache invalidation or queue sync triggers
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
