document.addEventListener("DOMContentLoaded", () => {
    const navbarIcon = document.querySelector(".navbar-icon");
    const navbar = document.querySelector(".navbar");

    // Adicione um ouvinte de evento de clique ao ícone da navbar
    navbarIcon.addEventListener("click", () => {
        // Alterne a classe "show" na navbar para mostrá-la ou ocultá-la
        navbar.classList.toggle("show");
    });
});