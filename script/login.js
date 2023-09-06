// login.js

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Verifica o usuário e senha
        if (username === "adm.ci" && password === "000") {
            alert("Login bem-sucedido!");
            // Redirecionar para a página após o login
            window.location.href = "cadastro_itens.html";
        } else {
            alert("Usuário ou senha incorretos. Tente novamente.");
        }
    });
});
