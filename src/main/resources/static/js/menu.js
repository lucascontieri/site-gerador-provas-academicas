//=====================================================================
// Chama a API /gerenciar/questao e redireciona
//=====================================================================
document.getElementById("btnGerenciar").onclick = async () => {
    try {
        const response = await fetch("/tela/gerenciar/questao");
        if (response.ok) {
            // Se a API retornar a página de gerenciamento, redireciona
            window.location.href = "/tela/gerenciar/questao";
        } else {
            console.error("Erro ao chamar a tela de gerenciamento:", response.status);
            alert("Não foi possível abrir a tela de gerenciamento.");
        }
    } catch (error) {
        console.error("Erro ao chamar a tela de gerenciamento:", error);
        alert("Erro ao conectar com o servidor.");
    }
};

//=====================================================================
// Redireciona para gerar Prova
//=====================================================================
document.getElementById("btnGerarProva").onclick = () => {
    window.location.href = "/tela/prova";
};

//=====================================================================
//Botao para voltar ao Login
//=====================================================================
document.getElementById("btnSair").onclick = () => {
    window.location.href = "/tela/logout";
};
// Redireciona para cadastrar questões
document.getElementById("btnCadastrar").onclick = () => {
    window.location.href = "/tela/cadastrar/questao";
};
// Redireciona para gerenciar coordenador
document.getElementById("btnGerenciarCoordenador").onclick = () => {
    window.location.href = "/tela/coordenador";
};
// Redireciona para gerenciar coordenador
document.getElementById("btnGerenciarProfessor").onclick = () => {
    window.location.href = "/tela/professor";
};
// Redireciona para gerenciar Disciplina
document.getElementById("btnGerenciarDisciplina").onclick = () => {
    window.location.href = "/tela/disciplina";
};