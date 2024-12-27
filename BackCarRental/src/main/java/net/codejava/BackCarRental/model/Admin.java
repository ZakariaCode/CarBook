package net.codejava.BackCarRental.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("admin")
public class Admin extends Utilisateur{
}
