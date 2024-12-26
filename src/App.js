import React, { useState } from "react";
import Register from "./auth/Register";
import Forgotpassword from "./auth/Forgotpassword";
import ResetPassword from "./auth/Resetpassword";
import Login from "./auth/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [authState, setAuthState] = useState('login');

  return (
    <div>
    
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<Forgotpassword />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-password" element={<ResetPassword />}/>
            </Routes>
        
   {/* 
   <Router> 
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/client" element={<ClientPage />} /> 
        //Rediriger vers login par défaut 
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
</Router> */}
</div>
  );
}

export default App;