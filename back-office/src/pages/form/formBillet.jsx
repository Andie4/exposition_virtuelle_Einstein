import { ButtonAdd } from "../../component/button/buttonAdd";
import { ButtonUpdate } from "../../component/button/buttonUpdate";
import { Nav } from "../../component/nav";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function FormBillet() {
    let { id } = useParams();
    let { resa } = useParams();

    const token=localStorage.getItem("token");
    const [billet, setBillet] = useState({
        "id_billet": 0,
        "nom_billet": "",
        "prenom_billet": "",
        "resa_billet": "",
        "tarif_billet": ""
    });

    if(id==0){
        billet.resa_billet=resa;
    }

    useEffect(() => {
        if (id != 0) {
            fetch(`https://albert.xploria.fr/api/billet/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setBillet(data);
                });
        }

    }
        , [id]);

    const handleForm = (e) => {
        setBillet({ ...billet, [e.target.id]: e.target.value
        });
    }

    return (
        <>
            <Nav />
            <h1>Formulaire de billet</h1>
            <Link to={`/gest_billet/${resa}`} className="btn-back">Retour</Link>
            <br />
            <form action="">
                <fieldset>
                    <legend>{id!=0 ? "Modifier la réservation" : "Ajouter une réservation"}</legend>
                    <label htmlFor="nom_billet">Nom</label>
                    <input type="text" name="nom_billet" id="nom_billet" value={billet.nom_billet} onChange={handleForm} required />
                    <label htmlFor="prenom_billet">Prénom</label>
                    <input type="text" name="prenom_billet" id="prenom_billet" value={billet.prenom_billet} onChange={handleForm} required />
                    <label htmlFor="resa_billet">N°ID Réservation</label>
                    <input type="text" name="resa_billet" id="resa_billet" value={billet.resa_billet} onChange={handleForm} required />
                    <label htmlFor="tarif_billet">N°ID Tarif</label>
                    <input type="text" name="tarif_billet" id="tarif_billet" value={billet.tarif_billet} onChange={handleForm} required />

                    {id!=0 ? 
                    <ButtonUpdate id={id} type="billet" token={token} data={billet} /> :  
                    <ButtonAdd type="billet" token={token} data={billet} />
                    }
                   
                </fieldset>
            </form>
        </>
    )
}