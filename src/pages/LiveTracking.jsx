import { useState, useEffect } from 'react';
import { Navigation, Phone, Shield, Share2, AlertTriangle, Battery, Leaf, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function LiveTracking() {
  const { id } = useParams();
  const [eta, setEta] = useState('14 min');
  const [distance, setDistance] = useState('4.2 km');
  const [batteryLevel, setBatteryLevel] = useState(82);
  const [status, setStatus] = useState('En Route to Pickup');

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(prev - 0.1, 80));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] -m-4 bg-gray-100 flex flex-col md:flex-row">
      
      {/* Map Area */}
      <div className="flex-grow relative h-2/3 md:h-full">
        {/* Placeholder for real map */}
        <div className="absolute inset-0 bg-emerald-50 opacity-50" 
             style={{backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '30px 30px'}}>
        </div>
        
        <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            {/* Route Path */}
            <path d="M100 500 Q 250 450 400 300 T 700 100" 
                  fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />
            <path d="M100 500 Q 250 450 400 300 T 700 100" 
                  fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="15 10" className="animate-[dash_30s_linear_infinite]" />
            
            {/* Vehicle Marker */}
            <g className="animate-[move_15s_linear_infinite]">
                 {/* This circles would move along the path in a real app */}
                <circle cx="0" cy="0" r="16" fill="#064e3b" stroke="white" strokeWidth="4">
                    <animateMotion dur="15s" repeatCount="indefinite" path="M100 500 Q 250 450 400 300 T 700 100" />
                </circle>
            </g>
        </svg>

        {/* Floating overlays for Map */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs z-10">
             <div className="flex items-center gap-3">
                 <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 font-bold text-center min-w-[60px]">
                     <span className="block text-xl">{eta}</span>
                     <span className="text-xs font-normal">ETA</span>
                 </div>
                 <div>
                     <p className="font-bold text-gray-900 leading-tight">Arriving at 10:45 AM</p>
                     <p className="text-sm text-gray-500">{distance} remaining</p>
                 </div>
             </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button className="bg-white p-3 rounded-full shadow-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                <Navigation size={24} />
            </button>
        </div>
      </div>

      {/* Stats & Controls Panel */}
      <div className="w-full md:w-96 bg-white shadow-2xl z-20 flex flex-col h-1/3 md:h-full overflow-y-auto">
        
        {/* Driver Header */}
        <div className="p-6 bg-emerald-900 text-white shrink-0">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-gray-200" alt="Driver" />
                    <div className="absolute -bottom-1 -right-1 bg-white text-emerald-900 text-xs font-bold px-1.5 py-0.5 rounded-full border border-emerald-900">4.9</div>
                </div>
                <div>
                   <h2 className="font-bold text-lg">David M.</h2>
                   <p className="text-emerald-300 text-sm">Tesla Model Y • ECO-442</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <button className="p-2 bg-emerald-800 rounded-full hover:bg-emerald-700 transition-colors">
                        <Phone size={18} />
                    </button>
                </div>
            </div>
            
            {/* Vital Signs Row */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-emerald-800">
                <div className="text-center">
                    <Battery size={20} className="mx-auto mb-1 text-emerald-400" />
                    <span className="text-xs font-medium">{Math.floor(batteryLevel)}% Charge</span>
                </div>
                 <div className="text-center">
                    <Leaf size={20} className="mx-auto mb-1 text-emerald-400" />
                    <span className="text-xs font-medium">Zero Emissions</span>
                </div>
                 <div className="text-center">
                    <Shield size={20} className="mx-auto mb-1 text-emerald-400" />
                    <span className="text-xs font-medium">Verified Safe</span>
                </div>
            </div>
        </div>

        {/* Ride Info Body */}
        <div className="p-6 space-y-6 flex-grow">
            
            {/* Status Timeline */}
            <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-emerald-100 space-y-8">
                     <div className="relative">
                        <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm ring-2 ring-emerald-100"></div>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Current Status</p>
                        <p className="text-gray-900 font-medium">Heading to pickup point</p>
                        <p className="text-sm text-gray-500 mt-1">Stuck in minor traffic (+2m)</p>
                     </div>

                     <div className="relative opacity-50">
                        <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                        <p className="text-gray-900 font-medium">Pickup Sarah</p>
                     </div>

                     <div className="relative opacity-50">
                        <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                        <p className="text-gray-900 font-medium">Drop-off at Tech Park</p>
                     </div>
                </div>
            </div>

            {/* Accessibility Note */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                <div className="text-blue-600 mt-0.5">
                    <Shield size={20} />
                </div>
                <div>
                     <p className="text-sm font-bold text-blue-900">Accessibility Features Active</p>
                     <p className="text-xs text-blue-700 mt-1">Driver is aware of wheelchair ramp requirement and will assist upon arrival.</p>
                </div>
            </div>

        </div>

        {/* Safety Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
             <button className="w-full py-3 bg-red-50 text-red-700 font-bold rounded-xl border border-red-100 hover:bg-red-100 flex items-center justify-center gap-2 transition-colors">
                <AlertTriangle size={18} /> Emergency / SOS
             </button>
             <button className="w-full py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                <Share2 size={18} /> Share Ride Details
             </button>
        </div>
      </div>
    </div>
  );
}
