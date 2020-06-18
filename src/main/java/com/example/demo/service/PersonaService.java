package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.DTO;
import com.example.demo.entity.Persona;
import com.example.demo.repository.PersonaRepository;

@Service
public class PersonaService extends ServicioGenerico<Persona, DTO> {
	
	public PersonaService(PersonaRepository personaRepository) {
		super(personaRepository, DTO.class, Persona.class);
	}
	
}
