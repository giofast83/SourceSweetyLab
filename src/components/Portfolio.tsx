import { useState } from 'react';
import { X } from 'lucide-react';
import creazione04Img from '../assets/creazione-04-1024.jpg';
import creazione05Img from '../assets/creazione-05-1024.jpg';
import creazione06Img from '../assets/creazione-06-1024.jpg';
import creazione07Img from '../assets/creazione-07-1024.jpg';
import creazione08Img from '../assets/creazione-08-1024.jpg';
import creazione09Img from '../assets/creazione-09-1024.jpg';

function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Disattivate le prime tre foto (creazione 01-03) dal portfolio, senza eliminare i file
  const items = [
    {
      title: 'Abito contemporaneo con taglio sartoriale',
      description: 'Linee moderne e silhouette elegante',
      image: creazione07Img
    },
    {
      title: 'Abito bohémien con trasparenze',
      description: 'Leggerezza e raffinatezza per stili moderni',
      image: creazione04Img
    },
    {
      title: 'Abito elegante con dettagli moderni',
      description: 'Raffinatezza contemporanea e cura dei particolari',
      image: creazione08Img
    },
    {
      title: 'Abito minimal con linee pure',
      description: 'Essenziale ed elegante, senza tempo',
      image: creazione05Img
    },
    {
      title: 'Abito sofisticato con texture pregiate',
      description: 'Materiali di qualità e finiture artigianali',
      image: creazione09Img
    },
    {
      title: 'Abito vintage con perline',
      description: 'Ispirato agli anni 20, con applicazioni preziose',
      image: creazione06Img
    }
  ];

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif h1-responsive md:text-5xl text-gray-800 mb-6 tracking-tight leading-tight max-w-[24ch] mx-auto md:max-w-none">
            Le nostre creazioni
          </h1>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ogni abito racconta una storia unica
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-all mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                {selectedImage !== null && (
                  <img
                    src={items[selectedImage].image}
                    alt={items[selectedImage].title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-center mt-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">
                  {items[selectedImage].title}
                </h3>
                <p className="text-gray-300">
                  {items[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;
