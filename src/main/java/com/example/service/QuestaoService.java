package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.QuestaoDTO;
import com.example.model.Questao;
import com.example.repository.QuestaoRepository;

import jakarta.transaction.Transactional;



@Service
public class QuestaoService {

	@Autowired
    private QuestaoRepository questaoRepository;
	
	// Lista todas as Questoes cadastrados
    public List<Questao> ListarTodos() {
        return questaoRepository.findAll();
    }
    
  //Busca o professor pela sua matricula
    public Questao GetByidQuestao(int idQuestao) {
        return questaoRepository.findByidQuestao(idQuestao);
    }
    
    //Salva uma questao no banco de dados
    @Transactional
	public Questao SalvarQuestao(QuestaoDTO dto) {
		Questao quest = new Questao();
		quest.setIdDisciplina(dto.getIdDisciplina());
		quest.setIdProfessor(dto.getIdProfessor());
		quest.setTextQuestao(dto.getTextQuestao());
		quest.setAlterA(dto.getAlterA());
		quest.setAlterB(dto.getAlterB());
		quest.setAlterC(dto.getAlterC());
		quest.setAlterD(dto.getAlterD());
		quest.setAlterE(dto.getAlterE());
		quest.setResposta(dto.getResposta());
		
		return questaoRepository.save(quest);
	}
	
  //Exclui a questao do banco de dados pelo ID
    @Transactional
    public void ExcluirQuestao(int idQuestao) { 
    	questaoRepository.deleteById(idQuestao); 
    }
	
    //Atualiza a questao pelo seu ID
    public java.util.Optional<Questao> AtualizarQuestao(int idQuestao, QuestaoDTO dto) {
        return questaoRepository.findById(idQuestao)
                .map(quest -> {
                	quest.setIdDisciplina(dto.getIdDisciplina());
            		quest.setIdProfessor(dto.getIdProfessor());
            		quest.setTextQuestao(dto.getTextQuestao());
            		quest.setAlterA(dto.getAlterA());
            		quest.setAlterB(dto.getAlterB());
            		quest.setAlterC(dto.getAlterC());
            		quest.setAlterD(dto.getAlterD());
            		quest.setAlterE(dto.getAlterE());
            		quest.setResposta(dto.getResposta());
                    return questaoRepository.save(quest);
                });
    }
	
	
	
}
