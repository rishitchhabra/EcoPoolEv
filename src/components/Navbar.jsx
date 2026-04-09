import { Car, Menu, User, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-white p-2 rounded-full text-emerald-800 transition-transform group-hover:scale-110">
            <Leaf size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">EcoPool EV</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-emerald-200 transition-colors">Book a Ride</Link>
          <Link to="/history" className="hover:text-emerald-200 transition-colors">My Rides</Link>
          <Link to="/accessibility" className="hover:text-emerald-200 transition-colors">Accessibility</Link>
          <Link to="/login" className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded-full transition-colors font-semibold">
            <User size={18} />
            Login
          </Link>
        </div>
        <button className="md:hidden text-emerald-100 hover:text-white">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
}
