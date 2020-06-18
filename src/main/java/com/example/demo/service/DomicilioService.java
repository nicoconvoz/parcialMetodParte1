package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DTO;
import com.example.demo.entity.Domicilio;
import com.example.demo.entity.Persona;
import com.example.demo.repository.DomicilioRepository;
import com.example.demo.repository.PersonaRepository;

@Service
public class DomicilioService extends ServicioGenerico<Domicilio, DTO> {
	
	protected final DomicilioRepository repository;
	protected final PersonaRepository repositoriopersona;

	public DomicilioService(DomicilioRepository domicilioRepository,PersonaRepository repositoriopersona) {
		this.repository=domicilioRepository;
		this.repositoriopersona = repositoriopersona;
	}
	
	@Override
	@Transactional
	public List<DTO> findAll(int page) throws Exception{
		
		Pageable myPage = PageRequest.of(page, 10);
		
		Page todos = repository.findAll(myPage);
		
		List<Domicilio> entities = todos.getContent();
		
		List<DTO> dtos = new ArrayList<>();
		try {
			for( Domicilio d : entities) {
				DTO unDto = new DTO();
				unDto.setId(d.getId());
				unDto.setCalle(d.getCalle());
				unDto.setDepartamento(d.getDepartamento());
				unDto.setLocalidad(d.getLocalidad());
				unDto.setNumero(d.getNumero());
				unDto.setPiso(d.getPiso());
				unDto.setPersonaRelacionada(d.getPersona().getId());
				dtos.add(unDto);
			}
			return dtos;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public List<DTO> traerTodos(long id, int page) throws Exception{
		
		Pageable myPage = PageRequest.of(page, 10);
		
		List<Domicilio> entities = repository.buscarporIdP(id, myPage);
		
		List<DTO> dtos = new ArrayList<>();
		try {
			for( Domicilio d : entities) {
				DTO unDto = new DTO();
				unDto.setId(d.getId());
				unDto.setCalle(d.getCalle());
				unDto.setDepartamento(d.getDepartamento());
				unDto.setLocalidad(d.getLocalidad());
				unDto.setNumero(d.getNumero());
				unDto.setPiso(d.getPiso());
				unDto.setPersonaRelacionada(d.getPersona().getId());
				dtos.add(unDto);
			}
			return dtos;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	
	@Override
	@Transactional
	public DTO findById(long id) throws Exception{
		Optional<Domicilio> entityOptional = repository.findById(id);
		DTO unDto = new DTO();
		try {
			Domicilio d = entityOptional.get();
			unDto.setId(d.getId());
			unDto.setCalle(d.getCalle());
			unDto.setDepartamento(d.getDepartamento());
			unDto.setLocalidad(d.getLocalidad());
			unDto.setNumero(d.getNumero());
			unDto.setPiso(d.getPiso());
			unDto.setPersonaRelacionada(d.getPersona().getId());
			return unDto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	@Override
	@Transactional
	public DTO save(DTO dto) throws Exception{
		Domicilio entity = new Domicilio();
		entity.setCalle(dto.getCalle());
		entity.setDepartamento(dto.getDepartamento());
		entity.setLocalidad(dto.getLocalidad());
		entity.setNumero(dto.getNumero());
		entity.setPiso(dto.getPiso());
		
		Optional<Persona> persona = repositoriopersona.findById(dto.getPersonaRelacionada());
		Persona relacion = persona.get();
		entity.setPersona(relacion);
		
		try {
			entity = repository.save(entity);
			dto.setId(entity.getId());
			
			return dto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	@Override
	@Transactional
	public DTO update(long id, DTO dto) throws Exception{
		Optional<Domicilio> entityOptional = repository.findById(id);
		try {
			Domicilio entidad = entityOptional.get();
			entidad.setId(dto.getId());
			entidad.setCalle(dto.getCalle());
			entidad.setDepartamento(dto.getDepartamento());
			entidad.setLocalidad(dto.getLocalidad());
			entidad.setNumero(dto.getNumero());
			entidad.setPiso(dto.getPiso());
			Optional<Persona> persona = repositoriopersona.findById(dto.getPersonaRelacionada());
			Persona relacion = persona.get();
			entidad.setPersona(relacion);
			
			repository.save(entidad);
			dto.setId(entidad.getId());
			return dto;
		}catch(Exception e) {
			throw new Exception();
		}
	}
	@Override
	@Transactional
	public boolean delete(long id) throws Exception{
		try {
			if(repository.existsById(id)) {
				repository.deleteById(id);
				return true;
			}else {
				throw new Exception();
			}
		}catch(Exception e) {
			throw new Exception();
		}
	}
	

}
