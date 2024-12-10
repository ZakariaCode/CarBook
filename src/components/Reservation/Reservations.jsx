import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLogoModelS } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { GiCalendarHalfYear } from "react-icons/gi";

const Reservations = () => {
  const [rentalType, setRentalType] = useState("day");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState(
    "Casablanca – Aéroport"
  );
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("23:00");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("23:00");

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      rentalType,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    };
    console.log("Booking Details: ", bookingDetails);
  };
  const [vehicule, setVehicule] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/vehicules/getVehicule/" + id)
      .then((res) => res.json())
      .then((result) => {
        setVehicule(result);
      })
      .catch((error) => {
        console.error("Error fetching vehicule:", error);
      });
  }, [id]);
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
    <div className=" bg-gray-100 overflow-y-auto pb-12 dark:bg-dark dark:text-white pt-24">
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
              <div className="grid gap-y-4 md:grid-cols-3 sm:grid-cols-1">
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
                    <p className="font-thin">{vehicule.modele}</p>
                  </div>
                </div>
                <div className="flex space-x-4 grid-cols-2">
                  <div>
                    <LuFuel className="size-8 h-10 w-10 text-gray-600 border border-1 rounded-md  border-gray-600 " />
                  </div>
                  <div className="mt-[-3px]">
                    <span className="text-md font-semibold ">Module</span>
                    <p className="font-thin">{vehicule.modele}</p>
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
          <h1 className="h-[5vh] text-xl mb-3 font-medium border-b border-1 border-double">
            {displayedText}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg p-6 max-w-md mx-auto space-y-6"
          >
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
