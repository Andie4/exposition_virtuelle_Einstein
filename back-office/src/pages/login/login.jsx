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
        const response = await fetch("https://albert.xploria.fr/api/admin_login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
            });

        const text = await response.text();

        const data = JSON.parse(text);

        if (data.success) {
            console.log("🎉 Connexion réussie !");
            console.log(data);
            const token = data.token;
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décode le JWT
            const expirationTime = decodedToken.exp * 1000; // Convertit en millisecondes
            const currentTime = Date.now();
            const timeoutDuration = expirationTime - currentTime; // Temps restant avant expiration
        
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiration", expirationTime);
            localStorage.setItem("isLoggedIn", "true");
        
            // Planifie la déconnexion automatique
            setTimeout(() => {
                console.log("⏳ Token expiré, déconnexion...");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenExpiration");
                localStorage.removeItem("isLoggedIn");
                window.location.href = "/login"; // Redirection vers la page de login
            }, timeoutDuration);
        
            window.location.href = "/home";
        }
         else {
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

