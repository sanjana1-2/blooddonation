const express = require('express');
const router = express.Router();

// Get all blood banks
router.get('/', (req, res) => {
  try {
    const bloodBanks = req.app.locals.bloodBanks;
    const { state, city, bloodGroup } = req.query;
    
    let filtered = bloodBanks;
    
    if (state) {
      filtered = filtered.filter(bank => 
        bank.state.toLowerCase().includes(state.toLowerCase())
      );
    }
    
    if (city) {
      filtered = filtered.filter(bank => 
        bank.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (bloodGroup) {
      filtered = filtered.filter(bank => 
        bank.bloodInventory[bloodGroup] > 0
      );
    }
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blood availability summary
router.get('/availability/summary', (req, res) => {
  try {
    const bloodBanks = req.app.locals.bloodBanks;
    
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