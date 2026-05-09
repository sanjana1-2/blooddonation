const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');

// Get all blood banks
router.get('/', async (req, res) => {
  try {
    const { state, city, bloodGroup } = req.query;
    let query = { isActive: true };
    
    if (state) query.state = new RegExp(state, 'i');
    if (city) query.city = new RegExp(city, 'i');
    
    let bloodBanks = await BloodBank.find(query);
    
    // Filter by blood group availability if specified
    if (bloodGroup) {
      bloodBanks = bloodBanks.filter(bank => 
        bank.bloodInventory[bloodGroup] > 0
      );
    }
    
    res.json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new blood bank
router.post('/', async (req, res) => {
  try {
    const bloodBank = new BloodBank(req.body);
    const savedBloodBank = await bloodBank.save();
    res.status(201).json(savedBloodBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get blood bank by ID
router.get('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    res.json(bloodBank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update blood inventory
router.put('/:id/inventory', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findByIdAndUpdate(
      req.params.id,
      { bloodInventory: req.body },
      { new: true, runValidators: true }
    );
    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }
    res.json(bloodBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get blood availability summary
router.get('/availability/summary', async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find({ isActive: true });
    
    const summary = {
      totalBanks: bloodBanks.length,
      bloodGroups: {}
    };
    
    // Calculate total availability for each blood group
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].forEach(group => {
      summary.bloodGroups[group] = bloodBanks.reduce((total, bank) => 
        total + (bank.bloodInventory[group] || 0), 0
      );
    });
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;