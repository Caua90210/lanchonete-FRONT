'use strict'

export async function getProdutos(){
    const url = 'http://localhost:8080/v1/lanchonete/produtos'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.produtos
}

export async function getProdutosID(id){
    const url = `http://localhost:8080/v1/lanchonete/produto/${id}`
    const response = await fetch(url)
    console.log(response);
    const data = await response.json()
    console.log(data);
    return data.produto[0]
}