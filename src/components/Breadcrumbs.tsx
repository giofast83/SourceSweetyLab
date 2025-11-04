import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  currentLabel?: string;
}

/**
 * Lightweight breadcrumbs component for internal pages.
 * Usage: <Breadcrumbs currentLabel="Servizi" />
 */
function Breadcrumbs({ currentLabel }: BreadcrumbsProps) {
  const location = useLocation();
  const label = currentLabel || location.pathname.replace('/', '') || 'Home';
  return (
    <nav aria-label="breadcrumbs" className="text-sm text-gray-600 mb-6">
      <ol className="flex items-center gap-2">
        <li>
          <Link to="/" className="hover:text-pink-700 transition-colors">Home</Link>
        </li>
        <li className="text-gray-400">/</li>
        <li className="font-medium text-gray-800">{label}</li>
      </ol>
    </nav>
  );
}

export default Breadcrumbs;