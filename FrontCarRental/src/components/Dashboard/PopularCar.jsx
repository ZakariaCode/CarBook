import React,{useEffect,useState} from 'react'
import image from '../../assets/basil.jpg'
import { popularCar } from '../../services/VehiculeService';

export default function PopularCar() {
  const [cars, setCars]=useState([]);
  useEffect(()=>{
    popularCar().then((response)=>{
      setCars(response.data);
    }).catch(error=>{
      console.error(error);
    })
  },[])
  return (
    <div className="bg-white dark:bg-[#121212] px-4 py-3 rounded-2xl border border-gray-200 flex flex-col">
      <strong className="mx-3 my-5 text-xl text-black">Popular Cars</strong>
      
      {cars.slice(0, 7).map((rent) => (
      <div className="flex items-center gap-4 px-4 py-2" key={rent.id}>
        <div
          className="bg-center bg-cover rounded-full h-11 w-11 bg-sky-500"
          style={{ backgroundImage: `url(${rent.image})` }} 
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