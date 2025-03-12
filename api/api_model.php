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

// GET ADMIN
function getOneAdmin($id)
{
    global $db;
    $requete = "SELECT * FROM admin WHERE id_admin=:id";
    $stmt = $db->prepare($requete);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
;

function getAllAdmin()
{
    global $db;
    $requete = "SELECT * FROM admin";
    $stmt = $db->query($requete);
    return $result = $stmt->fetchall(PDO::FETCH_ASSOC);
}

// ===============================================================  POST  ==================================================================

// POST USER
function postUser($tab)
{
    global $db;
    try {
        $requete = "INSERT INTO user VALUES (NULL, :mail, :nom, :prenom);";
        $stmt = $db->prepare($requete);

        $mail = isset($tab["mail"]) ? $tab["mail"] : NULL;

        $stmt->bindParam(':mail', $mail, PDO::PARAM_STR);
        $stmt->bindParam(':nom', $tab["nom"], PDO::PARAM_STR);
        $stmt->bindParam(':prenom', $tab["prenom"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => true, "message" => "Utilisateur ajouté", "id" => $db->lastInsertId()];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// POST RESA
function postResa($tab)
{
    global $db;
    try {
        $requete = "INSERT INTO resa (date, heure, responsable) VALUES (:date, :heure, :responsable);";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':date', $tab["date"], PDO::PARAM_STR);
        $stmt->bindParam(':heure', $tab["heure"], PDO::PARAM_STR);
        $stmt->bindParam(':responsable', $tab["responsable"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => true, "message" => "Réservation ajoutée", "id" => $db->lastInsertId()];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// POST BILLET
function postBillet($tab)
{
    global $db;
    try {
        $requete = "INSERT INTO billet (user, resa, tarif) VALUES (:user, :resa, :tarif);";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':user', $tab["user"], PDO::PARAM_INT);
        $stmt->bindParam(':resa', $tab["resa"], PDO::PARAM_INT);
        $stmt->bindParam(':tarif', $tab["tarif"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => true, "message" => "Billet ajouté", "id" => $db->lastInsertId()];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// POST TARIF
function postTarif($tab)
{
    global $db;
    try {
        $requete = "INSERT INTO tarif (nom_tarif, prix) VALUES (:nom_tarif, :prix);";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':nom_tarif', $tab["nom"], PDO::PARAM_STR);
        $stmt->bindParam(':prix', $tab["prix"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => true, "message" => "Tarif ajouté", "id" => $db->lastInsertId()];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// POST ADMIN
function postAdmin($tab)
{
    global $db;
    try {
        $requete = "INSERT INTO admin (login, mdp) VALUES (:login, :mdp);";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':login', $tab["login"], PDO::PARAM_STR);

        $mdp_hash = password_hash($tab["mdp"], PASSWORD_DEFAULT);
        $stmt->bindParam(':mdp', $mdp_hash, PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => true, "message" => "Admin ajouté", "id" => $db->lastInsertId()];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}



// ===============================================================  PUT  ===================================================================

// PUT USER
function putUser($_PUT)
{
    global $db;
    try {
        $requete = "UPDATE user SET mail_user = :mail, nom_user = :nom, prenom_user = :prenom WHERE id_user = :id_user";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id_user', $_PUT["id_user"], PDO::PARAM_INT);
        $stmt->bindParam(':mail', $_PUT["mail"], PDO::PARAM_STR);
        $stmt->bindParam(':nom', $_PUT["nom"], PDO::PARAM_STR);
        $stmt->bindParam(':prenom', $_PUT["prenom"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Utilisateur mis à jour" : "Aucune modification"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// PUT RESA
function putResa($_PUT)
{
    global $db;
    try {
        $requete = "UPDATE resa SET date_resa = :date, heure_resa = :heure, resp_resa = :resp WHERE id_resa = :id_resa";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id_resa', $_PUT["id_resa"], PDO::PARAM_INT);
        $stmt->bindParam(':resp', $_PUT["responsable"], PDO::PARAM_INT);
        $stmt->bindParam(':date', $_PUT["date"], PDO::PARAM_STR);
        $stmt->bindParam(':heure', $_PUT["heure"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Réservation mise à jour" : "Aucune modification"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// PUT BILLET
function putBillet($_PUT)
{
    global $db;
    try {
        $requete = "UPDATE billet SET user = :user, resa = :resa, tarif = :tarif WHERE id_billet = :id_billet";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id_billet', $_PUT["id_billet"], PDO::PARAM_INT);
        $stmt->bindParam(':user', $_PUT["user"], PDO::PARAM_INT);
        $stmt->bindParam(':resa', $_PUT["resa"], PDO::PARAM_INT);
        $stmt->bindParam(':tarif', $_PUT["tarif"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Billet mis à jour" : "Aucune modification"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// PUT TARIF
function putTarif($_PUT)
{
    global $db;
    try {
        $requete = "UPDATE tarif SET nom_tarif = :nom, prix = :prix WHERE id_tarif = :id_tarif";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id_tarif', $_PUT["id_tarif"], PDO::PARAM_INT);
        $stmt->bindParam(':nom', $_PUT["nom"], PDO::PARAM_STR);
        $stmt->bindParam(':prix', $_PUT["prix"], PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Tarif mis à jour" : "Aucune modification"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// PUT ADMIN
function putAdmin($_PUT)
{
    global $db;
    try {
        $requete = "UPDATE admin SET login_admin = :login, mdp_admin = :mdp WHERE id_admin = :id_admin";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id_admin', $_PUT["id_admin"], PDO::PARAM_INT);
        $stmt->bindParam(':login', $_PUT["login"], PDO::PARAM_STR);
        
        $mdp_hash = password_hash($_PUT["mdp"], PASSWORD_DEFAULT);
        $stmt->bindParam(':mdp', $mdp_hash, PDO::PARAM_STR);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Admin mis à jour" : "Aucune modification"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}


// ===============================================================  DELETE  ================================================================
// DELETE USER
function deleteUser($id)
{
    global $db;
    try {
        $requete = "DELETE FROM user WHERE id_user = :id";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Utilisateur supprimé" : "Utilisateur introuvable"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// DELETE RESA
function deleteResa($id)
{
    global $db;
    try {
        $requete = "DELETE FROM resa WHERE id_resa = :id";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Réservation supprimée" : "Réservation introuvable"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// DELETE BILLET
function deleteBillet($id)
{
    global $db;
    try {
        $requete = "DELETE FROM billet WHERE id_billet = :id";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Billet supprimé" : "Billet introuvable"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// DELETE TARIF
function deleteTarif($id)
{
    global $db;
    try {
        $requete = "DELETE FROM tarif WHERE id_tarif = :id";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Tarif supprimé" : "Tarif introuvable"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}

// DELETE ADMIN
function deleteAdmin($id)
{
    global $db;
    try {
        $requete = "DELETE FROM admin WHERE id_admin = :id";
        $stmt = $db->prepare($requete);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return ["success" => $stmt->rowCount() > 0, "message" => $stmt->rowCount() > 0 ? "Administrateur supprimé" : "Administrateur introuvable"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => $e->getMessage()];
    }
}


//  =============================================================  CHECK  ==================================================================

function checkAdmin($login, $mdp)
{
    global $db;

    $sql = "SELECT * FROM admin WHERE login_admin = :login";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':login', $login);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($mdp, $user['mdp_admin'])) {
        return $user;
    }

    return null;
}

//  =============================================================  RESA COMP  =============================================================

function postResaComplet($tab)
{
    global $db;
    // Insérer l'utilisateur responsable de la réservation
    postUser($tab["responsable"]);
    $respId = $db->lastInsertId();

    // Insérer la réservation
    $resaInfo = [
        "date" => $tab["reservation"]["date"],
        "heure" => $tab["reservation"]["heure"],
        "responsable" => $respId
    ];
    postResa($resaInfo);
    $resaId = $db->lastInsertId();


    // Vérifier si des billets sont fournis
    if (!isset($tab["billets"]) || !is_array($tab["billets"]) || count($tab["billets"]) === 0) {
        throw new Exception("Aucun billet fourni pour cette réservation.");
    }

    // Insérer les billets liés à cette réservation
    foreach ($tab["billets"] as $billet) {
        // Insérer le billet avec la réservation liée
        postUser(tab: $billet);
        $userId = $db->lastInsertId();
        $billetInfo = [
            "user" => $userId,
            "resa" => $resaId,
            "tarif" => $billet["tarif"]
        ];
        postBillet($billetInfo);
    }

    return [
        "success" => true,
        "message" => "Réservation et billets ajoutés avec succès.",
        "resp_id" => $respId,
        "reservation_id" => $resaId
    ];

}
