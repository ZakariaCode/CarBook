import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/paiement';

export const updatePaiement=(idPaiement,paiement) => axios.put(REST_API_BASE_URL+"/"+idPaiement,paiement);
export const listPaiement=() => axios.get(REST_API_BASE_URL);


