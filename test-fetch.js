const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Error: MONGODB_URI is not defined in your .env file!");
  process.exit(1);
}

const clientSchema = new mongoose.Schema({}, { strict: false });
const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

const blogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    const clients = await Client.find({});
    console.log("Clients count:", clients.length);
    console.log("Clients:", JSON.stringify(clients, null, 2));

    const blogs = await Blog.find({});
    console.log("Blogs count:", blogs.length);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
run();
