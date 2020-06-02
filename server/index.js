var express = require("express"),
  http = require("http"),
  app = require("express")(),
  server = http.createServer(app),
  socketIo = require("socket.io"),
  bodyParser = require("body-parser");

const PORT = process.env.PORT || 8001;
const io = socketIo(server);
console.log("Server started");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", function(req, res) {
  res.send(" Inventory web app running.");
});

app.use("inventory", require("./inventory"));
app.use("department", require("./department"));


io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
    return console.log(` Listening on PORT ${PORT}`);
});
