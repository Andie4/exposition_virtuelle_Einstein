import React, { useState, useEffect } from "react";
import { Nav } from "../component/nav";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


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

    return (
        <>
            <Nav />
            <main>
                <h1>Profil</h1>
                <div>
                    <p>Nom : {admin.nom_admin}</p>
                    <p>Prénom : {admin.prenom_admin}</p>
                    <p>Email : {admin.mail_admin}</p>
                    <p>Login : {admin.login_admin}</p>
                    <Link to={`/formAdmin/${admin.id_admin}`}>Modifier</Link>
                </div>
            </main>
        </>
    );
}

Profil.propTypes = {
    admin: PropTypes.object,
};
