const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eraktkosh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testUsers() {
  try {
    console.log('Testing users in database...');
    
    const users = await User.find({});
    console.log(`Found ${users.length} users:`);
    
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Password Hash: ${user.password.substring(0, 20)}...`);
    });
    
    // Test admin user specifically
    const adminUser = await User.findOne({ email: 'admin@eraktkosh.in' });
    if (adminUser) {
      console.log('\n✅ Admin user found:');
      console.log(`Email: ${adminUser.email}`);
      console.log(`Role: ${adminUser.role}`);
      console.log(`Verified: ${adminUser.isVerified}`);
      
      // Test password comparison
      const isPasswordValid = await adminUser.comparePassword('admin123');
      console.log(`Password test: ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);
    } else {
      console.log('❌ Admin user not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing users:', error);
    process.exit(1);
  }
}

testUsers();