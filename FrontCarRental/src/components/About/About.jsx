import React from 'react'
import car2 from "../../assets/car2.png"

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 dark:text-white duration-300 sm:min-h-[600px] sm:grid sm:place-items-center">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
        <div
        data-aos="slide-right"
        data-aos-duation="1500"
        data-aos-one="false"
        >
            <img className="sm:scale-105 sm:-transition-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]" src={car2} alt="" />
        </div>
        <div>
            <div className="space-y-5 sm:p-16 pb-6">
                <h1
                data-aos="fade-up"
                 className="text-3xl font-bold font-serif">About Us</h1>
                <p data-aos="fade-up">
                We are a leading car rental agency, offering a wide range of vehicles for every occasion. Whether you need a car for business, a family vacation, or a weekend getaway, we have you covered.

                </p>

                <p data-aos="fade-up">
                Our fleet includes well-maintained vehicles that are available at competitive prices, with flexible rental terms and excellent customer service to ensure a smooth experience.
                </p>
                <button className="button-outline">Get Started</button>
            </div>
        </div>

        </div>
      </div>
    </div>
  )
}
export default About
