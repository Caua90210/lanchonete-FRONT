'use strict'

async function getClienteID(id) {
    try {
        const url = `http://localhost:8080/v1/lanchonete/cliente/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('API response:', data);  // Log the full response
        if (data.cliente && data.cliente.length > 0) {
            return data.cliente[0];
        } else {
            throw new Error('Cliente not found or empty response');
        }
    } catch (error) {
        console.error('Error fetching cliente:', error);
        return null;
    }
}

const indice = new URLSearchParams(window.location.search).get('id');
console.log('Fetched ID from URL:', indice);  // Log the fetched ID

const infoCliente = await getClienteID(indice);
console.log('Fetched cliente info:', infoCliente);  // Log the fetched cliente info

if (infoCliente) {
    preencherCampos(infoCliente);
} else {
    console.error('Failed to retrieve cliente information');
    // Handle the case where cliente information couldn't be fetched (e.g., show an error message)
}

function preencherCampos(infoCliente) {
    const nome = document.getElementById('nome');
    nome.value = infoCliente.nome || ''
    const telefone = document.getElementById('telefone');
    telefone.value = infoCliente.telefone || ''
    const senha = document.getElementById('senha');
    senha.value = infoCliente.senha || ''
    const email = document.getElementById('email');
    email.value = infoCliente.email || ''

}
