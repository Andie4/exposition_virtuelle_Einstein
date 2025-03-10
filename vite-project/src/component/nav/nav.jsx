import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './nav.css';



export function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <>
        <nav className="navbar">
            <Link to="/home" className="logo">XPLORIA</Link>
            <div className="nav-links">
                <ul>
                    <li><Link to="/gest_resa" className="black">Gestion des réservations</Link></li>
                    <li><Link to="/gest_tarif" className="black">Gestion des tarifs</Link></li>
                    <li><Link to="/gest_admin" className="black">Gestion des administrateurs</Link></li>
                    <li><Link to="/profil" className="black">Profil</Link></li>
                </ul>
            </div>
            <img src="./img/menu.svg" alt="menu hamburger" className="menu-burger"/>
            <img src="./img/close.svg" alt="close" className="close"/>
            <button onClick={handleLogout}>Se déconnecter</button>
        </nav>
        
        </>
       );
}
