import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-scroll";
import logo from "../../assets/logo.png";
const NavLinks = [
  {
    id: "1",
    name: "HOME",
    link: "Hero",
  },
  {
    id: "2",
    name: "ABOUT",
    link: "About",
  },
  {
    id: "3",
    name: "SERVICES",
    link: "Services",
  },
  {
    id: "4",
    name: "CARS",
    link: "Cars",
  },
  {
    id: "5",
    name: "STORIES",
    link: "Stories",
  },
  {
    id: "6",
    name: "CONTACT",
    link: "Contact",
  },
];
const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav
      className="shadow-md fixed  bg-white/95 dark:bg-dark/95 dark:text-white
    duration-300 z-40 w-full"
    >
      <div className="mx-4 py-3 md:py-0">
      
        <div className="flex justify-between items-center">
       
          <div className=" justify-start">
            <img src={logo} alt="logo" width={80} height={80} />
          </div>
          <div className="hidden md:block justify-center">
            <ul className="flex items-center gap-8">
              {NavLinks.map((data) => (
                <li key={data.id} className="py-4">
                  <Link
                    className=" lg:block cursor-pointer py-2 hover:border-b-[0.9px] hover:text-primary hover:border-primary transition-colors
                    duration-500 text-base font-normal"
                    to={data.link}
                    smooth={true}
                    duration={800}
                   offset={-100}
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
              {/* Dark Mode Icons */}
            <div>
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </div>
            </ul>
          </div>
          <div className="flex items-center gap-4 md:hidden justify-end">
          <div>
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </div>
            {/* Mobil Hamburger menu */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                size={30}
                className="cursor-pointer transition-all"
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                size={30}
                className="cursor-pointer transition-all"
              />
            )}
          </div>
          <div className="hidden md:block"> 
            <button type="button" className="text-gray-900 my-3 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </nav>
  );
};

export default Navbar;
