/* FavFI offline cache. Newest copy from the network when online, saved copy when not. */
const CACHE = "favfi-1fcca9136a";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("favfi-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const fresh = fetch(req, { cache: "no-cache" }).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; });
    const timeout = new Promise(r => setTimeout(() => r(null), 3500));
    try {
      const res = await Promise.race([fresh, timeout]);
      if (res) return res;
    } catch (_) {}
    const hit = (await cache.match(req)) || (req.mode === "navigate" ? (await cache.match("./index.html")) || (await cache.match("./")) : null);
    if (hit) return hit;
    return fresh.catch(() => new Response("FavFI is offline and has no saved copy yet. Open it once while online.", { status: 503, headers: { "Content-Type": "text/plain" } }));
  })());
});
