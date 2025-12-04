package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Coordenador;

public interface CoordenadorRepository extends JpaRepository<Coordenador, Integer>{
	
	//Busca o Coordenador pelo seu idProfessor
	public Coordenador findByIdCoordenador(int idCoordenador);
	
	//Busca o coordenador pela matricula
	public Coordenador findBymatriCoordenador(String matriCoordenador);
	
}
