import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
// Import correct pour AOS
import AOS from "aos";
import "aos/dist/aos.css";
import CarList from "./components/CarList/TopCars";
import Reservations from "./components/Reservation/Reservations";
import Testmonial from "./components/Testmonial/testmonial";
import AppStore from "./components/AppStore/AppStore";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Background from "./components/Background/Background";
import { Element } from "react-scroll";
import Vehicules from "./components/CarList/Vehicules";
import PayPalCheckout from "./components/Paypal/PayPalCheckout";
import Avis from "./components/Avis/Avis";
const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );

  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white">
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Element name="Hero">
                  <Hero theme={theme} />
                </Element>
                <Element name="About">
                  <About />
                </Element>
                <Element name="Services">
                  <Services />
                </Element>
                <Element name="Cars">
                  <CarList />
                </Element>
                <Element name="Stories">
                  <Testmonial />
                </Element>
                <Element name="Contact">
                  <Contact />
                </Element>
                <Footer />
              </div>
            }
          />
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/vehicules/reserver/:id" element={<Reservations/>} />
          <Route path="/vehicules/paiment/:id" element={<PayPalCheckout/>} />        
          <Route path="/Avis" element={<Avis/>} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
