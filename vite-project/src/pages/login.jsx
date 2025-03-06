import React from "react";
import { useState } from "react";

export function Login() {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("login", login);
    params.append("mdp", mdp);

    try {
        const response = await fetch("http://localhost/exposition_virtuelle_Einstein/api/admin_login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const text = await response.text();

        const data = JSON.parse(text); // Convertir la réponse en JSON

        if (!data.success) {
            console.warn("⚠️ Identifiants incorrects !");
            setMessage(data.message || "Identifiants incorrects");
        }
        
    } catch (error) {
        console.error("❌ Erreur de connexion:", error);
        setMessage("Erreur de connexion");
    }
};

    
    



    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="login">Identifiant</label>
                <input
                    type="text"
                    placeholder="Identifiant"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

