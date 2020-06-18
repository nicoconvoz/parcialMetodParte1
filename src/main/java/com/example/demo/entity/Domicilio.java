package com.example.demo.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Domicilio extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String calle;
	private int numero;
	private String localidad;
	private String departamento;
	private String piso;
	
	@ManyToOne
	private Persona persona;
	

}

