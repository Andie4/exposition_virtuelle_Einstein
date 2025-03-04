import React from 'react'
import { Home } from './pages/home'
import { Profil } from './pages/profil'
import { Login } from './pages/login'
import './styles/App.css'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </>
  )
}

export default App
