<header class="composant-header">
    <a href="#content" class="skip-link">Aller au contenu</a>
    <nav>
        <a class="retourAccueil" href="index.php"><img src="img/logo-full.png" alt="retour à l'accueil"></a>
        <ul>
            <?php
            if (isset($_SESSION["login"])) {
                ?>
                <li><a href="index.php?action=profil"><img class="ico-nav pp" src="img/account_circle.svg"
                            alt="image cliquable vers profil" title="Profil"></a></li>
                <li><a href="index.php?action=deconnexion"><img class="ico-nav" src="img/logout.svg"
                            alt="image cliquable pour se déconnecter" title="Se déconnecter"></a>
                </li>
                <?php
            } else {
                ?>
                <li><a href="index.php?action=connexion"><img class="ico-nav" src="img/account_circle.svg"
                            alt="image cliquable pour se connecter" title="Se connecter"></a></li>
                <li><a href="index.php?action=inscription"><img class="ico-nav" src="img/account_circle.svg"
                alt="image cliquable pour s'inscrire" title="S'inscrire'"></a></li>
                <?php
            }
            ?>


        </ul>
    </nav>
</header>