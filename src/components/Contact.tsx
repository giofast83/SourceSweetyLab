import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6">
            Prenota la tua consulenza oggi
          </h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Contattaci per iniziare il viaggio verso il tuo abito da sogno
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="tua@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="+39 xxx xxx xxxx"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                  placeholder="Raccontaci del tuo giorno speciale..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium hover:bg-rose-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitted ? (
                  'Richiesta inviata!'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Invia richiesta
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl p-8">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">
                Informazioni di contatto
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">SweetyLab</p>
                    <p className="text-gray-600">Via Marco Tabarrini, 7b, 00179 Roma RM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Telefono</p>
                    <p className="text-gray-600">377 087 6081</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">info@sweetylab.it</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Social</p>
                    <p className="text-gray-600">@sweetylab_atelier</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Orari di apertura
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between">
                  <span>Lunedì</span>
                  <span className="font-medium">16:00 - 19:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Martedì - Sabato</span>
                  <span className="font-medium">10:00 - 13:00, 16:00 - 19:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Domenica</span>
                  <span className="font-medium">Chiuso</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
