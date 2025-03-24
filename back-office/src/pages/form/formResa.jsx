import { ButtonAdd } from "../../component/button/buttonAdd";
import { ButtonUpdate } from "../../component/button/buttonUpdate";
import { Nav } from "../../component/nav";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function FormResa() {
    let { id } = useParams();
    const token = localStorage.getItem("token");
    const [resa, setResa] = useState({
        "id_resa": 0,
        "date_resa": "",
        "heure_resa": "",
        "mail_resa": "",
        "nom_resa": "",
        "prenom_resa": ""
    });

    useEffect(() => {
        if (id != 0) {
            fetch(`https://albert.xploria.fr/api/resa/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setResa(data);
                });
        }

    }
        , [id]);

    const handleForm = (e) => {
        setResa({
            ...resa, [e.target.id]: e.target.value
        });
    }

    return (
        <>
            <Nav />
            <h1>Formulaire de réservation</h1>
            <Link to="/gest_resa" className="return-button">Retour</Link>
            <br />
            <form className="form">
                <fieldset>
                    <legend>{id != 0 ? "Modifier la réservation" : "Ajouter une réservation"}</legend>
                    <p className="mini">Les champs suivis d'un <span>*</span> sont obligatoires.</p>
                    <div>
                        <label htmlFor="date_resa">Date<span>*</span></label>
                        <input type="date" name="date_resa" id="date_resa" value={resa.date_resa} onChange={handleForm} required />
                    </div>
                    <div>
                        <label htmlFor="heure_resa" >Heure<span>*</span></label>
                        <input type="time" name="heure_resa" id="heure_resa" value={resa.heure_resa} onChange={handleForm} required />
                    </div>
                    <div>
                        <label htmlFor="mail_resa">Mail<span>*</span></label>
                        <input type="email" name="mail_resa" id="mail_resa" value={resa.mail_resa} onChange={handleForm} required />
                    </div>
                    <div>
                        <label htmlFor="nom_resa">Nom<span>*</span></label>
                        <input type="text" name="nom_resa" id="nom_resa" value={resa.nom_resa} onChange={handleForm} required />
                    </div>
                    <div>
                        <label htmlFor="prenom_resa">Prénom<span>*</span></label>
                        <input type="text" name="prenom_resa" id="prenom_resa" value={resa.prenom_resa} onChange={handleForm} required />
                    </div>
                    {id != 0 ?
                        <ButtonUpdate id={id} type="resa" token={token} data={resa} /> :
                        <ButtonAdd type="resa" token={token} data={resa} />
                    }

                </fieldset>
            </form>
        </>
    )
}