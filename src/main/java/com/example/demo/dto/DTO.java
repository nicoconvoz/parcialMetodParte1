package com.example.demo.dto;

import com.example.demo.entity.Persona;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO  extends BaseDTO{
		
		private String nombre;
		private String apellido;
		private int dni;
		private int edad;
		private String calle;
		private int numero;
		private String localidad;
		private String departamento;
		private String piso;
		private long personaRelacionada;
	
}
