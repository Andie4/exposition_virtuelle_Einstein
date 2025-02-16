<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php

if (isset($_GET["action"])) {
    $action = $_GET["action"];

    switch ($action) {
        
    }
} else {
    require "view/default.php";
}
?>
</body>
</html>