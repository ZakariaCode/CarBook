package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;


@Entity
@Data  @AllArgsConstructor
@DiscriminatorValue("admin")
public class Admin extends Utilisateur {


}