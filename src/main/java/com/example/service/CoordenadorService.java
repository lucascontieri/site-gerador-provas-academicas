package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dto.CoordenadorDTO;
import com.example.model.Coordenador;
import com.example.repository.CoordenadorRepository;

import jakarta.transaction.Transactional;

@Service
public class CoordenadorService {

	@Autowired
	private CoordenadorRepository coordenadorRepository;
	
	 //Lista todos os Coordenadores cadastrados
    public List<Coordenador> ListarTodos() {
        return coordenadorRepository.findAll();
    }
	
    //Busca o Coordenador pela sua matricula
    public Coordenador GetByidCoordenador(int idCoordenador) {
        return coordenadorRepository.findByIdCoordenador(idCoordenador);
    }
    
    //Busca o professor pela sua matricula
    public Coordenador GetBymatriCoordenador(String matriCoordenador) {
        return coordenadorRepository.findBymatriCoordenador(matriCoordenador);
    }
    
    //Salvar novo coordenador
    @Transactional
    public Coordenador SalvarCoordenador(CoordenadorDTO dto) {
        Coordenador coo = new Coordenador();
        coo.setNomeCoordenador(dto.getNomeCoordenador());
        coo.setMatriCoordenador(dto.getMatriCoordenador());
        coo.setSenhaCoordenador(dto.getSenhaCoordenador());
        coo.setEmailCoordenador(dto.getEmailCoordenador());
    
        return coordenadorRepository.save(coo);
    }
	
    //Exclui a coordenador do banco de dados pelo id
    @Transactional
    public void ExcluirCoordenador(int idCoordenador) { 
    	coordenadorRepository.deleteById(idCoordenador); 
    }
    
    //Atualiza o coordenador pelo seu idCoordenador
    public java.util.Optional<Coordenador> AtualizarCoordenador(int idCoordenador, CoordenadorDTO dto) {
        return coordenadorRepository.findById(idCoordenador)
                .map(coo -> {
                	coo.setNomeCoordenador(dto.getNomeCoordenador());
                    coo.setMatriCoordenador(dto.getMatriCoordenador());
                    coo.setSenhaCoordenador(dto.getSenhaCoordenador());
                    coo.setEmailCoordenador(dto.getEmailCoordenador());

                    return coordenadorRepository.save(coo);
                });
    }

}
