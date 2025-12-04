document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const matriculaInput = document.getElementById("matricula");
    const senhaInput = document.getElementById("senha");

    form.addEventListener("submit", function (event) {

        const matricula = matriculaInput.value.trim();
        const senha = senhaInput.value.trim();

        if (matricula === "" || senha === "") {
            event.preventDefault();
            alert("Preencha matrícula e senha!");
            return;
        }

        // Sempre envia para /login
        form.action = "/login";
    });
});