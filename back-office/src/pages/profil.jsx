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
        mail_admin: "",
    });

    const token = localStorage.getItem("token");
    const id_admin = localStorage.getItem("id_admin");

    useEffect(() => {
        fetch(`https://albert.xploria.fr/api/admin/${id_admin}`, {
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
    }, [id_admin, token]);

    return (
        <>
            <Nav />
            <main>
                <h1>Profil</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Champ</th>
                            <th>Valeur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nom</td>
                            <td>{admin.nom_admin}</td>
                        </tr>
                        <tr>
                            <td>Prénom</td>
                            <td>{admin.prenom_admin}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{admin.mail_admin}</td>
                        </tr>
                        <tr>
                            <td>Login</td>
                            <td>{admin.login_admin}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/formAdmin/${admin.id_admin}`} className="modif-profil">Modifier</Link>
            </main>
        </>
    );
}

Profil.propTypes = {
    admin: PropTypes.object,
};
