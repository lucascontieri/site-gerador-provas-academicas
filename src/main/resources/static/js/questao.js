// Carrega disciplinas ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
    carregarDisciplinas();
});

// ==================================================
// Buscar disciplinas autorizadas para o professor
// ==================================================
function carregarDisciplinas() {
    fetch("/questao/carregarDisciplinas")
        .then(resp => resp.json())
        .then(disciplinas => {
            let select = document.getElementById("selectDisciplina");

            select.innerHTML = ""; // limpa antes de preencher

            disciplinas.forEach(d => {
                let option = document.createElement("option");
                option.value = d.idDisciplina;
                option.textContent = d.nomeDisciplina;
                select.appendChild(option);
            });
        })
        .catch(err => console.error("Erro ao carregar disciplinas:", err));
}

// ==================================================
// Evento de submit que traz as imfotmações do professor para depois salvar a questao
// ==================================================
document.getElementById("formQuestao").addEventListener("submit", function (e) {
    e.preventDefault();

    const questao = {
        textQuestao: document.getElementById("textQuestao").value,
        alterA: document.getElementById("alterA").value,
        alterB: document.getElementById("alterB").value,
        alterC: document.getElementById("alterC").value,
        alterD: document.getElementById("alterD").value,
        alterE: document.getElementById("alterE").value,
        resposta: document.getElementById("resposta").value.toUpperCase(),
        idDisciplina: document.getElementById("selectDisciplina").value
    };

    fetch("/questao/salvar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questao)
    })
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao salvar questão");
            return resp.json();
        })
        .then(data => {
            alert("Questão cadastrada com sucesso!");
            document.getElementById("formQuestao").reset();
        })
        .catch(err => console.error("Erro ao salvar questão:", err));
});

// ==================================================
// Botão Voltar
// ==================================================
document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "/menu";
});