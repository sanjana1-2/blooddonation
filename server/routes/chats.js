const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get chats for a user
router.get('/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.userId }).populate('participants', 'firstName lastName avatar');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send a message
router.post('/:chatId/messages', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    
    const message = {
      sender: req.body.sender,
      content: req.body.content,
      timestamp: new Date()
    };
    
    chat.messages.push(message);
    chat.lastMessage = { content: message.content, timestamp: message.timestamp };
    await chat.save();
    
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
