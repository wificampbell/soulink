const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URL;

if (!url) {
    throw new Error("MONGODB_URL is missing");
}

const client = new MongoClient(url); 

let db; 

async function connectDb(){
    await client.connect();
    db = client.db("JournalingApp");
    console.log("Connected To MongoDB Atlas!"); 
}

function getDb(){
    if (!db) {
        throw new Error("Database not initialized yet");
    }
    return db;
}

module.exports = {
    connectDb, 
    getDb
};