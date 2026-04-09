import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/register — Create rider or driver account
router.post('/register', async (req, res) => {
  try {
    const { userId, name, password, confirmPassword, role, vehicleType, vehiclePlate, vehicleColor } = req.body;

    if (!userId || !name || !password) {
      return res.status(400).json({ error: 'User ID, name, and password are required.' });
    }
    if (userId.length < 3) return res.status(400).json({ error: 'User ID must be at least 3 characters.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match.' });

    // Driver-specific validation
    if (role === 'driver') {
      if (!vehicleType || !vehiclePlate) {
        return res.status(400).json({ error: 'Vehicle type and plate are required for drivers.' });
      }
    }

    const existing = await User.findOne({ userId: userId.toLowerCase() });
    if (existing) return res.status(400).json({ error: 'User ID already taken.' });

    const user = new User({
      userId: userId.toLowerCase(),
      name,
      password,
      role: role === 'driver' ? 'driver' : 'rider',
      vehicle: role === 'driver' ? { type: vehicleType, plate: vehiclePlate, color: vehicleColor || '' } : undefined,
      avatar: name.split(' ')[0]
    });

    await user.save();
    req.session.userId = user._id;
    req.session.userDisplayId = user.userId;
    req.session.userRole = user.role;

    res.status(201).json({ message: 'Account created!', user: user.toJSON() });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) return res.status(400).json({ error: 'User ID and password are required.' });

    const user = await User.findOne({ userId: userId.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid User ID or password.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid User ID or password.' });

    req.session.userId = user._id;
    req.session.userDisplayId = user.userId;
    req.session.userRole = user.role;

    res.json({ message: 'Login successful!', user: user.toJSON() });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Could not log out.' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out.' });
  });
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/auth/accessibility — Update offered accessibility options (Driver only)
router.patch('/accessibility', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized.' });
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== 'driver') return res.status(403).json({ error: 'Drivers only.' });
    
    const { features } = req.body;
    if (!Array.isArray(features)) {
      return res.status(400).json({ error: 'Invalid data format.' });
    }
    
    user.offeredAccessibility = features;
    await user.save();
    
    res.json({ success: true, offeredAccessibility: user.offeredAccessibility });
  } catch (error) {
    console.error('Update accessibility error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
