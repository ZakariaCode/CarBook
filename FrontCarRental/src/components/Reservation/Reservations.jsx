import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoLogoModelS } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiCalendarHalfYear } from "react-icons/gi";
import { getcar } from "../../services/VehiculeService";
import {
  createReservation,
  ValideDate,
} from "../../services/ReservationService";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { MdOutlinePriceCheck } from "react-icons/md";

const Reservations = () => {
  const Navigate = useNavigate();
  const [rentalType, setRentalType] = useState("day");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState(
    "Casablanca – Aéroport"
  );
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("23:00");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("23:00");
  const [vehicule, setVehicule] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getcar(id)
      .then((response) => {
        setVehicule(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateDebut = new Date(pickupDate + "T" + pickupTime);
    const dateFin = new Date(dropoffDate + "T" + dropoffTime);

    const result = ValideDate(dateDebut, dateFin);
    if (!result.isValid) {
      setError(result.message);
      setSuccess("");
      setTimeout(() => setError(""), 4000);
      return;
    } else {
    const reservation = {
      dateDebut,
      dateFin,
      vehiculeId: vehicule.id,
      clientId:1
    };

    try {
      const response = await createReservation(reservation);
      setSuccess("Booking successfully!");
      setError("");
      setTimeout(() => setSuccess(""), 2000);
      Navigate(`/vehicules/paiment/${response.data.id}`);
      console.log("Réservation réussie :", response.data.id);
    } catch (error) {
      setError("Le véhicule est déjà réservé pour ces dates !");
      console.log(error);
      setTimeout(() => setError(""), 4000);
      setSuccess("");
    }
  }
  };

  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Reserve your car easily and quickly ";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const animateText = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 1000);
        clearInterval(animateText);
      }
    }, 150);

    return () => clearInterval(animateText);
  }, [index, fullText]);
  return (
    <div className="items-center h-screen pt-24 overflow-y-auto bg-gray-100 dark:bg-dark dark:text-white">
      <div className="mt-[5vh] container grid md:grid-cols-2 sm:grid-cols-1 md:space-x-6">
        {vehicule ? (
          <div className="space-y-4">
            <div className="flex flex-col p-6 bg-white rounded-md shadow-xl dark:bg-transparent">
              <div className="">
                <h1 className="mb-3 font-serif text-3xl font-semibold tracking-wider text-center sm:text-4xl text-primary">
                  {vehicule.marque}
                </h1>
              </div>
              <div className="">
                <img
                  src={vehicule.image}
                  alt=""
                  className="mx-auto rounded-md"
                />
              </div>
            </div>
            <div className="bg-white shadow-xl md:max-w-[86vw] sm:w-full dark:bg-transparent rounded-md p-6 space-y-6">
              <h1 className="text-xl font-medium border-b border-double border-1 ">
                Spécification
              </h1>
              <div className="grid gap-y-9 md:grid-cols-3 sm:grid-cols-1">
                <div className="flex grid-cols-2 space-x-4">
                  <div>
                    <IoLogoModelS className="w-10 h-10 text-gray-600 border border-gray-600 rounded-md size-8 border-1 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="font-semibold text-md ">Module</span>
                    <p className="font-thin">{vehicule.modele}</p>
                  </div>
                </div>
                <div className="flex grid-cols-2 space-x-4">
                  <div>
                    <GiGearStickPattern className="w-10 h-10 text-gray-600 border border-gray-600 rounded-md size-8 border-1 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="font-semibold text-md ">Type </span>
                    <p className="font-thin">{vehicule.type}</p>
                  </div>
                </div>
                <div className="flex grid-cols-2 space-x-4">
                  <div>
                    <LuFuel className="w-10 h-10 text-gray-600 border border-gray-600 rounded-md size-8 border-1 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="font-semibold text-md ">Carburant</span>
                    <p className="font-thin">{vehicule.carburant}</p>
                  </div>
                </div>
                <div className="flex grid-cols-2 space-x-4">
                  <div>
                    <MdOutlinePriceCheck className="w-10 h-10 text-gray-600 border border-gray-600 rounded-md size-8 border-1 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="font-semibold text-md ">Price</span>
                    <p className="font-thin">{vehicule.tarif}</p>
                  </div>
                </div>
                <div className="flex grid-cols-2 space-x-4">
                  <div>
                    <GiCalendarHalfYear className="w-10 h-10 text-gray-600 border border-gray-600 rounded-md size-8 border-1 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="font-semibold text-md ">Année</span>
                    <p className="font-thin">
                      {new Date(vehicule.annee).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-2xl text-center">Loading...</div>
        )}
        <div className="p-6 mt-6 bg-white rounded-md shadow-xl md:mt-0 dark:bg-transparent dark:text-white">
          <h1 className="h-[5vh] text-xl mb-3 font-medium border-b border-1 border-double text-center">
            <span className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 animate-gradient-text">
              {displayedText}
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-md p-6 mx-auto space-y-6 rounded-lg"
          >
            {success && (
              <div className="p-2 text-white bg-green-500 rounded-md">
                {success}
              </div>
            )}
            {error && (
              <div className="p-2 text-white bg-red-500 rounded-md">
                {error}
              </div>
            )}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-white">
                Rental Type
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rentalType"
                    value="day"
                    checked={rentalType === "day"}
                    onChange={(e) => setRentalType(e.target.value)}
                    className="mr-2"
                  />
                  Day
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rentalType"
                    value="hour"
                    checked={rentalType === "hour"}
                    onChange={(e) => setRentalType(e.target.value)}
                    className="mr-2"
                  />
                  Hour
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-white">
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-2 border rounded-md dark:text-black"
              >
                <option value="">Select Location</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Marrakech">Marrakech</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-white">
                Dropoff Location
              </label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full p-2 border rounded-md dark:text-black"
              >
                <option value="Casablanca – Aéroport">
                  Casablanca – Aéroport
                </option>
                <option value="Rabat – Gare">Rabat – Gare</option>
                <option value="Marrakech – Centre Ville">
                  Marrakech – Centre Ville
                </option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-white">
                Pickup Date
              </label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-2/3 p-2 border rounded-md dark:text-black"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-1/3 p-2 border rounded-md dark:text-black"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-white">
                Drop-off Date
              </label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="w-2/3 p-2 border rounded-md dark:text-black"
                />
                <input
                  type="time"
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="w-1/3 p-2 border rounded-md dark:text-black"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
