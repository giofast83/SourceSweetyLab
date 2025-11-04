import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* CTA ripetuta nel footer */}
        <div className="bg-pink-600/10 border border-pink-500/30 rounded-2xl p-6 mb-10 text-center">
          <h3 className="text-xl font-serif text-white mb-2">Pronto a creare il tuo capo su misura?</h3>
          <p className="text-sm text-pink-100 mb-4">Ti rispondiamo entro 24h</p>
          <Link
            to="/contatti"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full text-sm font-semibold hover:bg-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            Prenota la tua consulenza
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoSweetyLab}
                alt="SweetyLab Logo"
                className="h-16 w-auto object-contain"
                style={{ filter: 'invert(18%) sepia(71%) saturate(4571%) hue-rotate(313deg) brightness(95%) contrast(98%) drop-shadow(0 2px 6px rgba(255,255,255,0.15))' }}
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Atelier di abiti e capi su misura. Creiamo il tuo sogno con passione e professionalità.
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
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
