<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    include "api_model.php";
    $request_method = $_SERVER["REQUEST_METHOD"];

    switch ($request_method) {
        case 'GET':
            switch ($type) {
                case 'user':
                    if (isset($_GET["id"])){
                        $result=getOneUser($_GET["id"]);
                    } else {
                        $result=getAllUser();
                    }
                    header('Content-Type: application/json');
                    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    break;
                case 'resa':
                    if (isset($_GET["id"])){
                        $result=getOneResa($_GET["id"]);
                    } else {
                        $result=getAllResa();
                    }
                    header('Content-Type: application/json');
                    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    break;
                case 'billet':
                    if (isset($_GET["id"])){
                        $result=getOneBillet($_GET["id"]);
                    } else {
                        $result=getAllBillet();
                    }
                    header('Content-Type: application/json');
                    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    break;
                case 'tarif':
                    if (isset($_GET["id"])){
                        $result=getOneTarif($_GET["id"]);
                    } else {
                        $result=getAllTarif();
                    }
                    header('Content-Type: application/json');
                    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    break;
            }
            break;
        case 'POST':
            switch ($type) {
                case 'user':
                    break;
                case 'resa':
                    break;
                case 'billet':
                    break;
                case 'tarif':
                    break;
            }
            break;
        case 'PUT':
            switch ($type) {
                case 'user':
                    break;
                case 'resa':
                    break;
                case 'billet':
                    break;
                case 'tarif':
                    break;
            }
            break;
        case 'DELETE':
            switch ($type) {
                case 'user':
                    break;
                case 'resa':
                    break;
                case 'billet':
                    break;
                case 'tarif':
                    break;
            }
            break;
    }

    ?>
</body>

</html>