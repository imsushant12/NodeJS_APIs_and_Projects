const mongoose = require("mongoose");

// Creating Schema to store details of users
const PeopleSchema = new mongoose.Schema({
  name: String,
  email: String,
  userName: { type: String, unique: true },
  password: String,
  phoneNumber: Number,
});


// Exporting the model.
module.exports = mongoose.model("users", PeopleSchema);
