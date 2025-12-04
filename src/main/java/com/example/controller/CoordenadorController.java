package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.CoordenadorDTO;
import com.example.model.Coordenador;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/coordenador")  // base para todos os endpoints
public class CoordenadorController {
	
	@Autowired
	private com.example.service.CoordenadorService coordenadorService;
	
	//Lista todos os Coordenadores cadastrados
	@GetMapping("/list")
    public List<Coordenador> listar() {
        return coordenadorService.ListarTodos();
    }
	
	//Busca o coordenador pelo ID
	@GetMapping("/{id}")
	public ResponseEntity<Coordenador> BuscarPorId(@PathVariable int id) {
	    Coordenador coordenador = coordenadorService.GetByidCoordenador(id);
	    if (coordenador != null) {
	        return ResponseEntity.ok(coordenador);
	    }
	    return ResponseEntity.notFound().build();
	}
	
	//Salva um novo Coordenador no banco de dados utilizando metodo salvarCoordenador
    @PostMapping("/salvar")
    public ResponseEntity<Coordenador> criar(@Valid @RequestBody CoordenadorDTO dto) {
        Coordenador coo = coordenadorService.SalvarCoordenador(dto);
        return ResponseEntity.status(201).body(coo);
    }
    
  //Exclui um Coordenador pelo seu id 
    @DeleteMapping("/excluir/{idCoordenador}")
    public ResponseEntity<Void> excluir(@PathVariable int idCoordenador) {
        Coordenador coordenador = coordenadorService.GetByidCoordenador(idCoordenador);
        if (coordenador == null) {
            return ResponseEntity.notFound().build();
        }

        coordenadorService.ExcluirCoordenador(idCoordenador);
        return ResponseEntity.noContent().build();
    }
    
    //Atualiza os dados do Coordenador no Banco de dados utilizando o id do Coordenador
    @PutMapping("/atualizar/{idCoordenador}")
    public ResponseEntity<Coordenador> atualizar(
            @PathVariable int idCoordenador,
            @Valid @RequestBody CoordenadorDTO dto) {

        Optional<Coordenador> atualizado = coordenadorService.AtualizarCoordenador(idCoordenador, dto);
        return atualizado
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
