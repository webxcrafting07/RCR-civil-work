const mongoose = require('mongoose');

const uri = "mongodb://webxcrafting_db_user:QWC3YgfSI6ymU9jS@ac-1kng6nb-shard-00-00.2q58fzs.mongodb.net:27017,ac-1kng6nb-shard-00-01.2q58fzs.mongodb.net:27017,ac-1kng6nb-shard-00-02.2q58fzs.mongodb.net:27017/rcr-enterprises?ssl=true&replicaSet=atlas-11wbp6-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
}

run();
