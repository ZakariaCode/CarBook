package net.codejava.BackCarRental.model;

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
    private float montant;

    @OneToOne(mappedBy = "paiement")
    private Reservation reservation;
}
