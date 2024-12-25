import React,{useEffect,useState} from 'react'
import { FaClipboardList, FaCar, FaDollarSign } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import {getTotalVehicules} from '../services/VehiculeService'
import {getTotalReservations} from '../services/ReservationService'
import {getRevenu} from '../services/PaiementService'
export default function DashboardGrid({theme}) {
  const [totalCars, setTotalCars]=useState([]);
  const [totalReservations, setTotalReservations]=useState([]);
  const [revenu, setRevenu]=useState([]);
    useEffect(()=>{
      getTotalVehicules().then((response)=>{
        setTotalCars(response.data);
      }).catch(error=>{
        console.error(error);
      })
      getTotalReservations().then((response)=>{
        setTotalReservations(response.data);
      }).catch(error=>{
        console.error(error);
      })
      getRevenu().then((response)=>{
        setRevenu(response.data);
      }).catch(error=>{
        console.error(error);
      })
    },[])
  return (
    <div className='flex flex-col gap-10 mx-5 mt-4 sm:flex-row'>
      <Box>
          <div className='flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500'>
            <FaClipboardList className='text-4xl text-white '></FaClipboardList>
          </div>
          <div className='p-4'>
            <strong className='text-sm text-black dark:text-white'>Total reservation</strong>
            <div className='flex items-center gap-5'>
              <span className='text-gray-500 text-md '>{totalReservations}</span>
              <div className='flex items-center gap-1 text-green-700'>
                <FaArrowTrendUp></FaArrowTrendUp>
                <span className='text-md '>+55</span>
              </div>
              
            </div>
          </div>
      </Box>
      <Box>
          <div className='flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl'>
            <FaCar className='text-4xl text-white'></FaCar>
          </div>
          <div className='p-4'>
            <strong className='text-sm text-black dark:text-white '>Total Car</strong>
            <div className='flex items-center gap-5'>
              <span className='text-gray-500 text-md '>{totalCars}</span>
              <div className='flex items-center gap-1 text-red-700'>
                <FaArrowTrendDown></FaArrowTrendDown>
                <span className='text-md'>-55</span>
              </div>
            </div>
          </div>
      </Box>
      <Box>
          <div className='flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl'>
            <FaDollarSign className='text-4xl text-white'></FaDollarSign>
          </div>
          <div className='p-4'>
            <strong className='text-sm text-black dark:text-white '>Total revenu</strong>
            <div className='flex items-center gap-5'>
              <span className='text-gray-500 text-md '>{revenu}</span>
              <div className='flex items-center gap-1 text-green-700'>
                <FaArrowTrendUp></FaArrowTrendUp>
                <span className='text-md '>+55</span>
              </div>
            </div>
          </div>
      </Box>
      
    </div>
  )
}
function Box({children}){
  return <div className='dark:bg-[#121212] bg-white  rounded-3xl p-4 flex-1 border border-gray-200 flex items-center transition-transform hover:scale-105'>{children}</div>
}
