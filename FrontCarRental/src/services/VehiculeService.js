import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/cars';

export const listCars=() => axios.get(REST_API_BASE_URL);
export const createCar=(car) => axios.post(REST_API_BASE_URL,car);
export const updateCar=(idCar,car) => axios.put(REST_API_BASE_URL+"/"+idCar,car);
export const deleteVehicule=(idCar) => axios.delete(REST_API_BASE_URL+"/"+idCar);
export const updateImage=(formData) => axios.put(REST_API_BASE_URL+"/image",formData);
export const getTotalVehicules=() => axios.get(REST_API_BASE_URL+"/totalVehicule");
export const popularCar=() => axios.get(REST_API_BASE_URL+"/popularCars");
export const getcar=(idCar) => axios.get(REST_API_BASE_URL+"/"+idCar);
