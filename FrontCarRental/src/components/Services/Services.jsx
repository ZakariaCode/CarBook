import React from 'react'
import { FaCameraRetro } from 'react-icons/fa'
import { GiNotebook } from 'react-icons/gi'
import { SlNote } from 'react-icons/sl'

const skillsData =[
    {
        name:"Best Price",
        icon:(
            <FaCameraRetro className="text-5xl text-rimary group-hover:text-balck duration-300"/>
        ),
        link:"#",
        description:"We offer the best rates for car rentals without compromising on quality. Save money while driving the car of your choice.",
        aosDelay:"0",
    },
    {
        name:"Fast and Safe",
        icon:(
            <GiNotebook className="text-5xl text-rimary group-hover:text-balck duration-300"/>
        ),
        link:"#",
        description:"Experience fast and reliable service with our safe, well-maintained vehicles. Get on the road quickly with peace of mind.",
        aosDelay:"500",
    },
    {
        name:"Experienced Drivers",
        icon:(
            <SlNote className="text-5xl text-rimary group-hover:text-balck duration-500"/>
        ),
        link:"#",
        description:"Our drivers are experienced professionals who ensure a smooth and safe journey, whether it's a short trip or a long adventure.",
        aosDelay:"1000",
    }
]
const Services = () => {
  return (
    <div className="py-14 dark:bg-black dark:text-white sm:min-h[600px] sm:grid sm:place-items-center">
      <div className="container">
        <div className="pb-12">
            <h1 className="text-3xl font-semibold text-center font-serif 
            sm:text-4xl">Why Choose Us</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                skillsData.map((skill)=>(
                    <div key={skill.name}
                    data-aos="fade-up"
                    data-aos-delay={skill.aosDelay}
                    className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-black/40 hover:bg-primary/80 duration-300 text-white hover:text-black
                    rounded-lg"
                    >
                        <div className="grid place-items-center ">
                            {skill.icon}
                        </div>
                        <h1>{skill.name}</h1>
                        <p>{skill.description}</p>
                        {/* <a href={skill.link}>Learn More</a> */}
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Services