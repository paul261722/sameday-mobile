import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const shopCoords = useMemo(() => [-1.2860, 36.8225], []);

  const initMap = useCallback((L) => {
    if (mapInstanceRef.current || !mapRef.current) return;
    const map = L.map(mapRef.current).setView(shopCoords, 16);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
    L.marker(shopCoords).addTo(map)
      .bindPopup(`
        <b>Same Day Mobile Solutions</b><br />
        Nyanza House, 1st Floor Shop F17<br />
        Junction of Gaberon Road & Mfangano Lane<br />
        Nairobi
      `)
      .openPopup();
    mapInstanceRef.current = map;
  }, [shopCoords]);

  useEffect(() => {
    if (window.L) {
      initMap(window.L);
      return;
    }

    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!document.querySelector('#leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        if (window.L) initMap(window.L);
      };
      document.body.appendChild(script);
    }
  }, [initMap]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill all required fields');
      return;
    }
    setLoading(true);
    
    const message = `*New Contact Message - Same Day Mobile Solutions*
    
👤 *Name:* ${form.name}
📧 *Email:* ${form.email}
💬 *Message:* ${form.message}

Please reply to this inquiry.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '254713696715';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setSent(true);
    setLoading(false);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero section */}
      <section 
        className="relative w-full py-16 sm:py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592899677977-9e10ca588f9d?auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto">
            We're here to help. Visit our shop, call, or WhatsApp – we're ready to fix your device.
          </p>
        </div>
      </section>

      {/* "Visit Our Workshop" section – background image with fallback */}
      <section 
        className="relative py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/static/logo3.jpeg')",
          backgroundColor: '#1a1a1a'   // fallback dark color
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            
            {/* Contact info card */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-orange-200/40 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <i className="fas fa-map-marker-alt text-orange-500 text-2xl"></i>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Visit Our Workshop</h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex items-start gap-3 text-gray-600">
                  <i className="fas fa-location-dot text-orange-500 w-5 mt-1"></i>
                  <span>
                    <strong>Nyanza House</strong>, 1st Floor Shop F17<br />
                    Junction of Gaberon Road & Mfangano Lane<br />
                    Nairobi, Kenya
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <i className="fas fa-phone-alt text-orange-500 w-5"></i>
                  <span>+254 713 696 715</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <i className="fab fa-whatsapp text-green-500 w-5"></i>
                  <span>+254 713 696 715 (Chat & Bookings)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <i className="fas fa-envelope text-orange-500 w-5"></i>
                  <span>Samedaymobiles@gmail.com</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-orange-200/30">
                <h3 className="font-bold text-gray-800 mb-3">Opening Hours</h3>
                <div className="space-y-1 text-gray-600 text-sm">
                  <p>Mon-Fri: 8:00 AM – 7:00 PM</p>
                  <p>Sat: 9:00 AM – 5:00 PM</p>
                  <p className="text-orange-500">Sun: Closed (emergency repairs via WhatsApp only)</p>
                </div>
              </div>
            </div>

            {/* Contact form card */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-orange-200/40 shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-paper-plane text-orange-500"></i>
                Send a Message
              </h2>
              {sent && (
                <div className="bg-green-100/80 backdrop-blur-sm text-green-700 p-3 rounded-xl mb-4 border border-green-200 text-sm">
                  <i className="fas fa-check-circle mr-2"></i> Message opened in WhatsApp – just send it and we'll reply soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Your Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="hello@example.com" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Message *</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="Describe your issue or question..." 
                    value={form.message} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 sm:py-3 rounded-xl font-semibold transition shadow-md disabled:opacity-70 text-sm sm:text-base"
                >
                  {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
                  {loading ? 'Processing...' : 'Send Message via WhatsApp'}
                  <i className="fab fa-whatsapp ml-2"></i>
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Your message will be sent via WhatsApp. Data rates may apply.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-16 sm:py-20 container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-orange-200/40 shadow-md">
          <div ref={mapRef} className="h-64 sm:h-80 w-full rounded-xl overflow-hidden"></div>
          <div className="text-center text-xs text-gray-500 mt-2">
            <i className="fas fa-location-dot text-orange-400 mr-1"></i> 
            Nyanza House, 1st Floor Shop F17 – Junction of Gaberon Road & Mfangano Lane, Nairobi
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${shopCoords[0]},${shopCoords[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm"
          >
            <i className="fas fa-directions"></i> Get directions on Google Maps
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;