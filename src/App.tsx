import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Servizi from './pages/Servizi';
import PortfolioPage from './pages/PortfolioPage';
import Contatti from './pages/Contatti';
import Landing from './pages/Landing';

function AppContent() {
  const location = useLocation();
  // Landing deve essere la home page: consideriamo sia '/' che '/landing' come Landing
  const isLanding = location.pathname === '/' || location.pathname === '/landing';
  return (
    <div className={isLanding ? 'min-h-screen' : 'min-h-screen bg-white'}>
      {!isLanding && <Navbar />}
      <main>
        <ScrollToTop />
        <Routes>
          {/* Landing come home page */}
          <Route path="/" element={<Landing />} />
          {/* Alias per compatibilità con link esistenti */}
          <Route path="/landing" element={<Landing />} />
          {/* La vecchia Home rimane raggiungibile su /home */}
          <Route path="/home" element={<Home />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contatti" element={<Contatti />} />
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
