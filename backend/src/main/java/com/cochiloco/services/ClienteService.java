package com.cochiloco.services;

import com.cochiloco.entities.Cliente;
import com.cochiloco.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {
    
    private final ClienteRepository clienteRepository;
    
    public List<Cliente> obtenerTodos() {
        return clienteRepository.findAll();
    }
    
    public Optional<Cliente> obtenerPorId(Integer id) {
        return clienteRepository.findById(id);
    }
    
    public Optional<Cliente> obtenerPorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }
    
    @Transactional
    public Cliente crear(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
    
    @Transactional
    public Cliente actualizar(Integer id, Cliente clienteActualizado) {
        return clienteRepository.findById(id)
            .map(cliente -> {
                cliente.setNombre(clienteActualizado.getNombre());
                cliente.setEmail(clienteActualizado.getEmail());
                cliente.setPassword(clienteActualizado.getPassword());
                cliente.setTelefono(clienteActualizado.getTelefono());
                cliente.setCiudad(clienteActualizado.getCiudad());
                cliente.setDireccion(clienteActualizado.getDireccion());
                cliente.setTipoCliente(clienteActualizado.getTipoCliente());
                cliente.setActivo(clienteActualizado.getActivo());
                return clienteRepository.save(cliente);
            })
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + id));
    }
    
    @Transactional
    public void eliminar(Integer id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente no encontrado con ID: " + id);
        }
        clienteRepository.deleteById(id);
    }
}