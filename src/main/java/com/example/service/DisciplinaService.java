package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.DisciplinaDTO;
import com.example.model.Disciplina;
import com.example.repository.DisciplinaRepository;

import jakarta.transaction.Transactional;

@Service
public class DisciplinaService {
	
	@Autowired
	private DisciplinaRepository disciplinaRepository;
	
	
	//Lista todas as disiciplinas cadastradas
	public List<Disciplina> ListarTodos(){
		return disciplinaRepository.findAll();
	}
	
	//Salva uma nova disciplina no banco de dados
	@Transactional
	public Disciplina SalvarDisciplina(DisciplinaDTO dto) {
		Disciplina dis = new Disciplina();
		dis.setNomeDisciplina(dto.getNomeDisciplina());
		
		return disciplinaRepository.save(dis);
	}

}
