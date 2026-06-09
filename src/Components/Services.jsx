import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    { name: "Screen Replacement", price: "KSh 2,500 - 8,000", time: "30-60 min", icon: "fas fa-mobile-alt" },
    { name: "Battery Replacement", price: "KSh 2,000 - 5,000", time: "20-40 min", icon: "fas fa-battery-full" },
    { name: "Water Damage Repair", price: "From KSh 3,000", time: "2-4 hours", icon: "fas fa-tint" },
    { name: "Charging Port Fix", price: "KSh 1,500 - 3,500", time: "30 min", icon: "fas fa-plug" },
    { name: "Software & Unlocking", price: "KSh 1,000 - 2,000", time: "20 min", icon: "fas fa-code" },
    { name: "Camera Repair", price: "KSh 2,000 - 6,000", time: "45 min", icon: "fas fa-camera" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero section – responsive */}
      <section 
        className="relative w-full py-16 sm:py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592899677977-9e10ca588f9d?auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Our Repair Services
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Fast, affordable, and backed by a 12‑month warranty – we fix all brands and models, same day.
          </p>
        </div>
      </section>

      {/* Services grid – background image with correct filename */}
      <section 
        className="relative py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/Static/logo.5.jpeg')",
          backgroundColor: '#111'  // fallback in case image fails
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Precision Repair, <span className="text-orange-400">Visible Quality</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-200 px-2">
              Every repair is performed with OEM‑grade parts and certified tools. 
              We don't just fix your phone – we restore its performance and longevity.
            </p>
          </div>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {services.map((s, idx) => (
              <div key={idx} className="bg-white/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-orange-200/40 shadow-md hover:shadow-xl transition-all hover:border-orange-300/60 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-100/50 flex items-center justify-center mb-3 sm:mb-4 text-orange-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform mx-auto sm:mx-0">
                  <i className={s.icon}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 text-center sm:text-left">{s.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">Turnaround: {s.time}</p>
                <p className="text-xl sm:text-2xl font-semibold text-orange-600 mt-2 text-center sm:text-left">{s.price}</p>
                <Link to="/booking" className="mt-4 block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-sm text-sm sm:text-base">
                  Book Repair
                </Link>
              </div>
            ))}
          </div>

          {/* CTA section */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-orange-200/40 shadow-md">
            <i className="fas fa-stethoscope text-orange-500 text-3xl sm:text-4xl mb-3"></i>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Not sure what you need?</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">Bring your device for a <strong className="text-orange-600">free diagnosis</strong> and we'll give you a clear quote.</p>
            <Link to="/contact" className="inline-block mt-5 sm:mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 rounded-full transition shadow-md text-sm sm:text-base">
              Schedule Free Check
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;