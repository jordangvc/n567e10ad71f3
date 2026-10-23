const C='ember-v10-inline',F=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);if(q.method!=='GET'||u.origin!==location.origin)return;
const net=q.mode==='navigate'||/(\/|\.html|\.js|\.css)$/.test(u.pathname);
if(net){e.respondWith(fetch(q,{cache:'no-store'}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(q.mode==='navigate'?'./index.html':q,c))}return r}).catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));return}
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q)))});
