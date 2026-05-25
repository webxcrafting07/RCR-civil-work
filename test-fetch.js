const mongoose = require('mongoose');

const uri = "mongodb://webxcrafting_db_user:QWC3YgfSI6ymU9jS@ac-1kng6nb-shard-00-00.2q58fzs.mongodb.net:27017,ac-1kng6nb-shard-00-01.2q58fzs.mongodb.net:27017,ac-1kng6nb-shard-00-02.2q58fzs.mongodb.net:27017/rcr-enterprises?ssl=true&replicaSet=atlas-11wbp6-shard-0&authSource=admin&retryWrites=true&w=majority";

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
