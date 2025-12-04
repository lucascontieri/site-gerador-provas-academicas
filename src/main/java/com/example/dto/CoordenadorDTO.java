package com.example.dto;

import jakarta.validation.constraints.NotBlank;

public class CoordenadorDTO {
	
	@NotBlank(message = "Preencha o campo!")
	private String nomeCoordenador;
	@NotBlank(message = "Preencha o campo!")
	private String matriCoordenador;
	@NotBlank(message = "Preencha o campo!")
	private String emailCoordenador;
	@NotBlank(message = "Preencha o campo!")
	private String senhaCoordenador;
	
	
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
	
	
	
}
