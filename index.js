const express = require('express');
const bodyParser = require("body-parser");
const dbManagement = require('./dbFunctions').CreateQuery
const searchProfessor = require('./dbFunctions').searchProfessor

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

// CRUD DE PROFESORES
// CREACION
app.post('/profesores', function(req,res){
    let professor = req.body
    let query = "INSERT INTO Profesores VALUES (null,'"+professor.nombre+"','"+professor.telefono+"','"+professor.correo+"')"
    dbManagement(query)
})
// CONSULTA
app.get('/profesores', function(req,res){
  con.query("SELECT * FROM Profesores", function (err, result) {
    if (err) throw err;
    res.status(200).json({result});
  });
})
// MODIFICACION
app.put('/profesores/:id', function(req,res){
  // OBTENGO LOS PARAMETROS ENVIADOS POR LA URL
  let idProfessor = req.params.id 
  let newDates = req.body
  let query = ""
  let modifies = []
  let modify = ""
  if(newDates.nombre != ""){modifies.push(" Nombre='"+newDates.nombre+"'")}
  if(newDates.telefono != ""){modifies.push(" Telefono = '"+newDates.telefono+"'")}
  if(newDates.correo != ""){modifies.push(" Correo = '"+newDates.correo+"' ")}
  modifies.forEach((element,index) => {
    if(index!=modifies.length-1){
      modify += element + ","
    }else{ 
      modify += element
    }
  });
  query = "UPDATE Profesores SET "+modify+" WHERE id = "+idProfessor;
  con.query(query, function (err, result) {
    if (err) throw err;
    if (result.affectedRows == 0){
      res.status(200).json({isUpdated:0});
    }else{
      res.status(200).json({isUpdated:1});
    }
  });
})
//ELIMINACION
app.delete('/profesores/:id', function(req,res){
  // OBTENGO LOS PARAMETROS ENVIADOS POR LA URL
  let idProfessor = req.params.id 

  var query = "DELETE FROM Profesores WHERE id = " + idProfessor;
  con.query(query, function (err, result) {
    if (err) throw err;

    if (result.affectedRows == 0){
      res.status(200).json({isDeleted:0});
    }else{
      res.status(200).json({isDeleted:1});
    }
  });
})

// CRUD DE CURSOS
// CREACION
app.post('/cursos', function(req,res){
  let course = req.body
  con.query("SELECT * FROM Profesores WHERE id = "+course.idProfesor, function (err, result) {
    if (err) throw err;
    if(result.length != 0){
      let query = "INSERT INTO Materias VALUES (null,'"+course.nombre+"','"+course.creditos+"','"+course.horario+"',"+course.idProfesor+",NOW())"
      dbManagement(query)
      res.status(200).json({isCreated:1});
    }else{
      res.status(200).json({isCreated:0});
    }
  });
})
// MODIFICACION
app.put('/cursos/:id', function(req,res){
  // OBTENGO LOS PARAMETROS ENVIADOS POR LA URL
  let idProfessor = req.params.id 
  let newDates = req.body
  let query = ""
  let modifies = []
  let modify = ""
  if(newDates.nombre != ""){modifies.push(" Nombre_Curso='"+newDates.nombre+"'")}
  if(newDates.telefono != ""){modifies.push(" Creditos = '"+newDates.creditos+"'")}
  if(newDates.correo != ""){modifies.push(" Horario = '"+newDates.horario+"' ")}
  if(newDates.correo != ""){modifies.push(" idProfesor = '"+newDates.idProfesor+"' ")}
  modifies.forEach((element,index) => {
    if(index!=modifies.length-1){
      modify += element + ","
    }else{ 
      modify += element
    }
  });
  query = "UPDATE Materias SET "+modify+" WHERE id = "+idProfessor;
  con.query(query, function (err, result) {
    if (err) throw err;
    if (result.affectedRows == 0){
      res.status(200).json({isUpdated:0});
    }else{
      res.status(200).json({isUpdated:1});
    }
  });
})
//ELIMINACION
app.delete('/cursos/:id', function(req,res){
  // OBTENGO LOS PARAMETROS ENVIADOS POR LA URL
  let idProfessor = req.params.id 

  var query = "DELETE FROM Materias WHERE id = " + idProfessor;
  con.query(query, function (err, result) {
    if (err) throw err;

    if (result.affectedRows == 0){
      res.status(200).json({isDeleted:0});
    }else{
      res.status(200).json({isDeleted:1});
    }
  });
})
// CONSULTA
app.get('/cursos', function(req,res){
  con.query("SELECT * FROM Materias", function (err, result) {
    if (err) throw err;
    res.status(200).json({result});
  });
})

// CRUD DE ESTUDIANTES
// CREACION
app.post('/estudiantes', function(req,res){
  let student = req.body
  let query = "INSERT INTO Estudiantes VALUES (null,'"+student.nombre+"','"+student.telefono+"','"+student.correo+"')"
  dbManagement(query)
})
// CONSULTA
app.get('/estudiantes', function(req,res){
  con.query("SELECT * FROM Estudiantes", function (err, result) {
    if (err) throw err;
    res.status(200).json({result});
  });
})
// MODIFICACION
app.put('/estudiantes/:id', function(req,res){
  // OBTENGO LOS PARAMETROS ENVIADOS POR LA URL
  let idProfessor = req.params.id 
  let newDates = req.body
  let query = ""
  let modifies = []
  let modify = ""
  if(newDates.nombre != ""){modifies.push(" Nombre='"+newDates.nombre+"'")}
  if(newDates.telefono != ""){modifies.push(" Telefono = '"+newDates.telefono+"'")}
  if(newDates.correo != ""){modifies.push(" Correo = '"+newDates.correo+"' ")}
  modifies.forEach((element,index) => {
    if(index!=modifies.length-1){
      modify += element + ","
    }else{ 
      modify += element
    }
  });
  query = "UPDATE Estudiantes SET "+modify+" WHERE id = "+idProfessor;
  con.query(query, function (err, result) {
    if (err) throw err;
    if (result.affectedRows == 0){
      res.status(200).json({isUpdated:0});
    }else{
      res.status(200).json({isUpdated:1});
    }
  });
})
//ELIMINACION
app.delete('/estudiantes/:id', function(req,res){
  // OBTENGO LOS PARAMETROS ENVIADOS POR LA URL
  let idProfessor = req.params.id 

  var query = "DELETE FROM Estudiantes WHERE id = " + idProfessor;
  con.query(query, function (err, result) {
    if (err) throw err;

    if (result.affectedRows == 0){
      res.status(200).json({isDeleted:0});
    }else{
      res.status(200).json({isDeleted:1});
    }
  });
})

// ASIGNACION DE CURSOS Y CONSULTA
// ASIGNACION
app.post('/asignacion/:idEstudiante/:idMateria', function(req,res){
  let assign = req.body
  
  con.query("SELECT * FROM Estudiantes WHERE id = "+assign.idEstudiante, function (err, result) {
    if (err) throw err;
    if(result.length != 0){
      con.query("SELECT * FROM Materias WHERE id = "+assign.idCurso, function (err, result) {
        if (err) throw err;
        if(result.length != 0){
          let query = "INSERT INTO Asignacion VALUES (null,'"+assign.idCurso+"','"+assign.idEstudiante+"')"
          dbManagement(query)
          res.status(200).json({isAssigned:1});
        }else{  
         res.status(200).json({isAssigned:0});
        }
      });
    }else{  
      res.status(200).json({isAssigned:0});
     }
  });
})