import React from "react";

const Contact = () => {
  return (
    <div data-aos="zoom-in" className="dark:bg-black dark:text-white py-14">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-800 py-8 px-6">
          <div className="col-span-2 space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Let's Collaborate on Your Next Car Rental Adventure
            </h1>
            <p className="text-gray-400">
              Whether you need a car for business or leisure, we are here to
              make your travel experience seamless. Reach out to us for the best
              deals on car rentals.
            </p>
          </div>
          <div className="grid place-items-center">
            <a
              className="inline-block font-semibold py-2 px-6 bg-primary rounded-lg
              tracking-wider uppercase hover:bg-primary/80 duration-300"
              href="#contact-form"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
