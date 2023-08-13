const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
// estou transformando o que era string em array de novo
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    // todo formulario, por padrão, envia os dados para algum lugar . então, uso o preventdefault para impedir esse envio
    // evento é o parâmetro que corresponde aos dados que seriam enviados
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    //    criando umobjeto
   const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
   }

   if (existe) {
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

   } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

    criaElemento(itemAtual)

    itens.push (itemAtual)
   }

//    ("nome da chave", item)
// JSON.stringify(itemAtual) transformando o objeto em string
   localStorage.setItem("itens", JSON.stringify(itens))

    // esvazia a caixa depois de adicionar um item na mochila
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
  
    // cria um novo elemento li com class "item"
    // não é para usar inner html e sim o appendChild para que um elemento seja criado dentrodo outro (strong dentro do li)
    // <li class="item"><strong>7</strong>Camisas</li>
   const novoItem = document.createElement("li")
   novoItem.classList.add("item")

   const numeroItem = document.createElement("strong")
   //item é um objeto e acessa o objeto item na posição quantidade
   numeroItem.innerHTML = item.quantidade
//    usando dataAtributte
   numeroItem.dataset.id = item.id

   novoItem.appendChild(numeroItem)
   novoItem.innerHTML += item.nome

   novoItem.appendChild(botaoDeleta(item.id))

//    faz com que o novo item seja adicionado vizualmente a lista
   lista.appendChild(novoItem)

}

function atualizaElemento(item) {
    document.querySelector ("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag,id) {
    tag.remove()

    // (oque queremos remover, posicao)
    itens.splice(itens.findIndex(elemento => elemento.id ===id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))

}