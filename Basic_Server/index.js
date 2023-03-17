const http = require("http");
const body = require("./data.js");

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(body));
    response.end();
  }).listen(5000);
