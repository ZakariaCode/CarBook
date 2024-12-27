import React from "react";

const TestimonialData = [
  {
    name: "Dilshad",
    image: "",
    description:
      "The best car rental service I've ever used. The cars were in excellent condition, and the booking process was so easy.",
    aosDelay: "0",
  },
  {
    name: "Satya",
    image: "",
    description:
      "I had a smooth experience renting a car for my business trip. Everything was on time, and the car was great for my needs.",
    aosDelay: "300",
  },
  {
    name: "Sabir",
    image: "",
    description:
      "Excellent service! The car I rented was comfortable and clean. Will definitely choose this company for my next trip.",
    aosDelay: "1000",
  },
];

const Testmonial = () => {
  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <div className="container">
        {/* Header */}
        <div className="space-y-4 pb-12">
          <p
            data-aos="fade-up"
            className="text-3xl font-semibold font-serif text-center sm:text-4xl"
          >
            What Our Clients Say About Us
          </p>
          <p data-aos="fade-up" className="text-center sm:px-44">
            Our customers trust us for the best car rental experience. Here’s
            what they have to say!
          </p>
        </div>
        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-black dark:text-white">
          {TestimonialData.map((data) => {
            return (
              <div 
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.name}
                className="card text-center space-y-3 group sm:space-y-6 p-4 bg-gray-100 
                dark:bg-white/20 sm:py-12 duration-300 rounded-lg"
              >
                <div className="grid place-items-center">
                  <img
                    src="https://picsum.photos/200"
                    alt={data.name}
                    className="h-20 w-20 rounded-full"
                  />
                </div>
                <div className="text-2xl">⭐️⭐️⭐️⭐️⭐️</div>
                <p>{data.description}</p>
                <p className="font-semibold text-center">{data.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testmonial;
