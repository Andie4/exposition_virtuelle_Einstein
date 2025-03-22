import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav } from "../../component/nav/index.js";
import { CardBillet } from "../../component/card/cardBillet.jsx";

export function GestBillet() {
    const [billets, setBillets] = useState([]);
    const [tarifs, setTarifs] = useState({});
    const token = localStorage.getItem("token");
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://albert.xploria.fr/api/resa_billet/${id}`, {
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
    }, [id, token]);

    useEffect(() => {
        fetch("https://albert.xploria.fr/api/tarif", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const tarifMap = {};
            data.forEach(tarif => {
                tarifMap[tarif.id_tarif] = tarif;
            });
            setTarifs(tarifMap);
        });
    }, [token]);

    const handleDelete = (deletedId) => {
        setBillets(prevBillets => prevBillets.filter(billet => billet.id_billet !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des Billets</h1>
            <h2>Réservation n°{id}</h2>
            <Link to={`/gest_resa`}>Retour aux réservations</Link>
            <Link to={`/formBillet/${id}/0`}>Ajouter un billet</Link>
            {billets.map((billet) => (
                <CardBillet
                    key={billet.id_billet}
                    resa={id}
                    billet={billet}
                    tarif={tarifs[billet.tarif_billet] || { nom_tarif: "Tarif inconnu" }}
                    onDelete={handleDelete}
                />
            ))}
        </>
    );
}
