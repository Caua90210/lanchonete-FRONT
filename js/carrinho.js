'use strict'
import { getCarrinho } from "./carrinho1.js"

let id = localStorage.getItem('idCliente')
let c = await getCarrinho(id)
const valorTL = document.getElementById('valor_total')

const continuar = document.getElementById('continuar')

console.log(c);
let valorTotal = 5

for (let index = 0; index < c.length; index++) {
    const element = c[index] 
    valorTotal = valorTotal + element.valor
    valorTL.textContent = valorTotal.toFixed(2) 
}
const desc = document.getElementById('desconto')
desc.addEventListener('click', function () {
    let val = document.getElementById('desc').value
    let perc = val/100
    let desconto = valorTotal * perc
    valorTotal = valorTotal - desconto
    console.log(valorTotal);
    valorTL.textContent = valorTotal.toFixed(2) 
})

function cardProduto(produto) {
    const container = document.getElementById('paiInfos')
    const card = document.createElement('a')
    card.textContent = produto.nome
    card.classList.add('text-base')
    container.append(card)
}

async function preencherProduto() {
    const produtos = await getCarrinho(id);
    produtos.forEach(produto => {
        cardProduto(produto);
    });
}

continuar.addEventListener('click', ()=>{
    window.location.href='../pages/pagamento.html'
})


preencherProduto();