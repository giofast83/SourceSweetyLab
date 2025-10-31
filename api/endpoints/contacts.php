<?php
/**
 * API Endpoint per Gestione Contatti SweetyLab
 * Gestisce l'invio e il salvataggio dei form di contatto
 */

// Includi file necessari
require_once '../config/database.php';
require_once '../includes/cors.php';
require_once '../includes/validation.php';

// Verifica metodo HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Metodo non consentito. Utilizzare POST.', 405);
}

try {
    // Ottieni dati JSON dalla richiesta
    $json_input = file_get_contents('php://input');
    $input_data = json_decode($json_input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendError('Dati JSON non validi');
    }
    
    // Ottieni IP del client per rate limiting
    $client_ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    // Verifica rate limiting
    if (!ContactValidator::checkRateLimit($client_ip)) {
        sendError('Troppi tentativi. Riprova tra 10 minuti.', 429);
    }
    
    // Valida i dati
    $validation_result = ContactValidator::validateContactForm($input_data);
    
    if (!$validation_result['valid']) {
        sendJsonResponse([
            'success' => false,
            'errors' => $validation_result['errors'],
            'message' => 'Dati non validi'
        ], 400);
    }
    
    // Connessione al database
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db === null) {
        sendError('Errore di connessione al database', 500);
    }
    
    // Prepara query di inserimento
    $query = "INSERT INTO sweetylab_contacts 
              (name, email, phone, message, ip_address, user_agent, created_at) 
              VALUES (:name, :email, :phone, :message, :ip_address, :user_agent, NOW())";
    
    $stmt = $db->prepare($query);
    
    // Bind parametri
    $stmt->bindParam(':name', $validation_result['data']['name']);
    $stmt->bindParam(':email', $validation_result['data']['email']);
    $stmt->bindParam(':phone', $validation_result['data']['phone']);
    $stmt->bindParam(':message', $validation_result['data']['message']);
    $stmt->bindParam(':ip_address', $client_ip);
    $stmt->bindParam(':user_agent', $_SERVER['HTTP_USER_AGENT'] ?? '');
    
    // Esegui inserimento
    if ($stmt->execute()) {
        $contact_id = $db->lastInsertId();
        
        // Opzionale: Invia email di notifica
        sendNotificationEmail($validation_result['data']);
        
        // Risposta di successo
        sendJsonResponse([
            'success' => true,
            'message' => 'Richiesta inviata con successo! Ti contatteremo presto.',
            'contact_id' => $contact_id,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
    } else {
        sendError('Errore durante il salvataggio', 500);
    }
    
} catch (PDOException $e) {
    error_log("Errore database: " . $e->getMessage());
    sendError('Errore del server', 500);
    
} catch (Exception $e) {
    error_log("Errore generico: " . $e->getMessage());
    sendError('Errore interno del server', 500);
}

/**
 * Invia email di notifica (opzionale)
 * @param array $contact_data Dati del contatto
 */
function sendNotificationEmail($contact_data) {
    // Configurazione email (modifica con i tuoi dati)
    $to = "info@sweetylab.it";
    $subject = "Nuova richiesta di contatto - SweetyLab";
    
    $message = "
    <html>
    <head>
        <title>Nuova richiesta di contatto</title>
    </head>
    <body>
        <h2>Nuova richiesta di contatto da SweetyLab.it</h2>
        <p><strong>Nome:</strong> {$contact_data['name']}</p>
        <p><strong>Email:</strong> {$contact_data['email']}</p>
        <p><strong>Telefono:</strong> " . ($contact_data['phone'] ?: 'Non fornito') . "</p>
        <p><strong>Messaggio:</strong></p>
        <p>{$contact_data['message']}</p>
        <hr>
        <p><small>Ricevuto il: " . date('d/m/Y H:i:s') . "</small></p>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: noreply@sweetylab.it',
        'Reply-To: ' . $contact_data['email'],
        'X-Mailer: PHP/' . phpversion()
    ];
    
    // Invia email (se configurato)
    @mail($to, $subject, $message, implode("\r\n", $headers));
}
?>