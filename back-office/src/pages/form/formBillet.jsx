import { ButtonAdd } from "../../component/button/buttonAdd";
import { ButtonUpdate } from "../../component/button/buttonUpdate";
import { Nav } from "../../component/nav";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function FormBillet() {
    let { id, resa } = useParams();
    const token = localStorage.getItem("token");
    
    const [billet, setBillet] = useState({
        "id_billet": 0,
        "nom_billet": "",
        "prenom_billet": "",
        "resa_billet": resa || "",
        "tarif_billet": ""
    });

    const [tarifs, setTarifs] = useState([]);

    useEffect(() => {
        if (id && id !== "0") {
            fetch(`https://albert.xploria.fr/api/billet/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then(data => setBillet(data));
        }
    }, [id, token]);

    useEffect(() => {
        fetch("https://albert.xploria.fr/api/tarif", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(data => setTarifs(data));
    }, [token]);

    const handleForm = (e) => {
        setBillet({ ...billet, [e.target.id]: e.target.value });
    };

    return (
        <>
            <Nav />
            <h1>Formulaire de billet</h1>
            <Link to={`/gest_billet/${resa}`} className="btn-back">Retour</Link>
            <br />
            <form className="form">
                <fieldset>
                    <legend>{id !== "0" ? "Modifier la réservation" : "Ajouter une réservation"}</legend>
                    <div>
                        <label htmlFor="nom_billet">Nom</label>
                        <input type="text" id="nom_billet" value={billet.nom_billet} onChange={handleForm} required />
                    </div>
                    
                    <div>
                        <label htmlFor="prenom_billet">Prénom</label>
                        <input type="text" id="prenom_billet" value={billet.prenom_billet} onChange={handleForm} required />
                    </div>
                    
                    <div>
                        <label htmlFor="resa_billet">N°ID Réservation</label>
                        <input type="text" id="resa_billet" value={billet.resa_billet} onChange={handleForm} required />
                    </div>
                    
                    <div>
                        <label htmlFor="tarif_billet">Tarif</label>
                        <select id="tarif_billet" value={billet.tarif_billet} onChange={handleForm} required>
                            <option value="">Sélectionnez un tarif</option>
                            {tarifs.map((tarif) => (
                                <option key={tarif.id_tarif} value={tarif.id_tarif}>{tarif.nom_tarif}</option>
                            ))}
                        </select>
                    </div>
                    
                    {id !== "0" ? 
                        <ButtonUpdate id={id} type="billet" token={token} data={billet} /> :  
                        <ButtonAdd type="billet" token={token} data={billet} />
                    }
                </fieldset>
            </form>
        </>
    );
}
