import React from "react";


export function Nav() {
    return (
        <nav class="navbar">
        <a href="index.php" class="logo">XPLORIA</a>
            <div class="nav-links">
            <ul>
                <li><a href="index.php" class="black">Accueil</a></li>
                <li><a href="manage_resa.php" class="black">Gestion des réservations</a></li>
                <li><a href="profil.php" class="black">Profil</a></li>
            </ul>
            </div>
            <img src="./img/menu.svg" alt="menu hamburger" class="menu-burger"/>
            <img src="./img/close.svg" alt="close" class="close"/>
        </nav>
       );
}