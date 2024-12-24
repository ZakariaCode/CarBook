import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/contrat";

export const addContrat = (contrat) =>
    axios.post(REST_API_BASE_URL, contrat);