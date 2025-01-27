<?php
session_start();

$db = new PDO('mysql:host=localhost;dbname=expo_einstein', 'root', '');


// ! Traitement


function login($infoLogin)
{
    if ($user = getUser($infoLogin["login"])) {
        if (password_verify($infoLogin["mdp"], $user["mdp"])) {
            $_SESSION["login"] = $infoLogin["login"];
            // Revenir à la page d'accueil
            header("location: index.php");
            // return "connexion";
        } else {
            return "err-mdp";
        }
        ;
    } else {
        return "err-login";
    }
    ;
}
;

function inscription($infoLogin)
{
    if (empty(getUser($infoLogin["login"]))) {

        if ($infoLogin["mdp"] == $infoLogin["conf"]) {

            insertUser($infoLogin["login"], $infoLogin["mdp"]);

            // echo "<br> Vous êtes inscrit";
            // echo "<a href='login.php'>Vous connectez</a>";
            login($infoLogin);

        } else {
            return "err-mdp";
        }

    } else {
        return "err-login";
    }
}
;

//! Utilisateur

function getUser($login)
{
    global $db;
    $requete = "SELECT * FROM user WHERE login=:login";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':login', $login, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;


function insertUser($login, $mdp)
{
    global $db;
    $requete = "INSERT INTO user VALUES (NULL, :login, :mdp);";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':login', $login, PDO::PARAM_STR);
    $mdp_hash = password_hash($mdp, PASSWORD_DEFAULT);
    $stmt->bindParam(':mdp', $mdp_hash, PDO::PARAM_STR);
    $stmt->execute();
}
;


function deconnexion()
{
    session_destroy();
    header("location: index.php");
}
;