import { Link } from 'react-router-dom';
import { useInView } from '../../utils/useInView';

type Props = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  reversed?: boolean;
};

export default function CollectionBlock({ image, title, subtitle, description, href, reversed = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section ref={ref} className={`py-12 md:py-20 bg-white`}>
      <div className={`mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${reversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#f6f1f2] transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <h3 className="font-serif text-2xl md:text-3xl text-[#6B4A4E]">{title}</h3>
          <p className="mt-2 font-serif text-[#6B4A4E]/75">{subtitle}</p>
          <p className="mt-4 font-sans text-[#4a3b3d] max-w-[650px]">{description}</p>
          <div className="mt-6">
            <Link
              to={href}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-[#E8BFC7] text-[#6B4A4E] bg-[#F6D4D8] hover:bg-[#F3C9CF] rounded-none text-sm tracking-wide transition-colors duration-200"
            >
              Scopri la collezione
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}