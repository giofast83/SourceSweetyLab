import React from 'react';
import { Link } from 'react-router-dom';

type BookAppointmentCTAProps = {
  text?: string;
};

export default function BookAppointmentCTA({ text = 'Scopri la collezione da vicino: prenota un appuntamento.' }: BookAppointmentCTAProps) {
  return (
    <section className="bg-white px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-neutral-700 tracking-wide mb-6 md:mb-8">
          {text}
        </p>
        <Link
          to="/contatti"
          className="inline-block text-cipria-700 hover:text-cipria-800 underline underline-offset-4 decoration-cipria-300 hover:decoration-cipria-500 transition-colors"
        >
          Prenota un appuntamento
        </Link>
      </div>
    </section>
  );
}