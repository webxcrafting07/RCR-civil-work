const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGODB_URI;
console.log('Testing connection to:', uri.split('@')[1] || uri); // Don't log password

async function testConnection() {
  try {
    console.log('Connecting...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ BACKEND IS CONNECTED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ BACKEND IS NOT CONNECTED.');
    console.error('Error details:', err.message);
    process.exit(1);
  }
}

testConnection();
