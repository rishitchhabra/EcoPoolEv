import { ArrowRight, Leaf, Shield, Star, Clock, MapPin, Navigation, Share2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RideDetails() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column: Route Visualization (Map) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-emerald-50 rounded-3xl overflow-hidden shadow-inner border border-emerald-100 relative h-[500px] flex items-center justify-center">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-10" 
               style={{backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>
          
          {/* SVG Route Visualization */}
          <svg className="w-full h-full p-12" viewBox="0 0 800 600">
            {/* Roads */}
            <path d="M100 500 Q 250 450 300 300 T 500 150 L 700 100" 
                  fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
            <path d="M100 500 Q 250 450 300 300 T 500 150 L 700 100" 
                  fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="10 5" className="animate-[dash_20s_linear_infinite]" />
            
            {/* Stops */}
            <g transform="translate(100, 500)">
              <circle r="12" fill="#fff" stroke="#10b981" strokeWidth="4" />
              <text y="30" textAnchor="middle" className="text-xs font-bold fill-emerald-800">You (Start)</text>
            </g>
            
            <g transform="translate(300, 300)">
              <circle r="8" fill="#fff" stroke="#3b82f6" strokeWidth="4" />
              <text y="25" textAnchor="middle" className="text-xs font-medium fill-gray-600">Pickup: Sarah</text>
            </g>
            
            <g transform="translate(500, 150)">
              <circle r="8" fill="#fff" stroke="#3b82f6" strokeWidth="4" />
              <text y="25" textAnchor="middle" className="text-xs font-medium fill-gray-600">Pickup: Mike</text>
            </g>
            
            <g transform="translate(700, 100)">
              <circle r="12" fill="#ef4444" stroke="#fff" strokeWidth="4" />
              <circle r="6" fill="#ef4444" />
              <text y="30" textAnchor="middle" className="text-xs font-bold fill-red-600">Destination</text>
            </g>

            {/* Moving Vehicle */}
            <g className="animate-[move_10s_linear_infinite]">
                 {/* This would require complex path animation, simplifying for demo with static placement or simple translation if feasible */}
                <circle cx="0" cy="0" r="10" fill="#10b981">
                    <animateMotion dur="10s" repeatCount="indefinite" path="M100 500 Q 250 450 300 300 T 500 150 L 700 100" />
                </circle>
            </g>
          </svg>

          {/* Map Overlay Info */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs">
            <Link to="/track/123" className="flex items-center gap-3 mb-2 group">
              <div className="bg-emerald-100 group-hover:bg-emerald-200 transition-colors p-2 rounded-lg text-emerald-700">
                <Navigation size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Tap for Live Tracking</p>
                <p className="text-xs text-gray-500">Optimized for lowest emissions</p>
              </div>
            </Link>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-600">ETA: <span className="font-bold text-gray-900">14 mins</span></span>
              <span className="text-emerald-600 font-medium">2.3 kg CO₂ saved</span>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="text-emerald-600" />
                Accessibility Features Verified
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 17 5-5-5-5"/><path d="m13.88 5h.12"/><path d="m14 19h1v-4l-5-4-5 4v4h1"/></svg>
                    </div>
                    <span className="font-medium text-gray-700">Hydraulic Ramp</span>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                     <div className="bg-white p-2 rounded-full shadow-sm text-emerald-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                     </div>
                    <span className="font-medium text-gray-700">Extra Boarding Time</span>
                </div>
            </div>
        </div>
      </div>

      {/* Right Column: Ride & Driver Details */}
      <div className="space-y-6">
        {/* Driver Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Driver" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">David M.</h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <Star size={14} fill="currentColor" />
                <span className="font-medium text-gray-700">4.9</span>
                <span className="text-gray-400">(1,240 rides)</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Certified Accessibility Assistant</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-4">
             <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Vehicle</p>
                <p className="font-bold text-emerald-900">Tesla Model Y</p>
             </div>
             <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Plate</p>
                <p className="font-mono text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">ECO-442</p>
             </div>
          </div>

          <div className="flex gap-3">
             <button className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Contact Driver
             </button>
             <button className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Trip Summary</h3>
            <div className="space-y-4 relative">
                 <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200"></div>
                 
                 <div className="relative flex gap-4">
                     <div className="bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10"></div>
                     <div>
                        <p className="text-sm text-gray-500">10:30 AM</p>
                        <p className="font-bold text-gray-900">123 Green Avenue</p>
                     </div>
                 </div>

                 <div className="relative flex gap-4">
                     <div className="bg-gray-200 w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10"></div>
                     <div>
                         <div className="bg-blue-50 text-blue-800 text-xs px-2 py-0.5 rounded-full inline-block mb-1">Pooling</div>
                        <p className="text-sm text-gray-500">Pick up Sarah & Mike</p>
                        <p className="text-xs text-emerald-600 font-medium">+5 mins (Optimized)</p>
                     </div>
                 </div>

                 <div className="relative flex gap-4">
                     <div className="bg-red-500 w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10"></div>
                     <div>
                        <p className="text-sm text-gray-500">11:15 AM (Est)</p>
                        <p className="font-bold text-gray-900">Tech Park, Sector 4</p>
                     </div>
                 </div>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-4 space-y-2">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-medium">$12.50</span>
                 </div>
                 <div className="flex justify-between items-center text-emerald-600">
                    <span className="flex items-center gap-1"><Leaf size={14}/> Eco Discount</span>
                    <span className="font-medium">-$2.50</span>
                 </div>
                 <div className="flex justify-between items-center text-lg font-bold pt-2">
                    <span>Total</span>
                    <span>$10.00</span>
                 </div>
            </div>
             <button className="w-full mt-4 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <CreditCard size={18} />
                Pay Now
             </button>
        </div>
      </div>
    </div>
  );
}
