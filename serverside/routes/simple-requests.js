const express = require('express');
const router = express.Router();

// Get all blood requests
router.get('/', (req, res) => {
  try {
    const requests = req.app.locals.bloodRequests;
    const { status, bloodGroup, urgency } = req.query;
    
    let filtered = requests;
    
    if (status) filtered = filtered.filter(r => r.status === status);
    if (bloodGroup) filtered = filtered.filter(r => r.bloodGroup === bloodGroup);
    if (urgency) filtered = filtered.filter(r => r.urgency === urgency);
    
    res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blood request
router.post('/', (req, res) => {
  try {
    const requests = req.app.locals.bloodRequests;
    
    const request = {
      id: requests.length + 1,
      ...req.body,
      status: 'pending',
      createdAt: new Date()
    };
    
    requests.push(request);
    res.status(201).json({
      message: 'Blood request submitted successfully',
      request: request
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get urgent requests
router.get('/urgent/list', (req, res) => {
  try {
    const requests = req.app.locals.bloodRequests;
    const urgentRequests = requests.filter(r => 
      ['high', 'critical'].includes(r.urgency) && r.status === 'pending'
    ).sort((a, b) => {
      const urgencyOrder = { critical: 3, high: 2, medium: 1, low: 0 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });
    
    res.json(urgentRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;