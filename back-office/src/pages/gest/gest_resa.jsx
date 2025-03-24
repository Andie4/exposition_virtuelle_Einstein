import React, { useState, useEffect } from "react";
import { Nav } from "../../component/nav/index.js";
import { CardResa } from "../../component/card/cardResa.jsx";
import { Link } from "react-router-dom";

export function GestResa() {
    const [resas, setResas] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("https://albert.xploria.fr/api/resa", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setResas(data);
            });
    }, [token]);

    const handleDelete = (deletedId) => {
        setResas(prevResas => prevResas.filter(resa => resa.id_resa !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des réservations</h1>
            <a href="https://albert.xploria.fr/reservation.php">Ajouter une réservation</a>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom et Prénom</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resas.map((resa) => (
                        <CardResa
                            key={resa.id_resa}
                            resa={resa}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}
