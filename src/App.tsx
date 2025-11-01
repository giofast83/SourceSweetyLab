import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Servizi from './pages/Servizi';
import PortfolioPage from './pages/PortfolioPage';
import Contatti from './pages/Contatti';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contatti" element={<Contatti />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;