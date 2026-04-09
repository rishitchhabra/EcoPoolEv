import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/preferences — Get current user's accessibility prefs
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ preferences: user.accessibilityPrefs });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/preferences — Update accessibility prefs
router.put('/', requireAuth, async (req, res) => {
  try {
    const prefs = req.body;
    
    const allowedKeys = [
      'wheelchairRamp', 'lowFloor', 'extraLegroom', 'storageSpace',
      'driverHelp', 'doorToDoor', 'luggageHelp',
      'quietRide', 'minimalScents', 'screenReader'
    ];

    // Filter to only allowed keys
    const cleanPrefs = {};
    for (const key of allowedKeys) {
      if (typeof prefs[key] === 'boolean') {
        cleanPrefs[key] = prefs[key];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { accessibilityPrefs: cleanPrefs },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({
      message: 'Preferences saved!',
      preferences: user.accessibilityPrefs
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
