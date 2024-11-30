import React from "react";

const TestimonialData = [
  {
    name: "Dilshad",
    image: "",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem , Ipsum has been the industry's",
    aosDelay: "0",
  },
  {
    name: "Satya",
    image: "",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem , Ipsum has been the industry's",
    aosDelay: "300",
  },
  {
    name: "Sabir",
    image: "",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem , Ipsum has been the industry's",
    aosDelay: "1000",
  },
];
const Testmonial = () => {
  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <div className="container">
        {/* header */}
        <div className="space-y-4 pb-12">
          <p
            data-aos="fade-up"
            className="text-3xl font-semibold font-serif text-center sm:text-4xl"
          >
            What Our Clients Say About Us
          </p>
          <p data-aos="fade-up" className="text-center sm:px-44">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            odio asperiores reprehenderit qu os neque.
          </p>
        </div>
        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-black dark:text-white">
          {TestimonialData.map((data) => {
            return (
              <div 
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.name}
              className="card text-center space-y-3 group sm:space-y-6 p-4 bg-gray-100 
              dark:bg-white/20 sm:py-12 duration-300 rounded-lg">
                <div className="grid place-items-center">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-20 w-20 rounded-full"
                  />
                </div>
                <div className="text-2xl">⭐️⭐️⭐️⭐️⭐️⭐️</div>
                <p >{data.description}</p>
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
