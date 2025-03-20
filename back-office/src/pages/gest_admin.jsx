import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../component/nav/index.js";
import { CardAdmin } from "../component/cardAdmin/cardAdmin.jsx";

export function GestAdmin() {
    const [admins, setAdmins] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost/exposition_virtuelle_Einstein/api/admin",
            {
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
    }, []);

    const handleDelete = (deletedId) => {
        setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id_admin !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des administrateurs</h1>
            <Link to="/formAdmin/0">Ajouter un administrateur</Link>
            {admins
                .map((admin) => (
                    <CardAdmin key={admin.id_admin} admin={admin} onDelete={handleDelete} />
                ))}
        </>
    );
}