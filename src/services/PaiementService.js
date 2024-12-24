import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/paiement";

export const addPaiement = (paiement) =>axios.post(REST_API_BASE_URL, paiement);