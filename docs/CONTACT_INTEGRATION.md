# Integrazione Form Contatti - SweetyLab

## Panoramica
Il form contatti di SweetyLab è stato integrato con un'API PHP per salvare i dati nel database del webhosting (vhost). L'integrazione include validazione lato client e server, gestione errori, e misure di sicurezza avanzate.

## Architettura
```
React Frontend → API PHP → Database MySQL → Email Notification (opzionale)
```

## File Coinvolti

### Frontend (React)
- `src/components/Contact.tsx` - Componente form contatti
- `src/utils/api.ts` - Utilità per chiamate API
- `.env.example` - Configurazione ambiente

### Backend (PHP)
- `api/endpoints/contacts.php` - Endpoint principale
- `api/config/database.php` - Configurazione database
- `api/includes/cors.php` - Gestione CORS
- `api/includes/validation.php` - Validazione e sanitizzazione
- `api/database/schema.sql` - Schema database
- `api/.htaccess` - Configurazione sicurezza Apache

## Configurazione

### 1. Variabili d'Ambiente
Crea un file `.env` nella root del progetto:
```env
VITE_API_BASE_URL=https://tuodominio.com/api
```

### 2. Database
Esegui lo script SQL per creare le tabelle:
```sql
-- Vedi api/database/schema.sql per lo script completo
```

### 3. Configurazione PHP
Modifica `api/config/database.php` con i dati del tuo database:
```php
private $host = "localhost";
private $db_name = "tuodb";
private $username = "tuousername";
private $password = "tuapassword";
```

## Funzionalità

### Validazione
- **Lato Client**: Validazione immediata con feedback visivo
- **Lato Server**: Validazione robusta con sanitizzazione

### Sicurezza
- Protezione SQL Injection (PDO prepared statements)
- Protezione XSS (sanitizzazione input)
- Rate limiting anti-spam
- Headers di sicurezza
- Validazione CORS

### UX/UI
- Stati di caricamento con spinner
- Messaggi di errore specifici per campo
- Feedback di successo
- Form disabilitato durante invio
- Reset automatico dopo successo

## API Endpoint

### POST `/api/endpoints/contacts.php`

**Request:**
```json
{
  "name": "Mario Rossi",
  "email": "mario@esempio.com",
  "phone": "347 123 4567",
  "message": "Messaggio di prova"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Contatto salvato con successo",
  "data": {
    "id": 123,
    "created_at": "2024-01-15 10:30:00"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Errori di validazione",
  "errors": {
    "email": "Email non valida",
    "message": "Messaggio troppo corto"
  }
}
```

## Testing

### Test Manuali
1. Compila il form con dati validi
2. Verifica invio con dati mancanti
3. Testa validazione email
4. Controlla rate limiting (più invii rapidi)
5. Verifica salvataggio nel database

### Test Automatici (Futuro)
- Unit test per validazione
- Integration test per API
- E2E test per form completo

## Deployment

### 1. Upload File PHP
Carica la cartella `api/` sul tuo webhosting nella root del dominio.

### 2. Configurazione Database
- Crea il database MySQL
- Importa lo schema SQL
- Configura le credenziali

### 3. Permessi File
```bash
chmod 644 api/endpoints/contacts.php
chmod 644 api/config/database.php
chmod 644 api/.htaccess
```

### 4. Test Produzione
Verifica che l'endpoint risponda:
```bash
curl -X POST https://tuodominio.com/api/endpoints/contacts.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"","message":"Test message"}'
```

## Monitoraggio

### Log degli Errori
I log PHP sono disponibili nel pannello di controllo del webhosting.

### Database
Monitora la tabella `sweetylab_contacts` per i nuovi contatti:
```sql
SELECT * FROM sweetylab_contacts ORDER BY created_at DESC LIMIT 10;
```

### Rate Limiting
Controlla la tabella `sweetylab_rate_limit` per tentativi di spam.

## Troubleshooting

### Errori Comuni

**CORS Error**
- Verifica che il dominio sia configurato in `cors.php`
- Controlla gli headers del server

**Database Connection Failed**
- Verifica credenziali in `database.php`
- Controlla che il database esista

**500 Internal Server Error**
- Controlla i log PHP del server
- Verifica permessi file

**Form non invia**
- Controlla console browser per errori JavaScript
- Verifica URL API in `.env`

## Estensioni Future

### Email Notifications
Implementare invio email automatico:
```php
// In contacts.php
sendNotificationEmail($validatedData);
```

### Dashboard Admin
Creare interfaccia per gestire i contatti ricevuti.

### Analytics
Aggiungere tracking per conversioni form.

### Backup Automatico
Implementare backup periodico dei dati contatti.

## Supporto
Per problemi tecnici, controllare:
1. Log del browser (F12 → Console)
2. Log PHP del server
3. Configurazione database
4. Variabili d'ambiente