# 🌸 API SweetyLab - Documentazione

API PHP per la gestione dei contatti del sito SweetyLab.

## 📁 Struttura File

```
api/
├── config/
│   └── database.php          # Configurazione database
├── includes/
│   ├── cors.php             # Gestione CORS
│   └── validation.php       # Validazione input
├── endpoints/
│   └── contacts.php         # Endpoint contatti
├── database/
│   └── schema.sql           # Schema database
├── temp/                    # File temporanei (rate limiting)
├── .htaccess               # Configurazione sicurezza
└── README.md               # Questa documentazione
```

## 🚀 Installazione

### 1. Upload sul Server
Carica la cartella `api/` nella root del tuo webhosting vhost:
```
public_html/
├── api/                    # Cartella API
├── index.html             # Sito React (dopo build)
└── assets/                # Assets del sito
```

### 2. Configurazione Database
1. Accedi al **phpMyAdmin** del tuo hosting
2. Crea un nuovo database: `sweetylab_db`
3. Importa il file `database/schema.sql`
4. Modifica `config/database.php` con i tuoi dati:

```php
private $host = "localhost";           // Host database
private $db_name = "sweetylab_db";     // Nome database
private $username = "tuo_username";    // Username
private $password = "tua_password";    // Password
```

### 3. Configurazione Domini
Modifica `includes/cors.php` con i tuoi domini:

```php
$allowed_origins = [
    'https://www.sweetylab.it',        # Tuo dominio
    'https://sweetylab.it'             # Senza www
];
```

## 🔧 Utilizzo API

### Endpoint Contatti
**URL:** `https://tuodominio.it/api/endpoints/contacts.php`
**Metodo:** `POST`
**Content-Type:** `application/json`

### Richiesta
```json
{
    "name": "Maria Rossi",
    "email": "maria@email.com",
    "phone": "347 123 4567",
    "message": "Vorrei informazioni per il mio matrimonio..."
}
```

### Risposta Successo
```json
{
    "success": true,
    "message": "Richiesta inviata con successo! Ti contatteremo presto.",
    "contact_id": 123,
    "timestamp": "2024-01-15 14:30:00"
}
```

### Risposta Errore
```json
{
    "success": false,
    "errors": {
        "email": "Formato email non valido",
        "message": "Il messaggio è obbligatorio"
    },
    "message": "Dati non validi"
}
```

## 🛡️ Sicurezza

### Protezioni Implementate
- ✅ **Validazione input** completa
- ✅ **Sanitizzazione** dati
- ✅ **Rate limiting** (3 richieste/10min per IP)
- ✅ **CORS** configurabile
- ✅ **SQL Injection** protection
- ✅ **XSS** protection
- ✅ **Headers** di sicurezza

### Rate Limiting
- **Limite:** 3 richieste ogni 10 minuti per IP
- **Risposta:** HTTP 429 se superato
- **Reset:** Automatico dopo 10 minuti

## 📊 Gestione Database

### Visualizza Contatti
```sql
SELECT * FROM sweetylab_contacts 
ORDER BY created_at DESC;
```

### Cambia Stato Contatto
```sql
UPDATE sweetylab_contacts 
SET status = 'replied' 
WHERE id = 123;
```

### Statistiche
```sql
SELECT 
    status, 
    COUNT(*) as count 
FROM sweetylab_contacts 
GROUP BY status;
```

## 📧 Notifiche Email

L'API può inviare email automatiche quando arriva un nuovo contatto.

### Configurazione
Modifica in `endpoints/contacts.php`:
```php
$to = "info@sweetylab.it";  // Tua email
```

### Requisiti Server
- Funzione `mail()` PHP abilitata
- Server SMTP configurato (di solito incluso nell'hosting)

## 🔍 Debug e Log

### Verifica Funzionamento
1. **Test connessione database:**
   ```
   https://tuodominio.it/api/config/database.php
   ```

2. **Test endpoint:**
   Usa Postman o curl per testare l'API

### Log Errori
Gli errori vengono loggati automaticamente nei log PHP del server.

## 📱 Integrazione React

Esempio di chiamata dall'app React:

```javascript
const response = await fetch('https://tuodominio.it/api/endpoints/contacts.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
    })
});

const result = await response.json();
```

## 🚨 Troubleshooting

### Errori Comuni

**500 Internal Server Error**
- Verifica permessi file (755 per directory, 644 per file)
- Controlla log errori PHP
- Verifica configurazione database

**CORS Error**
- Aggiungi il tuo dominio in `cors.php`
- Verifica headers HTTP

**Database Connection Failed**
- Controlla credenziali in `database.php`
- Verifica che il database esista
- Testa connessione da phpMyAdmin

### Supporto
Per problemi tecnici, controlla:
1. Log errori del server
2. Console browser (F12)
3. Risposta API con strumenti developer

## 📈 Ottimizzazioni Future

- **Dashboard admin** per gestire contatti
- **Backup automatici** database
- **Analytics** avanzate
- **Integrazione CRM**
- **Notifiche push**

---

**Versione:** 1.0  
**Compatibilità:** PHP 7.4+, MySQL 5.7+  
**Licenza:** Proprietaria SweetyLab