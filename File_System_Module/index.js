const fs = require("fs");
const http = require("http");

/*
// readingFile() function.
fs.readFile("data.txt", "utf8", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
*/





/*
// open() function.
fs.open("data.txt", "r", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});
*/





/*
// writeFile() function.
const dataToWrite = "Writing the data using the writeFile() function.";
fs.writeFile("data.txt", dataToWrite, (error) => {
  if (error) {
    console.log(error);
  } else {
    // reading the newly written data.
    console.log(fs.readFileSync("data.txt", "utf8"));
  }
});
*/





/*
// unlink() function.
fs.unlink("data.txt", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("File deleted successfully!");
  }
});
*/





/*
// appendFile() function
appendedData = " I am appending the data using the appendFile() function.";
fs.appendFile("data.txt", appendedData, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(fs.readFileSync("data.txt", "utf8"));
  }
});
*/





// Creating a server and writing the content of file.
http.createServer((req, res) => {
    fs.readFile("data.html", (error, data) => {
      if (error) {
        console.log(error);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Problem in opening the html file");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
}).listen(5000);
