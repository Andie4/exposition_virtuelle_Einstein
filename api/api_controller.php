<?php
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Répondre aux requêtes OPTIONS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0);
}

require_once 'api_model.php';
require_once 'auth.php';

$request_method = $_SERVER['REQUEST_METHOD'];

$public_routes = [
    "POST" => ["admin_login", "resaComplet"]
];

// Vérifier si la route est protégée
$type = isset($_GET["type"]) ? $_GET["type"] : null;
if (!in_array($type, $public_routes[$request_method] ?? [])) {
    $user_id = verifyToken(); 
}

switch ($request_method) {
    case "GET":
        $result = null;

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
        $result = null;
        switch ($_GET["type"]) {
            case "admin_login":
                $user = checkAdmin($_POST['login'], $_POST['mdp']);
                if ($user) {
                    $token = generateToken($user["id_admin"]);
                    $result = ["success" => true, "message" => "Connexion réussie", "token" => $token];
                } else {
                    $result = ["success" => false, "message" => "Identifiants incorrects"];
                }
                header("Content-Type: application/json");
                break;
            case "resaComplet":
                $result = postResaComplet($_POST);
                break;
            case "user":
                $result = postUser($_POST);
                break;
            case "resa":
                $result = postResa($_POST);
                break;
            case "billet":
                $result = postBillet($_POST);
                break;
            case "tarif":
                $result = postTarif($_POST);
                break;
            case "admin":
                $result = postAdmin($_POST);
                break;
        }
        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
    case "PUT":
        $result = null;
        $rawData = file_get_contents("php://input");
        if (strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
            $putData = json_decode($rawData, true);
        } else {
            parse_str($rawData, $putData);
        }

        if (!$putData) {
            echo json_encode(["error" => "Données PUT invalides"]);
            exit;
        }

        switch ($_GET["type"]) {
            case "user":
                $result = putUser($putData);
                break;
            case "resa":
                $result = putResa($putData);
                break;
            case "billet":
                $result = putBillet($putData);
                break;
            case "tarif":
                $result = putTarif($putData);
                break;
            case "admin":
                $result = putAdmin($putData);
                break;
        }
        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
    case "DELETE":
        $result = null;
        if (empty($_GET["id"])) {
            echo json_encode(["error" => "ID manquant pour la suppression"]);
            exit;
        }

        switch ($_GET["type"]) {
            case "user":
                $result = deleteUser($_GET["id"]);
                break;
            case "resa":
                $result = deleteResa($_GET["id"]);
                break;
            case "billet":
                $result = deleteBillet($_GET["id"]);
                break;
            case "tarif":
                $result = deleteTarif($_GET["id"]);
                break;
            case "admin":
                $result = deleteAdmin($_GET["id"]);
                break;
        }
        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        break;
    default:
        break;

}

