const { dbConnection, client } = require("./connection");



// Reading the data in the database (CRUD- R).
const readData = async () => {
  // Getting the database connection object (a connection to a database).
  const usersCollection = await dbConnection();

  // Searching the data in the database.
  let data = await usersCollection.find({}).toArray();

  // Printing the data.
  console.log(data);

  // Closing the database connection.
  await client.close();
};






// Inserting the data in the database (CRUD- C).
const writeData = async () => {
  // Getting the database connection object (a connection to a database).
  const usersCollection = await dbConnection();

  // Defining data object to write in the database.
  const data = {
    Name: "Sushant",
    Company: "PwC",
    Location: "Kolkata",
    Phone: 1234567890,
  };

  // Inserting the data in the database.
  const insertedResult = usersCollection.insertOne(data);

  // Checking if the data is correctly inserted or not.
  if ((await insertedResult).acknowledged) {
    await readData();
  } else {
    console.log("Data not inserted.");

    // Closing the database connection
    await client.close();
  }
};





// Updating the data in the database (CRUD- U).
const updateData = async () => {
  // Getting the database connection object (a connection to a database).
  const usersCollection = await dbConnection();

  // Updating the data in the database.
  let updatedResult = await usersCollection.updateOne(
    { Location: "Bhopal" },
    { $set: { Location: "Kolkata" } }
  );

  // Checking if the data is correctly updated or not.
  if (updatedResult.acknowledged) {
    await readData();
  } else {
    console.log("Data not updated.");

    // Closing the database connection.
    await client.close(); 
  }
};





// Deleting the data in the database (CRUD- D).
const deleteData = async () => {
  // Getting the database connection object (a connection to a database).
  const usersCollection = await dbConnection();

  // Deleting the data in the database.
  let deletedResult = await usersCollection.deleteOne({ Company: "PwC" });

  // Checking if the data is correctly deleted or not.
  if ((await deletedResult).acknowledged) {
    await readData();
  } else {
    console.log("Data not deleted.");
    // If the data is not deleted then we can use "deletedCount".
    // If its value comes out to be 0 then no record is deleted.

    // Closing the database connection
    await client.close(); 
  }
};


// Calling Functions.
// readData();
// deleteData();
// writeData();
// updateData();
deleteData();
