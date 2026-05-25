package com.cochiloco.repositories;

import com.cochiloco.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    List<Categoria> findByActivaTrue();
    Categoria findByNombre(String nombre);
}