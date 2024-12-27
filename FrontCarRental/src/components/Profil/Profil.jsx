import React, { useState,useEffect } from "react";
import {FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {FaUserCircle} from 'react-icons/fa'
import {getAdmin,updateAdmin,updateImage} from '../../services/AdminService'

export default function Profil() {
  const [admin, setAdmin]=useState({
    nom:"",
    email:"",
    password:"",
    adresse:"",
    ville:"",
    cin:"",
    image:""
    });
    useEffect(()=>{
      getAdmin().then((response)=>{
        setAdmin(response.data);
      }).catch(error=>{
        console.error(error);
      })
    },[])
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAdmin((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange =async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    const {data} =await updateAdmin(admin.id,admin);
      console.log(data);
      const formData =new FormData();
      formData.append('file',selectedFile,selectedFile.name);
      formData.append('id',data.id);
      await updateImage(formData);
      setFile(undefined);
      window.location.reload();
    }
  };
  


  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges=async (e)=>{
      e.preventDefault();
      await updateAdmin(admin.id,admin);
      setAdmin({})
      window.location.reload(); 
      
    };

  return (
    <div className="bg-white dark:bg-[#121212]  rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short">
      <div className="relative flex flex-col items-center mt-28">
        <div className="absolute transform translate-y-1/2 bottom-4">
          <div
            className="bg-center bg-cover border-4 border-white rounded-full h-28 w-28 lg:h-40 lg:w-40 bg-sky-500"
            style={{
              backgroundImage: admin.image ? `url(${admin.image})` : "none",
              color: admin.image ? "transparent" : "white",
            }}
          >
            {!admin.image  && (
          <div className="flex items-center justify-center rounded-full h-28 w-28 lg:h-40 lg:w-40 ">
            <FaUserCircle size={80} className="pr-2 font-light text-white" />
          </div>
        )}
            <button
              className="absolute flex items-center justify-center text-sm text-white rounded-full bg-sky-600 w-7 h-7 bottom-3 lg:bottom-5 right-1"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = handleImageChange;
                input.click();
              }}
            >
              <FaCamera />
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 pb-8 mt-20 sm:mt-24 md:mt-32 lg:mt-36">
      
        {!isEditing ? (
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-bold text-center text-black dark:text-white">{admin.nom}</h2>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Email: {admin.email}</p>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Adresse: {admin.adresse}</p>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Ville: {admin.ville}</p>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-400">CIN: {admin.cin}</p>
              <button
                onClick={toggleEditing}
                className="flex items-center justify-center w-full max-w-sm gap-2 px-6 py-2 mx-auto text-white rounded-md bg-sky-700 hover:bg-sky-900"
              >
                <MdEdit /> Edit Profile
              </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <input
                type="text"
                name="nom"
                value={admin.nom}
                onChange={handleChange}
                className="w-full p-2 text-gray-700 rounded-md dark:bg-neutral-800 bg-neutral-100 dark:text-white focus:ring-sky-500 focus:border-sky-500"
                placeholder="Nom"
              />
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="w-full p-2 text-gray-700 rounded-md dark:bg-neutral-800 bg-neutral-100 dark:text-white focus:ring-sky-500 focus:border-sky-500"
                placeholder="Email"
              />
              <input
                type="text"
                name="adresse"
                value={admin.adresse}
                onChange={handleChange}
                className="w-full p-2 text-gray-700 rounded-md dark:bg-neutral-800 bg-neutral-100 dark:text-white focus:ring-sky-500 focus:border-sky-500"
                placeholder="Adresse"
              />
              <input
                type="text"
                name="ville"
                value={admin.ville}
                onChange={handleChange}
                className="w-full p-2 text-gray-700 rounded-md dark:bg-neutral-800 bg-neutral-100 dark:text-white focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ville"
              />
              <input
                type="text"
                name="cin"
                value={admin.cin}
                onChange={handleChange}
                className="w-full p-2 text-gray-700 rounded-md dark:bg-neutral-800 bg-neutral-100 dark:text-white focus:ring-sky-500 focus:border-sky-500"
                placeholder="telephone"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={toggleEditing}
                className="px-6 py-2 text-gray-700 bg-gray-300 rounded-md dark:bg-gray-500 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={saveChanges}
                className="px-6 py-2 text-white rounded-md bg-sky-700 hover:bg-sky-900"
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
