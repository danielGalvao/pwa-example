self.addEventListener('fetch', function(event) {
  let pedido = event.request
  let promiseResp = caches.open('ceep-images').then(cache => {
    return cache.match(pedido)
  }).then(resp => {
    return resp
  })

  event.respondWith(promiseResp)
})