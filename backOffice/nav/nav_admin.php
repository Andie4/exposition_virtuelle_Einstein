<?php echo'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>nav admin</title>
    <link rel="stylesheet" href="styles/nav_admin.css">
</head>
<body>
<div id="container">
<header id="header" role="banner">
    <button id="menu-toggle" class="menu-burger">&#9776;</button>
    <nav id="nav-menu" class="nav-closed">
        <div class="flex margin-bottom">
            <p class="initiales">ED</p>
        </div><br>
        <ul>
            <li class="hoverNav">
                <div class="flex margin-bottom">
                    <img src="images/icone_home.svg" class="icone_nav" alt="">
                    <a href="#">Accueil</a>
                </div>
            </li>
            <li class="hoverNav">
                <div class="flex margin-bottom">
                    <img src="images/icone_profil.svg" class="icone_nav" alt="">
                    <a href="profil.php">Profil</a>
                </div>
            </li>
            <li class="hoverNav">
                <div class="flex margin-bottom">
                    <img src="images/icone_resa.svg" class="icone_nav" alt="">
                    <a href="manage_resa.php
                    ">Gestion des réservations</a>
                </div>
            </li>
        </ul>
    </nav>
</header>
</div>
    
</body>
</html>';
?>