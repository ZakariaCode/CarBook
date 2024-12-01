package net.codejava.backcarbook.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class cleReservation {
    private int user_id;
    private int vehicule_id;

    public cleReservation(int user_id, int vehicule_id) {
        this.user_id = user_id;
        this.vehicule_id = vehicule_id;
    }

    public cleReservation() {

    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getVehicule_id() {
        return vehicule_id;
    }

    public void setVehicule_id(int vehicule_id) {
        this.vehicule_id = vehicule_id;
    }
}
