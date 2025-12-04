package com.example.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.model.Coordenador;
import com.example.model.Disciplina;
import com.example.model.Professor;
import com.example.service.LoginService;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {
	
	 @Autowired
	    private LoginService loginService;

	 	//Verifica as credenciais do professor no banco de dados e ao realizar o login salva o idProfessor e idsDisciplinas na sessão
	 @PostMapping("/login")
	 public String login(@RequestParam String matricula,
	                     @RequestParam String senha,
	                     HttpSession session,
	                     Model model) {

	     Object usuario = loginService.autenticar(matricula, senha);

	     if (usuario == null) {
	         model.addAttribute("erro", "Matrícula ou senha inválidos!");
	         return "htmlLogin/login";
	     }

	     // Professor logado
	     if (usuario instanceof Professor professor) {

	         session.setAttribute("tipoUsuario", "professor");
	         session.setAttribute("idProfessor", professor.getIdProfessor());

	         // Disciplinas do professor
	         List<Integer> idsDisciplinas = professor.getDisciplinas()
	                 .stream()
	                 .map(Disciplina::getIdDisciplina)
	                 .collect(Collectors.toList());

	         session.setAttribute("idsDisciplinas", idsDisciplinas);
	     }

	     // Coordenador logado
	     else if (usuario instanceof Coordenador coordenador) {

	         session.setAttribute("tipoUsuario", "coordenador");
	         session.setAttribute("idCoordenador", coordenador.getIdCoordenador());
	     }

	     return "redirect:/menu";
	 }

}
