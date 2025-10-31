<?php
/**
 * Configurazione Database per SweetyLab
 * Modifica questi parametri con i dati del tuo hosting vhost
 */

class Database {
    // Parametri di connessione - MODIFICA CON I TUOI DATI
    private $host = "localhost";           // Host del database (di solito localhost)
    private $db_name = "sweetylab_db";     // Nome del database
    private $username = "your_username";    // Username database
    private $password = "your_password";    // Password database
    private $charset = "utf8mb4";
    
    public $conn;

    /**
     * Connessione al database
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch(PDOException $exception) {
            error_log("Errore connessione database: " . $exception->getMessage());
            return null;
        }
        
        return $this->conn;
    }
}
?>