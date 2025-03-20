import React from "react";
import { useState, useEffect } from "react";
import { Nav } from "../component/nav/index.js";
import { CardResa } from "../component/cardResa/cardResa.jsx";
import { Link } from "react-router-dom";

export function GestResa() {
    const [resas, setResas] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost/exposition_virtuelle_Einstein/api/resa",
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
                setResas(data);
            });
    }, []);

    const handleDelete = (deletedId) => {
        setResas(prevResas => prevResas.filter(resa => resa.id_resa !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des réservations</h1>
            <Link to="/formResa/0">Ajouter une réservation</Link>
            {resas
                .map((resa) => (
                    <CardResa key={resa.id_resa} resa={resa} onDelete={handleDelete} />
                ))}
        </>
    );
}