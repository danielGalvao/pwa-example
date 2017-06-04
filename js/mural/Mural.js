const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = JSON.parse(localStorage.getItem("cartoes")).map(localCartao => new Cartao(localCartao.conteudo, localCartao.tipo)) || []
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    Filtro.on("filtrado", render)

    function adiciona(cartao){
      if(logado) {
        cartoes.push(cartao)
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
        cartao.on("mudanca.**", render)
        cartao.on("remocao", () => {
          cartoes = cartoes.slice(0)
          cartoes.splice(cartoes.indexOf(cartao),1)
          render()
        })
        render()
        return true
      }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
