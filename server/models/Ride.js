import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  riderName: { type: String, default: '' },
  origin: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  accessibilityOptions: [{ type: String }],
  pooling: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['searching', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'searching'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  // Driver info — populated when a driver accepts the ride
  driver: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '' },
    rating: { type: Number, default: 5.0 },
    totalRides: { type: Number, default: 0 },
    vehicle: { type: String, default: '' },
    plate: { type: String, default: '' },
    avatar: { type: String, default: 'Felix' }
  },
  fare: {
    base: { type: Number, default: 0 },
    ecoDiscount: { type: Number, default: 0 },
    poolDiscount: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  co2Saved: { type: String, default: '0 kg' },
  distance: { type: String, default: '' },
  originCoords: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  destinationCoords: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  eta: { type: String, default: '-- mins' },
  poolingPartners: [{
    name: String,
    pickupLocation: String
  }]
}, {
  timestamps: true
});

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
