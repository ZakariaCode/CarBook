import React from "react";
import whiteCar from "../../assets/whitecar.png";
import car2 from "../../assets/car2.png";
import car3 from "../../assets/car3.png";
import { useNavigate } from "react-router-dom";
const CarListData = [
  {
    name: "RANGE ROVER",
    price: 100,
    image: whiteCar,
    aosDelay: "0",
  },
  {
    name: "AUDI",
    price: 140,
    image: car2,
    aosDelay: "500",
  },
  {
    name: "VOLSKSWAGEN Touareg",
    price: 100,
    image: car3,
    aosDelay: "1000",
  },
];
const CarList = () => {
  const Navigate = useNavigate();
  return (
    <div
      className="pb-24 bg-white dark:bg-dark dark:text-white
    pt-12"
    >
      <div className="container">
        {/* heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl text-center font-semibold font-serif mb-3"
        >
          Our Premium Cars
        </h1>
        <p data-aos="fade-up" className="text-center pb-10 ">
        Discover our collection of premium cars available for rent. Choose the
          perfect vehicle for your journey, whether it’s a business trip, family
          vacation, or adventure.
        </p>
        {/* Car Listing Cards */}

        <div>
          <div
         
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
           gap-16"
          >
            {CarListData.map((car) => {
              return (
                <div
                 data-aos="fade-up"
                 data-aos-delay={car.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl
                 relative group"
                 key={car.name}>
                  <div className="w-full h-[120px]">
                    <img
                    className="h-[120px] obkect-contain sm:translate-x-8 group-hover:translate-x-16
                    duration-700"
                     src={car.image} alt="" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-primary font-semibold">{car.name}</h1>
                    <div className="flex justify-between items-center text-xl font-semibold">
                      <p>{car.price}/Day</p>
                      <a href="#">Details</a>
                    </div>
                  </div>
                  <p className="text-xl font-semibold absolute top-0 left-3">12Km</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* end of carListing */}
        <div className="grid place-content-center mt-8">
            <button data-aos="fade-up" className="button-outline" onClick={()=>Navigate('/vehicules')}>
            Discover More
            </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;
