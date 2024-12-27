import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/vehicules';

export  const listCars=() => axios.get(REST_API_BASE_URL);
export const createCar=(car) => axios.post(REST_API_BASE_URL,car);
export const getcar=(idCar) => axios.get(REST_API_BASE_URL+"/getVehicule/"+idCar);
export const updateCar=(idCar,car) => axios.put(REST_API_BASE_URL+"/"+idCar,car);
export const deleteVehicule=(idCar) => axios.delete(REST_API_BASE_URL+"/"+idCar);

