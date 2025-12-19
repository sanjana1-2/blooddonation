const mongoose = require('mongoose');
const Donor = require('./models/Donor');
const BloodBank = require('./models/BloodBank');
const BloodRequest = require('./models/BloodRequest');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eraktkosh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleDonors = [
  {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-9876543210',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'male',
    bloodGroup: 'O+',
    weight: 70,
    address: '123 Main Street, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    emergencyContact: {
      name: 'Priya Kumar',
      phone: '+91-9876543211'
    }
  },
  {
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543212',
    dateOfBirth: new Date('1992-08-22'),
    gender: 'female',
    bloodGroup: 'A+',
    weight: 55,
    address: '456 Park Avenue, Bandra',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    emergencyContact: {
      name: 'Amit Sharma',
      phone: '+91-9876543213'
    }
  },
  {
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.patel@email.com',
    phone: '+91-9876543214',
    dateOfBirth: new Date('1988-12-10'),
    gender: 'male',
    bloodGroup: 'B+',
    weight: 75,
    address: '789 Tech Park, Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    emergencyContact: {
      name: 'Neha Patel',
      phone: '+91-9876543215'
    }
  }
];

const sampleBloodBanks = [
  {
    name: 'All India Institute of Medical Sciences Blood Bank',
    address: 'Ansari Nagar, New Delhi - 110029',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110029',
    phone: '+91-11-26588500',
    email: 'bloodbank@aiims.edu',
    license: 'AIIMS-BB-001',
    bloodInventory: {
      'A+': 25, 'A-': 8, 'B+': 30, 'B-': 5,
      'AB+': 12, 'AB-': 3, 'O+': 40, 'O-': 10
    },
    operatingHours: {
      open: '24/7',
      close: '24/7'
    },
    facilities: ['Emergency Services', 'Component Separation', 'Blood Testing']
  },
  {
    name: 'Tata Memorial Hospital Blood Bank',
    address: 'Dr. E Borges Road, Parel, Mumbai - 400012',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400012',
    phone: '+91-22-24177000',
    email: 'bloodbank@tmc.gov.in',
    license: 'TMH-BB-002',
    bloodInventory: {
      'A+': 20, 'A-': 6, 'B+': 25, 'B-': 4,
      'AB+': 10, 'AB-': 2, 'O+': 35, 'O-': 8
    },
    operatingHours: {
      open: '08:00',
      close: '20:00'
    },
    facilities: ['Cancer Patient Support', 'Platelet Donation', 'Blood Testing']
  }
];

const sampleRequests = [
  {
    patientName: 'Ravi Gupta',
    bloodGroup: 'O-',
    unitsRequired: 2,
    urgency: 'critical',
    hospital: {
      name: 'Max Hospital',
      address: 'Saket, New Delhi',
      phone: '+91-11-26515050'
    },
    requesterName: 'Dr. Sunita Gupta',
    requesterPhone: '+91-9876543220',
    requesterEmail: 'sunita.gupta@maxhospital.com',
    requiredBy: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    notes: 'Emergency surgery required'
  }
];

async function createUsers() {
  const users = [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@eraktkosh.in',
      password: 'admin123',
      phone: '+91-9999999999',
      role: 'admin',
      isVerified: true
    },
    {
      firstName: 'John',
      lastName: 'Donor',
      email: 'donor@eraktkosh.in',
      password: 'donor123',
      phone: '+91-8888888888',
      role: 'donor',
      isVerified: true,
      profile: {
        bloodGroup: 'O+',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male'
      }
    },
    {
      firstName: 'Hospital',
      lastName: 'Admin',
      email: 'hospital@eraktkosh.in',
      password: 'hospital123',
      phone: '+91-7777777777',
      role: 'hospital',
      isVerified: true
    }
  ];

  const createdUsers = [];
  for (const userData of users) {
    const user = new User(userData);
    await user.save(); // This will trigger the pre-save hook to hash the password
    createdUsers.push(user);
  }
  
  return createdUsers;
}

async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Clear existing data
    await Donor.deleteMany({});
    await BloodBank.deleteMany({});
    await BloodRequest.deleteMany({});
    await User.deleteMany({});
    
    // Insert sample data
    await Donor.insertMany(sampleDonors);
    await BloodBank.insertMany(sampleBloodBanks);
    await BloodRequest.insertMany(sampleRequests);
    
    // Create users with proper password hashing
    const users = await createUsers();
    
    console.log('Database seeded successfully!');
    console.log(`Added ${sampleDonors.length} donors`);
    console.log(`Added ${sampleBloodBanks.length} blood banks`);
    console.log(`Added ${sampleRequests.length} blood requests`);
    console.log(`Added ${users.length} users`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();