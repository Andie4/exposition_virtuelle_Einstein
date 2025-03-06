<?php

require_once 'api_model.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
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
            case "admin":
                if (!empty($_GET["id"])) {
                    $result = getOneAdmin($_GET["id"]);
                } else {
                    $result = getAllAdmin();
                }
                break;
        }
        header('Content-Type: application/json');
        echo json_encode($result, JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE);
        break;
    case "POST":
        switch ($_GET["type"]) {
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

