'use strict'

import {getProdutosID} from "./model/produto.js"

const indice = new URLSearchParams(window.location.search).get('id');

const infoProduto = await getProdutosID(indice)
console.log(infoProduto)

const comprar = document.getElementById('comprar')

function preencherCampos(produto){
    const nome = document.getElementById('nome')
    nome.textContent = produto.nome
    const foto = document.getElementById('foto')
    foto.src = produto.foto
    const valor = document.getElementById('valor')
    valor.textContent = `R$ ${parseFloat(produto.valor).toFixed(2)}`
    const infosPai = document.getElementById('infor')
    
    const ingred = produto.ingrediente

    for (let index = 0; index < ingred.length; index++) {
        const element = ingred[index];
        const ingrediente = document.createElement('a')
        ingrediente.href = 
        ingrediente.textContent = element.nome
        infosPai.append(ingrediente)
        ingrediente.addEventListener('click', function() {
            localStorage.setItem('idIngrediente', element.id_ingrediente)
        })
        ingrediente.classList.add( 'flex', 'flex-col')
    }  
    
    }

    comprar.addEventListener('click', ()=>{
        window.location.href='./carrinho.html'
    })

preencherCampos(infoProduto)

