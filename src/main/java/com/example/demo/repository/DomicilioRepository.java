package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Domicilio;

public interface DomicilioRepository extends JpaRepository<Domicilio, Long> {
	
	@Query("from Domicilio s where s.persona.id like ?1")
	 List<Domicilio> buscarporIdP(long id, Pageable pageable);
	
	@Query(value="select * from Domicilio", nativeQuery=true)
	public List<Domicilio> traerTodos(Pageable pageable);
	
}
