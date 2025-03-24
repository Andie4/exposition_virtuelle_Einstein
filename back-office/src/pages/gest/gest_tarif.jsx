import React, { useState, useEffect } from "react";
import { Nav } from "../../component/nav/index.js";
import { CardTarif } from "../../component/card/cardTarif.jsx";
import { Link } from "react-router-dom";

export function GestTarif() {
    const [tarifs, setTarifs] = useState([]);
    const token = localStorage.getItem("token");

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
                setTarifs(data);
            });
    }, [token]);

    const handleDelete = (deletedId) => {
        setTarifs(prevTarifs => prevTarifs.filter(tarif => tarif.id_tarif !== deletedId));
    };

    return (
        <>
            <Nav />
            <h1>Gestion des tarifs</h1>
            <Link to="/formTarif/0">Ajouter un tarif</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom du tarif</th>
                        <th>Nom anglais</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tarifs.map((tarif) => (
                        <CardTarif key={tarif.id_tarif} tarif={tarif} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
