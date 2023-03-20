const { json } = require("express");
const express = require("express");

// Getting the models, schema, and configurations.
require("./configuration");
const PeopleModel = require("./ModelsAndSchemas");


// Initializing an express app.
const app = express();
app.use(express.json());



// POST (Adding data into the database).
app.post("/create", async (req, resp) => {
  // Getting the data entered by user.
  let data = req.body;
  // Adding the data into the model.
  let dataModel = new PeopleModel(data);
  // Saving the model into the database.
  let result = await dataModel.save();
  // Sending response back after inserting.
  resp.send(result);
});



// GET (Reading data from the database).
app.get("/read", async (req, resp) => {
  // Reading the data from database using model.
  let result = await PeopleModel.find();
  // Sending response back after inserting.
  resp.send(result);
});



// PUT (Updating data into the database).
app.put("/update/:name", async (req, resp) => {
  // Getting the new name.
  let newData = req.body;
  // Updating the data.
  let result = await PeopleModel.updateOne(req.params, {$set:newData});
  // Sending response back after inserting.
  resp.send(result);
});



// DELETE (Deleting the data from the database).
app.delete("/delete/:name", async (req, resp) => {
  // Deleting the data
  let result = await PeopleModel.deleteOne(req.params);
  // Sending response back after inserting.
  if (result.deletedCount == 1) {
    resp.send("Deleted the record.");
  } else {
    resp.send("Could not delete the record.");
  }
});



// Starting the server.
app.listen(5000);
