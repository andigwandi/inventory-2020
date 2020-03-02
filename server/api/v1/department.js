var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var async = require("async");

app.use(bodyParser.json());

module.exports = app;

// Creates  Database
var departmentDB = new Datastore({
  filename: "./server/databases/department.db",
  autoload: true
});

// GET department
app.get("/", function (req, res) {
  res.send("department API");
});

// GET a department from department by _id
app.get("/department/:departmentId", function (req, res) {
  if (!req.params.departmentId) {
    res.status(500).send("ID field is required.");
  } else {
    departmentDB.findOne({
      _id: req.params.departmentId
    }, function (err, department) {
      res.send(department);
    });
  }
});

// GET all department departments
app.get("/departments", function (req, res) {
  departmentDB.find({}, function (err, docs) {
    console.log("sending all departments");
    res.send(docs);
  });
});

// GET all department departments
app.get("/departments/active", function (req, res) {
  departmentDB.find({active: {true} }, function (err, docs) {
    console.log("sending all departments");
    res.send(docs);
  });
});



// post department department
app.post("/department", function (req, res) {
  var newdepartment = req.body;

  departmentDB.insert(newdepartment, function (err, department) {
    if (err) res.status(500).send(err);
    else res.send(department);
  });
});

//delete department using department id
app.delete("/department/:departmentId", function (req, res) {
  departmentDB.remove({
    _id: req.params.departmentId
  }, function (err, numRemoved) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Updates department department
app.put("/department", function (req, res) {
  var departmentId = req.body._id;

  departmentDB.update({
    _id: departmentId
  }, req.body, {}, function (
    err,
    numReplaced,
    department
  ) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// post department department
app.post("/department", function (req, res) {
  var newdepartment = req.body;

  departmentDB.insert(newdepartment, function (err, department) {
    if (err) res.status(500).send(err);
    else res.send(department);
  });
});