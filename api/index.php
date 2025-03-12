<?php
header("Content-Type: application/json");

echo json_encode([
    "message" => "Bienvenue sur l'API de réservation.",
    "documentation" => "Consultez la documentation pour plus d'informations.",
    "routes exemple" => [
        "GET /user/1" => "Récupérer un utilisateur par ID",
        "POST /admin_login" => "Connexion administrateur",
        "PUT /user" => "Mettre à jour un utilisateur",
        "DELETE /user/1" => "Supprimer un utilisateur"
    ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
