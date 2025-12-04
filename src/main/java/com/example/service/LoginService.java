package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Coordenador;
import com.example.model.Professor;
import com.example.repository.CoordenadorRepository;
import com.example.repository.ProfessorRepository;

@Service
public class LoginService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    public Object autenticar(String matricula, String senha) {

        // Tentativa como professor
        Professor professor = professorRepository.findBymatriProfessor(matricula);
        if (professor != null && professor.getSenhaProfessor().equals(senha)) {
            return professor; // retorna professor logado
        }

        // Tentativa como coordenador
        Coordenador coordenador = coordenadorRepository.findBymatriCoordenador(matricula);
        if (coordenador != null && coordenador.getSenhaCoordenador().equals(senha)) {
            return coordenador; // retorna coordenador logado
        }

        return null; // nenhum dos dois
    }
}
