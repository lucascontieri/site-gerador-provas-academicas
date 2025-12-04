const API_BASE = "http://localhost:8080/questao"; 

//=====================================================================
// Carrega o ID do professor logado
//=====================================================================
async function getProfessorLogado() {
    try {
        const resp = await fetch("http://localhost:8080/questao/professor/sessao");
        if (resp.ok) {
            const data = await resp.json();
            return data.idProfessor;
        }
    } catch (e) {
        console.error("Erro ao obter idProfessor da sessão:", e);
    }
    return null;
}

//=====================================================================
// Carrega todas as questões (com filtro)
//=====================================================================
async function carregarTabela() {
    const tbody = document.querySelector("#tabelaQuestoes tbody");
    tbody.innerHTML = "";

    const idProfessorLogado = await getProfessorLogado();

    // FILTRO POR DISCIPLINA
    const filtro = document.getElementById("filtroDisciplina").value.toLowerCase();

    try {
        const response = await fetch(`${API_BASE}/list`);
        const questoes = await response.json();

        questoes
            .filter(q =>
                q.disciplina?.nomeDisciplina?.toLowerCase().includes(filtro)
            )
            .forEach(q => {
                const tr = document.createElement("tr");

                const tdDisciplina = document.createElement("td");
                tdDisciplina.textContent = q.disciplina?.nomeDisciplina || "N/A";
                tr.appendChild(tdDisciplina);

                const tdProfessor = document.createElement("td");
                tdProfessor.textContent = q.nomeProfessor || "N/A";
                tr.appendChild(tdProfessor);

                const tdTexto = document.createElement("td");
                tdTexto.textContent =
                    q.textQuestao.length > 50
                        ? q.textQuestao.substring(0, 50) + "..."
                        : q.textQuestao;
                tr.appendChild(tdTexto);

                const tdAcoes = document.createElement("td");

                // Botão Exibir (todos podem ver)
                const btnView = document.createElement("button");
                btnView.textContent = "Exibir";
                btnView.classList.add("view");
                btnView.onclick = () => abrirModal(q, false);
                tdAcoes.appendChild(btnView);

                // Só o professor criador pode editar/excluir
                if (idProfessorLogado !== null && idProfessorLogado === q.idProfessor) {
                    const btnEdit = document.createElement("button");
                    btnEdit.textContent = "Editar";
                    btnEdit.classList.add("edit");
                    btnEdit.onclick = () => abrirModal(q, true);
                    tdAcoes.appendChild(btnEdit);

                    const btnDelete = document.createElement("button");
                    btnDelete.textContent = "Excluir";
                    btnDelete.classList.add("delete");
                    btnDelete.onclick = () => excluirQuestao(q.idQuestao);
                    tdAcoes.appendChild(btnDelete);
                }

                tr.appendChild(tdAcoes);
                tbody.appendChild(tr);
            });

    } catch (error) {
        console.error("Erro ao carregar questões:", error);
    }
}

//=====================================================================
// Modal
//=====================================================================
function abrirModal(questao, editar) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    modalTitle.textContent = editar ? "Editar Questão" : "Visualizar Questão";

    if (editar) {
        modalBody.innerHTML = `
            <label>Disciplina:</label>
            <input type="text" value="${questao.disciplina?.nomeDisciplina || ''}" readonly>

            <label>Texto:</label>
            <textarea id="texto">${questao.textQuestao}</textarea>
            <label>Alternativa A:</label>
            <input type="text" id="alterA" value="${questao.alterA}">
            <label>Alternativa B:</label>
            <input type="text" id="alterB" value="${questao.alterB}">
            <label>Alternativa C:</label>
            <input type="text" id="alterC" value="${questao.alterC}">
            <label>Alternativa D:</label>
            <input type="text" id="alterD" value="${questao.alterD}">
            <label>Alternativa E:</label>
            <input type="text" id="alterE" value="${questao.alterE}">
            <label>Resposta:</label>
            <input type="text" id="resposta" value="${questao.resposta}">
            <button id="salvarBtn">Salvar</button>
            <p id="msgSucesso" style="color:green; display:none;">Questão atualizada com sucesso!</p>
        `;
        document.getElementById("salvarBtn").onclick = () =>
            salvarQuestao(questao.idQuestao, questao.idDisciplina);
    } else {
        modalBody.innerHTML = `
            <form>
                <label>Disciplina:</label>
                <input type="text" value="${questao.disciplina?.nomeDisciplina || ''}" readonly>
                <label>Enunciado:</label>
                <textarea readonly>${questao.textQuestao}</textarea>
                <label>Alternativa A:</label>
                <input type="text" value="${questao.alterA}" readonly>
                <label>Alternativa B:</label>
                <input type="text" value="${questao.alterB}" readonly>
                <label>Alternativa C:</label>
                <input type="text" value="${questao.alterC}" readonly>
                <label>Alternativa D:</label>
                <input type="text" value="${questao.alterD}" readonly>
                <label>Alternativa E:</label>
                <input type="text" value="${questao.alterE}" readonly>
                <label>Resposta Correta:</label>
                <input type="text" value="${questao.resposta}" readonly>
            </form>
        `;
    }

    modal.style.display = "block";
}

//=====================================================================
// Fechar modal
//=====================================================================
document.querySelector(".close").onclick = () => {
    document.getElementById("modal").style.display = "none";
};
window.onclick = (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) modal.style.display = "none";
};

//=====================================================================
// Salvar questão editada
//=====================================================================
async function salvarQuestao(idQuestao, idDisciplina) {
    const dto = {
        textQuestao: document.getElementById("texto").value,
        alterA: document.getElementById("alterA").value,
        alterB: document.getElementById("alterB").value,
        alterC: document.getElementById("alterC").value,
        alterD: document.getElementById("alterD").value,
        alterE: document.getElementById("alterE").value,
        resposta: document.getElementById("resposta").value,
        idDisciplina: idDisciplina
    };

    try {
        const response = await fetch(`${API_BASE}/atualizar/${idQuestao}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (response.ok) {
            document.getElementById("msgSucesso").style.display = "block";
            setTimeout(() => {
                document.getElementById("modal").style.display = "none";
                carregarTabela();
            }, 1500);
        } else {
            console.error("Erro ao atualizar questão:", response.status);
        }
    } catch (error) {
        console.error("Erro ao atualizar questão:", error);
    }
}

//=====================================================================
// Excluir questão
//=====================================================================
async function excluirQuestao(idQuestao) {
    if (!confirm("Deseja realmente excluir esta questão?")) return;
    try {
        await fetch(`${API_BASE}/excluir/${idQuestao}`, { method: "DELETE" });
        carregarTabela();
    } catch (error) {
        console.error("Erro ao excluir questão:", error);
    }
}

//=====================================================================
// Botão para voltar ao menu
//=====================================================================
document.getElementById("btnVoltar").onclick = async () => {
    try {
        const response = await fetch(window.location.href = "/menu");
        if (response.ok) {
            window.location.href = "/menu";
        } else {
            console.error("Erro ao chamar a tela de menu:", response.status);
        }
    } catch (error) {
        console.error("Erro ao chamar a tela de menu:", error);
    }
};

//=====================================================================
// Evento do filtro (filtra enquanto digita)
//=====================================================================
document.getElementById("filtroDisciplina").addEventListener("input", () => carregarTabela());

//=====================================================================
// Inicializa tabela
//=====================================================================
carregarTabela();




