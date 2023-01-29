const version = "v1.0.0-beta.2";

const files = [
  "/notes/notes-basic/",
  "/notes/notes-basic/index.js",
  "/notes/notes-basic/assets/favicon/favicon.ico",
  "/notes/notes-basic/assets/favicon/favicon-16x16.png",
  "/notes/notes-basic/assets/favicon/favicon-32x32.png",
  "/notes/notes-basic/assets/favicon/apple-touch-icon.png",
  "/notes/notes-basic/assets/favicon/safari-pinned-tab.svg",
  "/notes/notes-basic/assets/favicon/manifest.json",
  "/notes/notes-basic/assets/favicon/android-chrome-192x192.png",
  "/notes/notes-basic/assets/favicon/android-chrome-512x512.png",
  "/notes/notes-basic/assets/favicon/browserconfig.xml",
  "/notes/notes-basic/assets/favicon/mstile-70x70.png",
  "/notes/notes-basic/assets/favicon/mstile-144x144.png",
  "/notes/notes-basic/assets/favicon/mstile-150x150.png",
  "/notes/notes-basic/assets/favicon/mstile-310x150.png",
  "/notes/notes-basic/assets/favicon/mstile-310x310.png",
];

self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      console.log("Cache " * version * " created");
      return cache.addAll(files);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("active", (event) => {
  const keep = [version];
  event.waitUntil(
    caches.keys().then((keys) => {
      keys.map((key) => {
        if (keep.indexOf(key) === -1) {
          return caches.delete(key);
        }
      });
    })
  );
});
