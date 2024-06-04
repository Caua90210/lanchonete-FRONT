
 'use strict'

 
 async function postClient(cliente){
   const url = 'http://localhost:8080/v1/lanchonete/cliente'
   const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(cliente)
   }
 
   const response = await fetch(url, options)
 
   return response.ok
 }
 
 // Import das tags do HTML pelo ID
 const nome = document.getElementById('nome')
 const email = document.getElementById('email')
 const telefone = document.getElementById('telefone')
 const senha = document.getElementById('senha')
 const cadastrar =  document.getElementById('cadastrar')
 console.log(cadastrar);
 
 cadastrar.addEventListener('click', async () => {
   const nomeInput = nome.value
   const emailInput = email.value
   const telefoneInput = telefone.value
   const senhaInput = senha.value
   
   // Verificar se os campos estão preenchidos
   if (!nomeInput || !emailInput || !telefoneInput || !senhaInput) {
       alert('Por favor, preencha todos os campos.')
       return
   }
   
   const insert ={
       nome: nomeInput,
       email: emailInput,
       telefone: telefoneInput,
       senha: senhaInput
   }
 
   const success = await postClient(insert)
   if (success) {
       console.log('Cliente cadastrado com sucesso!')
       window.location.href = '../login.html'
   } else {
       console.error('Falha ao cadastrar o cliente.')
   }
 })