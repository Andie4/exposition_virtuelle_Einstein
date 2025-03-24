import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../../component/nav/index.js";
import { CardAdmin } from "../../component/card/cardAdmin.jsx";

export function GestAdmin() {
    const [admins, setAdmins] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("https://albert.xploria.fr/api/admin", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setAdmins(data);
        });
    }, [token]);

    const handleDelete = (deletedId) => {
        setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id_admin !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des administrateurs</h1>
            <Link to="/formAdmin/0" className="add-link">Ajouter un administrateur</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <CardAdmin key={admin.id_admin} admin={admin} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
