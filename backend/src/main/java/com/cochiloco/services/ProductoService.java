package com.cochiloco.services;

import com.cochiloco.entities.Producto;
import com.cochiloco.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductoService {
    
    private final ProductoRepository productoRepository;
    
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }
    
    public Optional<Producto> obtenerPorId(Integer id) {
        return productoRepository.findById(id);
    }
    
    // ✅ Actualizado para usar el nuevo método
    public List<Producto> obtenerPorCategoria(String nombreCategoria) {
        return productoRepository.findByCategoria_Nombre(nombreCategoria);
    }
    
    // ✅ Método adicional útil
    public List<Producto> obtenerPorCategoriaId(Integer categoriaId) {
        return productoRepository.findByCategoria_Id(categoriaId);
    }
    
    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }
    
    public Producto actualizar(Integer id, Producto productoActualizado) {
        return productoRepository.findById(id)
            .map(producto -> {
                producto.setNombre(productoActualizado.getNombre());
                producto.setDescripcion(productoActualizado.getDescripcion());
                producto.setCategoria(productoActualizado.getCategoria());
                producto.setPrecio(productoActualizado.getPrecio());
                producto.setImagen(productoActualizado.getImagen());
                producto.setEsFrio(productoActualizado.getEsFrio());
                producto.setStock(productoActualizado.getStock());
                producto.setActivo(productoActualizado.getActivo());
                return productoRepository.save(producto);
            })
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
    }
    
    public void eliminar(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }
}