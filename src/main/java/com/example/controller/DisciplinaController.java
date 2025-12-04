package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.DisciplinaDTO;
import com.example.model.Disciplina;


import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/disciplina")  // base para todos os endpoints
public class DisciplinaController {

	@Autowired
	private com.example.service.DisciplinaService disciplinaService;
	
		//Lista todas as disciplinas cadastradas
		@GetMapping("/list")
	    public List<Disciplina> listar() {
	        return disciplinaService.ListarTodos();
	    }
	
		 //Salva uma nova disciplina no banco de dados pelo metodo SalvarDisciplina do pakage Service
	    @PostMapping("/salvar")
	    public ResponseEntity<Disciplina> criar(@Valid @RequestBody DisciplinaDTO dto) {
	        Disciplina dis = disciplinaService.SalvarDisciplina(dto);
	        return ResponseEntity.ok(dis);
	    }
	    	
	
	
}
