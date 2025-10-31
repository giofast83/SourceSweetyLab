<?php
/**
 * Validazione e Sanitizzazione Input per SweetyLab
 * Protegge da attacchi e valida i dati del form contatti
 */

class ContactValidator {
    
    /**
     * Valida tutti i dati del form contatti
     * @param array $data Dati da validare
     * @return array Risultato validazione
     */
    public static function validateContactForm($data) {
        $errors = [];
        $sanitized = [];
        
        // Validazione Nome
        if (empty($data['name'])) {
            $errors['name'] = 'Il nome è obbligatorio';
        } else {
            $name = self::sanitizeString($data['name']);
            if (strlen($name) < 2 || strlen($name) > 100) {
                $errors['name'] = 'Il nome deve essere tra 2 e 100 caratteri';
            } else {
                $sanitized['name'] = $name;
            }
        }
        
        // Validazione Email
        if (empty($data['email'])) {
            $errors['email'] = 'L\'email è obbligatoria';
        } else {
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = 'Formato email non valido';
            } else {
                $sanitized['email'] = $email;
            }
        }
        
        // Validazione Telefono (opzionale)
        if (!empty($data['phone'])) {
            $phone = self::sanitizePhone($data['phone']);
            if (!self::isValidPhone($phone)) {
                $errors['phone'] = 'Formato telefono non valido';
            } else {
                $sanitized['phone'] = $phone;
            }
        } else {
            $sanitized['phone'] = null;
        }
        
        // Validazione Messaggio
        if (empty($data['message'])) {
            $errors['message'] = 'Il messaggio è obbligatorio';
        } else {
            $message = self::sanitizeString($data['message']);
            if (strlen($message) < 10 || strlen($message) > 2000) {
                $errors['message'] = 'Il messaggio deve essere tra 10 e 2000 caratteri';
            } else {
                $sanitized['message'] = $message;
            }
        }
        
        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'data' => $sanitized
        ];
    }
    
    /**
     * Sanitizza stringhe generiche
     * @param string $input Input da sanitizzare
     * @return string String sanitizzata
     */
    private static function sanitizeString($input) {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        return $input;
    }
    
    /**
     * Sanitizza numero di telefono
     * @param string $phone Telefono da sanitizzare
     * @return string Telefono sanitizzato
     */
    private static function sanitizePhone($phone) {
        // Rimuove tutto tranne numeri, spazi, +, -, (, )
        $phone = preg_replace('/[^0-9\s\+\-\(\)]/', '', $phone);
        return trim($phone);
    }
    
    /**
     * Valida formato telefono
     * @param string $phone Telefono da validare
     * @return bool True se valido
     */
    private static function isValidPhone($phone) {
        // Pattern per telefoni italiani e internazionali
        $patterns = [
            '/^(\+39\s?)?3\d{2}\s?\d{3}\s?\d{4}$/',  // Cellulare italiano
            '/^(\+39\s?)?\d{2,4}\s?\d{6,8}$/',       // Fisso italiano
            '/^\+\d{1,3}\s?\d{4,14}$/'               // Internazionale
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $phone)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Verifica rate limiting (protezione spam)
     * @param string $ip IP address
     * @return bool True se può inviare
     */
    public static function checkRateLimit($ip) {
        // Implementazione semplice: max 3 invii per IP ogni 10 minuti
        $rate_limit_file = __DIR__ . '/../temp/rate_limit.json';
        
        if (!file_exists(dirname($rate_limit_file))) {
            mkdir(dirname($rate_limit_file), 0755, true);
        }
        
        $current_time = time();
        $rate_data = [];
        
        if (file_exists($rate_limit_file)) {
            $rate_data = json_decode(file_get_contents($rate_limit_file), true) ?: [];
        }
        
        // Pulisci dati vecchi (più di 10 minuti)
        $rate_data = array_filter($rate_data, function($timestamp) use ($current_time) {
            return ($current_time - $timestamp) < 600; // 10 minuti
        });
        
        // Conta invii per questo IP
        $ip_requests = array_filter($rate_data, function($timestamp, $request_ip) use ($ip) {
            return $request_ip === $ip;
        }, ARRAY_FILTER_USE_BOTH);
        
        if (count($ip_requests) >= 3) {
            return false; // Rate limit superato
        }
        
        // Aggiungi questa richiesta
        $rate_data[$ip . '_' . $current_time] = $current_time;
        
        // Salva dati aggiornati
        file_put_contents($rate_limit_file, json_encode($rate_data));
        
        return true;
    }
}
?>