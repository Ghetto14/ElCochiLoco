package com.cochiloco.services;

import com.cochiloco.entities.Categoria;
import com.cochiloco.repositories.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    
    private final CategoriaRepository categoriaRepository;
    
    public List<Categoria> obtenerTodas() {
        return categoriaRepository.findByActivaTrue();
    }
    
    public Optional<Categoria> obtenerPorId(Integer id) {
        return categoriaRepository.findById(id);
    }
    
    public Categoria crear(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    // ✅ Método actualizar
    public Categoria actualizar(Integer id, Categoria categoriaActualizada) {
        return categoriaRepository.findById(id)
            .map(categoria -> {
                categoria.setNombre(categoriaActualizada.getNombre());
                categoria.setDescripcion(categoriaActualizada.getDescripcion());
                categoria.setActiva(categoriaActualizada.getActiva());
                return categoriaRepository.save(categoria);
            })
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
    }
    
    // ✅ Método eliminar
    public void eliminar(Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con ID: " + id);
        }
        categoriaRepository.deleteById(id);
    }
}