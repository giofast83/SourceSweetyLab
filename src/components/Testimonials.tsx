import { Quote } from 'lucide-react';

function Testimonials() {
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
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6">
            Le parole delle nostre spose
          </h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-rose-500" strokeWidth={1.5} />
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
