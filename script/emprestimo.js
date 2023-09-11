// Importe as configurações do Firebase e o Realtime Database aqui
import { app, db } from "./bd.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
    const loanForm = document.getElementById("loanForm");
    const loanedItemSelect = document.getElementById("loanedItem");

    // Função para carregar e exibir a lista de nomes dos itens
    const loadItemList = () => {
        const itemsRef = ref(db, "itens");
        get(itemsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const items = snapshot.val();

                // Limpe a lista suspensa existente
                loanedItemSelect.innerHTML = "";

                // Preencha o select com os nomes dos itens
                for (const itemId in items) {
                    if (items.hasOwnProperty(itemId)) {
                        const itemName = items[itemId].nome;
                        const option = document.createElement("option");
                        option.value = itemName;
                        option.textContent = itemName;
                        loanedItemSelect.appendChild(option);
                    }
                }
            }
        }).catch((error) => {
            console.error("Erro ao carregar itens: ", error);
        });
    };

    // Chame a função para carregar a lista de itens
    loadItemList();

    loanForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const borrowerName = document.getElementById("borrowerName").value;
        const loanedItem = loanedItemSelect.value;
        const quantity = document.getElementById("quantity").value; // Obtenha a quantidade
        const phoneNumber = document.getElementById("phoneNumber").value;
        const department = document.getElementById("department").value;
        const loanDate = document.getElementById("loanDate").value;

        // Conecte-se ao banco de dados e armazene os dados
        const db = getDatabase(app);
        const loansRef = ref(db, "emprestimos");
        const newLoanRef = push(loansRef);

        // Crie um objeto com os dados do empréstimo, incluindo a quantidade
        const newLoan = {
            nomePessoa: borrowerName,
            itemEmprestado: loanedItem,
            quantidade: quantity, // Adicione a quantidade aqui
            numeroPessoa: phoneNumber,
            setor: department,
            dataEmprestimo: loanDate
        };

        // Envie os dados para o banco de dados
        await set(newLoanRef, newLoan);

        // Limpe o formulário após o cadastro
        loanForm.reset();

        // Mostre uma mensagem de sucesso na caixa de diálogo modal
        showModal("Empréstimo cadastrado com sucesso!");
    });
});

// Adicione um ouvinte de evento ao botão "OK" na caixa de diálogo modal para escondê-lo
document.getElementById("modal-okay").addEventListener("click", hideModal);
