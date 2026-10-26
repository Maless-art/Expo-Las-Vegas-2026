const CACHE_NAME="luquisa-expo-v0.8.1";
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('luquisa-expo-')&&k!==CACHE_NAME)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME);
  try{const response=await fetch(e.request);if(response.ok){try{await cache.put(e.request,response.clone())}catch(err){console.warn('Cache write:',err)}}return response}
  catch(err){const cached=await cache.match(e.request);if(cached)return cached;if(e.request.mode==='navigate'){const home=await cache.match('./index.html');if(home)return home}throw err}
 })());
});
