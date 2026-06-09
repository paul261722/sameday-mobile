import { useState } from 'react';

const Booking = () => {
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    brand: '', 
    repairType: '', 
    date: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.brand || !form.repairType || !form.date) {
      alert('Please fill all required fields');
      return;
    }
    setLoading(true);
    
    const selectedDate = new Date(form.date);
    const formattedDate = selectedDate.toLocaleDateString('en-GB');
    
    const message = `*New Booking Request - Same Day Mobile Solutions*
    
👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
📱 *Brand:* ${form.brand}
🔧 *Repair Type:* ${form.repairType}
📅 *Preferred Date:* ${formattedDate}
💬 *Notes:* ${form.notes || 'None'}

Please confirm availability.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '254713696715';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', brand: '', repairType: '', date: '', notes: '' });
    }, 5000);
  };

  const backgroundImageUrl = "/Static/logo6.jpg";

  return (
    <div className="min-h-screen">
      {/* Hero section – responsive padding */}
      <section 
        className="relative w-full py-16 sm:py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundColor: '#111' // fallback
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Book a Repair
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Same day service – fill the form and we'll confirm via WhatsApp within 30 minutes.
          </p>
        </div>
      </section>

      {/* Booking form – glassmorphism card */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-orange-200/40">
            {submitted ? (
              <div className="text-center p-6 bg-green-100/80 backdrop-blur-sm rounded-xl text-green-700 border border-green-200">
                <i className="fas fa-check-circle text-5xl mb-3 text-green-600"></i>
                <h2 className="text-2xl font-bold">Booking Request Sent!</h2>
                <p className="mt-2">We've opened WhatsApp – just send the pre‑filled message and we'll get back to you shortly.</p>
                <button 
                  onClick={() => window.open('https://wa.me/254713696715', '_blank')}
                  className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
                >
                  <i className="fab fa-whatsapp mr-2"></i> Open WhatsApp Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="0712345678" 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Phone Brand *</label>
                  <select 
                    name="brand" 
                    value={form.brand} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Brand</option>
                    {["Apple","Samsung","Huawei","Tecno","Infinix","Oppo","Xiaomi","Google Pixel","Nokia","Other"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Repair Type *</label>
                  <select 
                    name="repairType" 
                    value={form.repairType} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Issue</option>
                    <option>Screen Replacement</option>
                    <option>Battery Replacement</option>
                    <option>Water Damage Repair</option>
                    <option>Charging Port Fix</option>
                    <option>Software Issue / Unlocking</option>
                    <option>Camera Repair</option>
                    <option>Other (describe in notes)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Preferred Date *</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={form.date} 
                    onChange={handleChange} 
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Additional Notes (optional)</label>
                  <textarea 
                    name="notes" 
                    rows="3" 
                    value={form.notes} 
                    onChange={handleChange} 
                    placeholder="e.g., phone model, specific issue, preferred time..."
                    className="w-full p-2 sm:p-3 bg-white/50 border border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition text-sm sm:text-base"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 sm:py-3 rounded-xl text-base sm:text-lg transition shadow-md disabled:opacity-70"
                >
                  {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
                  {loading ? 'Processing...' : 'Submit Booking via WhatsApp'}
                  <i className="fab fa-whatsapp ml-2"></i>
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting, you agree to receive a WhatsApp confirmation. Data rates may apply.
                </p>
              </form>
            )}
            
            <div className="mt-8 text-center border-t border-orange-200/30 pt-6">
              <p className="text-gray-600 text-sm">Prefer to talk? Call or WhatsApp us directly:</p>
              <a 
                href="tel:0713696715" 
                className="inline-flex items-center gap-2 text-orange-600 font-semibold mt-2 hover:text-orange-700 transition"
              >
                <i className="fas fa-phone-alt"></i> 0713 696 715
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <a 
                href="https://wa.me/254713696715" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 font-semibold mt-2 hover:text-green-700 transition"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;