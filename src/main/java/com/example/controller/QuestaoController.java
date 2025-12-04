package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.QuestaoDTO;
import com.example.model.Disciplina;
import com.example.model.Questao;
import com.example.repository.DisciplinaRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/questao")  // base para todos os endpoints
public class QuestaoController {

	@Autowired
	private com.example.service.QuestaoService questaoService;
	
	 @Autowired
	 private DisciplinaRepository disciplinaRepository;
	
	//Lista todas as Questoes cadastrados
	@GetMapping("/list")
    public List<Questao> listar() {
        return questaoService.ListarTodos();
    }
	
	
	//Busca a Questao pelo ID
	@GetMapping("/{id}")
	public ResponseEntity<Questao> BuscarPorId(@PathVariable int id) {
	    Questao quest = questaoService.GetByidQuestao(id);
	    if (quest != null) {
	        return ResponseEntity.ok(quest);
	    }
	    return ResponseEntity.notFound().build();
	}
	
	//Salva uma nova Questao no banco de dados utilizando metodo salvarQuestao do Service
	@PostMapping("/salvar")
	public ResponseEntity<Questao> criar(
	        @Valid @RequestBody QuestaoDTO dto,
	        HttpSession session) {

	    Integer idProfessor = (Integer) session.getAttribute("idProfessor");

	    if (idProfessor == null) {
	        return ResponseEntity.status(401).build(); // Não está logado
	    }

	    // força o id vir da sessão e não do front
	    dto.setIdProfessor(idProfessor);

	    Questao quest = questaoService.SalvarQuestao(dto);

	    return ResponseEntity.status(201).body(quest);
	}
    
  //Exclui a Questao pelo seu id 
    @DeleteMapping("/excluir/{idQuestao}")
    public ResponseEntity<Void> excluir(@PathVariable int idQuestao) {
        Questao quest = questaoService.GetByidQuestao(idQuestao);
        if (quest == null) {
            return ResponseEntity.notFound().build();
        }

        questaoService.ExcluirQuestao(idQuestao);
        return ResponseEntity.noContent().build();
    }
    
  //Atualiza os dados da questao no Banco de dados utilizando o id
    @PutMapping("/atualizar/{idQuestao}")
    public ResponseEntity<Questao> atualizar(
            @PathVariable int idQuestao,
            @Valid @RequestBody QuestaoDTO dto) {

        Optional<Questao> atualizado = questaoService.AtualizarQuestao(idQuestao, dto);
        return atualizado
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
	
    @SuppressWarnings("unchecked")
	@GetMapping("/carregarDisciplinas")
    public ResponseEntity<List<Disciplina>> carregarDisciplinas(HttpSession session) {
        List<Integer> ids = (List<Integer>) session.getAttribute("idsDisciplinas");

        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }

        List<Disciplina> disciplinas = disciplinaRepository.findAllById(ids);
        return ResponseEntity.ok(disciplinas);
    }
	
	
}
