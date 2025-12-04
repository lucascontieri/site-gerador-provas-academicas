package com.example.controller.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tela")
public class ViewsController {
	
	 @GetMapping("/disciplina")
	    public String mostrarTelaDisciplina() {
	        return "htmlDisciplina/disciplina"; // sem .html, o Thymeleaf entende que é index.html
	    }
	 
	 @GetMapping("/professor")
	    public String mostrarTelaProfessor() {
	        return "htmlProfessor/professor"; // sem .html, o Thymeleaf entende que é index.html
	    }
	 
}
