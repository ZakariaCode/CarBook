package net.codejava.backcarbook.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date datePaiement;
    private String methodePaiement;
    @OneToOne(mappedBy = "paiement")
    private Reservation reservation;

}
