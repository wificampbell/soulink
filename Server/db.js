require('dotenv').config(); // Make sure dotenv is loaded at the top

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // MongoDB URI from .env
const dbName = process.env.MONGODB_DB; // Database name from .env
const client = new MongoClient(uri);

let db;

async function connectDb() {
  await client.connect();
  db = client.db(dbName);  
  console.log("Connected to MongoDB!");
}

function getDb() {
  return db;
}

module.exports = {
  connectDb,
  getDb
};