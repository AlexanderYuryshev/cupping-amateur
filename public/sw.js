const CACHE_NAME = 'coffee-cupping-v1'
const STATIC_CACHE = [
  '/',
  '/history',
  '/session',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const request = event.request
  const url = new URL(request.url)

  // Handle session pages with query parameters
  if (url.pathname === '/session' && url.searchParams.has('id')) {
    event.respondWith(
      caches.match('/session').then((cachedSessionPage) => {
        if (cachedSessionPage) {
          return cachedSessionPage
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/session', responseToCache)
            })
          }
          return response
        }).catch(() => {
          return caches.match('/')
        })
      })
    )
    return
  }

  // Default caching strategy
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      }).catch(() => {
        // For navigation requests, fallback to cached homepage
        if (request.mode === 'navigate') {
          return caches.match('/')
        }
        return response
      })
    })
  )
})
