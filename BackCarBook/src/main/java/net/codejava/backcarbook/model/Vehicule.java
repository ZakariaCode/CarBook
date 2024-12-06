package net.codejava.backcarbook.model;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.Date;

@Entity
public class Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String modele;
    private String type;
    private String statut;
    private float tarif;
    private Date annee;

    @OneToMany(mappedBy = "vehicule")
    private Collection<Reservation> reservations;

}