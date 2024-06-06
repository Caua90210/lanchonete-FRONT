export async function getCarrinho(idCliente){
    const url = `http://localhost:8080/v1/lanchonete/carrinho/${idCliente}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data.pedido
}