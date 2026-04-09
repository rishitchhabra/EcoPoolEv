import { useState } from 'react';
import { MapPin, Calendar, Clock, Accessibility, Check, Loader2, Leaf, PersonStanding, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    accessibility: {
      wheelchair: false,
      assistance: false,
      serviceAnimal: false
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setLoading(false);
      navigate('/track/123'); // Go to live tracking after simulation
    }, 1500);
  };

  const toggleAccess = (key) => {
    setFormData(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: !prev.accessibility[key]
      }
    }));
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white -mx-4 -mt-8 px-4 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Decorative pattern */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-700/50 backdrop-blur-sm px-4 py-1 rounded-full text-emerald-100 text-sm font-medium border border-emerald-600/50">
            <Leaf size={16} />
            <span>Reducing carbon footprints, one ride at a time</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Sustainable Mobility <br/>
            <span className="text-emerald-300">Accessible for Everyone</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Join the eco-friendly movement with our AI-optimized shared EV rides. Priority accessibility features included.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-3xl mx-auto -mt-20 relative z-20 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-emerald-100/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin className="text-emerald-600" />
            Book Your Ride
          </h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Origin</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Where are you starting?"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    required
                    value={formData.origin}
                    onChange={e => setFormData({...formData, origin: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Destination</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-3 text-emerald-600" />
                  <input 
                    type="text" 
                    placeholder="Where do you want to go?"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    required
                    value={formData.destination}
                    onChange={e => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Time</label>
                <div className="relative">
                  <Clock size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="time" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Accessibility Options */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Accessibility size={18} className="text-emerald-600" />
                Accessibility Requirements
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'wheelchair', label: 'Wheelchair Access (Ramp/Lift)' },
                  { key: 'assistance', label: 'Driver Assistance' },
                  { key: 'serviceAnimal', label: 'Service Animal' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleAccess(key)}
                    className={clsx(
                      "px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2",
                      formData.accessibility[key] 
                        ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-sm" 
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {formData.accessibility[key] && <Check size={14} strokeWidth={3} />}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 text-xl tracking-wide disabled:opacity-70 disabled:cursor-not-allowed group uppercase"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search className="group-hover:scale-110 transition-transform" strokeWidth={3} />}
              {loading ? 'Finding Best Eco-Routes...' : 'BOOK NOW'}
            </button>
          </form>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 py-12 px-4">
        {[
          { icon: Leaf, title: 'Eco-Friendly', desc: '100% Electric Vehicle fleet reduced CO2 emissions by 40% per ride.' },
          { icon: PersonStanding, title: 'Fully Accessible', desc: 'Every vehicle equipped with ramps and lifts for wheelchair users.' },
          { icon: MapPin, title: 'AI Optimized', desc: 'Smart routing algorithms minimize travel time and maximize sharing efficiency.' },
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center text-emerald-700 mb-4">
              <feature.icon size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
