export async function getCategorias(){
    const url = 'https://lanchonete-backend.onrender.com/v1/lanchonete/categoria'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.categoria
}

