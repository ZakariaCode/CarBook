import React, { useState } from "react";
import {FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {FaUserCircle} from 'react-icons/fa'

export default function Profil() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield",
    city: "Springfield",
    phone: "+123 456 7890",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-[#121212]  rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short">
      <div className="relative flex flex-col items-center mt-28">
        <div className="absolute bottom-4 transform translate-y-1/2">
          <div
            className="h-28 w-28 lg:h-40 lg:w-40 rounded-full border-4 border-white bg-sky-500 bg-cover bg-center"
            style={{  backgroundImage: image ? `url(${image})` : "none", 
            color: image ? "transparent" : "white", }}
          >
            {!image && (
          <div className="h-28 w-28 lg:h-40 lg:w-40 rounded-full flex justify-center items-center ">
            <FaUserCircle size={80} className="text-white font-light pr-2" />
          </div>
        )}
            <button
              className="bg-sky-600 text-white text-sm w-7 h-7 rounded-full flex justify-center items-center absolute bottom-3 lg:bottom-5 right-1"
              onClick={() => document.getElementById("profilInput").click()}
            >
              <FaCamera />
            </button>
            <input
            id="profilInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange} 
          />
          </div>
        </div>
      </div>
      <div className="mt-20 sm:mt-24 md:mt-32 lg:mt-36 px-6 pb-8">
        {!isEditing ? (
          <>
            <h2 className="dark:text-white text-black text-3xl font-bold text-center mb-4">{userData.name}</h2>
            <p className="dark:text-gray-400 text-gray-600 text-center mb-4">Email: {userData.email}</p>
            <p className="dark:text-gray-400 text-gray-600 text-center mb-4">Adresse: {userData.address}</p>
            <p className="dark:text-gray-400 text-gray-600 text-center mb-4">Ville: {userData.city}</p>
            <p className="dark:text-gray-400 text-gray-600 text-center mb-4">Téléphone: {userData.phone}</p>
            <button
              onClick={toggleEditing}
              className="px-6 py-2 bg-sky-700 text-white rounded-md hover:bg-sky-900 flex items-center justify-center gap-2 w-full max-w-sm mx-auto"
            >
              <MdEdit /> Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="dark:bg-neutral-800 bg-neutral-100 w-full p-2 rounded-md dark:text-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Nom"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="dark:bg-neutral-800 bg-neutral-100 w-full p-2 rounded-md dark:text-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Email"
              />
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="dark:bg-neutral-800 bg-neutral-100 w-full p-2 rounded-md dark:text-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Adresse"
              />
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                className="dark:bg-neutral-800 bg-neutral-100 w-full p-2 rounded-md dark:text-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ville"
              />
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="dark:bg-neutral-800 bg-neutral-100 w-full p-2 rounded-md dark:text-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Téléphone"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={toggleEditing}
                className="px-6 py-2 bg-gray-300 dark:bg-gray-500 dark:text-white text-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={saveChanges}
                className="px-6 py-2 bg-sky-700 text-white rounded-md hover:bg-sky-900"
              >
                Enregistrer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
