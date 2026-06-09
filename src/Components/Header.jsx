import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-orange-200/50 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo with faded glass styling */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
          <div className="bg-white/60 backdrop-blur-sm p-1.5 rounded-2xl border border-orange-200/50 transition-all duration-300 group-hover:border-orange-300 group-hover:bg-white/80">
            <img 
              src="/static/logo.png" 
              alt="Same Day Mobile Solutions" 
              className="h-10 w-auto md:h-12 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          <div className="font-bold text-xl md:text-2xl tracking-tight hidden sm:block">
            <span className="text-gray-700 group-hover:text-gray-900 transition">SAMEDAY</span>
            <span className="text-orange-500 group-hover:text-orange-600 transition"> MOBILE</span>
            <div className="text-xs font-normal text-gray-500 -mt-1">SOLUTIONS</div>
          </div>
        </Link>

        {/* Desktop navigation – faded gray/white theme */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">About</Link>
          <Link to="/services" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Services</Link>
          <Link to="/contact" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Contact</Link>
          <Link to="/booking" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm hover:shadow-md">Book Now</Link>
        </nav>

        {/* Hamburger button (mobile) */}
        <button onClick={toggleMenu} className="md:hidden text-gray-600 text-2xl focus:outline-none hover:text-orange-500 transition">
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile menu dropdown – faded gray/white glass */}
      {isOpen && (
        <div className="md:hidden bg-white/60 backdrop-blur-md border-t border-orange-200/50 py-4 px-6 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link to="/" onClick={closeMenu} className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link to="/about" onClick={closeMenu} className="text-gray-600 hover:text-orange-500 font-medium transition-colors">About</Link>
            <Link to="/services" onClick={closeMenu} className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Services</Link>
            <Link to="/contact" onClick={closeMenu} className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Contact</Link>
            <Link to="/booking" onClick={closeMenu} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold text-center transition shadow-sm">Book Now</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;