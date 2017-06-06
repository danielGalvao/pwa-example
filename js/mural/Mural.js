const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = JSON.parse(localStorage.getItem("cartoes"));
    cartoes = cartoes ? cartoes.map(localCartao => new Cartao(localCartao.conteudo, localCartao.tipo)) : []
    cartoes.forEach(cartao => {
      preparaCartao(cartao)
    })
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    Filtro.on("filtrado", render)

    function preparaCartao(cartao) {
      cartao.on("mudanca.**", salvaCartoes)
      cartao.on("remocao", () => {
        cartoes = cartoes.slice(0)
        cartoes.splice(cartoes.indexOf(cartao),1)
        salvaCartoes()
        render()
      })
    }

    function salvaCartoes() {
      localStorage.setItem("cartoes",
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

    function adiciona(cartao){
      if(logado) {
        cartoes.push(cartao)
        salvaCartoes()
        preparaCartao(cartao)
        render()
        return true
      }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
