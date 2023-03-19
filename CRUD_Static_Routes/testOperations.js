// Connecting with a test database and reading the data out of it.

const { MongoClient } = require("mongodb");

// Can also use:
// const mongoClient = require("mongodb").MongoClient;

// Setting the path of database.
url = "mongodb://localhost:27017";

// Creating a new MongoDB client.
const client = new MongoClient(url);

// A function to get data from the mongodb database. Since the function may take time, we are using promise.
async function getDataFromDB() {
  // creating connection with mongoDB, and waiting for the response.
  let result = await client.connect();

  // Using a test database.
  let db = result.db("test");

  // Getting the collection.
  let collection = db.collection("users");

  let data = await collection.find({}).toArray()
  console.log(data);
}

getDataFromDB();
