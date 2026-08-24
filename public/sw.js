/// <reference types="vite-plugin-pwa/client" />

const CACHE_NAME = 'cicmelinst-v2.6.1';
const STATIC_CACHE = 'cicmelinst-static-v2.6.1';
const DYNAMIC_CACHE = 'cicmelinst-dynamic-v2.6.1';
const IMAGE_CACHE = 'cicmelinst-images-v2.6.1';

const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/logo.png',
  '/index.html',
];

const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: ['/assets/', '/draco/', '/models/'],
  // Network first for API/data
  networkFirst: ['/api/'],
  // Stale while revalidate for images
  staleWhileRevalidate: ['/images/', '/logos/'],
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - handle requests with appropriate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Determine cache strategy
  let strategy = 'networkFirst';

  if (CACHE_STRATEGIES.static.some(path => url.pathname.startsWith(path))) {
    strategy = 'cacheFirst';
  } else if (CACHE_STRATEGIES.networkFirst.some(path => url.pathname.startsWith(path))) {
    strategy = 'networkFirst';
  } else if (CACHE_STRATEGIES.staleWhileRevalidate.some(path => url.pathname.startsWith(path))) {
    strategy = 'staleWhileRevalidate';
  }

  event.respondWith(handleRequest(request, strategy));
});

async function handleRequest(request, strategy) {
  const url = new URL(request.url);

  switch (strategy) {
    case 'cacheFirst':
      return cacheFirst(request);
    case 'networkFirst':
      return networkFirst(request);
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request);
    default:
      return networkFirst(request);
  }
}

// Cache First - ideal for static assets
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    // Update cache in background
    fetch(request).then(response => {
      if (response.ok) cache.put(request, response.clone());
    }).catch(() => {});
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Network First - ideal for API/data
async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: 'Offline', cached: false }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Stale While Revalidate - ideal for images
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}

// Handle background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'work-order-submit') {
    event.waitUntil(syncWorkOrders());
  }
});

async function syncWorkOrders() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();

  for (const request of requests) {
    if (request.url.includes('/api/contact') && request.method === 'POST') {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch {
        // Will retry on next sync
      }
    }
  }
}

// Handle push notifications (future)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Nueva notificación de CICMELINST',
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [200, 100, 200],
    data: data.url || '/',
    actions: [
      { action: 'view', title: 'Ver' },
      { action: 'dismiss', title: 'Descartar' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'CICMELINST', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === event.notification.data && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(event.notification.data || '/');
      })
    );
  }
});

// Periodic background sync for cache updates (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCaches());
  }
});

async function updateCaches() {
  const cache = await caches.open(STATIC_CACHE);
  for (const asset of STATIC_ASSETS) {
    try {
      const response = await fetch(asset);
      if (response.ok) await cache.put(asset, response);
    } catch {
      // Ignore failed updates
    }
  }
}

console.log('[SW] CICMELINST Service Worker v2.6.1 loaded');