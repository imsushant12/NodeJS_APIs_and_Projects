const { MongoClient } = require("mongodb");

// Setting the path of database.
url = "mongodb://localhost:27017";

// Creating a new MongoDB client.
const client = new MongoClient(url);

// A function to get data from the mongodb database. Since the function may take time, we are using promise.
async function dbConnection() {
  // creating connection with mongoDB, and waiting for the response.
  const connection = await client.connect();

  // Using a CRUD_Routes_Users_NodeJS database.
  const db = connection.db("test");

  // Getting the collection.
  return db.collection("users");
}

module.exports = dbConnection;
