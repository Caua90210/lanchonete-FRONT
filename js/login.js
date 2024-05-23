function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Formar a URL da API
    var url = "http://localhost:8080/v1/lanchonete/cliente";

    // Realizar a solicitação HTTP
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Verificar se o email e senha correspondem a algum usuário na API
        var cliente = data.cliente.find(user => user.email === email && user.senha === senha);
        if (cliente) {
            // Redirecionar para outra página após o login ser bem-sucedido
            window.location.href = "./outra_pagina.html";
        } else {
            alert("Email ou senha incorretos");
        }
    })
    .catch(error => console.error('Erro ao fazer login:', error));
}