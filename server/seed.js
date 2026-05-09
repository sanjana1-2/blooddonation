const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Donor = require('./models/Donor');
const BloodBank = require('./models/BloodBank');
const BloodRequest = require('./models/BloodRequest');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eraktkosh');
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Donor.deleteMany({});
    await BloodBank.deleteMany({});
    await BloodRequest.deleteMany({});

    // Create Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const admin = await User.create({
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@eraktkosh.in',
      password: 'admin123', // Will be hashed by pre-save
      role: 'admin',
      phone: '1234567890',
      isVerified: true
    });

    // Create Donors
    const donorUser = await User.create({
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'donor@eraktkosh.in',
      password: 'donor123',
      role: 'donor',
      phone: '9876543210',
      isVerified: true,
      profile: {
        bloodGroup: 'O+',
        city: 'Delhi',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      }
    });

    // Create Hospital
    const hospitalUser = await User.create({
      firstName: 'City',
      lastName: 'Hospital',
      email: 'hospital@eraktkosh.in',
      password: 'hospital123',
      role: 'hospital',
      phone: '1122334455',
      isVerified: true
    });

    // Create Donor record for Rahul
    await Donor.create({
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'donor@eraktkosh.in',
      phone: '9876543210',
      dateOfBirth: new Date('1990-05-15'),
      gender: 'male',
      bloodGroup: 'O+',
      weight: 70,
      address: '123 MG Road, New Delhi',
      city: 'New Delhi',
      state: 'delhi',
      pincode: '110001',
      emergencyContact: {
        name: 'Suresh Sharma',
        phone: '9988776655'
      }
    });

    // Create Blood Banks
    await BloodBank.create([
      {
        name: "All India Institute of Medical Sciences Blood Bank",
        address: "Ansari Nagar, New Delhi - 110029",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110029",
        phone: "+91-11-26588500",
        email: "bloodbank@aiims.edu",
        license: "DL-001-AIIMS",
        bloodInventory: {
          'A+': 25, 'A-': 8, 'B+': 30, 'B-': 5,
          'AB+': 12, 'AB-': 3, 'O+': 40, 'O-': 10
        }
      },
      {
        name: "Safdarjung Hospital Blood Bank",
        address: "Ansari Nagar West, New Delhi - 110029",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110029",
        phone: "+91-11-26165060",
        email: "bloodbank@safdarjung.gov.in",
        license: "DL-002-SJH",
        bloodInventory: {
          'A+': 20, 'A-': 6, 'B+': 25, 'B-': 4,
          'AB+': 10, 'AB-': 2, 'O+': 35, 'O-': 8
        }
      }
    ]);

    console.log('Seed data created successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();