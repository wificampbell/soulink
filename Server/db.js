const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; 
const client = new MongoClient(url); 

let db; 

async function connectDb(){
    await client.connect();
    db = client.db("JournalingApp");
    console.log("Connected!"); 
}

function getDb(){
    return db; 
}

module.exports = {
    connectDb, 
    getDb
};