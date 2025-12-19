const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find({ isActive: true });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register new donor
router.post('/register', async (req, res) => {
  try {
    const donor = new Donor({
      ...req.body,
      emergencyContact: {
        name: req.body.emergencyContact,
        phone: req.body.emergencyPhone
      }
    });
    
    const savedDonor = await donor.save();
    res.status(201).json({ 
      message: 'Donor registered successfully',
      donor: savedDonor 
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Get donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update donor
router.put('/:id', async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search donors by blood group
router.get('/search/:bloodGroup', async (req, res) => {
  try {
    const donors = await Donor.find({ 
      bloodGroup: req.params.bloodGroup,
      isActive: true 
    });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;