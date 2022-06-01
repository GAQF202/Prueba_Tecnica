const express = require('express');
const bodyParser = require("body-parser");
const dbManagement = require('./dbFunctions').CreateQuery

app = express()
app.listen(4000)

var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CONEXION A LA DB
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "college"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// API
app.post('/profesores', function(req,res){
    let professor = req.body
    let query = "INSERT INTO Profesores VALUES (null,'"+professor.nombre+"','"+professor.telefono+"','"+professor.correo+"')"
    dbManagement(query)
})
