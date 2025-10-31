import { MessageCircle, Ruler, CheckCircle, Clock } from 'lucide-react';
import tessutiPregiatiImg from '../assets/tessuti-pregiati-1024.jpg';
import dettagliArtigianaliImg from '../assets/dettagli-artigianali-1024.jpg';
import atelierInAzioneImg from '../assets/atelier-in-azione-1024.jpg';

function Approach() {
  const steps = [
    {
      icon: MessageCircle,
      title: 'Consulenza personalizzata',
      description: 'Incontriamo ogni sposa per comprendere i suoi desideri e creare insieme il progetto perfetto'
    },
    {
      icon: Ruler,
      title: 'Creazione su misura',
      description: 'Realizziamo abiti e accessori completamente personalizzati, seguendo le tue misure e preferenze'
    },
    {
      icon: CheckCircle,
      title: 'Controlli di qualità',
      description: 'Ogni fase della realizzazione è seguita con attenzione per garantire la perfezione'
    },
    {
      icon: Clock,
      title: 'Rispetto dei tempi',
      description: 'Pianifichiamo insieme le prove e rispettiamo ogni scadenza per la massima serenità'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6">
            Il nostro metodo
          </h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un percorso pensato per rendere unico e sereno ogni momento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Icon className="w-8 h-8 text-pink-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <img
                src={tessutiPregiatiImg}
                alt="Tessuti pregiati di alta qualità"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <img
                src={dettagliArtigianaliImg}
                alt="Dettagli artigianali"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <img
                src={atelierInAzioneImg}
                alt="Atelier in azione"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Approach;
