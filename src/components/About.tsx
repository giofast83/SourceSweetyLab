import { Heart, Scissors, Users } from 'lucide-react';
import chiSiamoImg from '../assets/chi-siamo-1024.jpg';

function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6">
            Chi siamo
          </h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg shadow-xl overflow-hidden">
              <img
                src={chiSiamoImg}
                alt="Chi siamo - artigianalità"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-rose-600">SweetyLab</span> è un atelier dedicato alla creazione di abiti da sposa su misura. Eleonora e Veronica uniscono esperienza e passione per realizzare abiti unici, curati nei minimi dettagli, garantendo professionalità e serenità in ogni fase del tuo percorso.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-500" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Passione</h3>
                  <p className="text-gray-600">Ogni abito è realizzato con dedizione e amore per i dettagli</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Scissors className="w-6 h-6 text-rose-500" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Esperienza</h3>
                  <p className="text-gray-600">Competenza artigianale maturata negli anni</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-rose-500" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Accompagnamento</h3>
                  <p className="text-gray-600">Ti seguiamo passo dopo passo fino al tuo giorno speciale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
