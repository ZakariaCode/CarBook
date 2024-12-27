import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/admin';

export const updateAdmin=(idAdmin,admin) => axios.put(REST_API_BASE_URL+"/"+idAdmin,admin);
export const updateImage=(formData) => axios.put(REST_API_BASE_URL+"/image",formData);
export const getAdmin=() => axios.get(REST_API_BASE_URL);
