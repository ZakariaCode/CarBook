import React, { useEffect, useState,useLocation } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from './components/About/About';
import Services from './components/Services/Services';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Cars from './components/Cars/Cars';
import Customers from './components/Customers/Customers';
import Reservations from './components/Reservations/Reservations';
import Profil from './components/Profil/Profil';
// Import correct pour AOS
import AOS from "aos";
import "aos/dist/aos.css";
import CarList from "./components/CarList/TopCars";
import Reservation from "./components/Reservation/Reservations";
import Testmonial from "./components/Testmonial/testmonial";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Background from "./components/Background/Background";
import { Element } from "react-scroll";
import Vehicules from "./components/CarList/Vehicules";
import PayPalCheckout from "./components/Paypal/PayPalCheckout";
import Avis from "./components/Avis/Avis";
import Register from "./auth/Register";
import Forgotpassword from "./auth/Forgotpassword";
import ResetPassword from "./auth/Resetpassword";
import Login from "./auth/Login";

const App = () => {
  const [authState, setAuthState] = useState('login');

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
  
  const isUserRoute = location.pathname.startsWith("/admin");;

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white">
      {!isUserRoute && <Navbar theme={theme} setTheme={setTheme} />}
        <Routes>
          {/* Main Home Page Route */}
          
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
          
          {/* Vehicle Routes */}
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/vehicules/reserver/:id" element={<Reservation />} />
          <Route path="/vehicules/paiment/:id" element={<PayPalCheckout />} />
          <Route path="/Avis" element={<Avis />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cars" element={<Cars />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="profil" element={<Profil />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<div>This is the login page</div>} />
          <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<Forgotpassword />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-password" element={<ResetPassword />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
