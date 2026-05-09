const express = require('express');
const router = express.Router();

// Get all donors
router.get('/', (req, res) => {
  const donors = req.app.locals.donors;
  res.json(donors);
});

// Register new donor
router.post('/register', (req, res) => {
  try {
    const donors = req.app.locals.donors;
    
    // Check if email already exists
    const existingDonor = donors.find(d => d.email === req.body.email);
    if (existingDonor) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const donor = {
      id: donors.length + 1,
      ...req.body,
      emergencyContact: {
        name: req.body.emergencyContact,
        phone: req.body.emergencyPhone
      },
      createdAt: new Date(),
      isActive: true
    };
    
    donors.push(donor);
    res.status(201).json({ 
      message: 'Donor registered successfully',
      donor: donor 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search donors by blood group
router.get('/search/:bloodGroup', (req, res) => {
  try {
    const donors = req.app.locals.donors;
    const filtered = donors.filter(d => 
      d.bloodGroup === req.params.bloodGroup && d.isActive
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;