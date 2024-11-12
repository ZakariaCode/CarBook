import React from 'react'
import carPng from "../../assets/carPng.png"
import yellowCarPng from "../../assets/yellowCarPng.png"
// import imageLight from "../../assets/imageLight.png"
const Hero = ({theme}) => {

  return (
    <div className="dark:bg-black dark:text-white duration-300 relative -z-1">
    <div className="container min-h-[620px] flex">
        <div className="grid place-items-center grid-cols-1
        sm:grid-cols-2">
        <div
        data-aos="zoom-in"
        data-aos-duration="1500" 
        className="order-1 sm:order-2">
            <img 
            className="relative -z-10 max-h-[600px] sm:scale-125 drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] "
             src={theme ==="dark" ? carPng : yellowCarPng} alt="" />
        </div>
        <div className="order-2 sm:order-1 space-y-5 sm:pr-32">
            <p 
            data-aos="fade-up" 
            className="text-primary text-2xl font-serif">Effortless</p>
            <h1
            data-aos="fade-up"
            data-aos-delay="600"
             className="text-5xl font-semibold font-serif lg:text-7xl">Car Rentall</h1>
            <p
            data-aos="fade-up"
            data-aos-delay="1000"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam similique aspernatur repel
            lat dolores eveniet atque, corporis vero explicabo animi, pariatur odit. Zakaria Elhajjam </p>
            <button
             data-aos="fade-up"
            data-aos-duration="1500"
             className="btn bg-primary text-black px-6 py-2 rounded-md hover:bg-primary/80 duration-300">Get Started</button>
        </div>

        </div>
    </div>
      
    </div>
  )
}

export default Hero
