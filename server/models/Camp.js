const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  description: { type: String },
  targetUnits: { type: Number, default: 50 },
  collectedUnits: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  attendees: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    checkInTime: { type: Date, default: Date.now },
    bloodGroup: { type: String },
    unitsDonated: { type: Number, default: 0 }
  }],
  images: [String],
  qrCode: { type: String }
}, { timestamps: true });

campSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Camp', campSchema);
