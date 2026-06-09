const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/254713696715?text=Hi%20I%20need%20same%20day%20phone%20repair"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center whatsapp-float hover:bg-green-600 transition"
    >
      <i className="fab fa-whatsapp text-3xl"></i>
    </a>
  );
};

export default FloatingWhatsApp;