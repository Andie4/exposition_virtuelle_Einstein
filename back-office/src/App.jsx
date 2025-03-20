import React from 'react'
import { Home } from './pages/home'
import { Profil } from './pages/profil'
import { Login } from './pages/login/login'
import { GestAdmin } from './pages/gest_admin'
import { GestTarif } from './pages/gest_tarif'
import { GestResa } from './pages/gest_resa'
import { FormTarif } from './pages/formTarif'
import { FormAdmin } from './pages/formAdmin'
import { FormResa } from './pages/formResa'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/App.css'
import { useEffect } from 'react';



function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}



function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (!token || Date.now() >= expirationTime) {
        console.log("🚨 Token expiré ou inexistant, déconnexion...");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("isLoggedIn");

        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
    }
}, []);



  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={ <PrivateRoute> <Home /> </PrivateRoute> } />
        <Route path="/profil" element={ <PrivateRoute> <Profil /> </PrivateRoute> } />
        <Route path="/gest_resa" element={ <PrivateRoute> <GestResa /> </PrivateRoute> } />
        <Route path="/gest_tarif" element={ <PrivateRoute> <GestTarif /> </PrivateRoute> } />
        <Route path="/gest_admin" element={ <PrivateRoute> <GestAdmin /> </PrivateRoute> } />
        <Route path="/formTarif/:id" element={ <PrivateRoute> <FormTarif /> </PrivateRoute> } />
        <Route path="/formAdmin/:id" element={ <PrivateRoute> <FormAdmin /> </PrivateRoute> } />
        <Route path="/formResa/:id" element={ <PrivateRoute> <FormResa /> </PrivateRoute> } />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

    </>
  )
}

export default App

