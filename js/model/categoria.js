export async function getCategorias(){
    const url = 'http://localhost:8080/v1/lanchonete/categoria'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.categoria
}

