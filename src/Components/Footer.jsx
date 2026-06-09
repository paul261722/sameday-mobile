const Footer = () => {
  return (
    <footer className="bg-white/40 backdrop-blur-md border-t border-orange-200/50 py-10 text-gray-600">
      <div className="container mx-auto px-6 text-center">
        <i className="fas fa-mobile-alt text-3xl mb-3 text-orange-500"></i>
        <p className="text-lg font-semibold text-gray-700">Same Day Mobile Solutions</p>
        <p className="mt-2 text-gray-500">📍 Nairobi, Kenya | 📞 +254 713 696715</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="text-sm mt-6 text-gray-400">© 2025 - Professional Repairs, Infinite Care.</p>
      </div>
    </footer>
  );
};

export default Footer;