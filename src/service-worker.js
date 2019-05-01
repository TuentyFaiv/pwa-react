/**
 * The worboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
*/

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute('/index.html')

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET'  
);

workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/images\/.*/,
  new workbox.strategies.CacheFirst({
    cachename: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 20
      })
    ]
  }),
  'GET'  
);

workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  new workbox.strategies.CacheFirst({
    cachename: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60
      })
    ]
  }),
  'GET'
);

//Por defecto. Va al final de todo
workbox.routing.registerRoute(/^https?.*/, new workbox.strategies.NetworkFirst(), 'GET')