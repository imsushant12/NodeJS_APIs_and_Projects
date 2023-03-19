# NodeJS Notes

### Creating static APIs or Routes with Mongo.
#### To create static routes, we need to follow these steps:
1. Set the ``URL`` of the database. 
    Example: 
    ```js
    url = "mongodb://localhost:27017";
    ```

2. Create a new instance of Mongo (or create a client) by setting the ``URL``.
    ```js
    const client = new MongoClient(url);
    ```

3. Create a connection using the ``connect()`` function as:
    ```js
    const connection = await client.connect();
    ```

4. Set the database name and collection name as:
    ```js
    const db = connection.db("test");
    return db.collection("users");
    ```

5. Now we can create functions like:
    ```js
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
    ```

---
#### To create dynamic APIs, we need to follow these steps:
- We need to follow the same above $4$ steps.
5. Create an instance of express app and set express to use ``JSON`` as:
    ```node
    const app = express();
    app.use(express.json());
    ```

6. Use ``get``, ``post``, ``put``, and ``delete`` routes to read, create, update, and delete documents from database.       
    Example:
    ```js
    // READ
    app.get("/", async (req, res) => {
    // Creating a connection with the database.
    let connection = await dbConnection();
    let data = await connection.find().toArray();

    // sending response from server to client.
    res.send(data);
    });
    // ------------------------------------------
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
    ```

--- 
### Mongoose

#### Mongoose is an object modelling tool of MongoDB which works in asynchronous environment. It supports both callbacks and promises. It basically connects NodeJS with MongoDB.

#### Benefits of Mongoose package over Mongo package
- We can deal with model and schema using Mongoose.
- We can define type of data for a document in Mongoose.
- We can make validations in Mongoose.
- We can control fields in Mongoose.

--- 
#### Creating static APIs or Routes with Mongoose.
1. Connect with mongodb using ``connect()`` function and pass the mongodb URL in it.

2. Create s Schema using function ``Schema()``.
    Example:
    ```js
    const PeopleSchema = new mongoose.Schema({
        name: String,
        phoneNumber: Number,
    });
    ```

3. Create a **model** out of the Schema. Then save the data into the model and save the model into the database.
    Example:
    ```js
    // Creating a model.
    const PeopleModel = mongoose.model("collection-name", PeopleSchema);

    // Creating data to be entered.
    let data = {
        name: "abcd",
        phoneNumber: 1234567890,
    };

    // Adding the data into the instance of model.
    let dataModel = new PeopleModel(data);
    // Adding the data model into the database.
    await dataModel.save();
    ```
---
#### Creating dynamic APIs or Routes with Mongoose.
- The first two steps are same.
- For crud operations, use functions with model. 
    Example:
    ```js
    // Updating (Example)
    let oldData = { name: "vivek Kumar" };
    let newData = { name: "Vivek Kumar" };

    await PersonModel.updateOne(oldData, { $set: newData });
    ```
---
#### Searching in the database using regular expression.
Example:
```js
app.get("/search/:key", async (req, resp) => {
    let result = await PeopleModel.find(
        {
            "$or": [
                { name: { $regex: req.params.key } }
            ]
        }
    )
    // Sending back the response.
    resp.send(result);
});
```
---
#### Multer package can be used to upload files. We can even upload file directly using NodeJS.
---
#### OS module important functions:
1. ``os.arch()`` - Returns the architecture of the OS. Example: ``x64``.
2. ``os.freemem()`` - Returns the free memory of RAM (in bytes).
3. ``os.totalmem`` -  Returns the total memory of RAM.
4. ``os.hostname()`` - Returns the hostname of the user.
5. ``os.platform()`` - Returns the name of OS.
6. ``os.userInfo()`` - Returns the information of the system user.

---
#### Events and Event Emitter in NodeJS
- We use an in-built library ``events``. We import a class i.e. ``EventEmitter`` from it as:
    ```js
    const EventEmitter = require("events");
    ```

A use case of this can be counting the number of times an our APIs are called.
Example:
```js
// Creating an object of EventEmitter class.
const events = new EventEmitter();

let count = 0;

// Creating a function that will be called whenever an API will be called.
event.on("", ("APIcounter") => {
    count += 1;
    console.log("Total API hits = ", count);
});

// A dummy route/ API.
app.get("/", (req, resp) => {
    resp.send("API was called.");
    // generating an event.
    event.emit("APIcounter");
});
```
---
#### MySQL package
- To establish connection:
    ```js
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
    });
    ```

- To check if we are connected with the database or not.
    ```js
    connection.connect((err) => {
        if(error) {
            console.log("Not connected");
        } else {
            console.log("Connected");
        }
    });
    ```

- To write any query.
    ```js
    connection.query("SELECT * FROM users", (err, result) => {
        if(error) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    ```
---
#### Creating APIs with MySQL database in NodeJS.
```js
// READ
connection.query("SELECT * FROM testing_1", (err, result) => {
    resp.send(result);
});
// INSERT
let data = req.body;
connection.query("INSERT INTO testing_1 SET ?", data, (err, result) => {
    resp.send(result);
});
// UPDATE
let data = [req.body.name, req.params.id];
connection.query("UPDATE testing_1 SET name = ? WHERE roll = ?", data, (err, result) => {
    resp.send(result);
});
// DELETE
let data = [req.params.id];
connection.query("DELETE FROM testing_1 WHERE roll = ?",
    data, (err, result) => {
    resp.send(result);
});
```

Example:
```js
app.put("/update/:id", (req, resp) => {
  let data = [req.body.name, req.params.id];
  connection.query(
    "UPDATE testing_1 SET name = ? WHERE roll = ?",
    data,
    (err, result) => {
      if (err) {
        resp.send("Unable to update the data.");
      } else {
        resp.send(result);
      }
    }
  );
}); 
```