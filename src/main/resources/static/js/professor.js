// =============================
// Seletores para os campos do formulário
// =============================
const formProfessor = document.querySelector("#formProfessor");
const idNomeProfessor = document.querySelector("#idNomeProfessor"); 
const idEmailProfessor = document.querySelector("#idEmailProfessor");
const idSenhaProfessor = document.querySelector("#idSenhaProfessor");
const idMatriProfessor = document.querySelector("#idMatriProfessor"); 
const tabelaBody = document.querySelector("#tableDisciplina tbody"); 

// =============================
// Salvar Professor
// =============================
function salvarProfessor() {
    if (
        idNomeProfessor.value === "" || 
        idEmailProfessor.value === "" || 
        idSenhaProfessor.value === "" || 
        idMatriProfessor.value === ""
    ) {
        alert("Por favor, preencha todos os campos do professor.");
        return;
    }

    const checkboxes = document.querySelectorAll(".check-disciplina:checked");
    const disciplinasSelecionadas = [...checkboxes].map(c => parseInt(c.value));

    const professorDTO = {
        nomeProfessor: idNomeProfessor.value,
        emailProfessor: idEmailProfessor.value,
        senhaProfessor: idSenhaProfessor.value,
        matriProfessor: idMatriProfessor.value,
        idsDisciplinas: disciplinasSelecionadas
    };

    fetch("http://localhost:8080/professor/salvar", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        method: "POST", 
        body: JSON.stringify(professorDTO) 
    })
    .then(res => {
        if (res.ok) return res.json(); 
        if (res.status === 400) {
            return res.json().then(errorData => {
                alert("Erro de validação: " + (errorData.message || res.statusText));
                throw new Error("Erro de validação.");
            });
        }
        alert("Erro ao salvar professor.");
        throw new Error("Falha na requisição.");
    })
    .then(professorSalvo => {
        alert(`Professor ${professorSalvo.nomeProfessor} (ID: ${professorSalvo.idProfessor}) salvo com sucesso!`);
        limparCamposProfessor();
		listarProfessores(); //Atualiza tabela imediatamente
    })
    .catch(err => console.error("Erro:", err));
}

// =============================
// Excluir Professor
// =============================
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-excluir")) {
        const idProfessor = event.target.getAttribute("data-id");

        // Exibe o prompt para digitar a senha
        const senha = prompt("Digite a senha para confirmar a exclusão:");

        // Se o usuário cancelar ou não digitar nada
        if (senha === null || senha.trim() === "") {
            alert("Exclusão cancelada. Senha não informada.");
            return;
        }

        // Exemplo de senha fixa (você pode mudar para outro valor ou buscar dinamicamente)
        const senhaCorreta = "fatecGRU2025@#";

        if (senha !== senhaCorreta) {
            alert("Senha incorreta! Exclusão não autorizada.");
            return;
        }

        if (confirm("Tem certeza que deseja excluir este professor?")) {
            fetch(`http://localhost:8080/professor/excluir/${idProfessor}`, {
                method: "DELETE"
            })
            .then(res => {
                if (res.ok) {
                    alert("Professor excluído com sucesso!");
                    listarProfessores(); // Atualiza a tabela
                } else if (res.status === 404) {
                    alert("Professor não encontrado!");
                } else {
                    alert("Erro ao excluir professor.");
                }
            })
            .catch(err => console.error("Erro ao excluir:", err));
        }
    }
});

// =============================
// Limpar Campos
// =============================
function limparCamposProfessor() {
    idNomeProfessor.value = "";
    idEmailProfessor.value = "";
    idSenhaProfessor.value = "";
    idMatriProfessor.value = "";
    document.querySelectorAll(".check-disciplina").forEach(c => c.checked = false);
}

// =============================
// Listar Disciplinas
// =============================
function listarDisciplinas() {
    fetch("http://localhost:8080/disciplina/list")
        .then(res => res.json())
        .then(disciplinas => {
            tabelaBody.innerHTML = ""; // Limpa antes de preencher

            disciplinas.forEach(d => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${d.idDisciplina}</td>
                    <td>${d.nomeDisciplina}</td>
                    <td>
                        <input type="checkbox" class="check-disciplina" value="${d.idDisciplina}">
                    </td>
                `;
                tabelaBody.appendChild(linha);
            });
        })
        .catch(err => console.error("Erro ao listar disciplinas:", err));
}

// =============================
// Filtro da Tabela — Letra por letra
// =============================
const filtroDisciplina = document.getElementById("filtroDisciplina");

filtroDisciplina.addEventListener("keyup", function () {
    const texto = filtroDisciplina.value.toLowerCase();
    const linhas = tabelaBody.getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const coluna = linhas[i].getElementsByTagName("td")[1];
        if (coluna) {
            const nome = coluna.textContent.toLowerCase();
            linhas[i].style.display = nome.includes(texto) ? "" : "none";
        }
    }
});

// =============================
// Listar Professores
// =============================
function listarProfessores() {
    fetch("http://localhost:8080/professor/list")
        .then(res => res.json())
        .then(professores => {
            const tbody = document.querySelector("#tableProfessor tbody");
            tbody.innerHTML = "";

            professores.forEach(p => {
                const linha = document.createElement("tr");

                const nomesDisciplinas = (p.disciplinas || [])
                    .map(d => d.nomeDisciplina)
                    .join(", ");

                linha.innerHTML = `
                    <td>${p.idProfessor}</td>
                    <td>${p.nomeProfessor}</td>
                    <td>${p.matriProfessor}</td>
                    <td>${nomesDisciplinas || "-"}</td>
                    <td>
                        <button class="btn-editar" data-id="${p.idProfessor}">Editar</button>
                        <button class="btn-excluir" data-id="${p.idProfessor}">Excluir</button>
                    </td>
                `;

                tbody.appendChild(linha);
            });
        })
        .catch(err => console.error("Erro ao listar professores:", err));
}

// =============================
// Abrir modal de edição
// =============================
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-editar")) {
        const idProfessor = event.target.getAttribute("data-id");

        // Busca os dados do professor
        fetch(`http://localhost:8080/professor/${idProfessor}`)
            .then(res => res.json())
            .then(professor => {
                // Preenche campos do professor
                document.querySelector("#editIdProfessor").value = professor.idProfessor;
                document.querySelector("#editNomeProfessor").value = professor.nomeProfessor;
                document.querySelector("#editEmailProfessor").value = professor.emailProfessor;
                document.querySelector("#editSenhaProfessor").value = professor.senhaProfessor;
                document.querySelector("#editMatriProfessor").value = professor.matriProfessor;

                // Buscar todas as disciplinas
                fetch("http://localhost:8080/disciplina/list")
                    .then(res => res.json())
                    .then(disciplinas => {
                        const container = document.querySelector("#editListaDisciplinas");
                        container.innerHTML = "";

                        disciplinas.forEach(d => {
                            const checked = professor.disciplinas.some(pd => pd.idDisciplina === d.idDisciplina);
                            const div = document.createElement("div");
                            div.innerHTML = `
                                <label>
                                    <input type="checkbox" class="edit-check-disciplina" value="${d.idDisciplina}" ${checked ? "checked" : ""}>
                                    ${d.nomeDisciplina}
                                </label>
                            `;
                            container.appendChild(div);
                        });

                        // Exibe modal
                        document.querySelector("#modalEditar").style.display = "flex";
                    });
            })
            .catch(err => console.error("Erro ao buscar professor:", err));
    }
});

// =============================
// Fechar modal
// =============================
document.querySelector("#btnCancelar").addEventListener("click", function () {
    document.querySelector("#modalEditar").style.display = "none";
});

// =============================
// Atualizar Professor
// =============================
document.querySelector("#formEditarProfessor").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.querySelector("#editIdProfessor").value;

    const idsDisciplinas = [...document.querySelectorAll(".edit-check-disciplina:checked")]
        .map(c => parseInt(c.value));

    const dto = {
        nomeProfessor: document.querySelector("#editNomeProfessor").value,
        emailProfessor: document.querySelector("#editEmailProfessor").value,
        senhaProfessor: document.querySelector("#editSenhaProfessor").value,
        matriProfessor: document.querySelector("#editMatriProfessor").value,
        idsDisciplinas: idsDisciplinas
    };

    fetch(`http://localhost:8080/professor/atualizar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dto)
    })
    .then(res => {
        if (res.ok) {
            alert("Professor atualizado com sucesso!");
            document.querySelector("#modalEditar").style.display = "none";
            listarProfessores();
        } else {
            alert("Erro ao atualizar professor.");
        }
    })
    .catch(err => console.error("Erro:", err));
});

// Event Listeners
formProfessor.addEventListener('submit', function(event) {
    event.preventDefault();
    salvarProfessor(); 
});

document.addEventListener("DOMContentLoaded", () => {
    listarDisciplinas();
    listarProfessores();
});