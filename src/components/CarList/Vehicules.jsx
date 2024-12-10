import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Vehicules = () => {
  const Navigate = useNavigate();
  const [vehicules, setVehicules] = useState([]);
  const [filteredVehicules, setFilteredVehicules] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  useEffect(() => {
    fetch("http://localhost:8080/vehicules/getAll")
      .then((res) => res.json())
      .then((result) => {
        setVehicules(result);
        setFilteredVehicules(result); // Initialiser avec tous les véhicules
      })
      .catch((error) => {
        console.error("Error fetching vehicules:", error);
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleSearchChange = (e) => setSearchedValue(e.target.value);

  return (
    <div className="pb-[53.5vh] bg-gray-100  dark:bg-dark dark:text-white pt-24">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl text-center font-semibold font-serif mb-3">
          Our Cars
        </h1>
        <p className="text-center pb-10">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque totam omnis mollitia!
        </p>

        <form className="max-w-lg mx-auto m-12 mb-24">
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
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
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
              {/* <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button> */}
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-16">
          {filteredVehicules.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-transparent space-y-3 border-2 border-gray-300 hover:border-primary p-4 rounded-xl relative group"
            >
              <div className="w-full h-[120px] mb-16">
                <img
                  className="h-[160px] object-contain rounded-lg sm:translate-x-8 group-hover:translate-x-16 duration-700"
                  src={car.image}
                  alt={car.marque}
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-primary font-semibold">
                  {car.marque} - {car.modele}
                </h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>{car.tarif}/Day</p>
                  <button onClick={()=>Navigate(`/vehicules/reserver/${car.id}`)} className=" rounded-full p-2 hover:bg-primary hover:text-white duration-300">Réserver</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicules;
