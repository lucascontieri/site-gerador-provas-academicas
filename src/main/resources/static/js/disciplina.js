const disciplina = document.querySelector("form");
const idDisciplina = document.querySelector(".disciplina");

// Função criada para receber os dados do campo da pagina e converter em JSON
function salvar() {
	// 1. Verifica se o campo está vazio
	if(idDisciplina.value == ""){
		alert("Campo vazio!")
		return;
	}

	const nomeDisciplina = idDisciplina.value;
	
	// 2. Primeira requisição: Verifica se a disciplina já existe
	fetch(`http://localhost:8080/disciplina/procura/${nomeDisciplina}`)
		.then(res => {
			// Apenas checa se houve um erro de rede/servidor inesperado (5xx)
			if (!res.ok) {
				console.error("Erro na requisição de procura:", res.statusText);
				throw new Error("Erro de servidor ao verificar disciplina."); 
			}
			// Assumimos que a API retorna true ou false com status 200
			return res.json(); 
		})
		.then(existe => { // Recebe o booleano (true ou false) diretamente
			
			if (existe) { 
				// Se TRUE, a disciplina já está cadastrada
				alert(`A disciplina "${nomeDisciplina}" já está cadastrada!`);
				return; // Interrompe
			}
            
            // 3. Se FALSE, prossegue com o POST para salvar
			return fetch("http://localhost:8080/disciplina/salvar", {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({
					nomeDisciplina: nomeDisciplina 
				})
			});
		})
		.then(res => {
			// Esta parte só será executada se o segundo fetch (POST) for chamado
			if (res && res.ok) { 
				limpar(); 
				listarDisciplinas(); 
				alert(`Disciplina "${nomeDisciplina}" salva com sucesso!`); 
			} else if (res) {
				// Se o POST falhou (ex: status 4xx/5xx)
				console.error("Erro ao salvar disciplina:", res.statusText);
				alert(`Erro ao salvar a disciplina "${nomeDisciplina}".`);
			}
		})
		.catch(err => {
			// Captura erros de rede ou erros lançados
			console.error("Erro na operação:", err);
			alert("Ocorreu um erro na requisição: " + err.message);
		});
};

//Metodo para limpar o input da caixa de texto disciplina
function limpar(){
    // Use a variável 'idDisciplina' que já aponta para o input com a classe ".disciplina"
	idDisciplina.value = ""; 
    // Remova: const caixatexto = document.getElementById(disciplina);
    // Remova: caixatexto.value = "";
}

//FUNÇÃO PARA EXCLUIR DISCIPLINA
function excluirDisciplina(id) { // <-- Recebe o ID correto aqui
	if (!confirm(`Tem certeza que deseja excluir a disciplina com ID ${id}?`)) {
		return; // Cancela se o usuário não confirmar
	}

    // 💡 CORREÇÃO AQUI: Usa o parâmetro 'id' na URL
	fetch(`http://localhost:8080/disciplina/excluir/${id}`, { 
		method: "DELETE" 
	})
		.then(function(res) {
			console.log(res);
			if (res.ok) {
                // 💡 CORREÇÃO AQUI: Usa o parâmetro 'id' na mensagem
				console.log(`Disciplina com ID ${id} excluída com sucesso.`); 
				listarDisciplinas(); // Recarrega a lista
				// Não chame limpar() aqui, pois limparia o campo de texto desnecessariamente
			} else {
                // 💡 CORREÇÃO AQUI: Usa o parâmetro 'id' na mensagem
				console.error(`Erro ao excluir disciplina ${id}:`, res.statusText); 
			}
		})
		.catch(function(err) {
			console.error("Erro na requisição DELETE:", err);
		});
}


const tabelaBody = document.querySelector("#tableDisciplina tbody"); 
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
                <button 
                    class="btn-excluir" 
                    data-id="${d.idDisciplina}"
                    title="Excluir Disciplina"
                >Excluir</button>
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

disciplina.addEventListener('submit', function(event) {
	event.preventDefault();

	salvar();
});

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", listarDisciplinas);