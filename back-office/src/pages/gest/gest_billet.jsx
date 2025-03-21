import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav } from "../../component/nav/index.js";
import { CardBillet } from "../../component/card/cardBillet.jsx";

export function GestBillet() {
    const [billets, setBillets] = useState([]);
    const token = localStorage.getItem("token");
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost/exposition_virtuelle_Einstein/api/resa_billet/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setBillets(data);
            });
    }, []);

    const handleDelete = (deletedId) => {
        setBillets(prevBillets => prevBillets.filter(billet => billet.id_billet !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des Billets</h1>
            <Link to={`/gest_resa`}>Retour aux réservations</Link>
            <Link to={`/formBillet/${id}/0`}>Ajouter un billet</Link>
            {billets
                .map((billet) => (
                    <CardBillet resa={id} key={billet.id_billet} billet={billet} onDelete={handleDelete} />
                ))}
        </>
    );
}