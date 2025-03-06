import React from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // Supprime la connexion
        navigate("/login"); // Redirige vers la connexion
    };

    return (
        <div>
            <h2>Bienvenue sur le back-office !</h2>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
}

