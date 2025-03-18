import React, { useState, useEffect } from "react";
import { Nav } from "../component/nav";
import PropTypes from "prop-types";

export function Profil() {
    const [admin, setAdmin] = useState({
        prenom_admin: "",
        nom_admin: "",
        login_admin: "",
        mdp_admin: "",
    });

    const token = localStorage.getItem("token");
    const id_admin = localStorage.getItem("id_admin");

    useEffect(() => {
        fetch(`http://localhost/exposition_virtuelle_Einstein/api/admin/${id_admin}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setAdmin(data);
        });
    }, []);

    // Fonction pour gérer la modification des champs
    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value, // Met à jour la valeur du champ correspondant
        });
    };

    return (
        <>
            <Nav />
            <main>
                <h1>Profil</h1>
                <form>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        name="prenom_admin"
                        value={admin.prenom_admin}
                        onChange={handleChange}
                    />

                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom_admin"
                        value={admin.nom_admin}
                        onChange={handleChange}
                    />

                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login_admin"
                        value={admin.login_admin}
                        onChange={handleChange}
                    />

                    <label htmlFor="mdp">Mot de passe</label>
                    <input
                        type="password"
                        id="mdp"
                        name="mdp_admin"
                    />

                    <button type="submit">Enregistrer</button>
                </form>
            </main>
        </>
    );
}

Profil.propTypes = {
    admin: PropTypes.object,
};
