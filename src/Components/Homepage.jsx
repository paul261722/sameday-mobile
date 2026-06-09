import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

// ---------- HERO CAROUSEL (with corrected image paths) ----------
const slides = [
  { id: 1, title: "We Come to You – Free Pickup & Delivery", button: "Contact Us", action: "contact", bg: "/static/logo4.jpeg" },   // exists
  { id: 2, title: "Same Day Repair – Phone Back Within 24h", button: "Book Now", action: "booking", bg: "/static/logo2.png" },     // exists
  { id: 3, title: "Just Pin Your Location & We Collect", button: "About Us", action: "about", bg: "/static/logo.3.jpeg" },        // ✅ fixed: dot before 3
  { id: 4, title: "No Shop Visit Needed – Nairobi Only", button: "Quote", action: "quote", bg: "/static/logo1.png" }              // exists
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
    if (action === 'quote') onQuoteClick();
    else if (action === 'contact') window.location.href = '/contact';
    else if (action === 'booking') window.location.href = '/booking';
    else if (action === 'about') window.location.href = '/about';
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="flex h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map(slide => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 bg-cover bg-center relative" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${slide.bg})` }}>
            <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6">
              <div className="max-w-3xl animate-fade-up">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg px-2">{slide.title}</h1>
                <button 
                  onClick={() => handleButtonClick(slide.action)}
                  className="mt-6 sm:mt-8 bg-orange-600 hover:bg-orange-700 text-white text-base sm:text-lg font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl transition-transform hover:scale-105"
                >
                  {slide.button} <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"><i className="fas fa-chevron-left text-sm sm:text-base"></i></button>
      <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"><i className="fas fa-chevron-right text-sm sm:text-base"></i></button>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button key={idx} className={`h-2 rounded-full transition-all ${current === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/60'}`} onClick={() => setCurrent(idx)} />
        ))}
      </div>
    </div>
  );
};

// ---------- QUOTE MODAL ----------
const QuoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 max-w-md mx-4 shadow-2xl border border-orange-500/30" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <i className="fas fa-quote-left text-orange-500 text-4xl mb-4"></i>
          <p className="text-white text-base sm:text-xl italic leading-relaxed">
            "We don't just fix phones — we restore trust. Every repair is a promise kept, delivered same‑day, right to your doorstep. Your time matters, and so does your device."
          </p>
          <p className="text-orange-400 mt-6 font-semibold">— Same Day Mobile Solutions</p>
          <button onClick={onClose} className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition">Close</button>
        </div>
      </div>
    </div>
  );
};

// ---------- FEATURE SECTION (unchanged, responsive) ----------
const ImageBackgroundSection = () => {
  const backgroundImageUrl = "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=2070&q=80";
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Why Choose <span className="text-orange-400">Sameday Mobile Solutions</span>?</h2>
        <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 sm:mb-12 text-gray-200">We combine speed, expertise, and convenience to give you the best repair experience – without ever leaving your home.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {[
            { icon: "fas fa-truck-fast", title: "Free Pickup & Delivery", desc: "We come to you anywhere in Nairobi. No shop visit required." },
            { icon: "fas fa-clock", title: "24‑Hour Turnaround", desc: "Same‑day repair, returned to you within 24 hours. Guaranteed." },
            { icon: "fas fa-microchip", title: "Expert Technicians", desc: "Certified engineers with years of experience and genuine parts." },
            { icon: "fas fa-shield-alt", title: "Warranty on Repairs", desc: "All repairs come with a 6‑month warranty for your peace of mind." }
          ].map((item, idx) => (
            <div key={idx} className="bg-black/50 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-orange-500/30">
              <i className={`${item.icon} text-orange-400 text-3xl sm:text-4xl mb-3`}></i>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{item.desc}</p>
            </div>
          ))}
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
    <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-800 to-orange-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
        <div ref={phonesRef}><i className="fas fa-mobile-alt text-3xl sm:text-4xl mb-3"></i><h3 className="text-2xl sm:text-4xl font-bold">{phones}+</h3><p className="text-xs sm:text-sm">Phones Repaired</p></div>
        <div ref={successRef}><i className="fas fa-chart-line text-3xl sm:text-4xl mb-3"></i><h3 className="text-2xl sm:text-4xl font-bold">{success}%</h3><p className="text-xs sm:text-sm">Success Rate</p></div>
        <div ref={yearsRef}><i className="fas fa-award text-3xl sm:text-4xl mb-3"></i><h3 className="text-2xl sm:text-4xl font-bold">{years}+</h3><p className="text-xs sm:text-sm">Years Experience</p></div>
        <div ref={sameDayRef}><i className="fas fa-clock text-3xl sm:text-4xl mb-3"></i><h3 className="text-2xl sm:text-4xl font-bold">{sameDay}%</h3><p className="text-xs sm:text-sm">Same-Day Service</p></div>
      </div>
    </section>
  );
};

// ---------- PICKUP SERVICE (unchanged) ----------
const PickupService = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-500 to-orange-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">🚀 No Shop Visit Required</h2>
        <p className="text-base sm:text-xl mb-8 max-w-3xl mx-auto">
          You don’t need to bring your phone to us. One call, share your location (within Nairobi), and our rider will pick it up. We repair the same day and return it to you within <strong>24 hours</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            { icon: "fas fa-phone-alt", title: "Call or WhatsApp", desc: "Tell us your issue" },
            { icon: "fas fa-map-pin", title: "Share Location", desc: "We come to you (Nairobi only)" },
            { icon: "fas fa-tools", title: "Same‑Day Repair", desc: "Expert fixes your device" },
            { icon: "fas fa-truck", title: "Returned Within 24h", desc: "Delivered back to you" }
          ].map((step, idx) => (
            <div key={idx} className="bg-white/20 backdrop-blur-sm p-5 sm:p-6 rounded-2xl w-56 sm:w-64">
              <i className={`${step.icon} text-4xl mb-3`}></i>
              <h3 className="text-lg sm:text-xl font-bold">{idx+1}. {step.title}</h3>
              <p className="text-xs sm:text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/booking" className="inline-block mt-10 bg-white text-orange-700 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-gray-100 transition shadow-md">
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
    <section className="py-16 sm:py-20 bg-white" id="process">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">How It Works</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-10 sm:mb-16">You stay home – we handle everything. Fast, reliable, contactless.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center p-5 sm:p-6 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
              <div className="bg-orange-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 text-orange-700 text-2xl sm:text-3xl"><i className={step.icon}></i></div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{step.desc}</p>
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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12">Brands We Repair</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 items-center">
          {brands.map((brand, idx) => (
            <div key={brand} className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-3 sm:p-4 transition hover:scale-105 hover:border-2 hover:border-orange-400">
              <i className={`${icons[idx]} text-3xl sm:text-5xl text-gray-700 mb-2`}></i>
              <span className="font-semibold text-gray-800 text-xs sm:text-base">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- HOME PAGE ----------
const HomePage = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <HeroCarousel onQuoteClick={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <ImageBackgroundSection />
      <PickupService />
      <div className="bg-orange-600 text-white py-3 text-center font-semibold text-xs sm:text-sm">
        ⚡ Same Day Repair – We come to you, anywhere in Nairobi. Phone back within 24 hours. ⚡
      </div>
      <RepairProcess />
      <BrandsRepair />
      <StatsSection />
    </>
  );
};

export default HomePage;