//Seletor para os campos do formulário
const formProfessor = document.querySelector("#formProfessor");
const idNomeProfessor = document.querySelector("#idNomeProfessor"); 
const idEmailProfessor = document.querySelector("#idEmailProfessor");
const idSenhaProfessor = document.querySelector("#idSenhaProfessor");
const idMatriProfessor = document.querySelector("#idMatriProfessor"); 
const tabelaBody = document.querySelector("#tableDisciplina tbody");  // <tbody> da tabela disciplina

//Função principal para salvar o professor via API
function salvarProfessor() {
    //Validação simples de campos vazios
    if (idNomeProfessor.value === "" || idEmailProfessor.value === "" || 
        idSenhaProfessor.value === "" || idMatriProfessor.value === "") {
        alert("Por favor, preencha todos os campos do professor.");
        return;
    }
	
	const checkboxes = document.querySelectorAll(".check-disciplina:checked"); //Refencia ao ID das check box
	const disciplinasSelecionadas = [...checkboxes].map(c => parseInt(c.value)); //Recebe os valores selecionados pela check box

    //Criação do DTO (O JSON deve usar os nomes de campos da entidade: nomeProfessor, matriProfessor, etc.)
    const professorDTO = {
        //Os nomes das propriedades abaixo devem coincidir com os setters/fields da sua classe Professor/ProfessorDTO
        nomeProfessor: idNomeProfessor.value,
        emailProfessor: idEmailProfessor.value,
        senhaProfessor: idSenhaProfessor.value,
        matriProfessor: idMatriProfessor.value,
		idsDisciplinas: disciplinasSelecionadas
    };

    //Requisição POST
    fetch("http://localhost:8080/professor/salvar", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        method: "POST", 
        body: JSON.stringify(professorDTO) 
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        } else if (res.status === 400) {
             // Trata erros de validação
             return res.json().then(errorData => {
                 alert("Erro de validação: " + (errorData.message || res.statusText));
                 throw new Error("Erro de validação.");
             });
        } else {
            // Trata outros erros (4xx, 5xx)
            console.error("Erro ao salvar professor. Status:", res.status, res.statusText);
            alert("Erro ao salvar professor. Consulte o console (F12) para mais detalhes.");
            throw new Error("Falha na requisição."); 
        }
    })
    .then(professorSalvo => {
        //Sucesso: Feedback para o usuário e limpeza
        alert(`Professor ${professorSalvo.nomeProfessor} (ID: ${professorSalvo.idProfessor}) salvo com sucesso!`);
        limparCamposProfessor();
        // Opcional: listarProfessores(); 
    })
    .catch(err => {
        console.error("Erro na requisição POST:", err);
    });
}

//Função auxiliar para limpar os campos
function limparCamposProfessor() {
    idNomeProfessor.value = "";
    idEmailProfessor.value = "";
    idSenhaProfessor.value = "";
    idMatriProfessor.value = "";
	
	// Desmarca todas as checkboxes de disciplinas
	    const checkboxes = document.querySelectorAll(".check-disciplina");
	    checkboxes.forEach(c => c.checked = false);
}

//Função para listar disciplinas e preencher a tabela
// Função para listar disciplinas e preencher a tabela
function listarDisciplinas() {
	fetch("http://localhost:8080/disciplina/list")
		.then(res => res.json())
		.then(disciplinas => {
			// Verifica se o elemento <tbody> foi encontrado
			if (document.querySelector("#tableDisciplina tbody")) {
				// 💡 Ação Correta: Limpa APENAS o corpo da tabela (<tbody>)
				(document.querySelector("#tableDisciplina tbody")).innerHTML = ""; 

				disciplinas.forEach(d => {
					const linha = document.createElement("tr");

					// Geração da linha de dados, incluindo o botão de exclusão
					linha.innerHTML = `
					    <td>${d.idDisciplina}</td>
					    <td>${d.nomeDisciplina}</td>
					    <td>
					        <input 
					            type="checkbox" 
					            class="check-disciplina"
					            value="${d.idDisciplina}"
					        >
					    </td>
					`;

					// Anexa a nova linha no corpo da tabela (<tbody>)
					(document.querySelector("#tableDisciplina tbody")).appendChild(linha);
				});

				// Adiciona event listeners aos botões recém-criados
				// O querySelectorAll deve ser feito após as linhas serem inseridas.
				document.querySelectorAll(".btn-excluir").forEach(button => {
					button.addEventListener('click', function() {
						const id = this.getAttribute('data-id');
						// Chama a função de exclusão que deve estar definida no seu script
						excluirDisciplina(id); 
					});
				});

			} else {
				console.error("O elemento <tbody> da tabela com ID #tableDisciplina não foi encontrado.");
			}
		})
		.catch(err => console.error("Erro ao listar disciplinas:", err));
}

//Ouve o evento de submissão do formulário
formProfessor.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página
    salvarProfessor(); 
});

//Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", listarDisciplinas);