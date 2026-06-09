import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FloatingWhatsApp from './Components/FloatingWhatsApp';
import HomePage from './Components/Homepage';    // file is Homepage.jsx
import About from './Components/About';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Booking from './Components/Booking';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}

export default App;