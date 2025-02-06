<?php
session_start();

$db = new PDO('mysql:host=localhost;dbname=expo_einstein', 'root', '');


// ! Traitement


function login($infoLogin)
{
    if ($user = getUser($infoLogin["login"])) {
        if (password_verify($infoLogin["mdp"], $user["mdp"])) {
            $_SESSION["login"] = $infoLogin["login"];
            $infoUser=getUser($infoLogin["login"]);
            $_SESSION["prenom"] = $infoUser["prenom"];
            $_SESSION["nom"] = $infoUser["nom"];
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

            insertUser($infoLogin);

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


function insertUser($tab)
{
    global $db;
    $requete = "INSERT INTO user VALUES (:login, :mdp, :nom, :prenom, NULL);";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':login', $tab["login"], PDO::PARAM_STR);
    $mdp_hash = password_hash($tab["mdp"], PASSWORD_DEFAULT);
    $stmt->bindParam(':mdp', $mdp_hash, PDO::PARAM_STR);
    $stmt->bindParam(':nom', $tab["nom"], PDO::PARAM_STR);
    $stmt->bindParam(':prenom', $tab["prenom"], PDO::PARAM_STR);
    // if (isset($tab["birth_date"])){
    //     $stmt->bindParam(':birt_date', $tab["birth_date"],PDO::PARAM_STR);
    // }else{
    //     $null=NULL;
    //     $stmt->bindParam(':birt_date', $null,PDO::PARAM_STR);
    // }
    $stmt->execute();
}
;


function deconnexion()
{
    session_destroy();
    header("location: index.php");
}
;