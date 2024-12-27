package net.codejava.BackCarRental.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("Client")
public class Client extends Utilisateur {
    @OneToMany(mappedBy = "client")
    private Collection<Reservation> reservations;

    @OneToOne
    private Avis Avis;
}
