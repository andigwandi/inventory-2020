var express = require("express"),
  http = require("http"),
  app = require("express")(),
  server = http.createServer(app),
  bodyParser = require("body-parser");

const PORT = process.env.PORT || 8001;

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

app.use("/api/v1/inventory", require("./api/v1/inventory"));
app.use("/api/v1/department", require("./api/v1/department"));


server.listen(PORT, () => {
    return console.log(` Listening on PORT ${PORT}`);
});
