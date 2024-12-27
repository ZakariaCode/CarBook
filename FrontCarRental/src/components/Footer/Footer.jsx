import React from "react";
import { 
    FaLocationArrow, 
    FaMobileAlt, 
    FaInstagram, 
    FaFacebook, 
    FaLinkedin 
  } from "react-icons/fa";
  
const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Contact Us",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
      <div className="container">
        <div className="grid md:grid-cols-3 py-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1
              className="text-xl sm:text-3xl sm:text-left text-justify mb-3"
            >
              Car Rental Service
            </h1>
            <p>
              Providing reliable and affordable car rental services for your business and leisure trips. 
              We are here to make your journey smoother!
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Location: Noida, Uttar Pradesh</p>
            </div>
            <div className="flex items-center gap-3 mt-6 rounded-t-3xl">
              <FaMobileAlt />
              <p>Phone: +91 123456789</p>
            </div>
            {/* Social Media Handles */}
            <div className="flex gap-3 mt-6">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram
                  className="text-3xl hover:text-primary duration-300"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook
                  className="text-3xl hover:text-primary duration-300"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin
                  className="text-3xl hover:text-primary duration-300"
                />
              </a>
            </div>
          </div>
          {/* NavLinks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-2 md:pl-10">
            {/* First Column */}
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold sm:text-left mb-3">
                  Quick Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((data) => {
                    return (
                      <li
                        key={data.title}
                        className="cursor-pointer hover:text-primary duration-300"
                      >
                        <span className="mr-2">{'>'}</span>
                        <a href={data.link}>{data.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Second Column */}
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold sm:text-left mb-3">
                  Customer Service
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((data) => {
                    return (
                      <li
                        key={data.title}
                        className="cursor-pointer hover:text-primary duration-300"
                      >
                        <span className="mr-2">{'>'}</span>
                        <a href={data.link}>{data.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Third Column */}
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold sm:text-left mb-3">
                  Explore Our Services
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((data) => {
                    return (
                      <li
                        key={data.title}
                        className="cursor-pointer hover:text-primary duration-300"
                      >
                        <span className="mr-2">{'>'}</span>
                        <a href={data.link}>{data.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
