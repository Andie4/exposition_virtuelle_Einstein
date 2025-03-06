import React from "react";
import { useState } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/api/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Erreur réseau ou serveur");
            }

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("isLoggedIn", "true"); // Stocke la connexion
                window.location.href = "/dashboard"; // Redirige vers le back-office
            } else {
                setMessage("Identifiants incorrects");
            }
        } catch (error) {
            setMessage("Erreur de connexion");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    placeholder="Login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

