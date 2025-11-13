import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Servizi from './pages/Servizi';
import PortfolioPage from './pages/PortfolioPage';
import Contatti from './pages/Contatti';
import Landing from './pages/Landing.tsx';
import CollezioniAlt from './pages/CollezioniAlt.tsx';
import CollectionPage from './pages/CollectionPage.tsx';
import Essenza from './pages/collections/Essenza.tsx';
import Luna from './pages/collections/Luna.tsx';
import Radici from './pages/collections/Radici.tsx';
import Aurora from './pages/collections/Aurora.tsx';

function AppContent() {
  const location = useLocation();
  // Nascondi Navbar/Footer sulla landing per avere la vera fullscreen
  const isLanding = location.pathname === '/landing' || location.pathname === '/';
  return (
    <div className={'min-h-screen bg-white'}>
      {!isLanding && <Navbar />}
      <main>
        <ScrollToTop />
        <Routes>
          {/* Landing come Home (pagina di default) */}
          <Route path="/" element={<Landing />} />
          {/* La Home rimane raggiungibile su /home */}
          <Route path="/home" element={<Home />} />
          {/* Variante alternativa per A/B testing (ora invertita) */}
          <Route path="/collezioni-alt" element={<CollectionPage />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/collezione" element={<CollezioniAlt />} />
          <Route path="/collezione/essenza" element={<Essenza />} />
          <Route path="/collezione/luna" element={<Luna />} />
          <Route path="/collezione/radici" element={<Radici />} />
          <Route path="/collezione/aurora" element={<Aurora />} />
          {/* Alias: la landing resta raggiungibile anche su /landing */}
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </main>
      {!isLanding && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
