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


// Event Listeners
formProfessor.addEventListener('submit', function(event) {
    event.preventDefault();
    salvarProfessor(); 
});

document.addEventListener("DOMContentLoaded", () => {
    listarDisciplinas();
    listarProfessores();
});