export const mockDonors = [
  { _id: '1', firstName: 'Rajesh', lastName: 'Kumar', bloodGroup: 'O+', city: 'New Delhi', lastDonation: '2023-12-15' },
  { _id: '2', firstName: 'Priya', lastName: 'Sharma', bloodGroup: 'A+', city: 'Mumbai', lastDonation: '2024-01-20' },
  { _id: '3', firstName: 'Amit', lastName: 'Patel', bloodGroup: 'B+', city: 'Bangalore', lastDonation: '2023-11-10' },
  { _id: '4', firstName: 'Anjali', lastName: 'Singh', bloodGroup: 'AB-', city: 'Hyderabad', lastDonation: '2024-02-05' },
];

export const mockBloodBanks = [
  {
    _id: '1',
    name: 'AIIMS Blood Bank',
    address: 'Ansari Nagar, New Delhi',
    city: 'New Delhi',
    phone: '+91-11-26588500',
    bloodInventory: { 'A+': 25, 'A-': 8, 'B+': 30, 'B-': 5, 'AB+': 12, 'AB-': 3, 'O+': 40, 'O-': 10 }
  },
  {
    _id: '2',
    name: 'Tata Memorial Hospital',
    address: 'Parel, Mumbai',
    city: 'Mumbai',
    phone: '+91-22-24177000',
    bloodInventory: { 'A+': 20, 'A-': 6, 'B+': 25, 'B-': 4, 'AB+': 10, 'AB-': 2, 'O+': 35, 'O-': 8 }
  }
];

export const mockRequests = [
  {
    _id: '1',
    patientName: 'Ravi Gupta',
    bloodGroup: 'O-',
    unitsRequired: 2,
    urgency: 'critical',
    hospital: { name: 'Max Hospital', address: 'Saket, New Delhi' },
    status: 'pending'
  }
];

export const mockUser = {
  firstName: 'Demo',
  lastName: 'User',
  email: 'admin@eraktkosh.in',
  role: 'admin'
};
