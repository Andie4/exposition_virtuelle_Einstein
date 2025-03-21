import { ButtonAdd } from "../../component/button/buttonAdd";
import { ButtonUpdate } from "../../component/button/buttonUpdate";
import { Nav } from "../../component/nav";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function FormTarif() {
    let { id } = useParams();
    const token = localStorage.getItem("token");
    const [tarif, setTarif] = useState({
        "id_tarif": 0,
        "nom_tarif": "",
        "prix_tarif": 0
    });

    useEffect(() => {
        if (id != 0) {
            fetch(`http://localhost/exposition_virtuelle_Einstein/api/tarif/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setTarif(data);
                });
        }

    }
        , [id]);

    const handleForm = (e) => {
        setTarif({ ...tarif, [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <Nav />
            <h1>Formulaire de tarif</h1>
            <Link to="/gest_tarif">Retour</Link>
            <br />
            <form action="">
                <fieldset>
                    <legend>{id!=0 ? "Modifier le tarif" : "Ajouter un tarif"}</legend>
                    <label htmlFor="nom_tarif">Nom du tarif</label>
                    <input type="text" name="nom_tarif" id="nom_tarif" value={tarif.nom_tarif} onChange={handleForm} required />
                    <label htmlFor="prix_tarif">Prix</label>
                    <input type="number" name="prix_tarif" id="prix_tarif" value={tarif.prix_tarif} onChange={handleForm} required />
                    {id!=0 ? 
                    <ButtonUpdate id={id} type="tarif" token={token} data={tarif} /> :  
                    <ButtonAdd type="tarif" token={token} data={tarif} />
                    }
                   
                </fieldset>
            </form>
        </>
    )
}