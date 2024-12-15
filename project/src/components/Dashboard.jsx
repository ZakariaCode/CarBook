import React from 'react'
import DashboardGrid from './DashboardGrid'
import Chart from './Chart'
import CustomerChart from './CustomerChart'
import RecentRent from './RecentRent'
import PopularCar from './PopularCar'

export default function Dashboard({issideBarToggle, theme}) {
  return (
    <div className={`${issideBarToggle ? "ml-64" : "w-screen-minus"} mt-14`}>
      <div className="space-y-6 mr-10 justify-center">
        <DashboardGrid theme={theme}/>
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:space-y-0 space-y-6 mx-5">
          <div className="w-full lg:w-2/3">
            <Chart theme={theme}/>
          </div>
          <div className="w-full lg:w-1/3">
            <CustomerChart theme={theme}/>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:space-y-0 space-y-6 mx-5 ">
          <div className="w-full lg:w-2/3">
            <RecentRent theme={theme}/>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/3">
            <PopularCar theme={theme} />
          </div>
        </div>
        
      </div>
    </div>
  )
}
