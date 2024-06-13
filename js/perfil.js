'use strict'

const apagarConta = document.getElementById('apagarConta')
const sairDaConta = document.getElementById('sair')

async function getClienteID(id) {
    try {
        const url = `https://lanchonete-backend.onrender.com/v1/lanchonete/cliente/${id}`;
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
console.log('Fetched ID from URL:', indice);

const infoCliente = await getClienteID(indice);
console.log('Fetched cliente info:', infoCliente); 

if (infoCliente) {
    preencherCampos(infoCliente);
} else {
    console.error('Failed to retrieve cliente information');
    
}

async function deleteCliete(id){
    try{
        await fetch(`https://lanchonete-backend.onrender.com/v1/lanchonete/cliente/${id}`,{
            method: 'DELETE'
        })
        console.log("Cliente excluído com sucesso")
    } catch (error){
        console.error('Erro ao excluir clente: ',error);
    }
}

apagarConta.addEventListener('click', ()=>{
     deleteCliete(infoCliente.id_cliente)
     window.location.href='../login.html'
})

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
const cidade = document.getElementById('cidade')
const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const numero = document.getElementById('numero')
const complemento = document.getElementById('complemento')

 function preencherCamposEndereco(infoCliente){
    const endereco = infoCliente.endereco[0];
    cidade.value = endereco.cidade || '';
    cep.value = endereco.cep || ''
    rua.value = endereco.rua || '';
    bairro.value = endereco.bairro || '';
    numero.value = endereco.numero || '';
    complemento.value = endereco.complemento || ''
 }

 if (infoCliente) {
    preencherCampos(infoCliente);
    preencherCamposEndereco(infoCliente); // Adicione esta linha para preencher os campos de endereço
} else {
    console.error('Failed to retrieve cliente information');
}

sairDaConta.addEventListener('click', ()=>{
    window.location.href='../login.html'
})
 preencherCamposEndereco()
