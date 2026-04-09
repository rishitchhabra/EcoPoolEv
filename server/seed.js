import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Ride from './models/Ride.js';

const seedData = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await Ride.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // ===== RIDERS =====
    const rishit = new User({
      userId: 'rishit', name: 'Rishit Singh', password: 'password123', role: 'rider',
      accessibilityPrefs: { wheelchairRamp: true, storageSpace: true, driverHelp: true }
    });
    const jake = new User({
      userId: 'jake', name: 'Jake Wilson', password: 'password123', role: 'rider',
      accessibilityPrefs: { lowFloor: true, extraLegroom: true, quietRide: true }
    });

    // ===== DRIVERS =====
    const david = new User({
      userId: 'david', name: 'David M.', password: 'password123', role: 'driver',
      vehicle: { type: 'Tesla Model Y', plate: 'ECO-442', color: 'White' },
      driverRating: 4.9, totalDriverRides: 1240, avatar: 'Felix',
      offeredAccessibility: ['Wheelchair Access (Ramp/Lift)', 'Driver Assistance']
    });
    const sarah = new User({
      userId: 'sarah', name: 'Sarah K.', password: 'password123', role: 'driver',
      vehicle: { type: 'BYD Atto 3', plate: 'ECO-317', color: 'Blue' },
      driverRating: 4.8, totalDriverRides: 890, avatar: 'Aneka',
      offeredAccessibility: ['Driver Assistance', 'Service Animal']
    });
    const priya = new User({
      userId: 'priya', name: 'Priya S.', password: 'password123', role: 'driver',
      vehicle: { type: 'Tata Nexon EV', plate: 'ECO-765', color: 'Red' },
      driverRating: 4.7, totalDriverRides: 1560, avatar: 'Maria',
      offeredAccessibility: []
    });

    await rishit.save(); await jake.save();
    await david.save(); await sarah.save(); await priya.save();
    console.log('👤 Riders: rishit, jake | Drivers: david, sarah, priya  (password: password123)');

    // Sample completed rides (in ₹)
    const rides = [
      {
        user: rishit._id, riderName: 'Rishit Singh',
        origin: 'Connaught Place', destination: 'India Gate',
        date: '2026-02-24', time: '09:00', pooling: true,
        status: 'completed', paymentStatus: 'paid',
        driver: { userId: david._id, name: 'David M.', rating: 4.9, totalRides: 1240, vehicle: 'Tesla Model Y', plate: 'ECO-442', avatar: 'Felix' },
        fare: { base: 120, ecoDiscount: 12, poolDiscount: 30, total: 78 },
        distance: '4.2 km', co2Saved: '0.9 kg', eta: '6 mins',
        originCoords: { lat: 28.6315, lng: 77.2167 }, destinationCoords: { lat: 28.6129, lng: 77.2295 },
        accessibilityOptions: ['Wheelchair Access (Ramp/Lift)']
      },
      {
        user: rishit._id, riderName: 'Rishit Singh',
        origin: 'Nehru Place', destination: 'Hauz Khas',
        date: '2026-02-22', time: '17:30', pooling: false,
        status: 'completed', paymentStatus: 'paid',
        driver: { userId: sarah._id, name: 'Sarah K.', rating: 4.8, totalRides: 890, vehicle: 'BYD Atto 3', plate: 'ECO-317', avatar: 'Aneka' },
        fare: { base: 180, ecoDiscount: 18, poolDiscount: 0, total: 162 },
        distance: '8.5 km', co2Saved: '1.8 kg', eta: '18 mins',
        originCoords: { lat: 28.5491, lng: 77.2533 }, destinationCoords: { lat: 28.5494, lng: 77.2001 },
        accessibilityOptions: ['Driver Assistance']
      },
      {
        user: jake._id, riderName: 'Jake Wilson',
        origin: 'Saket', destination: 'Lajpat Nagar',
        date: '2026-02-23', time: '07:30', pooling: true,
        status: 'completed', paymentStatus: 'paid',
        driver: { userId: priya._id, name: 'Priya S.', rating: 4.7, totalRides: 1560, vehicle: 'Tata Nexon EV', plate: 'ECO-765', avatar: 'Maria' },
        fare: { base: 100, ecoDiscount: 10, poolDiscount: 25, total: 65 },
        distance: '3.5 km', co2Saved: '0.7 kg', eta: '10 mins',
        originCoords: { lat: 28.5245, lng: 77.2066 }, destinationCoords: { lat: 28.5700, lng: 77.2373 }
      }
    ];

    await Ride.insertMany(rides);
    console.log('🚗 Created sample rides');

    console.log('\n✅ Seed complete! Login credentials:');
    console.log('   RIDERS:  rishit / password123  |  jake / password123');
    console.log('   DRIVERS: david / password123   |  sarah / password123  |  priya / password123\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
