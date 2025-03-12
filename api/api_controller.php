<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'api_model.php';
require_once 'auth.php'; // On inclut l'authentification

$request_method = $_SERVER['REQUEST_METHOD'];

// Exclure certaines routes de la vérification du token (ex: login)
$public_routes = [
    "POST" => ["admin_login","resaComplet"]
];

// Vérifier si la route est protégée
$type = isset($_GET["type"]) ? $_GET["type"] : null;
if (!in_array($type, $public_routes[$request_method] ?? [])) {
    $user_id = verifyToken(); // Vérifie le token et récupère l'ID utilisateur
}

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
                    $token = generateToken($user["id_admin"]);
                    echo json_encode(["success" => true, "message" => "Connexion réussie","token" => $token]);
                } else {
                    echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
                }
                header("Content-Type: application/json");
                break;
            case "resaComplet":
                $result = postResaComplet($_POST);
                header("Content-Type: application/json");
                echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
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

