<?php
header("Content-Type: application/json");

echo json_encode([
    "message" => "Bienvenue sur l'API Expo_Einstein",
    "documentation" => "GET api/doc",
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
