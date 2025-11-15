import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

export default function CtaSoft() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <section ref={ref} aria-label="CTA Prenota consulenza" className={`py-12 md:py-16 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h3 className="font-serif text-2xl md:text-3xl text-gray-800">
          Vuoi indossare un capo della collezione Aurora?
        </h3>
        <div className="mt-6">
          <Link
            to="/contatti"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cipria-600 hover:bg-cipria-600 text-base font-medium text-white transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cipria-600 focus-visible:ring-offset-2"
          >
            Prenota una consulenza
          </Link>
        </div>
      </div>
    </section>
  );
}