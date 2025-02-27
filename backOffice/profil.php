<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil</title>
    <link rel="stylesheet" href="styles/profil.css">
</head>
<body>
<?php include 'nav_admin.php';?>


    <h1>Profil</h1>

    <h2>Informations</h2>
    <div class="blocInfos">
        <div>
            <p>Nom : Exemple</p>
            <p>Prénom : Exemple</p>
            <p>Mail : exemple@mail.com</p>
        </div>
    </div>
    <hr>

    <h2>Réinitsialiser le mdp</h2>
    <span class="flex">
        <div class="blocUpdateMdp">
            <form action="POST">
                <span class="flex">
                    <div class="updateMdp">
                        <label for="">Login :</label>
                        <input type="text" name="login">
                    </div>
                    <div class="updateMdp">
                        <label for="">Mot de passe :</label>
                        <input type="text" name="mdp">
                    </div>
                </span>
                <button type="submit">Valider</button>
            </form>
        </div>    

    </span>
</body>
</html>