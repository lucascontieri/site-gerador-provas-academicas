// Seletores
const formCoordenador = document.querySelector("#formCoordenador");
const nomeCoordenador = document.querySelector("#nomeCoordenador");
const emailCoordenador = document.querySelector("#emailCoordenador");
const matriCoordenador = document.querySelector("#matriCoordenador");
const senhaCoordenador = document.querySelector("#senhaCoordenador");

// ==================================================
// Salvar Coordenador
// ==================================================
function salvarCoordenador() {
    const dto = {
        nomeCoordenador: nomeCoordenador.value,
        emailCoordenador: emailCoordenador.value,
        matriCoordenador: matriCoordenador.value,
        senhaCoordenador: senhaCoordenador.value
    };

    fetch("http://localhost:8080/coordenador/salvar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dto)
    })
    .then(res => res.json())
    .then(() => {
        alert("Coordenador salvo com sucesso!");
        listarCoordenadores();
        formCoordenador.reset();
    });
}

// ==================================================
// Listar Coordenadores
// ==================================================
function listarCoordenadores() {
    fetch("http://localhost:8080/coordenador/list")
        .then(res => res.json())
        .then(lista => {
            const tbody = document.querySelector("#tableCoordenador tbody");
            tbody.innerHTML = "";

            lista.forEach(c => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${c.idCoordenador}</td>
                    <td>${c.nomeCoordenador}</td>
                    <td>${c.emailCoordenador}</td>
                    <td>${c.matriCoordenador}</td>
                    <td>
                        <button class="btn-editar" data-id="${c.idCoordenador}">Editar</button>
                        <button class="btn-excluir" data-id="${c.idCoordenador}">Excluir</button>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        });
}

// ==================================================
// Excluir Coordenador
// ==================================================
document.addEventListener("click", e => {
    if (e.target.classList.contains("btn-excluir")) {
        const id = e.target.dataset.id;

        if (confirm("Deseja excluir este coordenador?")) {
            fetch(`http://localhost:8080/coordenador/excluir/${id}`, { method: "DELETE" })
                .then(() => listarCoordenadores());
        }
    }
});

// ==================================================
// Abrir modal de edição
// ==================================================
document.addEventListener("click", e => {
    if (e.target.classList.contains("btn-editar")) {
        const id = e.target.dataset.id;

        fetch(`http://localhost:8080/coordenador/${id}`)
            .then(res => res.json())
            .then(c => {
                document.querySelector("#editIdCoordenador").value = c.idCoordenador;
                document.querySelector("#editNomeCoordenador").value = c.nomeCoordenador;
                document.querySelector("#editEmailCoordenador").value = c.emailCoordenador;
                document.querySelector("#editMatriCoordenador").value = c.matriCoordenador;
                document.querySelector("#editSenhaCoordenador").value = c.senhaCoordenador;

                document.querySelector("#modalEditar").style.display = "flex";
            });
    }
});

// ==================================================
// Atualizar Coordenador
// ==================================================
document.querySelector("#formEditarCoordenador").addEventListener("submit", e => {
    e.preventDefault();

    const id = document.querySelector("#editIdCoordenador").value;

    const dto = {
        nomeCoordenador: document.querySelector("#editNomeCoordenador").value,
        emailCoordenador: document.querySelector("#editEmailCoordenador").value,
        matriCoordenador: document.querySelector("#editMatriCoordenador").value,
        senhaCoordenador: document.querySelector("#editSenhaCoordenador").value
    };

    fetch(`http://localhost:8080/coordenador/atualizar/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dto)
    })
    .then(() => {
        alert("Coordenador atualizado!");
        document.querySelector("#modalEditar").style.display = "none";
        listarCoordenadores();
    });
});

// ==================================================
// Cancelar modal
// ==================================================
document.querySelector("#btnCancelar").addEventListener("click", () => {
    document.querySelector("#modalEditar").style.display = "none";
});

// ==================================================
// Envio do formulário
// ==================================================
formCoordenador.addEventListener("submit", e => {
    e.preventDefault();
    salvarCoordenador();
});
// ==================================================
// Inicialização
// ==================================================
document.addEventListener("DOMContentLoaded", listarCoordenadores);

// ==================================================
// Botão Voltar
// ==================================================
document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "/menu";
});
