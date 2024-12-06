import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from './components/Dashboard';
import Cars from './components/Cars';
import Customers from './components/Customers';
import Reservations from './components/Reservations';
import Profil from './components/Profil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="profil" element={<Profil />} />
        </Route>
        <Route path="/login" element={<div>this is login page</div>}>
          
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
