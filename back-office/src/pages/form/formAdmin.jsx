import { ButtonAdd } from "../../component/buttonAdd";
import { ButtonUpdate } from "../../component/buttonUpdate";
import { Nav } from "../../component/nav";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function FormAdmin() {
    let { id } = useParams();
    const token=localStorage.getItem("token");
    const [admin, setAdmin] = useState({
        "id_admin": 0,
        "nom_admin": "",
        "prenom_admin": "",
        "mail_admin": "",
        "login_admin": "",
        "mdp_admin": ""
    });

    useEffect(() => {
        if (id != 0) {
            fetch(`http://localhost/exposition_virtuelle_Einstein/api/admin/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setAdmin(data);
                });
        }

    }
        , [id]);

    const handleForm = (e) => {
        setAdmin({ ...admin, [e.target.id]: e.target.value
        });
    }

    return (
        <>
            <Nav />
            <h1>Formulaire administrateur</h1>
            <Link to="/gest_admin">Retour</Link>
            <br />
            <form action="">
                <fieldset>
                    <legend>{id!=0 ? "Modifier l'administrateur" : "Ajouter un administrateur"}</legend>
                    <label htmlFor="nom_admin">Nom</label>
                    <input type="text" name="nom_admin" id="nom_admin" value={admin.nom_admin} onChange={handleForm} required />
                    <label htmlFor="prenom_admin">Prénom</label>
                    <input type="text" name="prenom_admin" id="prenom_admin" value={admin.prenom_admin} onChange={handleForm} required />
                    <label htmlFor="mail_admin">Mail</label>
                    <input type="email" name="mail_admin" id="mail_admin" value={admin.mail_admin} onChange={handleForm} required />
                    <label htmlFor="login_admin">Login</label>
                    <input type="text" name="login_admin" id="login_admin" value={admin.login_admin} onChange={handleForm} required />
                    <label htmlFor="mdp_admin">Mot de passe</label>
                    <input type="password" name="mdp_admin" id="mdp_admin"  onChange={handleForm} required />
               
                    {id!=0 ? 
                    <ButtonUpdate id={id} type="admin" token={token} data={admin} /> :  
                    <ButtonAdd type="admin" token={token} data={admin} />
                    }
                   
                </fieldset>
            </form>
        </>
    )
}