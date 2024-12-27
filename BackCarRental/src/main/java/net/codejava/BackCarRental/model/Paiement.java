package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paiement {
    @Id
    private String id;
    private Date datePaiement;
    private float montant;
    private String methodePaiement;
    @OneToOne(mappedBy = "paiement")
    private Reservation reservation;

}
