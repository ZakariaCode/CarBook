import React from 'react'
import { FaClipboardList, FaCar, FaDollarSign } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
export default function DashboardGrid({theme}) {
  return (
    <div className='flex flex-col sm:flex-row gap-10 mt-4 mx-5'>
      <Box>
          <div className='rounded-2xl h-16 w-16 flex items-center justify-center bg-sky-500'>
            <FaClipboardList className='text-4xl text-white '></FaClipboardList>
          </div>
          <div className='p-4'>
            <strong className='text-sm dark:text-white text-black'>Total reservation</strong>
            <div className='flex items-center gap-5'>
              <span className='text-md text-gray-500 '>300</span>
              <div className='flex items-center gap-1 text-green-700'>
                <FaArrowTrendUp></FaArrowTrendUp>
                <span className='text-md  '>+55</span>
              </div>
              
            </div>
          </div>
      </Box>
      <Box>
          <div className='rounded-2xl h-16 w-16 flex items-center justify-center bg-red-500'>
            <FaCar className='text-4xl text-white'></FaCar>
          </div>
          <div className='p-4'>
            <strong className='text-sm dark:text-white text-black '>Total Car</strong>
            <div className='flex items-center gap-5'>
              <span className='text-md text-gray-500 '>300</span>
              <div className='flex items-center gap-1 text-red-700'>
                <FaArrowTrendDown></FaArrowTrendDown>
                <span className='text-md'>-55</span>
              </div>
            </div>
          </div>
      </Box>
      <Box>
          <div className='rounded-2xl h-16 w-16 flex items-center justify-center bg-green-500'>
            <FaDollarSign className='text-4xl text-white'></FaDollarSign>
          </div>
          <div className='p-4'>
            <strong className='text-sm dark:text-white text-black '>Total revenu</strong>
            <div className='flex items-center gap-5'>
              <span className='text-md text-gray-500 '>300</span>
              <div className='flex items-center gap-1 text-green-700'>
                <FaArrowTrendUp></FaArrowTrendUp>
                <span className='text-md  '>+55</span>
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
