<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$config = require 'config.php';
$secret_key = $config['jwt_secret'];

function generateToken($user_id) {
    global $secret_key;
    $issued_at = time();
    $expiration_time = $issued_at + 3600; // 1h

    $payload = [
        "iat" => $issued_at,
        "exp" => $expiration_time,
        "user_id" => $user_id
    ];

    return JWT::encode($payload, $secret_key, 'HS256');
}

function verifyToken() {
    global $secret_key;
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Accès refusé. Token manquant."]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return $decoded->user_id;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message" => "Token invalide ou expiré."]);
        exit;
    }
}
?>
