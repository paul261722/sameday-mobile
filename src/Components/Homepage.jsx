import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';  // <-- added for navigation

// ---------- HERO CAROUSEL (unchanged) ----------
const slides = [
  { 
    id: 1, 
    title: "We Come to You – Free Pickup & Delivery", 
    button: "Contact Us", 
    action: "contact",
    bg: "/static/logo4.jpeg" 
  },
  { 
    id: 2, 
    title: "Same Day Repair – Phone Back Within 24h", 
    button: "Book Now", 
    action: "booking",
    bg: "/static/logo2.png" 
  },
  { 
    id: 3, 
    title: "Just Pin Your Location & We Collect", 
    button: "About Us", 
    action: "about",
    bg: "/static/logo3.jpeg" 
  },
  { 
    id: 4, 
    title: "No Shop Visit Needed – Nairobi Only", 
    button: "Quote", 
    action: "quote",
    bg: "/static/logo1.png" 
  }
];

const HeroCarousel = ({ onQuoteClick }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const next = useCallback(() => setCurrent(prev => (prev + 1) % slides.length), []);
  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 4500);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleButtonClick = (action) => {
    if (action === 'quote') {
      onQuoteClick();
    } else if (action === 'contact') {
      window.location.href = '/contact';
    } else if (action === 'booking') {
      window.location.href = '/booking';
    } else if (action === 'about') {
      window.location.href = '/about';
    }
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="flex h-full carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map(slide => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 bg-cover bg-center relative" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${slide.bg})` }}>
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-3xl animate-fade-up">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{slide.title}</h1>
                <button 
                  onClick={() => handleButtonClick(slide.action)}
                  className="mt-8 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-xl transition-transform hover:scale-105"
                >
                  {slide.button} <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full w-10 h-10"><i className="fas fa-chevron-left"></i></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full w-10 h-10"><i className="fas fa-chevron-right"></i></button>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button key={idx} className={`h-2 rounded-full transition-all ${current === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/60'}`} onClick={() => setCurrent(idx)} />
        ))}
      </div>
    </div>
  );
};

// ---------- QUOTE MODAL (unchanged) ----------
const QuoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-orange-500/30" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <i className="fas fa-quote-left text-orange-500 text-4xl mb-4"></i>
          <p className="text-white text-xl italic leading-relaxed">
            "We don't just fix phones — we restore trust. Every repair is a promise kept, 
            delivered same‑day, right to your doorstep. Your time matters, and so does your device."
          </p>
          <p className="text-orange-400 mt-6 font-semibold">— Same Day Mobile Solutions</p>
          <button 
            onClick={onClose}
            className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- IMAGE BACKGROUND SECTION (unchanged) ----------
const ImageBackgroundSection = () => {
  const backgroundImageUrl = "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=2070&q=80";
  
  return (
    <section 
      className="relative w-full py-24 md:py-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Why Choose <span className="text-orange-400">Sameday Mobile Solutions</span>?
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-200">
          We combine speed, expertise, and convenience to give you the best repair experience – without ever leaving your home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
            <i className="fas fa-truck-fast text-orange-400 text-4xl mb-3"></i>
            <h3 className="text-xl font-bold mb-2">Free Pickup & Delivery</h3>
            <p className="text-gray-300">We come to you anywhere in Nairobi. No shop visit required.</p>
          </div>
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
            <i className="fas fa-clock text-orange-400 text-4xl mb-3"></i>
            <h3 className="text-xl font-bold mb-2">24‑Hour Turnaround</h3>
            <p className="text-gray-300">Same‑day repair, returned to you within 24 hours. Guaranteed.</p>
          </div>
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
            <i className="fas fa-microchip text-orange-400 text-4xl mb-3"></i>
            <h3 className="text-xl font-bold mb-2">Expert Technicians</h3>
            <p className="text-gray-300">Certified engineers with years of experience and genuine parts.</p>
          </div>
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30">
            <i className="fas fa-shield-alt text-orange-400 text-4xl mb-3"></i>
            <h3 className="text-xl font-bold mb-2">Warranty on Repairs</h3>
            <p className="text-gray-300">All repairs come with a 6‑month warranty for your peace of mind.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- STATS COUNTER (unchanged) ----------
const useCountUp = (end) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const animated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return [count, ref];
};

const StatsSection = () => {
  const [phones, phonesRef] = useCountUp(10234);
  const [success, successRef] = useCountUp(98);
  const [years, yearsRef] = useCountUp(6);
  const [sameDay, sameDayRef] = useCountUp(100);
  return (
    <section className="py-16 bg-gradient-to-r from-orange-800 to-orange-600 text-white">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div ref={phonesRef}><i className="fas fa-mobile-alt text-4xl mb-3"></i><h3 className="text-4xl font-bold">{phones}+</h3><p>Phones Repaired</p></div>
        <div ref={successRef}><i className="fas fa-chart-line text-4xl mb-3"></i><h3 className="text-4xl font-bold">{success}%</h3><p>Success Rate</p></div>
        <div ref={yearsRef}><i className="fas fa-award text-4xl mb-3"></i><h3 className="text-4xl font-bold">{years}+</h3><p>Years Experience</p></div>
        <div ref={sameDayRef}><i className="fas fa-clock text-4xl mb-3"></i><h3 className="text-4xl font-bold">{sameDay}%</h3><p>Same-Day Service</p></div>
      </div>
    </section>
  );
};

// ---------- PICKUP SERVICE SECTION (updated with Link) ----------
const PickupService = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">🚀 No Shop Visit Required</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          You don’t need to bring your phone to us. One call, share your location (within Nairobi), 
          and our rider will pick it up. We repair the same day and return it to you within <strong>24 hours</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl w-64">
            <i className="fas fa-phone-alt text-4xl mb-3"></i>
            <h3 className="text-xl font-bold">1. Call or WhatsApp</h3>
            <p className="text-sm">Tell us your issue</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl w-64">
            <i className="fas fa-map-pin text-4xl mb-3"></i>
            <h3 className="text-xl font-bold">2. Share Location</h3>
            <p className="text-sm">We come to you (Nairobi only)</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl w-64">
            <i className="fas fa-tools text-4xl mb-3"></i>
            <h3 className="text-xl font-bold">3. Same‑Day Repair</h3>
            <p className="text-sm">Expert fixes your device</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl w-64">
            <i className="fas fa-truck text-4xl mb-3"></i>
            <h3 className="text-xl font-bold">4. Returned Within 24h</h3>
            <p className="text-sm">Delivered back to you</p>
          </div>
        </div>
        {/* Changed button to Link */}
        <Link to="/booking" className="inline-block mt-10 bg-white text-orange-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition shadow-md">
          Request Pickup Now <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </section>
  );
};

// ---------- REPAIR PROCESS (unchanged) ----------
const RepairProcess = () => {
  const steps = [
    { icon: "fas fa-phone-alt", title: "Call or WhatsApp", desc: "Describe the issue, share your location (Nairobi only)" },
    { icon: "fas fa-motorcycle", title: "We Pick Up", desc: "Rider collects your phone at no extra cost" },
    { icon: "fas fa-tools", title: "Expert Repair", desc: "Same-day fix by certified technicians" },
    { icon: "fas fa-truck", title: "Delivered Back", desc: "Phone returned within 24 hours" }
  ];
  return (
    <section className="py-20 bg-white" id="process">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">How It Works</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">You stay home – we handle everything. Fast, reliable, contactless.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-orange-700 text-3xl"><i className={step.icon}></i></div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- BRANDS WE REPAIR (unchanged) ----------
const BrandsRepair = () => {
  const brands = ["Apple", "Samsung", "Huawei", "Tecno", "Infinix", "Oppo", "Xiaomi"];
  const icons = ["fab fa-apple", "fab fa-samsung", "fab fa-huawei", "fas fa-microchip", "fas fa-microchip", "fab fa-opera", "fab fa-xiaomi"];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Brands We Repair</h2>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {brands.map((brand, idx) => (
            <div key={brand} className="w-32 h-32 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-4 transition hover:scale-105 hover:border-2 hover:border-orange-400">
              <i className={`${icons[idx]} text-5xl text-gray-700 mb-2`}></i>
              <span className="font-semibold text-gray-800">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- HOME PAGE (with fixed Request Pickup button) ----------
const HomePage = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <HeroCarousel onQuoteClick={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <ImageBackgroundSection />
      <PickupService />
      <div className="bg-orange-600 text-white py-3 text-center font-semibold text-sm">
        ⚡ Same Day Repair – We come to you, anywhere in Nairobi. Phone back within 24 hours. ⚡
      </div>
      <RepairProcess />
      <BrandsRepair />
      <StatsSection />
    </>
  );
};

export default HomePage;