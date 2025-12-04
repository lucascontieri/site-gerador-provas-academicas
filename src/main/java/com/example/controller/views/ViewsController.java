package com.example.controller.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/tela")
public class ViewsController {
	
	 @GetMapping("/disciplina")
	    public String mostrarTelaDisciplina() {
	        return "htmlDisciplina/disciplina"; // 
	    }
	 
	 @GetMapping("/professor")
	    public String mostrarTelaProfessor() {
	        return "htmlProfessor/professor"; 
	    }
	 
	 @GetMapping("/login")
	    public String mostrarTelaLogin() {
	        return "htmlLogin/login"; 
	    }
	 
	 @GetMapping("/menu")
	    public String mostrarTelaMenu() {
	        return "htmlMenu/menu"; 
	    }
	 
	 @GetMapping("/logout")
	 public String logout(HttpSession session) {
	     session.invalidate();
	     return "redirect:/tela/login";
	 }
	 
	 
	 
}
