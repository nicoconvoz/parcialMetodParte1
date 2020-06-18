package com.example.demo.repository;


import java.util.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
	
		@Query(value="select * from Persona", nativeQuery=true)
		public List<Persona> traerTodos(Pageable pageable);
		
}