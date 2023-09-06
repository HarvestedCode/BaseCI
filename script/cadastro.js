// Importe as configurações do Firebase e o Realtime Database aqui
import { app } from "./bd.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("itemForm");

    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const itemName = document.getElementById("itemName").value;
        const itemId = document.getElementById("itemId").value;
        const itemQuantity = document.getElementById("itemQuantity").value;
        const itemBrand = document.getElementById("itemBrand").value;
        const itemCondition = document.getElementById("itemCondition").value;

        // Conecte-se ao banco de dados e armazene os dados
        const db = getDatabase(app);
        const itemsRef = ref(db, "itens");
        const newItemRef = push(itemsRef);

        // Crie um objeto com os dados do item
        const newItem = {
            nome: itemName,
            id: itemId,
            quantidade: itemQuantity,
            marca: itemBrand,
            estado: itemCondition
        };

        // Envie os dados para o banco de dados
        set(newItemRef, newItem);

        // Limpe o formulário após o cadastro
        itemForm.reset();
    });
});
