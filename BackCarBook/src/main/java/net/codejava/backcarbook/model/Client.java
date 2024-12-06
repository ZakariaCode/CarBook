package net.codejava.backcarbook.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("Client")
public class Client extends Utilisateur {
    @OneToMany(mappedBy = "client")
    private Collection<Reservation> reservations;

    @OneToOne
    private Avis Avis;

}