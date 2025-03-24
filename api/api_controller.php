<?php
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

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

$type = isset($_GET["type"]) ? $_GET["type"] : null;

if ($type === "doc" && $request_method === "GET") {
    $file_path = __DIR__ . "/documentationAPI.pdf"; 
    if (file_exists($file_path)) {
        header("Content-Type: application/pdf");
        header("Content-Disposition: inline; filename=\"documentation.pdf\"");
        readfile($file_path);
    } else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Fichier non trouvé"]);
    }
    exit;
}


$public_routes = [
    "POST" => ["admin_login", "resa"],
    "GET" => ["tarif"],
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
                case "resa":
                    $result = !empty($_GET["id"]) ? getOneResa($_GET["id"]) : getAllResa();
                    break;
                case "billet":
                    $result = !empty($_GET["id"]) ? getOneBillet($_GET["id"]) : getAllBillet();
                    break;
                case "resa_billet":
                    $result = !empty($_GET["id"]) ? getResaBillet($_GET["id"]) : "erreur : id de la réservation manquante";
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
                    $result = ["success" => true, "message" => "Connexion réussie","id_admin" => $user["id_admin"] ,"token" => $token];
                } else {
                    $result = ["success" => false, "message" => "Identifiants incorrects"];
                }
                header("Content-Type: application/json");
                break;
            case "resa":
                $result = postResaComplet($_POST);
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

