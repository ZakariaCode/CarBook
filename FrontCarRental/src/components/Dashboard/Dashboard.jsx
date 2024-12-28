import React, { useState } from 'react';
import DashboardGrid from './DashboardGrid'
import Chart from './Chart'
import CustomerChart from './CustomerChart'
import ReviewCustomer from './Review/ReviewCustomer'
import PopularCar from './PopularCar'

export default function Dashboard({issideBarToggle, theme}) {
  return (
    <div className={`${issideBarToggle ? "ml-64" : "w-screen-minus"} mt-14`}>
      
      <div className="justify-center mr-10 space-y-6">
        <DashboardGrid theme={theme}/>
        <div className="flex flex-col mx-5 space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
          <div className="w-full lg:w-2/3">
            <Chart theme={theme} />
          </div>
          <div className="w-full lg:w-1/3">
            <CustomerChart theme={theme} />
          </div>
        </div>
        <div className="flex flex-col mx-5 space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0 ">
          <div className="w-full lg:w-2/3">
            <ReviewCustomer theme={theme}/>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/3">
            <PopularCar theme={theme} />
          </div>
        </div>
        
      </div>
    </div>
  )
}
