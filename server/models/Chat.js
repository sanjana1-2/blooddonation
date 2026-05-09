const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodRequest' },
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
  }],
  lastMessage: {
    content: String,
    timestamp: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
