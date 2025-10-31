import { Heart, Instagram, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-pink-50 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
              <h3 className="text-2xl font-serif">SweetyLab</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Atelier di abiti da sposa su misura. Creiamo il tuo sogno con passione e professionalità.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <div className="space-y-2 text-gray-400">
              <p className="font-medium text-gray-300">SweetyLab</p>
              <p>Via Marco Tabarrini, 7b, 00179 Roma RM</p>

              <p className="font-medium text-gray-300 mt-2">Telefono</p>
              <p>377 087 6081</p>

              <p className="font-medium text-gray-300 mt-2">Email</p>
              <p>info@sweetylab.it</p>

              <p className="font-medium text-gray-300 mt-2">Social</p>
              <p>@sweetylab_atelier</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Seguici</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 SweetyLab – Tutti i diritti riservati
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
