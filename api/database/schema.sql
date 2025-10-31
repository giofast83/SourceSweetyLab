-- Schema Database per SweetyLab Contatti
-- Esegui questo script nel tuo database MySQL del webhosting

-- Creazione database (se necessario)
-- CREATE DATABASE sweetylab_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE sweetylab_db;

-- Tabella per i contatti
CREATE TABLE IF NOT EXISTS sweetylab_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL COMMENT 'Nome del cliente',
    email VARCHAR(255) NOT NULL COMMENT 'Email del cliente',
    phone VARCHAR(50) NULL COMMENT 'Telefono del cliente (opzionale)',
    message TEXT NOT NULL COMMENT 'Messaggio del cliente',
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new' COMMENT 'Stato della richiesta',
    ip_address VARCHAR(45) NULL COMMENT 'IP del cliente per sicurezza',
    user_agent TEXT NULL COMMENT 'Browser del cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data di creazione',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data ultimo aggiornamento',
    
    -- Indici per performance
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_ip_address (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabella per gestire i contatti del sito SweetyLab';

-- Tabella per rate limiting (opzionale, per sicurezza avanzata)
CREATE TABLE IF NOT EXISTS sweetylab_rate_limit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    request_count INT DEFAULT 1,
    last_request TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    blocked_until TIMESTAMP NULL,
    
    UNIQUE KEY unique_ip (ip_address),
    INDEX idx_last_request (last_request)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Rate limiting per prevenire spam';

-- Inserimento dati di test (opzionale)
INSERT INTO sweetylab_contacts (name, email, phone, message, status) VALUES
('Maria Rossi', 'maria.rossi@email.com', '347 123 4567', 'Vorrei informazioni per il mio matrimonio a giugno 2024. Siete disponibili?', 'new'),
('Giulia Bianchi', 'giulia.bianchi@email.com', '339 987 6543', 'Complimenti per i vostri lavori! Vorrei un preventivo per un abito da cerimonia.', 'read'),
('Francesca Verdi', 'francesca.verdi@email.com', NULL, 'Ho visto le vostre creazioni su Instagram. Fate anche abiti per bambine?', 'new');

-- Query utili per la gestione

-- Visualizza tutti i contatti ordinati per data
-- SELECT * FROM sweetylab_contacts ORDER BY created_at DESC;

-- Conta contatti per stato
-- SELECT status, COUNT(*) as count FROM sweetylab_contacts GROUP BY status;

-- Contatti degli ultimi 7 giorni
-- SELECT * FROM sweetylab_contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Aggiorna stato di un contatto
-- UPDATE sweetylab_contacts SET status = 'replied' WHERE id = 1;

-- Backup della tabella (comando da eseguire via phpMyAdmin o terminale)
-- mysqldump -u username -p sweetylab_db sweetylab_contacts > backup_contacts.sql