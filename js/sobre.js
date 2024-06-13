'use strict'

import {getProdutosID, createPedido, addCarrinho} from "./model/produto.js"
// import { getCarrinho } from "./carrinho1.js"

const indice = new URLSearchParams(window.location.search).get('id');

// const infoPedido = await getCarrinho()
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

comprar.addEventListener('click', async () => {
        try {
            let idC = localStorage.getItem('idCliente')
            let ue = parseInt(idC)

            
            // const idPedido = infoPedido[0].id_pedido
            const idProduto = parseInt(infoProduto.id_produto)


            const idCliente = idC;    
            const dataPedido = "2024-06-11";
            const tempoEntrega = "00:20:00";
            const taxaEntrega = 20;
    

               
            

           let idPossivel = await createPedido(idCliente, idProduto, {
                data_pedido: dataPedido,
                tempo_entrega: tempoEntrega,
                taxa_entrega: taxaEntrega
            })
            let idPedido = parseInt(idPossivel)
            console.log(idPossivel);
            
            await addCarrinho(idPedido, idProduto, ue);
            
            console.log(addCarrinho)
            
            window.location.href = './home.html'
        } catch (error) {
            console.error('Erro ao comprar:', error)
        }
    });

preencherCampos(infoProduto)     

