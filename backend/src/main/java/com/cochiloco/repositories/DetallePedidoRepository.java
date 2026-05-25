package com.cochiloco.repositories;

import com.cochiloco.entities.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Integer> {
    List<DetallePedido> findByPedido_Id(Integer idPedido);
    List<DetallePedido> findByProducto_Id(Integer idProducto);
}