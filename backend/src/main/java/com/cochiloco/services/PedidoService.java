package com.cochiloco.services;

import com.cochiloco.entities.Pedido;
import com.cochiloco.repositories.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PedidoService {
    
    private final PedidoRepository pedidoRepository;
    
    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }
    
    public Optional<Pedido> obtenerPorId(Integer id) {
        return pedidoRepository.findById(id);
    }
    
    public List<Pedido> obtenerPorCliente(Integer clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }
    
    public Pedido crear(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    
    public Pedido actualizar(Integer id, Pedido pedidoActualizado) {
        return pedidoRepository.findById(id)
            .map(pedido -> {
                pedido.setEstado(pedidoActualizado.getEstado());
                pedido.setTotal(pedidoActualizado.getTotal());
                pedido.setFecha(pedidoActualizado.getFecha());
                return pedidoRepository.save(pedido);
            })
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }
    
    public void eliminar(Integer id) {
        pedidoRepository.deleteById(id);
    }

    public List<Pedido> obtenerPendientes() {
    return pedidoRepository.findByEstado("PENDIENTE");
}
}