package net.codejava.backcarbook.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date dateDebut;
    private Date dateFin;
    private float montant;

    @ManyToOne
    private Vehicule vehicule;

    @ManyToOne
    private Client client ;

    @OneToOne
    private Paiement paiement;

    @OneToOne
    private Contrat contrat;

}