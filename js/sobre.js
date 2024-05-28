'use strict'

import {getProdutosID} from "./model/produto.js"

const indice = new URLSearchParams(window.location.search).get('id');

const infoProduto = await getProdutosID(indice)
console.log(infoProduto)

function preencherCampos(produto){
    const nome = document.getElementById('nome')
    nome.textContent = produto.nome
    const foto = document.getElementById('foto')
    foto.src = produto.foto
    const valor = document.getElementById('valor')
    valor.textContent = produto.valor
}


preencherCampos(infoProduto)

