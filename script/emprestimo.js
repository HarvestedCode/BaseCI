// Importe as configurações do Firebase e o Realtime Database aqui
import { app } from "./bd.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
    const loanForm = document.getElementById("loanForm");

    loanForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const borrowerName = document.getElementById("borrowerName").value;
        const loanedItem = document.getElementById("loanedItem").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const department = document.getElementById("department").value;
        const loanDate = document.getElementById("loanDate").value;

        // Conecte-se ao banco de dados e armazene os dados
        const db = getDatabase(app);
        const loansRef = ref(db, "emprestimos");
        const newLoanRef = push(loansRef);

        // Crie um objeto com os dados do empréstimo
        const newLoan = {
            nomePessoa: borrowerName,
            itemEmprestado: loanedItem,
            numeroPessoa: phoneNumber,
            setor: department,
            dataEmprestimo: loanDate
        };

        // Envie os dados para o banco de dados
        set(newLoanRef, newLoan);

        // Limpe o formulário após o cadastro
        loanForm.reset();
    });
});
