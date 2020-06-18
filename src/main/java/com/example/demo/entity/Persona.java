package com.example.demo.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Persona extends BaseEntity implements Serializable  {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "Nombre")
	private String nombre;
	
	@Column(name = "Apellido")
	private String apellido;
	
	@Column(name = "Edad")
	private int edad;
	
	@Column(name = "Dni")
	private int dni;
	
	@OneToMany(mappedBy = "persona", cascade = CascadeType.ALL)
	private List<Domicilio> domicilios;
	
}
