import React from 'react'
import image from '../../assets/basil.jpg'
const carData = [
  {
    id: 1,
    marque: "Toyota",
    modele: "Corolla",
    annee: 2020,
    type: "Berline",
    tarif: "40€/jour",
    statut: "Disponible",
  },
  {
    id: 2,
    marque: "Tesla",
    modele: "Model 3",
    annee: 2022,
    type: "Électrique",
    tarif: "80€/jour",
    statut: "Louée",
  },
  {
    id: 3,
    marque: "Ford",
    modele: "Mustang",
    annee: 2018,
    type: "Sport",
    tarif: "100€/jour",
    statut: "Disponible",
  },
  {
    id: 4,
    marque: "Renault",
    modele: "Clio",
    annee: 2019,
    type: "Compacte",
    tarif: "30€/jour",
    statut: "En maintenance",
  }
];



export default function PopularCar() {
  return (
    <div className="bg-white dark:bg-[#121212] px-4 py-3 rounded-2xl border border-gray-200 flex flex-col">
  <strong className="mb-3 text-xl text-black">Popular Cars</strong>
  
  {carData.map((rent) => (
    <div className="flex items-center gap-4 px-4 py-2" key={rent.id}>
      <div
        className="bg-center bg-cover rounded-full h-11 w-11 bg-sky-500"
        style={{ backgroundImage: `url(${image})` }} 
      ></div>
      
      <div className="flex flex-col">
        <div className="font-semibold text-black dark:text-white">{rent.marque}</div>
        <div className="text-gray-500">{rent.modele}</div>
      </div>
      
    </div>
  ))}
</div>

    
  )
}