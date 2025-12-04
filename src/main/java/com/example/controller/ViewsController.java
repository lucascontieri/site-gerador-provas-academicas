package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/disciplina")
public class ViewsController {
	
	 @GetMapping("/tela")
	    public String mostrarTela() {
	        return "htmlDisciplina/disciplina"; // sem .html, o Thymeleaf entende que é index.html
	    }
}
