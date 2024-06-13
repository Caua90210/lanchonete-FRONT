'use strict';

import { getProdutos, getProdutosPorNome } from "./model/produto.js";
import { getCategorias } from "./model/categoria.js";

let id = localStorage.getItem('idCliente')
console.log(id);

export async function getCliente(){
    const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/cliente/`
    const response = await fetch(url)
    const data = await response.json()
    return data.cliente
}

console.table(await getCategorias());

const container = document.getElementById('container');
const categoriaContainer = document.getElementById('categorias');
const perfil  = document.getElementById('perfil')
const carrinho = document.getElementById('carrinho')
const search = document.getElementById('search')

function cardCategorias(categoria) {
    const card = document.createElement('div');
    card.classList.add('gap-4'); 
    const nome = document.createElement('h1');
    nome.textContent = categoria.nome;
    card.appendChild(nome); 
    categoriaContainer.appendChild(card);
}

function criarCard(produto) {
    container.classList.add('grid', 'grid-cols-4', 'gap-6', 'px-10', 'justify-center');
    const card = document.createElement('div');
    card.classList.add('flex', 'flex-col', 'bg-white', 'rounded-lg', 'shadow-lg', 'mb-28', 'transform', 'transition', 'hover:scale-105', 'duration-300', 'max-w-sm', 'mx-auto', 'border-2', 'border-[#60AC25]', 'h-96');
    const nome = document.createElement('h2');
    nome.textContent = produto.nome;
    nome.classList.add('text-3xl', 'font-bold', 'text-gray-900', 'mb-2', 'text-center', 'font-fontPrincipal');
    const valor = document.createElement('p');
    valor.textContent = `R$ ${produto.valor.toFixed(2)}`;
    valor.classList.add('text-end','font-bold' , 'mb-4', 'mr-4', 'text-[#60AC25]', 'text-2xl', 'font-fontPrincipal');
    const foto = document.createElement('img');
    foto.src = produto.foto;
    foto.classList.add('w-96', 'h-full', 'bg-cover', 'rounded-lg', 'mb-2');
    card.append(foto, nome, valor);
    container.appendChild(card);
    card.addEventListener('click',()=> {
        window.location.href='./sobre.html?id='+produto.id_produto
    })
}

perfil.addEventListener('click', ()=>{
    let id = localStorage.getItem('idCliente')
    console.log(id);
    window.location.href='./perfil.html?id='+id
} )

carrinho.addEventListener('click', ()=>{
    let id = localStorage.getItem('idCliente')
    window.location.href='./carrinho.html?id='+id
})

async function preencherContainer() {
    const produtos = await getProdutos();
    produtos.forEach(produto => {
        criarCard(produto);
    });
}

async function preencherContainerCategoria() {
    const categorias = await getCategorias();
    categorias.forEach(categoria => {
        cardCategorias(categoria);
    });
}




async function pesquisar(){
    try {
        const nomeProduto = await getProdutosPorNome(search.value)
        console.log('Produtos encontrados:', nomeProduto)
        const listaProdutos = nomeProduto.produto
        apagarListaProdutos();

        if (listaProdutos && listaProdutos.length > 0) {
            listaProdutos.forEach(produto => {
                console.log('Produto:', produto)
                criarCard(produto);
            });
        } else {
            console.log('Nenhum produto encontrado.')
        }
    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error)
    }
}

search.addEventListener('keydown', (event)=>{
    if(event.key === "Enter"){
        event.preventDefault(); 
        pesquisar();
    }
})

function apagarListaProdutos(){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}



preencherContainer();
preencherContainerCategoria();
