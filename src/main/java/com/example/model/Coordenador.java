package com.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity
public class Coordenador {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idCoordenador") //informa o nome real da coluna
	private int idCoordenador;
	private String nomeCoordenador;
	private String matriCoordenador;
	private String emailCoordenador;
	private String senhaCoordenador;
	
	public Coordenador() {
		super();
	}

	public Coordenador(int idCoordenador, String nomeCoordenador, String matriCoordenador, String emailCoordenador,
			String senhaCoordenador) {
		super();
		this.idCoordenador = idCoordenador;
		this.nomeCoordenador = nomeCoordenador;
		this.matriCoordenador = matriCoordenador;
		this.emailCoordenador = emailCoordenador;
		this.senhaCoordenador = senhaCoordenador;
	}

	public String getNomeCoordenador() {
		return nomeCoordenador;
	}

	public void setNomeCoordenador(String nomeCoordenador) {
		this.nomeCoordenador = nomeCoordenador;
	}

	public String getMatriCoordenador() {
		return matriCoordenador;
	}

	public void setMatriCoordenador(String matriCoordenador) {
		this.matriCoordenador = matriCoordenador;
	}

	public String getEmailCoordenador() {
		return emailCoordenador;
	}

	public void setEmailCoordenador(String emailCoordenador) {
		this.emailCoordenador = emailCoordenador;
	}

	public String getSenhaCoordenador() {
		return senhaCoordenador;
	}

	public void setSenhaCoordenador(String senhaCoordenador) {
		this.senhaCoordenador = senhaCoordenador;
	}

	public int getIdCoordenador() {
		return idCoordenador;
	}

}
