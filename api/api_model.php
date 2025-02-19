<?php

$db = new PDO('mysql:host=localhost;dbname=expo_einstein', 'root', '');


// ===============================================================  GET  ===================================================================

// GET USER
function getOneUser($id)
{
    global $db;
    $requete = "SELECT * FROM user WHERE id_user=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

function getAllUser()
{
    global $db;
    $requete = "SELECT * FROM user";
    $stmt = $db->query($requete);
    return $result = $stmt->fetchall(PDO::FETCH_ASSOC);
}
;

// GET RESA
function getOneResa($id)
{
    global $db;
    $requete = "SELECT * FROM resa WHERE id_resa=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

function getAllResa()
{
    global $db;
    $requete = "SELECT * FROM resa";
    $stmt = $db->query($requete);
    return $result = $stmt->fetchall(PDO::FETCH_ASSOC);
}
;

// GET BILLET
function getOneBillet($id)
{
    global $db;
    $requete = "SELECT * FROM billet WHERE id_billet=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

function getAllBillet()
{
    global $db;
    $requete = "SELECT * FROM billet";
    $stmt = $db->query($requete);
    return $result = $stmt->fetchall(PDO::FETCH_ASSOC);
}
;

// GET TARIF
function getOneTarif($id)
{
    global $db;
    $requete = "SELECT * FROM tarif WHERE id_tarif=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

function getAllTarif()
{
    global $db;
    $requete = "SELECT * FROM tarif";
    $stmt = $db->query($requete);
    return $result = $stmt->fetchall(PDO::FETCH_ASSOC);
}
;

// ===============================================================  POST  ==================================================================

// POST USER
function postUser($_POST)
{
    global $db;
    $requete = "INSERT INTO user VALUES (:mail, :nom, :prenom);";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':mail', $_POST["mail"], PDO::PARAM_STR);
    $stmt->bindParam(':nom', $_POST["nom"], PDO::PARAM_STR);
    $stmt->bindParam(':prenom', $_POST["prenom"], PDO::PARAM_STR);
    $stmt->execute();
}
;

// POST RESA
function postResa($_POST)
{
    global $db;
    $requete = "INSERT INTO resa VALUES (NULL, :date, :heure, :mail);";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':mail', $_POST["mail"], PDO::PARAM_STR);
    $stmt->bindParam(':nom', $_POST["nom"], PDO::PARAM_STR);
    $stmt->bindParam(':prenom', $_POST["prenom"], PDO::PARAM_STR);
    $stmt->execute();
}
;

// POST BILLET
function postBillet($_POST)
{
    global $db;
    $requete = "INSERT INTO billet VALUES (NULL, :user, :resa, :tarif);";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':user', $_POST["user"], PDO::PARAM_STR);
    $stmt->bindParam(':resa', $_POST["resa"], PDO::PARAM_STR);
    $stmt->bindParam(':tarif', $_POST["tarif"], PDO::PARAM_STR);
    $stmt->execute();
}
;

// POST TARIF
function postTarif($_POST)
{
    global $db;
    $requete = "INSERT INTO tarif VALUES (NULL, :nom_tarif, :prix);";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':nom_tarif', $_POST["nom_tarif"], PDO::PARAM_STR);
    $stmt->bindParam(':prix', $_POST["prix"], PDO::PARAM_STR);
    $stmt->execute();
}
;


// ===============================================================  PUT  ===================================================================

// PUT USER
function putUser($_PUT)
{

}
;

// PUT RESA
function putResa($_PUT)
{
}
;

// PUT BILLET
function putBillet($_PUT)
{
}
;

// PUT TARIF
function putTarif($_PUT)
{
}
;


// ===============================================================  DELETE  ================================================================

// DELETE USER
function deleteUser($id)
{
    global $db;
    $requete = "DELETE FROM user WHERE id_user=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

// DELETE RESA
function deleteResa($id)
{
    global $db;
    $requete = "DELETE FROM resa WHERE id_resa=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

// DELETE BILLET
function deleteBillet($id)
{
    global $db;
    $requete = "DELETE FROM billet WHERE id_billet=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

// DELETE TARIF
function deleteTarif($id)
{
    global $db;
    $requete = "DELETE FROM tarif WHERE id_tarif=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;
