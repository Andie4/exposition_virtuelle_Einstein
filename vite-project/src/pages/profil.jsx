import React from "react";
import { Nav } from "../component/nav";

export function Profil() {
    return (
        <>
            <Nav />
            <main>
                <h1>Profil</h1>
                <form>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" />
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom" />
                    <label htmlFor="login">Login</label>
                    <input type="text" id="login" name="login" />
                    <label htmlFor="mdp">Mot de passe</label>
                    <input type="password" id="mdp" name="mdp" />
                    <button type="submit">Enregistrer</button>
                </form>
            </main>
        </>

    );
}