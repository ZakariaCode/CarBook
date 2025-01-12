package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "User_role", length = 25)
public  class Utilisateur implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;

    private String password;

    private String CIN;

    private String adresse;

    private String ville;

    private String image;

    private String role;

    private Boolean locked = false;

    private Boolean enabled = false;

    public Utilisateur(String nom, String email, String password, String CIN, String adresse, String ville, String image, String role) {
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.CIN = CIN;
        this.adresse = adresse;
        this.ville = ville;
        this.image = image;
        this.role = role;

    }
    public Utilisateur(String nom, String email, String password, String CIN, String adresse, String ville, String role) {
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.CIN = CIN;
        this.adresse = adresse;
        this.ville = ville;
        this.role = role;

    }


// Méthodes de UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
    public  String getRole(){
        return role;
    };
}
