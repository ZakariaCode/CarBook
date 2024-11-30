import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-scroll";

const NavLinks = [
  {
    id: "1",
    name: "HOME",
    link: "/",
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
    id: "3",
    name: "CARS",
    link: "Cars",
  },
  {
    id: "4",
    name: "STORIES",
    link: "Stories",
  },
  {
    id: "5",
    name: "CONTACT",
    link: "Contact",
  },
];
const ResponsiveMenu = ({ showMenu }) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-full"
      } fixed top-0 z-50 bg-white dark:bg-gray-900 h-screen w-[75%] md:hidden rounded-r-xl
    shadow-md flex flex-col justify-between px-8 pb-6 pt-16 transition-all duration-300`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello User</h1>
            <h1>Premium user</h1>
          </div>
          <button type="button" className="text-gray-900 my-3 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">login</button>

        </div>
        <div>
          {/* Links */}
          <nav className="mt-12">
            <ul className="space-y-4 text-base font-normal">
              {NavLinks.map((data) => (
                <li key={data.name}>
                <Link
                    to={data.link}
                    smooth={true}
                    duration={800}
                    offset={-70}
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
       {/* Footer */}
       <div>
          <h1>
            Made with 🤍 by <a href="#">Zakaria El Hajjam</a>{" "}
          </h1>
        </div>
    </div>
  );
};

export default ResponsiveMenu;
