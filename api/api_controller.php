<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type"); 
header("Content-Type: application/json");

require_once 'api_model.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case "GET":
        $result = null; // Initialiser la variable

        if (!empty($_GET["type"])) {
            switch ($_GET["type"]) {
                case "user":
                    $result = !empty($_GET["id"]) ? getOneUser($_GET["id"]) : getAllUser();
                    break;
                case "resa":
                    $result = !empty($_GET["id"]) ? getOneResa($_GET["id"]) : getAllResa();
                    break;
                case "billet":
                    $result = !empty($_GET["id"]) ? getOneBillet($_GET["id"]) : getAllBillet();
                    break;
                case "tarif":
                    $result = !empty($_GET["id"]) ? getOneTarif($_GET["id"]) : getAllTarif();
                    break;
                case "admin":
                    $result = !empty($_GET["id"]) ? getOneAdmin($_GET["id"]) : getAllAdmin();
                    break;
                default:
                    $result = ["error" => "Type inconnu"];
                    break;
            }
        } else {
            $result = ["error" => "Aucun type spécifié"];
        }

        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
    case "POST":
        switch ($_GET["type"]) {
            case "admin_login":
                $user = checkAdmin($_POST['login'], $_POST['mdp']);
                if ($user) {
                    echo json_encode(["success" => true, "message" => "Connexion réussie"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
                }
                header("Content-Type: application/json");
                break;
            case "resaComplet":
                postResaComplet($_POST);
                break;
            case "user":
                postUser($_POST);
                break;
            case "resa":
                postResa($_POST);
                break;
            case "billet":
                postBillet($_POST);
                break;
            case "tarif":
                postTarif($_POST);
                break;
            case "admin":
                postAdmin($_POST);
                break;
        }
        break;
    case "PUT":
        switch ($_GET["type"]) {
            case "user":
                putUser($_PUT);
                break;
            case "resa":
                putResa($_PUT);
                break;
            case "billet":
                putBillet($_PUT);
                break;
            case "tarif":
                putTarif($_PUT);
                break;
            case "admin":
                putAdmin($_PUT);
                break;
        }
        break;
    case "DELETE":
        switch ($_GET["type"]) {
            case "user":
                deleteUser($_GET["id"]);
                break;
            case "resa":
                deleteResa($_GET["id"]);
                break;
            case "billet":
                deleteBillet($_GET["id"]);
                break;
            case "tarif":
                deleteTarif($_GET["id"]);
                break;
            case "admin":
                deleteAdmin($_GET["id"]);
                break;
        }
        break;
    default:
        break;

}

