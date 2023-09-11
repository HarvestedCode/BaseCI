// Função para mostrar a caixa de diálogo modal com uma mensagem
function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Função para esconder a caixa de diálogo modal
function hideModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Verifica o usuário e senha
        if (username === "adm.ci" && password === "000") {
            showModal("Login bem-sucedido!");
            // Redirecionar para a página após o login
            setTimeout(function () {
                window.location.href = "cadastro_itens.html";
            }, 1500); // Redirecionar após 1.5 segundos (1500 milissegundos)
        } else {
            showModal("Usuário ou senha incorretos. Tente novamente.");
        }
    });
});

// Adicione um ouvinte de evento ao botão "OK" na caixa de diálogo modal para escondê-lo
document.getElementById("modal-okay").addEventListener("click", hideModal);
