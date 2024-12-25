import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/customers';

export const updateClient=(idClient,client) => axios.put(REST_API_BASE_URL+"/"+idClient,client);
export const listClient=() => axios.get(REST_API_BASE_URL);
export const nombres_communaute=() => axios.get(REST_API_BASE_URL+"/clients_communaute");
export const getAvisByClientID=(idClient) => axios.get(REST_API_BASE_URL+"/avis/"+idClient);
export const getAllClientAvis=() => axios.get(REST_API_BASE_URL+"/avis");