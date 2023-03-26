const express = require("express");
const connection = require("./connection");

const app = express();
app.use(express.json());


// CRUD - READ
app.get("/", (req, resp) => {
  connection.query("SELECT * FROM testing_1", (err, result) => {
    if (err) {
      resp.send("Unable to get data.");
    } else {
      resp.send(result);
    }
  });
});




// CRUD - CREATE
app.post("/insert", (req, resp) => {
  let data = req.body;
  connection.query("INSERT INTO testing_1 SET ?", data, (err, result) => {
    if (err) {
      resp.send("Unable to insert the data.");
    } else {
      resp.send(result);
    }
  });
});




// CRUD - UPDATE
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




// CRUD - DELETE
app.delete("/delete/:id", (req, resp) => {
  let data = [req.params.id];
  connection.query(
    "DELETE FROM testing_1 WHERE roll = ?",
    data,
    (err, result) => {
      if (err) {
        resp.send("Unable to delete the data.");
      } else {
        resp.send(result);
      }
    }
  );
});



app.listen(5000);
