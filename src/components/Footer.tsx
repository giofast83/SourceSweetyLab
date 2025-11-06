import { Instagram, Facebook } from 'lucide-react';
import logoSweetyLab from '../assets/Logo_SweetyLab.png';

function Footer() {
  return (
    <footer className="bg-cipria-50 text-neutral-800 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Allinea la dimensione del logo del footer a quella della Navbar (h-12 / md:h-16) */}
              <img src={logoSweetyLab} alt="SweetyLab" className="h-12 md:h-16 w-auto" />
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Atelier di abiti da sposa su misura. Creiamo il tuo sogno con passione e professionalità.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <div className="space-y-2 text-neutral-700">
              <p className="font-medium text-neutral-800">SweetyLab</p>
              <p>Via Marco Tabarrini, 7b, 00179 Roma RM</p>

              <p className="font-medium text-neutral-800 mt-2">Telefono</p>
              <p>377 087 6081</p>

              <p className="font-medium text-neutral-800 mt-2">Email</p>
              <p>info@sweetylab.it</p>

              <p className="font-medium text-neutral-800 mt-2">Social</p>
              <p className="text-neutral-700">@sweetylab_atelier</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Seguici</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-cipria-300 rounded-full flex items-center justify-center hover:bg-cipria-600 transition-colors duration-300 text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-cipria-300 rounded-full flex items-center justify-center hover:bg-cipria-600 transition-colors duration-300 text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cipria-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-sm">
            © 2025 SweetyLab – Tutti i diritti riservati
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-neutral-600 hover:text-cipria-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-600 hover:text-cipria-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
