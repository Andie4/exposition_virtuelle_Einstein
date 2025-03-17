import React, { useState, useEffect } from "react";
import { Nav } from "../component/nav/index.js";
import { CardTarif } from "../component/cardTarif/cardTarif.jsx";

export function GestTarif() {
    const [tarifs, setTarifs] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
    fetch("http://localhost/exposition_virtuelle_Einstein/api/tarif",
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
            console.log(data);
            setTarifs(data);
        });
    }, []);

    return (
        <>
            <Nav />
            <h1>Gestion des tarifs</h1>
            {tarifs
      .map((tarif) => (
        <CardTarif key={tarif.id_tarif} tarif={tarif} />
      ))}
        </>
    );
}