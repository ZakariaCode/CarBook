package net.codejava.backcarbook.model;

import jakarta.persistence.*;

import java.util.Date;
@Entity
public class reservation {
    @EmbeddedId
    private cleReservation id;

    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name="user_id")
    private utilisateur user;

    @ManyToOne
    @MapsId("vehicule_id")
    @JoinColumn(name="vehicule_id")
    private vehicule vehicule;

    @ManyToOne
    @JoinColumn(name="contratId")
    private contrat contrat;

    @ManyToOne
    @JoinColumn(name="paiment")
    private paiement paiement;


    private Date datedebut;
    private Date datefin;

    public cleReservation getId() {
        return id;
    }

    public void setId(cleReservation id) {
        this.id = id;
    }

    public utilisateur getUser() {
        return user;
    }

    public void setUser(utilisateur user) {
        this.user = user;
    }

    public net.codejava.backcarbook.model.vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(net.codejava.backcarbook.model.vehicule vehicule) {
        this.vehicule = vehicule;
    }

    public net.codejava.backcarbook.model.contrat getContrat() {
        return contrat;
    }

    public void setContrat(net.codejava.backcarbook.model.contrat contrat) {
        this.contrat = contrat;
    }

    public net.codejava.backcarbook.model.paiement getPaiement() {
        return paiement;
    }

    public void setPaiement(net.codejava.backcarbook.model.paiement paiement) {
        this.paiement = paiement;
    }

    public Date getDatedebut() {
        return datedebut;
    }

    public void setDatedebut(Date datedebut) {
        this.datedebut = datedebut;
    }

    public Date getDatefin() {
        return datefin;
    }

    public void setDatefin(Date datefin) {
        this.datefin = datefin;
    }






}
