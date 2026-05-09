const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  unitsRequired: {
    type: Number,
    required: true,
    min: 1
  },
  urgency: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  hospital: {
    name: String,
    address: String,
    phone: String
  },
  requesterName: {
    type: String,
    required: true
  },
  requesterPhone: {
    type: String,
    required: true
  },
  requesterEmail: {
    type: String,
    required: true
  },
  requiredBy: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);