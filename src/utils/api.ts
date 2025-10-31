// Utilità per le chiamate API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-domain.com/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Invia i dati del form contatti all'API
 */
export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoints/contacts.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new ApiError(
        result.message || 'Errore del server',
        response.status,
        result.errors
      );
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Errore di rete o parsing JSON
    throw new ApiError('Errore di connessione. Verifica la tua connessione internet e riprova.');
  }
};

/**
 * Valida i dati del form lato client
 */
export const validateContactForm = (formData: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Il nome è obbligatorio';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Il nome deve contenere almeno 2 caratteri';
  }

  if (!formData.email.trim()) {
    errors.email = 'L\'email è obbligatoria';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Inserisci un\'email valida';
  }

  if (formData.phone.trim() && !/^[\d\s\+\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Inserisci un numero di telefono valido';
  }

  if (!formData.message.trim()) {
    errors.message = 'Il messaggio è obbligatorio';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Il messaggio deve contenere almeno 10 caratteri';
  }

  return errors;
};