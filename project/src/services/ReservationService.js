import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/reservations';

export const listReservations=() => axios.get(REST_API_BASE_URL);
export const createReservation=(reservation) => axios.post(REST_API_BASE_URL,reservation);
export const updateReservation=(idReservation,reservation) => axios.put(REST_API_BASE_URL+"/"+idReservation,reservation);
export const getDatePaiementByReservationId=(idReservation) => axios.get(REST_API_BASE_URL+"/paiement/"+idReservation);
export const getVehiculeByReservationId=(idReservation) => axios.get(REST_API_BASE_URL+"/cars/"+idReservation);
export const getClientByReservationId=(idReservation) => axios.get(REST_API_BASE_URL+"/client/"+idReservation);
export const getTotalReservations=() => axios.get(REST_API_BASE_URL+"/totalReservation");
export const getNombreReservationsParMois=(year) => axios.get(REST_API_BASE_URL+"/nombre/"+year,year);
export const getClientsFideles=() => axios.get(REST_API_BASE_URL+"/clients-fideles");
