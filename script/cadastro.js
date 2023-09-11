// Importe as configurações do Firebase e o Realtime Database aqui
import { app } from "./bd.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Função para gerar IDs únicos no formato "item-xxxxxx"
function generateUniqueId() {
    const randomPart = Math.random().toString(36).substring(2, 8);
    const uniqueId = `item-${randomPart}`;
    return uniqueId;
}

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
    const itemForm = document.getElementById("itemForm");
    const generateIdButton = document.getElementById("generateIdButton");
    const itemIdInput = document.getElementById("itemId");

    generateIdButton.addEventListener("click", () => {
        // Gere um novo ID único
        const itemId = generateUniqueId();

        // Preencha o campo de ID e desabilite-o
        itemIdInput.value = itemId;
    });

    itemForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const itemName = document.getElementById("itemName").value;
        const itemQuantity = document.getElementById("itemQuantity").value;
        const itemBrand = document.getElementById("itemBrand").value;
        const itemCondition = document.getElementById("itemCondition").value;
        const itemId = itemIdInput.value;

        // Verifique se o campo de ID está preenchido
        if (!itemId) {
            showModal("Por favor, gere um ID antes de enviar o formulário.");
            return;
        }

        // Conecte-se ao banco de dados e armazene os dados
        const db = getDatabase(app);
        const itemsRef = ref(db, "itens");
        const newItemRef = push(itemsRef);

        // Crie um objeto com os dados do item
        const newItem = {
            nome: itemName,
            id: itemId, // Use o valor gerado
            quantidade: itemQuantity,
            marca: itemBrand,
            estado: itemCondition
        };

        // Envie os dados para o banco de dados
        await set(newItemRef, newItem);

        // Limpe o formulário após o cadastro
        itemForm.reset();

        // Mostre uma mensagem de sucesso na caixa de diálogo modal
        showModal("Item cadastrado com sucesso!");
    });
});

// Adicione um ouvinte de evento ao botão "OK" na caixa de diálogo modal para escondê-lo
document.getElementById("modal-okay").addEventListener("click", hideModal);
