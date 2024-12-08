package net.javaguides.cars.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date datePaiement;
    @Enumerated(EnumType.STRING)
    private MethodePaiement methodePaiement;
    private double montant;

    @OneToOne(mappedBy = "paiement")
    private Reservation reservation;
}
