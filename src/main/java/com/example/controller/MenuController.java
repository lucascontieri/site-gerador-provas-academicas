package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.model.Professor;
import com.example.model.Coordenador;
import com.example.service.ProfessorService;
import com.example.service.CoordenadorService;
import com.example.service.DisciplinaService;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private CoordenadorService coordenadorService;

    @Autowired
    private DisciplinaService disciplinaService;  

    @GetMapping
    public String carregarMenu(HttpSession session, Model model) {

        String tipoUsuario = (String) session.getAttribute("tipoUsuario");

        if (tipoUsuario == null) {
            return "redirect:/login";
        }

        // ---------------------------
        // LOGIN DO PROFESSOR
        // ---------------------------
        if (tipoUsuario.equals("professor")) {

            Integer idProfessor = (Integer) session.getAttribute("idProfessor");

            if (idProfessor == null) {
                return "redirect:/login";
            }

            Professor professor = professorService.GetByidProfessor(idProfessor);

            if (professor == null) {
                return "redirect:/login";
            }

            model.addAttribute("nomeUsuario", professor.getNomeProfessor());
            model.addAttribute("disciplinas", professor.getDisciplinas());
            model.addAttribute("tipoUsuario", "professor");

            return "htmlMenu/menu";
        }

        // ---------------------------
        // LOGIN DO COORDENADOR
        // ---------------------------
        if (tipoUsuario.equals("coordenador")) {

            Integer idCoordenador = (Integer) session.getAttribute("idCoordenador");

            if (idCoordenador == null) {
                return "redirect:/login";
            }

            Coordenador coordenador = coordenadorService.GetByidCoordenador(idCoordenador);

            if (coordenador == null) {
                return "redirect:/login";
            }

            model.addAttribute("nomeUsuario", coordenador.getNomeCoordenador());

            model.addAttribute("disciplinas", disciplinaService.ListarTodos());

            model.addAttribute("tipoUsuario", "coordenador");

            return "htmlMenu/menu";
        }

        // Caso tipo inválido
        return "redirect:/login";
    }
}

