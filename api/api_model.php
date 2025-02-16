<?php

$db = new PDO('mysql:host=localhost;dbname=expo_einstein', 'root', '');


// ===============================================================  GET  ============================================================================

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

// ===============================================================  POST  ============================================================================

// POST USER
function postUser()
{

}
;

// POST RESA
function postResa()
{
}
;

// POST BILLET
function postBillet()
{
}
;

// POST TARIF
function postTarif()
{
}
;


// ===============================================================  PUT  ============================================================================

// PUT USER
function putUser($id)
{

}
;

// PUT RESA
function putResa($id)
{
}
;

// PUT BILLET
function putBillet($id)
{
}
;

// PUT TARIF
function putTarif($id)
{
}
;


// ===============================================================  DELETE  ============================================================================

// DELETE USER
function deleteUser($id)
{

}
;

// DELETE RESA
function deleteResa($id)
{
}
;

// DELETE BILLET
function deleteBillet($id)
{
}
;

// DELETE TARIF
function deleteTarif($id)
{
}
;
