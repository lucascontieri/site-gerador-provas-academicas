package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Professor;
import com.example.repository.ProfessorRepository;

@Service
public class LoginService {

	@Autowired
    private ProfessorRepository professorRepository;

	//Metodo para autenticar o professor pela matricula e senha
    public Professor autenticar(String matriProfessor, String senhaProfessor) {

        Professor professor = professorRepository.findBymatriProfessor(matriProfessor);

        if (professor == null) {
            return null;
        }

        if (!professor.getSenhaProfessor().equals(senhaProfessor)) {
            return null;
        }

        return professor;
    }
}
