<?php

require_once 'api/api_model.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    // Archives
    case "GET":
        switch ($_GET["type"]) {
            case "user":
                if (!empty($_GET["id"])) {
                    $result = getOneUser($_GET["id"]);
                } else {
                    $result = getAllUser();
                }
                break;
            case "resa":
                if (!empty($_GET["id"])) {
                    $result = getOneResa($_GET["id"]);
                } else {
                    $result = getAllResa();
                }
                break;
            case "billet":
                if (!empty($_GET["id"])) {
                    $result = getOneBillet($_GET["id"]);
                } else {
                    $result = getAllBillet();
                }
                break;
            case "tarif":
                if (!empty($_GET["id"])) {
                    $result = getOneTarif($_GET["id"]);
                } else {
                    $result = getAllTarif();
                }
                break;
        }
        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE);
        break;
    case "POST":
        switch ($_GET["type"]) {
            case "user":
                $result = insertUser($_POST);
                break;
            case "resa":
                $result = insertResa($_POST);
                break;
            case "billet":
                $result = insertBillet($_POST);
                break;
            case "tarif":
                $result = insertTarif($_POST);
                break;
        }
        break;
    case "PUT":
        switch ($_GET["type"]) {
            case "user":
                $result = updateUser($_PUT);
                break;
            case "resa":
                $result = updateResa($_PUT);
                break;
            case "billet":
                $result = updateBillet($_PUT);
                break;
            case "tarif":
                $result = updateTarif($_PUT);
                break;

        }
        break;
    case "DELETE":
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
        }
        break;
    default:
        break;

}

