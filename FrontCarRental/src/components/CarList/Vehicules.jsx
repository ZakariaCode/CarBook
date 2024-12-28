import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listCars } from "../../services/VehiculeService";
import Avis from "../Avis/Avis";
import { useLocation } from "react-router-dom";


const Vehicules = () => {
  const Navigate = useNavigate();
  const [vehicules, setVehicules] = useState([]);
  const [filteredVehicules, setFilteredVehicules] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const location = useLocation();
    const [showAvisModal, setShowAvisModal] = useState(false);

    useEffect(() => {
        if (location.state && location.state.showAvisModal) {
            setShowAvisModal(true);
        }
    }, [location]);

  useEffect(() => {
    listCars()
      .then((response) => {
        setVehicules(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let filtered = vehicules;
    if (selectedCategory !== "All categories") {
      filtered = filtered.filter(
        (car) => car.type?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchedValue) {
      const normalizedSearch = searchedValue.toLowerCase().replace(" ", "");
      filtered = filtered.filter(
        (car) =>
          car.marque?.toLowerCase().replace(" ", "").includes(normalizedSearch) ||
          car.modele?.toLowerCase().replace(" ", "").includes(normalizedSearch) ||
          car.tarif?.toString().replace(" ", "").includes(normalizedSearch) ||
          car.type?.toLowerCase().replace(" ", "").includes(normalizedSearch)
      );
    }

    setFilteredVehicules(filtered);
  }, [searchedValue, selectedCategory, vehicules]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleSearchChange = (e) => setSearchedValue(e.target.value);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="pb-[53.5vh] bg-gray-100 dark:bg-dark dark:text-white pt-24">
      <div className="container">
        <h1 className="mb-3 font-serif text-3xl font-semibold text-center sm:text-4xl">
          Our Cars
        </h1>
        <p className="pb-10 text-center">
        Explore our wide range of cars, tailored to suit every journey. Whether you're looking for luxury or economy, we have the perfect vehicle for you.
        </p>

        <form className="max-w-lg m-12 mx-auto mb-24">
          <div className="flex">
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
              {selectedCategory}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li
                    onClick={() => handleCategorySelect("All categories")}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    All categories
                  </li>
                  {[...new Set(vehicules.map((car) => car.type))].map((type) => (
                    <li
                      key={type}
                      onClick={() => handleCategorySelect(type)}
                      className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="relative w-full">
              <input
                type="search"
                value={searchedValue}
                onChange={handleSearchChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder="Search by marque, modele, etc..."
              />
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3">
          {filteredVehicules.map((car) => (
            <div
              key={car.id}
              className="relative p-4 space-y-3 bg-white border-2 border-gray-300 dark:bg-transparent hover:border-primary rounded-xl group hover:shadow-xl"
            >
              <div className="w-full h-[120px] mb-16">
                <img
                  className="h-[160px] object-contain rounded-lg sm:translate-x-8 group-hover:translate-x-16 duration-700"
                  src={car.image}
                  alt={car.marque}
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold text-primary">
                  {car.marque} - {car.modele}
                </h1>
                <div className="flex items-center justify-between text-xl font-semibold">
                  <p>{car.tarif}/Day</p>
                  <button
                    onClick={() => Navigate(`/vehicules/reserver/${car.id}`)}
                    className="p-2 duration-300 rounded-full hover:bg-primary hover:text-white"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAvisModal && <Avis />}
    </div>
  );
};

export default Vehicules;
