import React from 'react'
import { Home } from './pages/home'
import { Profil } from './pages/profil'
import { Login } from './pages/login'
import { Nav } from './component/nav/nav'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <PrivateRoute> <Home /> </PrivateRoute> } />
        <Route path="/profil" element={ <PrivateRoute> <Profil /> </PrivateRoute> } />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

    </>
  )
}

export default App

