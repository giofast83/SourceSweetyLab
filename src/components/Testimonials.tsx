import React, { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsProps {
  title?: string; // Titolo personalizzabile
  mode?: 'slider' | 'grid'; // Modalità di visualizzazione
  autoAdvance?: boolean; // Avanzamento automatico per lo slider
  intervalMs?: number; // Intervallo di avanzamento
}

function Testimonials({
  title = 'Le parole delle nostre spose',
  mode = 'grid',
  autoAdvance = true,
  intervalMs = 5000,
}: TestimonialsProps) {
  const testimonials = [
    {
      name: 'Giulia R.',
      text: 'Eleonora e Veronica hanno reso il mio abito perfetto, con professionalità e attenzione ai dettagli.',
      role: 'Sposa 2024'
    },
    {
      name: 'Martina L.',
      text: "Un'esperienza tranquilla e rassicurante: ogni passaggio seguito con cura.",
      role: 'Sposa 2024'
    },
    {
      name: 'Sofia M.',
      text: 'Il vestito dei miei sogni è diventato realtà grazie alla loro dedizione e sensibilità.',
      role: 'Sposa 2023'
    },
    {
      name: 'Federica P.',
      text: 'Cura, gentilezza e gusto impeccabile: mi sono sentita ascoltata in ogni dettaglio e il risultato è stato meraviglioso.',
      role: 'Sposa 2023'
    }
  ];

  // Slider state
  const [index, setIndex] = useState(0);

  // Auto advance
  useEffect(() => {
    if (!autoAdvance || mode !== 'slider') return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoAdvance, intervalMs, mode, testimonials.length]);

  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);

  // Swipe (mobile/tablet)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };
  const onTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX > threshold) prev();
    else if (touchDeltaX < -threshold) next();
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6">
            {title}
          </h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
        </div>

        {/* Mobile/Tablet: slider una recensione alla volta */}
        <div
          className="relative max-w-3xl mx-auto block lg:hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl">
            {/* Track scorrevole: una recensione alla volta, transizione netta (slide) */}
              <div
                className="flex"
                style={{
                  width: `${testimonials.length * 100}%`,
                  transform: `translateX(-${index * (100 / testimonials.length)}%)`,
                  transition: 'transform 600ms ease-out',
                }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    style={{ width: `${100 / testimonials.length}%` }}
                    className="p-6 md:p-8 flex-shrink-0"
                  >
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                      <Quote className="w-6 h-6 text-pink-600" strokeWidth={1.5} />
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{t.text}"
                    </p>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-semibold text-gray-800">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controlli minimali */}
          <div className="flex justify-between items-center mt-6">
            <button
              aria-label="Recensione precedente"
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50"
              onClick={prev}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === index ? 'bg-pink-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              aria-label="Recensione successiva"
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50"
              onClick={next}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Desktop: 4 recensioni alla volta (griglia) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-pink-600" strokeWidth={1.5} />
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
