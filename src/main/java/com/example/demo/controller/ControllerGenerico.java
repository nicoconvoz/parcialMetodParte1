package com.example.demo.controller;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.service.DomicilioService;

import com.example.demo.service.JServiceGenerico;

@Controller
public abstract class ControllerGenerico <DTO> {
	
	private JServiceGenerico service;
	
	
	public ControllerGenerico(JServiceGenerico service) {
		this.service = service;
	}
	
	@GetMapping("/get/{page}")
	@Transactional
	public ResponseEntity getAll(@PathVariable int page){
		
		try {
			
			return ResponseEntity.status(HttpStatus.OK).body(service.findAll(page));
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Error. Please try again later.\"}");
			
		}
		
	}
	
	@GetMapping("/{id}")
	@Transactional
	public ResponseEntity getOne(@PathVariable long id) {
		
		try {
			
			return ResponseEntity.status(HttpStatus.OK).body(service.findById(id));
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the ID, and try again later.\"}");
			
		}
		
	}
	
	
	@PostMapping("/")
	@Transactional
	public ResponseEntity post(@RequestBody DTO dto) {
		
		try {
			
			DTO result = (DTO) service.save(dto);
			return ResponseEntity.status(HttpStatus.OK).body(result);
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the BODY request, and try again later.\"}");
						
		}
		
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity put(@PathVariable long id, @RequestBody DTO dto) {
		
		try {
			
			DTO result = (DTO) service.update(id, dto);
			return ResponseEntity.status(HttpStatus.OK).body(result);
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the ID or BODY request, and try again later.\"}");
						
		}
		
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity delete(@PathVariable long id) {
		
		try {
			
			service.delete(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the ID or BODY request, and try again later.\"}");
						
		}
		
	}
	
}
