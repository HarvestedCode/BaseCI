// Importe as configurações do Firebase e o Realtime Database aqui
import { app, db } from "./bd.js";
import { get, ref, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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

document.addEventListener("DOMContentLoaded", () => {
    const loanList = document.getElementById("loanList");

    // Função para carregar e exibir a lista de empréstimos
    const loadLoanList = () => {
        const loansRef = ref(db, "emprestimos");
        get(loansRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const loans = snapshot.val();
                    loanList.innerHTML = "";

                    for (const loanId in loans) {
                        if (loans.hasOwnProperty(loanId)) {
                            const loan = loans[loanId];
                            const listItem = document.createElement("li");
                            listItem.classList.add("loan-item");

                            // Crie um botão de expansão
                            const expandButton = document.createElement("button");
                            expandButton.textContent = "▼";
                            expandButton.className = "expand-button";
                            listItem.appendChild(expandButton);

                            // Crie um contêiner para os detalhes adicionais
                            const detailsContainer = document.createElement("div");
                            detailsContainer.className = "details-container";
                            detailsContainer.style.display = "none";

                            // Adicione todos os detalhes do item ao contêiner de detalhes, incluindo a quantidade
                            detailsContainer.innerHTML = `
                                <p>Nome da Pessoa: ${loan.nomePessoa}</p>
                                <p>Item Emprestado: ${loan.itemEmprestado}</p>
                                <p>Quantidade: ${loan.quantidade}</p> <!-- Exibe a quantidade emprestada -->
                                <p>Número da Pessoa: ${loan.numeroPessoa}</p>
                                <p>Setor: ${loan.setor}</p>
                                <p>Data do Empréstimo: ${loan.dataEmprestimo}</p>
                            `;

                            // Botão para excluir o empréstimo
                            const deleteButton = document.createElement("button");
                            deleteButton.textContent = "Excluir";
                            deleteButton.className = "delete-button";
                            deleteButton.setAttribute("data-loan-id", loanId);
                            detailsContainer.appendChild(deleteButton);

                            // Adicione o botão de expansão e o contêiner de detalhes ao item da lista
                            listItem.appendChild(document.createTextNode(loan.nomePessoa));
                            listItem.appendChild(expandButton);
                            listItem.appendChild(detailsContainer);

                            // Adicione um evento de clique ao botão de expansão
                            expandButton.addEventListener("click", () => {
                                detailsContainer.style.display = detailsContainer.style.display === "none" ? "block" : "none";
                            });

                            // Adicionar um evento de clique ao botão de exclusão
                            deleteButton.addEventListener("click", (e) => {
                                const loanIdToDelete = e.target.getAttribute("data-loan-id");
                                const loanRefToDelete = ref(db, `emprestimos/${loanIdToDelete}`);

                                // Remova o elemento HTML da lista de empréstimos
                                loanList.removeChild(listItem);

                                // Remova o empréstimo do banco de dados
                                remove(loanRefToDelete);
                            });

                            loanList.appendChild(listItem);
                        }
                    }
                } else {
                    loanList.innerHTML = "<li>Nenhum empréstimo encontrado.</li>";
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar empréstimos: ", error);
            });
    };

    // Chame a função para carregar a lista de empréstimos
    loadLoanList();

    // Adicione um ouvinte de evento ao botão "OK" na caixa de diálogo modal para escondê-lo
    document.getElementById("modal-okay").addEventListener("click", hideModal);
});
