package com.biblioteca.prestiti.repository;

import com.biblioteca.prestiti.model.PrestitoLibro;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PrestitoLibroRepository extends MongoRepository<PrestitoLibro, String> {}
