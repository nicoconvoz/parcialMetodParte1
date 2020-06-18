package com.example.demo.controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.DTO;
import com.example.demo.service.DomicilioService;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,
		RequestMethod.PUT })
@RequestMapping(path = "api/v1/domicilio")
public class DomicilioController extends ControllerGenerico<DTO> {
	
	@Autowired
	private DomicilioService domService;
	
	public DomicilioController(DomicilioService domicilioService) {
		super(domicilioService);
	}
	
	@GetMapping("/{page}/consultar/{id}")
	@Transactional
	public ResponseEntity traerTodos(@PathVariable long id, @PathVariable int page){
		
		try {
			return ResponseEntity.status(HttpStatus.OK).body(domService.traerTodos(id, page));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Error. Please try again later.\"}");
			
		}
	}
	
}
