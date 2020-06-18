package com.example.demo.service;

import java.util.List;


public interface JServiceGenerico<DTO> {

	public List<DTO> findAll(int page) throws Exception;
	
	public DTO findById(long id) throws Exception;
	
	public DTO save (DTO dto) throws Exception;
	
	public DTO update (long id, DTO dto) throws Exception;
	
	public boolean delete(long id) throws Exception;
	
	
}