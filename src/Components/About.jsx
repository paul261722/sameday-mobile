import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Counter component for stats
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

const About = () => {
  const [customersCount, customersRef] = useCountUp(10234);
  const [successRate, successRef] = useCountUp(99);
  const [yearsExp, yearsRef] = useCountUp(6);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section with company logo */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img 
              src="/static/logo.png" 
              alt="Same Day Mobile Solutions" 
              className="w-24 sm:w-32 md:w-48 h-auto object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 px-4">
            Nairobi's most trusted smartphone repair service – bringing speed, transparency, and expertise to your doorstep.
          </p>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="py-12 sm:py-16 container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all">
            <i className="fas fa-bullseye text-orange-500 text-3xl sm:text-4xl mb-4"></i>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              To provide fast, affordable, and reliable mobile device repairs without compromising on quality, 
              while ensuring every Nairobi resident can get their device fixed without ever leaving their home or office.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all">
            <i className="fas fa-eye text-orange-500 text-3xl sm:text-4xl mb-4"></i>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              To become the benchmark for same‑day mobile repair services across Africa – combining technology, 
              logistics, and human expertise to create a seamless repair experience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-gradient-to-r from-orange-800 to-orange-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
          <div ref={customersRef}>
            <i className="fas fa-users text-3xl sm:text-4xl mb-3"></i>
            <h3 className="text-3xl sm:text-4xl font-bold">{customersCount}+</h3>
            <p className="text-sm sm:text-base">Happy Customers</p>
          </div>
          <div ref={successRef}>
            <i className="fas fa-chart-line text-3xl sm:text-4xl mb-3"></i>
            <h3 className="text-3xl sm:text-4xl font-bold">{successRate}%</h3>
            <p className="text-sm sm:text-base">Customer Satisfaction</p>
          </div>
          <div ref={yearsRef}>
            <i className="fas fa-award text-3xl sm:text-4xl mb-3"></i>
            <h3 className="text-3xl sm:text-4xl font-bold">{yearsExp}+</h3>
            <p className="text-sm sm:text-base">Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* Why choose us – background image with fallback */}
      <section 
        className="relative py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/static/logo7.jpg')",
          backgroundColor: '#1a1a1a' // fallback dark color
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Why Choose Same Day Mobile Solutions?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { icon: "fas fa-truck-fast", title: "Free Pickup & Delivery", desc: "We come to your doorstep anywhere in Nairobi. No shop visit needed." },
              { icon: "fas fa-clock", title: "24‑Hour Turnaround", desc: "Same‑day repair, returned to you within 24 hours. Guaranteed." },
              { icon: "fas fa-microchip", title: "Genuine Parts", desc: "Only high‑quality, manufacturer‑grade components used in every repair." },
              { icon: "fas fa-shield-alt", title: "12‑Month Warranty", desc: "All repairs come with a full year of warranty for your peace of mind." },
              { icon: "fas fa-stethoscope", title: "Free Diagnostics", desc: "No obligation, free inspection of your device before any repair." },
              { icon: "fas fa-hand-holding-heart", title: "Certified Technicians", desc: "Experienced engineers with proven track record and ongoing training." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-500/20 flex items-center justify-center mb-3 sm:mb-4 text-orange-400 text-xl sm:text-2xl group-hover:scale-110 transition-transform mx-auto sm:mx-0">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-200 text-center sm:text-left">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-12 sm:mb-16">From a small workshop to Nairobi's most trusted repair service – our story is driven by passion for technology and customer care.</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { year: "2019", title: "Founded", desc: "Started operations in Nairobi with a single technician." },
              { year: "2020", title: "Free Pickup Launch", desc: "Introduced door‑to‑door service during the pandemic." },
              { year: "2022", title: "10K+ Repairs", desc: "Reached the milestone of 10,000 devices repaired." },
              { year: "2024", title: "Nairobi‑Wide", desc: "Expanded coverage to all major Nairobi suburbs." }
            ].map((item, idx) => (
              <div key={idx} className="relative w-40 sm:w-48 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-orange-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white mb-3">{item.year.slice(2)}</div>
                <h3 className="text-base sm:text-xl font-bold text-orange-400">{item.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">{item.desc}</p>
                {idx < 3 && <div className="hidden md:block absolute top-7 left-32 sm:top-8 sm:left-32 w-12 sm:w-16 h-0.5 bg-orange-500/50"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-800 to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get your device repaired?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">One call, and we'll pick up your phone – repaired and returned within 24 hours.</p>
          <Link to="/booking" className="inline-block bg-white text-orange-700 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition shadow-lg">
            Book a Repair <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;