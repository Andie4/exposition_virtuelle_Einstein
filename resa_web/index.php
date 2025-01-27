<!DOCTYPE html>
<html lang="fr">

<?php
require "model.php";
require "view/header.php";
require "view/footer.php";
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php

if (isset($_GET["action"])) {
    $action = $_GET["action"];

    switch ($action) {
        // Connexion
        case "connexion":
            if (isset($_POST["login"])) {
                $msg = login($_POST);
            }
            require "view/connexion.php";
            break;
        // Inscription
        case "inscription":
            if (isset($_POST["login"])) {
                $msg = inscription($_POST);
            }
            require "view/inscription.php";
            break;
        // deconnexion
        case "deconnexion":
            deconnexion();
            break;

    }
} else {
    require "view/default.php";
}
?>
</body>
</html>