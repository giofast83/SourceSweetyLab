import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

// CTA finale con tre opzioni – stile minimal, blush pink, serif
export default function AuroraCTA() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className={`sl-fade-section ${inView ? 'sl-fade-in' : ''} w-full py-16 md:py-20`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-8">Parliamone</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Link to="/contatti" className="sl-btn-blush font-serif text-base md:text-lg">Prenota su misura</Link>
          <Link to="/collezioni-alt" className="sl-btn-blush font-serif text-base md:text-lg">Scopri altre collezioni</Link>
          <Link to="/collezione" className="sl-btn-blush font-serif text-base md:text-lg">Acquista i capi in pronta consegna</Link>
        </div>
      </div>
    </section>
  );
}