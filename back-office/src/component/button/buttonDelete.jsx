import React from "react";
import deleteIcon from '../../img/delete.svg';

export function ButtonDelete({ id, type, token, onSuccess}) {
    const handleDelete = () => {
        if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
            fetch(`https://albert.xploria.fr/api/${type}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression.");
                }
                return response.json();
            })
            .then((result) => {
                if (onSuccess) onSuccess(id); // Permet de rafraîchir la liste des éléments
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
            });
        }
    };
    

    return (
        <button onClick={handleDelete} className="btn-delete">
            <img src={deleteIcon} alt="Bouton supprimer" />
        </button>
    );
}
