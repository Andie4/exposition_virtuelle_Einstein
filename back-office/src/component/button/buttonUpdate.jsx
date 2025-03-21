import React from "react";

export function ButtonUpdate({ id, type, token, data}) {
    const handleUpdate = () => {
        fetch(`http://localhost/exposition_virtuelle_Einstein/api/${type}/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("Mise à jour réussie :", result);
            window.location.href = `/gest_${type}`; 
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour :", error);
            alert("Une erreur est survenue.");
        });
    };

    return (
        <button onClick={handleUpdate} className="btn-update">
            Enregistrer
        </button>
    );
}
