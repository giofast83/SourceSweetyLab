import { useInView } from '../utils/useInView';
import heroImg from '../assets/atelier-in-azione-1024.jpg';

function ChiSiamo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <main className="min-h-screen bg-paper pt-16">{/* pt-16 per compensare la navbar fissa */}
      {/* Hero con foto rettangolare centrata (70% della larghezza) */}
      <section className="py-12 md:py-16">
        <div className="relative w-[70%] mx-auto rounded-[18px] md:rounded-[20px] lg:rounded-[22px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {/* Immagine: su desktop diventa quadrata (altezza = larghezza), su mobile/tablet rimane rettangolare */}
          <div className="w-full h-[420px] md:h-[540px] lg:aspect-square">
            <img src={heroImg} alt="Chi siamo – il nostro atelier" className="w-full h-full object-cover" />
          </div>

          {/* Card bianca all’interno della foto: lascia un bordo ai lati (padding) */}
          <div className="absolute inset-0 p-4 md:p-6 flex items-stretch justify-start">
            <div
              ref={ref}
              className={`h-full w-1/2 bg-white rounded-[16px] md:rounded-[18px] lg:rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] px-6 md:px-8 flex flex-col justify-center text-left reveal-up ${inView ? 'in-view' : ''}`}
            >
              <h1 className="font-serif text-2xl md:text-3xl text-neutral-800">Chi Siamo</h1>
              <p className="mt-3 text-sm md:text-base text-neutral-700">
                Artigianalità contemporanea, storie sartoriali e attenzione ai dettagli. Questa card è un
                placeholder per i testi della sezione: possiamo inserire missione, valori e una breve descrizione
                dell’atelier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ChiSiamo;