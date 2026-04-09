import express from 'express';
import Ride from '../models/Ride.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/rides — Book a new ride (rider)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { origin, destination, date, time, accessibilityOptions, originCoords, destinationCoords, pooling } = req.body;

    if (!origin || !destination || !date || !time) {
      return res.status(400).json({ error: 'Origin, destination, date, and time are required.' });
    }

    // Get rider name
    const rider = await User.findById(req.session.userId);
    const riderName = rider ? rider.name : 'Unknown';

    // Calculate distance & ETA via OSRM
    let distanceKm = (Math.random() * 10 + 3).toFixed(1);
    let etaMins = Math.floor(Math.random() * 20 + 8);
    let oCoords = originCoords || { lat: 0, lng: 0 };
    let dCoords = destinationCoords || { lat: 0, lng: 0 };

    if (originCoords && destinationCoords && originCoords.lat && destinationCoords.lat) {
      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;
        const osrmRes = await fetch(osrmUrl);
        const osrmData = await osrmRes.json();
        if (osrmData.code === 'Ok' && osrmData.routes && osrmData.routes.length > 0) {
          distanceKm = (osrmData.routes[0].distance / 1000).toFixed(1);
          etaMins = Math.ceil(osrmData.routes[0].duration / 60);
        }
      } catch (osrmErr) {
        console.log('OSRM fallback:', osrmErr.message);
      }
    }

    // Fare in ₹: ₹50 base + ₹12/km
    const isPooling = pooling === true;
    const baseFare = Math.round(parseFloat(distanceKm) * 12 + 50);
    const ecoDiscount = Math.round(baseFare * 0.1);        // 10% eco discount
    const poolDiscount = isPooling ? Math.round(baseFare * 0.25) : 0;  // 25% pool discount
    const total = baseFare - ecoDiscount - poolDiscount;
    const co2 = (parseFloat(distanceKm) * 0.21).toFixed(1);

    const ride = new Ride({
      user: req.session.userId,
      riderName,
      origin, destination, date, time,
      accessibilityOptions: accessibilityOptions || [],
      pooling: isPooling,
      status: 'searching',          // waiting for driver
      paymentStatus: 'pending',     // pay after ride
      originCoords: oCoords,
      destinationCoords: dCoords,
      distance: `${distanceKm} km`,
      fare: { base: baseFare, ecoDiscount, poolDiscount, total },
      co2Saved: `${co2} kg`,
      eta: `${etaMins} mins`,
      poolingPartners: []
    });

    await ride.save();
    res.status(201).json({ message: 'Ride booked! Waiting for a driver...', ride });
  } catch (error) {
    console.error('Book ride error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/rides — Get all rides for logged-in rider
router.get('/', requireAuth, async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.json({ rides });
  } catch (error) {
    console.error('Get rides error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/rides/available — Get rides waiting for a driver (for driver portal)
router.get('/available', requireAuth, async (req, res) => {
  try {
    const driver = await User.findById(req.session.userId);
    if (!driver || driver.role !== 'driver') return res.status(403).json({ error: 'Drivers only' });

    let rides = await Ride.find({ status: 'searching' }).sort({ createdAt: -1 });

    // Filter rides based on accessibility options
    const offered = driver.offeredAccessibility || [];
    rides = rides.filter(ride => {
      if (!ride.accessibilityOptions || ride.accessibilityOptions.length === 0) return true; // Ride needs no special access

      // Driver must offer ALL requested accessibility options
      return ride.accessibilityOptions.every(option => offered.includes(option));
    });

    res.json({ rides });
  } catch (error) {
    console.error('Get available rides error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/rides/my-drives — Get rides accepted by this driver
router.get('/my-drives', requireAuth, async (req, res) => {
  try {
    const rides = await Ride.find({ 'driver.userId': req.session.userId })
      .sort({ createdAt: -1 });
    res.json({ rides });
  } catch (error) {
    console.error('Get my drives error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/rides/:id — Get single ride (rider or assigned driver)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const ride = await Ride.findOne({
      _id: req.params.id,
      $or: [
        { user: req.session.userId },
        { 'driver.userId': req.session.userId }
      ]
    });
    if (!ride) return res.status(404).json({ error: 'Ride not found.' });
    res.json({ ride });
  } catch (error) {
    console.error('Get ride error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/rides/:id/accept — Driver accepts a ride
router.patch('/:id/accept', requireAuth, async (req, res) => {
  try {
    const driverUser = await User.findById(req.session.userId);
    if (!driverUser || driverUser.role !== 'driver') {
      return res.status(403).json({ error: 'Only drivers can accept rides.' });
    }

    // Atomically claim the ride (first come, first served)
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, status: 'searching' },
      {
        status: 'confirmed',
        driver: {
          userId: driverUser._id,
          name: driverUser.name,
          rating: driverUser.driverRating,
          totalRides: driverUser.totalDriverRides,
          vehicle: driverUser.vehicle?.type || 'EV',
          plate: driverUser.vehicle?.plate || 'ECO-000',
          avatar: driverUser.avatar || driverUser.name.split(' ')[0]
        }
      },
      { new: true }
    );

    if (!ride) {
      return res.status(409).json({ error: 'Ride already taken by another driver.' });
    }

    // Increment driver's total rides
    await User.findByIdAndUpdate(driverUser._id, { $inc: { totalDriverRides: 1 } });

    res.json({ message: 'Ride accepted!', ride });
  } catch (error) {
    console.error('Accept ride error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/rides/:id/complete — Driver marks ride as completed
router.patch('/:id/complete', requireAuth, async (req, res) => {
  try {
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, 'driver.userId': req.session.userId, status: 'confirmed' },
      { status: 'completed' },
      { new: true }
    );
    if (!ride) return res.status(404).json({ error: 'Ride not found or not confirmed.' });
    res.json({ message: 'Ride completed!', ride });
  } catch (error) {
    console.error('Complete ride error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/rides/:id/pay — Rider pays after ride
router.patch('/:id/pay', requireAuth, async (req, res) => {
  try {
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId, status: 'completed', paymentStatus: 'pending' },
      { paymentStatus: 'paid' },
      { new: true }
    );
    if (!ride) return res.status(404).json({ error: 'Ride not found or already paid.' });
    res.json({ message: 'Payment successful!', ride });
  } catch (error) {
    console.error('Pay ride error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/rides/:id/status — Generic status update (legacy)
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['searching', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status.' });

    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, $or: [{ user: req.session.userId }, { 'driver.userId': req.session.userId }] },
      { status },
      { new: true }
    );
    if (!ride) return res.status(404).json({ error: 'Ride not found.' });
    res.json({ message: 'Status updated.', ride });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
