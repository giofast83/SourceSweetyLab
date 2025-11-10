import { Link } from 'react-router-dom';
import imgTessuti from '../../assets/tessuti-pregiati-1024.jpg';
import { useInView } from '../../utils/useInView';

export default function TailorServiceAlt() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section ref={ref} className="pt-0 md:pt-0 pb-8 md:pb-12">
      <div className="relative w-full group">
        <div className={`relative w-full h-[48vh] md:h-[56vh] transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={imgTessuti}
            alt="Tessuti pregiati per capi su misura"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay scuro su hover per migliorare leggibilità */}
          <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors duration-300" />
          {/* Gradiente dal basso per testo */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/25 to-transparent" />
          {/* Testo dentro l'immagine */}
          <div className="relative z-10 flex h-full items-end">
            <div className="w-full px-6 md:px-12 pb-6 md:pb-10">
              <h3 className="font-serif text-white text-2xl md:text-3xl leading-tight">Servizio su misura</h3>
              <div className="w-20 h-[1px] bg-[#E8BFC7] mt-3 mb-4" aria-hidden="true" />
              <p className="font-sans text-white/90 max-w-2xl">
                Capi su misura pensati per il tuo corpo e la tua storia. Dalla scelta dei tessuti alla prova in atelier, ogni dettaglio è curato con attenzione artigianale.
              </p>
              <div className="mt-5">
                <Link
                  to="/servizi"
                  className="inline-flex items-center justify-center px-4 py-2 border border-[#E8BFC7] text-white bg-transparent hover:bg-[#F6D4D8]/60 rounded-full text-sm tracking-wide transition-colors duration-200"
                >
                  Scopri
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}