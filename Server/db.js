require('dotenv').config(); // Make sure dotenv is loaded at the top

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // MongoDB URI from .env
const dbName = process.env.MONGODB_DB; // Database name from .env
const client = new MongoClient(uri);

let db;

async function connectDb() {
  try {
    // Setting up connection with TLS options
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,  // Ensure SSL is enabled
      sslValidate: true,  // Enforce SSL validation
      tlsAllowInvalidCertificates: false,  // Do not allow invalid certificates
      tlsAllowInvalidHostnames: false, // Do not allow invalid hostnames
    });

    console.log("MongoDB Connected Successfully");
    const db = client.db(process.env.MONGODB_DB); // Ensure you have the correct DB name here
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

function getDb() {
  return db;
}

module.exports = {
  connectDb,
  getDb
};