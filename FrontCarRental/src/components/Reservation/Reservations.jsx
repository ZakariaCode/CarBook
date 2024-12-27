import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoLogoModelS } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiCalendarHalfYear } from "react-icons/gi";
import { getcar } from "../../services/VehiculesService";
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
    <div className=" bg-gray-100 overflow-y-auto h-screen dark:bg-dark dark:text-white items-center pt-24">
      <div className="mt-[5vh] container grid md:grid-cols-2 sm:grid-cols-1 md:space-x-6">
        {vehicule ? (
          <div className="space-y-4">
            <div className="bg-white shadow-xl dark:bg-transparent flex flex-col rounded-md p-6">
              <div className="">
                <h1 className="text-3xl sm:text-4xl tracking-wider text-primary	 text-center font-semibold font-serif mb-3">
                  {vehicule.marque}
                </h1>
              </div>
              <div className="">
                <img
                  src={vehicule.image}
                  alt=""
                  className="rounded-md mx-auto"
                />
              </div>
            </div>
            <div className="bg-white shadow-xl md:max-w-[86vw] sm:w-full dark:bg-transparent rounded-md p-6 space-y-6">
              <h1 className="text-xl font-medium border-b border-1 border-double ">
                Spécification
              </h1>
              <div className="grid gap-y-9 md:grid-cols-3 sm:grid-cols-1">
                <div className="flex space-x-4 grid-cols-2">
                  <div>
                    <IoLogoModelS className="size-8 h-10 w-10 text-gray-600 border border-1 rounded-md  border-gray-600 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="text-md font-semibold ">Module</span>
                    <p className="font-thin">{vehicule.modele}</p>
                  </div>
                </div>
                <div className="flex space-x-4 grid-cols-2">
                  <div>
                    <GiGearStickPattern className="size-8 h-10 w-10 text-gray-600 border border-1 rounded-md  border-gray-600 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="text-md font-semibold ">Type </span>
                    <p className="font-thin">{vehicule.type}</p>
                  </div>
                </div>
                <div className="flex space-x-4 grid-cols-2">
                  <div>
                    <LuFuel className="size-8 h-10 w-10 text-gray-600 border border-1 rounded-md  border-gray-600 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="text-md font-semibold ">Carburant</span>
                    <p className="font-thin">{vehicule.carburant}</p>
                  </div>
                </div>
                <div className="flex space-x-4 grid-cols-2">
                  <div>
                    <MdOutlinePriceCheck className="size-8 h-10 w-10 text-gray-600 border border-1 rounded-md  border-gray-600 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="text-md font-semibold ">Price</span>
                    <p className="font-thin">{vehicule.tarif}</p>
                  </div>
                </div>
                <div className="flex space-x-4 grid-cols-2">
                  <div>
                    <GiCalendarHalfYear className="size-8 h-10 w-10 text-gray-600 border border-1 rounded-md  border-gray-600 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="text-md font-semibold ">Année</span>
                    <p className="font-thin">
                      {new Date(vehicule.annee).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl">Loading...</div>
        )}
        <div className="bg-white mt-6 md:mt-0 shadow-xl dark:bg-transparent dark:text-white rounded-md p-6">
          <h1 className="h-[5vh] text-xl mb-3 font-medium border-b border-1 border-double text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 animate-gradient-text font-extrabold text-2xl tracking-wider">
              {displayedText}
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg p-6 max-w-md mx-auto space-y-6"
          >
            {success && (
              <div className="bg-green-500 text-white p-2 rounded-md">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white p-2 rounded-md">
                {error}
              </div>
            )}
            <div>
              <label className="block text-gray-700 dark:text-white font-medium mb-2">
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
              <label className="block text-gray-700 dark:text-white font-medium mb-2">
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full border dark:text-black rounded-md p-2"
              >
                <option value="">Select Location</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Marrakech">Marrakech</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-white font-medium mb-2">
                Dropoff Location
              </label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full border dark:text-black rounded-md p-2"
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
              <label className="block text-gray-700 dark:text-white font-medium mb-2">
                Pickup Date
              </label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="border dark:text-black rounded-md p-2 w-2/3"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="border dark:text-black rounded-md p-2 w-1/3"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white font-medium mb-2">
                Drop-off Date
              </label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="border dark:text-black rounded-md p-2 w-2/3"
                />
                <input
                  type="time"
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="border dark:text-black rounded-md p-2 w-1/3"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
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
