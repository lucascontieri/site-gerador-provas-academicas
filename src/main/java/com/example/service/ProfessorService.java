package com.example.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.ProfessorDTO;
import com.example.model.Disciplina;
import com.example.model.Professor;
import com.example.repository.DisciplinaRepository;
import com.example.repository.ProfessorRepository;

import jakarta.transaction.Transactional;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    // Lista todos os Professores cadastrados
    public List<Professor> ListarTodos() {
        return professorRepository.findAll();
    }

    // Salvar novo professor + relacionamento
    @Transactional
    public Professor SalvarProfessor(ProfessorDTO dto) {
        Professor pro = new Professor();
        pro.setNomeProfessor(dto.getNomeProfessor());
        pro.setMatriProfessor(dto.getMatriProfessor());
        pro.setSenhaProfessor(dto.getSenhaProfessor());
        pro.setEmailProfessor(dto.getEmailProfessor());

        // Salva professor primeiro
        pro = professorRepository.save(pro);

        // Depois associa disciplinas
        if (dto.getIdsDisciplinas() != null && !dto.getIdsDisciplinas().isEmpty()) {
            List<Disciplina> disciplinas = disciplinaRepository.findAllById(dto.getIdsDisciplinas());
            pro.setDisciplinas(disciplinas);
        }

        return pro;
    }

    @Transactional
    public void excluirProfessor(int idProfessor) {
        professorRepository.deleteById(idProfessor);
    }

    public Professor getBymatriProfessor(String matriProfessor) {
        return professorRepository.findBymatriProfessor(matriProfessor);
    }

    public java.util.Optional<Professor> atualizar(int idProfessor, ProfessorDTO dto) {
        return professorRepository.findById(idProfessor)
                .map(pro -> {
                    pro.setNomeProfessor(dto.getNomeProfessor());
                    pro.setMatriProfessor(dto.getMatriProfessor());
                    pro.setEmailProfessor(dto.getEmailProfessor());
                    pro.setSenhaProfessor(dto.getSenhaProfessor());

                    //Atualizar disciplinas aqui também (se quiser)
                    List<Disciplina> disciplinas = dto.getIdsDisciplinas().stream()
                            .map(id -> disciplinaRepository.findById(id).orElse(null))
                            .filter(Objects::nonNull)
                            .toList();

                    pro.setDisciplinas(disciplinas);

                    return professorRepository.save(pro);
                });
    }

}
