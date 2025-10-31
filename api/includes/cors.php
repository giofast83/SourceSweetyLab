<?php
/**
 * Gestione CORS per SweetyLab API
 * Permette al sito React di comunicare con l'API PHP
 */

// Domini autorizzati (modifica con il tuo dominio)
$allowed_origins = [
    'http://localhost:5173',           // Sviluppo locale
    'http://localhost:3000',           // Sviluppo alternativo
    'https://www.sweetylab.it',        // Dominio produzione
    'https://sweetylab.it'             // Dominio senza www
];

// Ottieni l'origine della richiesta
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Verifica se l'origine è autorizzata
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// Headers CORS necessari
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Gestione richieste OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Funzione per inviare risposta JSON
 * @param array $data Dati da inviare
 * @param int $status_code Codice di stato HTTP
 */
function sendJsonResponse($data, $status_code = 200) {
    http_response_code($status_code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Funzione per gestire errori
 * @param string $message Messaggio di errore
 * @param int $code Codice di errore
 */
function sendError($message, $code = 400) {
    sendJsonResponse([
        'success' => false,
        'error' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ], $code);
}
?>