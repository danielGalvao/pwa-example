const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = pegaCartoesUsuario()
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    Filtro.on("filtrado", render)

    function preparaCartao(cartao) {
      const urlImages = Cartao.pegaImagens(cartao)
      urlImages.forEach(url => {
        fetch(url).then(resp => {
          caches.open('ceep-images').then(cache => {
            cache.put(url, resp)
          })
        })
      })
      cartao.on("mudanca.**", salvaCartoes)
      cartao.on("remocao", () => {
        cartoes = cartoes.slice(0)
        cartoes.splice(cartoes.indexOf(cartao),1)
        salvaCartoes()
        render()
      })
    }

    function pegaCartoesUsuario() {
      let cartoesLocal = JSON.parse(localStorage.getItem(usuario));
      cartoesLocal = cartoesLocal ? cartoesLocal.map(localCartao => new Cartao(localCartao.conteudo, localCartao.tipo)) : []
      cartoesLocal.forEach(cartao => {
        preparaCartao(cartao)
      })
      return cartoesLocal
    }

    function salvaCartoes() {
      localStorage.setItem(usuario,
        JSON.stringify(
          cartoes.map(
            cartao => ({
              conteudo: cartao.conteudo,
              tipo: cartao.tipo
            })
          )
        )
      )
    }

    login.on('login', () => {
      cartoes = pegaCartoesUsuario()
      render()
    })

    login.on('logout', () => {
      cartoes = []
      render()
    })

    function adiciona(cartao){
      if(logado) {
        cartoes.push(cartao)
        salvaCartoes()
        cartao.on('mudanca.**', render)
        preparaCartao(cartao)
        let listaImagens = Cartao.pegaImagens(cartao)

        render()
        return true
      }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
