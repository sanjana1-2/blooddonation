const express = require('express');
const router = express.Router();
const Camp = require('../models/Camp');

// Get all camps
router.get('/', async (req, res) => {
  try {
    const camps = await Camp.find().populate('organization', 'firstName lastName email');
    res.json(camps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a camp
router.post('/', async (req, res) => {
  const camp = new Camp(req.body);
  try {
    const newCamp = await camp.save();
    res.status(201).json(newCamp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
