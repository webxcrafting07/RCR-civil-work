import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Testing connection to MongoDB...');
console.log('URI starts with:', uri.substring(0, 25) + '...');

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect:', err.message);
    process.exit(1);
  });
