const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');

// Get all blood requests
router.get('/', async (req, res) => {
  try {
    const { status, bloodGroup, urgency } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (urgency) query.urgency = urgency;
    
    const requests = await BloodRequest.find(query).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blood request
router.post('/', async (req, res) => {
  try {
    const bloodRequest = new BloodRequest(req.body);
    const savedRequest = await bloodRequest.save();
    res.status(201).json({
      message: 'Blood request submitted successfully',
      request: savedRequest
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get blood request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update blood request status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blood request
router.put('/:id', async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get urgent requests
router.get('/urgent/list', async (req, res) => {
  try {
    const urgentRequests = await BloodRequest.find({
      urgency: { $in: ['high', 'critical'] },
      status: 'pending'
    }).sort({ urgency: -1, createdAt: -1 });
    
    res.json(urgentRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;