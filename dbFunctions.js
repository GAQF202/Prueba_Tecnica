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

function CreateQuery(query){
    //let query = "INSERT INTO Profesores VALUES (null, 'Juanito', '58983060', 'juanito303@gmail.com')"
    con.query(query,function(err,result){
        if (err) throw err
        console.log("Insert is successfully")
    })
}

module.exports.CreateQuery = CreateQuery