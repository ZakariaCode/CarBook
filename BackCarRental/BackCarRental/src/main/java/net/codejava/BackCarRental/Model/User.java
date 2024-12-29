package net.codejava.BackCarRental.Model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;
    private String adresse;
    private String ville;

    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;

    private Boolean locked = false;
    private Boolean enabled = false;

    @OneToMany(mappedBy = "user")
    private Collection<ConfirmationToken> confirmationToken;

    public User() {}

    public User(String nom, String password, String email, AppUserRole appUserRole) {
        this.nom = nom;
        this.password = password;
        this.email = email;
        this.appUserRole = appUserRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.toString());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
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

    public void setRole(AppUserRole appUserRole) {
        this.appUserRole = appUserRole;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public AppUserRole getRole() {
        return appUserRole;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
