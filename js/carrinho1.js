export async function getCarrinho(idCliente){
    const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/carrinho/${idCliente}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data.pedido
}