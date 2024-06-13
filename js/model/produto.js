'use strict'

export async function getProdutos(){
    const url = 'https://lanchonete-backend.onrender.com/v1/lanchonete/produtos'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.produtos
}

export async function getProdutosID(id){
    const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/produto/${id}`
    const response = await fetch(url)
    console.log(response);
    const data = await response.json()
    console.log(data);
    return data.produto[0]
}

export async function createPedido(id_c, id_p, dados) {
    console.log(dados);
    
    const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/pedidos/${id_c}/${id_p}`;
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(dados)
    };
    try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (response.ok) {
            
            if (responseData.status && responseData.status_code === 201 && responseData.pedido.length > 0) {
            
                return responseData.pedido[0].id_pedido;
            } else {
                throw new Error(responseData.message || 'Erro ao criar pedido');
            }
        } else {
            throw new Error('Erro ao criar pedido - status ' + response.status);
        }
    } catch (error) {
        throw new Error('Erro ao enviar solicitação: ' + error.message);
    }
}


export async function addCarrinho(id_pe, id_p, id_c) {
    const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/carrinho/${id_pe}/${id_p}/${id_c}`;
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await fetch(url, options);
        console.log(response);
        if (response.ok) {
            console.log('Item adicionado ao carrinho com sucesso!');
        } else {
            console.error('Falha ao adicionar item ao carrinho.');
        }
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
    }
}

export async function getProdutosPorNome(nome){
    const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/produto/?nome=${nome}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}




