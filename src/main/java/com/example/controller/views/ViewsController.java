package com.example.controller.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/tela")
public class ViewsController {
	
	 //Direciona para tela de gerenciamento disciplinas
	 @GetMapping("/disciplina")
	    public String mostrarTelaDisciplina() {
	        return "htmlDisciplina/disciplina"; // 
	    }
	
	 //Direciona para tela de gerenciamento de professores
	 @GetMapping("/professor")
	    public String mostrarTelaProfessor() {
	        return "htmlProfessor/professor"; 
	    }
	 
	 //Direciona para tela de Login
	 @GetMapping("/login")
	    public String mostrarTelaLogin() {
	        return "htmlLogin/login"; 
	    }
	 
	 //Direciona para tela de Menu
	 @GetMapping("/menu")
	    public String mostrarTelaMenu() {
	        return "htmlMenu/menu"; 
	    }
	 
	 //Direciona para tela de Login
	 @GetMapping("/logout")
	 public String logout(HttpSession session) {
	     session.invalidate();
	     return "redirect:/tela/login";
	 }
	 
	 //Direciona para tela de Questao
	 @GetMapping("/questao")
	    public String mostrarTelaQuestao() {
	        return "htmlQuestao/questao"; 
	    }
	 
}
