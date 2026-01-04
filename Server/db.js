const { MongoClient } = require("mongodb");

const url = "mongodb+srv://wificampbell:soulinkpassword@soulinkcluster.ec8cilb.mongodb.net/?appName=soulinkcluster";
const client = new MongoClient(url); 

let db; 

async function connectDb(){
    await client.connect();
    db = client.db("JournalingApp");
    console.log("Connected To MongoDB Atlas!"); 
}

function getDb(){
    return db; 
}

module.exports = {
    connectDb, 
    getDb
};