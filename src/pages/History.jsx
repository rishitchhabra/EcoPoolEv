import { Clock, MapPin, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function History() {
  const rides = [
    {
      id: 1,
      date: 'Feb 24, 2026',
      time: '09:00 AM',
      origin: '123 Green Avenue',
      destination: 'Tech Park, Sector 4',
      price: '$10.00',
      co2Saved: '2.3 kg',
      status: 'Completed'
    },
    {
      id: 2,
      date: 'Feb 22, 2026',
      time: '05:30 PM',
      origin: 'Central Station',
      destination: '123 Green Avenue',
      price: '$14.50',
      co2Saved: '3.1 kg',
      status: 'Completed'
    },
    {
      id: 3,
      date: 'Feb 20, 2026',
      time: '08:45 AM',
      origin: '123 Green Avenue',
      destination: 'City Hospital',
      price: '$11.25',
      co2Saved: '2.5 kg',
      status: 'Completed'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Ride History</h1>
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium flex items-center gap-2">
            <Leaf size={18} />
            <span>Total CO₂ Saved: 15.4 kg</span>
        </div>
      </div>

      <div className="space-y-4">
        {rides.map((ride) => (
          <div key={ride.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Clock size={16} />
                    <span>{ride.date} • {ride.time}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{ride.status}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-0.5 h-8 bg-gray-200"></div>
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    </div>
                    <div className="space-y-4 flex-1">
                        <p className="font-medium text-gray-900">{ride.origin}</p>
                        <p className="font-medium text-gray-900">{ride.destination}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto md:flex-col md:items-end gap-2 md:gap-1">
                <span className="text-xl font-bold text-gray-900">{ride.price}</span>
                <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                    <Leaf size={14} /> {ride.co2Saved} CO₂
                </span>
            </div>
            
            <Link 
                to={`/track/${ride.id}`} 
                className="w-full md:w-auto px-6 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                Track <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
