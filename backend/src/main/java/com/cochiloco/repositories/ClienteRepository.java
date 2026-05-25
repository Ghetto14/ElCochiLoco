package com.cochiloco.repositories;

import com.cochiloco.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    
    // ✅ NUEVO MÉTODO - Buscar por email
    Optional<Cliente> findByEmail(String email);
}