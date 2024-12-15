import React from 'react'
import image from '../assets/basil.jpg'
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
  <strong className="text-black text-xl mb-3">Popular Cars</strong>
  
  {carData.map((rent) => (
    <div className="px-4 py-2 flex gap-4 items-center" key={rent.id}>
      <div
        className="h-11 w-11 rounded-full bg-sky-500 bg-cover bg-center"
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