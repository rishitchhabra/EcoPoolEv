import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['rider', 'driver'],
    default: 'rider'
  },
  // Driver-specific fields
  vehicle: {
    type: { type: String, default: '' },     // e.g. "Tesla Model Y"
    plate: { type: String, default: '' },     // e.g. "ECO-442"
    color: { type: String, default: '' }
  },
  driverRating: { type: Number, default: 5.0 },
  totalDriverRides: { type: Number, default: 0 },
  avatar: { type: String, default: 'Felix' },
  offeredAccessibility: [{ type: String }],
  accessibilityPrefs: {
    wheelchairRamp: { type: Boolean, default: false },
    lowFloor: { type: Boolean, default: false },
    extraLegroom: { type: Boolean, default: false },
    storageSpace: { type: Boolean, default: false },
    driverHelp: { type: Boolean, default: false },
    doorToDoor: { type: Boolean, default: false },
    luggageHelp: { type: Boolean, default: false },
    quietRide: { type: Boolean, default: false },
    minimalScents: { type: Boolean, default: false },
    screenReader: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
