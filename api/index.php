<?php
header("Content-Type: application/json");

echo json_encode([
    "message" => "Bienvenue sur l'API de réservation.",
    "documentation" => "Consultez la documentation pour plus d'informations.",
    "routes" => [
        "GET /?type=user&id=1" => "Récupérer un utilisateur par ID",
        "POST /?type=admin_login" => "Connexion administrateur",
        "PUT /?type=user&id=1" => "Mettre à jour un utilisateur",
        "DELETE /?type=user&id=1" => "Supprimer un utilisateur"
    ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
