import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/reservations";

export const listReservations = () => axios.get(REST_API_BASE_URL);
export const createReservation = (reservation) =>
  axios.post(REST_API_BASE_URL, reservation);

export const ValideDate = (datedebut, datefin) => {
  const now = new Date();
  const date1 = new Date(datedebut);
  const date2 = new Date(datefin);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDate = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );

  if (startDate <= today) {
    return {
      isValid: false,
      message: "La date de début doit être supérieure à la date actuelle.",
    };
  }

  const isSameDay =
    date1.toISOString().split("T")[0] === date2.toISOString().split("T")[0];
  if (isSameDay) {
    return {
      isValid: false,
      message:
        "La date de début et la date de fin ne doivent pas être le même jour.",
    };
  }
  if (date1 >= date2) {
    return {
      isValid: false,
      message: "La date de début doit être inférieure à la date de fin.",
    };
  }
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { isValid: true, days: diffDays };
};
