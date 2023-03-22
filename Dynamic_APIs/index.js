const express = require("express");
const dbConnection = require("./connection");



// Creating an instance of express application.
const app = express();
app.use(express.json());



// Defining the port of the server.
const port = 5000;




// READ
app.get("/", async (req, res) => {
  // Creating a connection with the database.
  let connection = await dbConnection();
  let data = await connection.find().toArray();

  // sending response from server to client.
  res.send(data);
});




// CREATE
app.post("/", async (req, res) => {
  // Creating a connection with the database.
  let connection = await dbConnection();

  // Getting the data from client.
  let data = await req.body;

  // Inserting the data into the database.
  let result = await connection.insertOne(data);

  // Sending the response to the client after inserting.
  res.send(result);
});




// UPDATE
app.put("/:name", async (req, res) => {
  // Creating a connection with the database.
  const connection = await dbConnection();

  // Getting the new data to be updated.
  let dataToBeUpdated = req.params.name;
  let newData = req.body;

  // Updating the data in the database.
  let result = await connection.updateOne(
    { name: dataToBeUpdated },
    { $set: newData }
  );

  // Sending the response to the client after updating.
  res.send(result);
});




// DELETE
app.delete("/:name", async (req, res) => {
  // Creating a connection with the database.
  const connection = await dbConnection();

  // Deleting the data in the database.
  let result = await connection.deleteOne({name:req.params.name});

  // Sending the response to the client after deleting.
  res.send(result);
});




// Starting the server
app.listen(port);
