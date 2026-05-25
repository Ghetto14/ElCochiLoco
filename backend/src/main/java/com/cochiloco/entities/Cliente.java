package com.cochiloco.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, length = 255)  // ← CAMPO NUEVO
    private String password;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(length = 100)
    private String ciudad;
    
    @Column(columnDefinition = "TEXT")
    private String direccion;
    
    @Column(name = "tipo_cliente", length = 50)
    private String tipoCliente = "Regular";
    
    @Column(precision = 3, scale = 1)
    private BigDecimal valoracion = BigDecimal.valueOf(5.0);
    
    @Column(name = "total_pedidos", columnDefinition = "INTEGER DEFAULT 0")
    private Integer totalPedidos = 0;
    
    @Column(name = "fecha_registro", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fechaRegistro;
    
    @Column(name = "fecha_ultimo_pedido")
    private LocalDateTime fechaUltimoPedido;
    
    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean activo = true;
    
    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
    }
}