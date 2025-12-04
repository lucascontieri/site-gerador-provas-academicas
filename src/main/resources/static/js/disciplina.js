const disciplina = document.querySelector("form");
const Idisciplina = document.querySelector(".disciplina");

//Função criada para receber os dados do campo da pagina e converter em JSON
function salvar (){
  fetch("http://localhost:8080/disciplina/salvar",{
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method:"POST", //Determina qual tipo de ação será executada
    body: JSON.stringify({
      nomeDisciplina: Idisciplina.value})
  })
  .then(function (res) {console.log(res)})
  .catch(function (res) {console.log(res)})
};

//Função criada para limpar o campo após salvar os dados
function limpar(){
  Idisciplina.value = "";
};

disciplina.addEventListener('submit',function (event){
  event.preventDefault(); 
  
  salvar();
  limpar();
});