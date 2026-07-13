console.log("hello hell");

//import http module
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.url === "/") {
    res.end("<h1>Home</h1>");
    return;
  }
  if (req.url === "/about") {
    res.end("about");
    return;
  }
  res.end("hello hell!!!");
});

server.listen(3000, () => {
  console.log("'Server listening on port 3000'");
});
