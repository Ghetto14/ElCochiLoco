package com.cochiloco.repositories;

import com.cochiloco.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByCategoria_Nombre(String nombre);  // ← Así debe estar
    List<Producto> findByCategoria_Id(Integer categoriaId);  // ← Agrega esta línea

}