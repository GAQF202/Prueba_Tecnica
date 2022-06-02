create database college;

use college;
create table Estudiantes(
	id int primary key auto_increment,
    Nombre varchar(30),
    Telefono varchar(8),
    Correo varchar(30)
);

create table Profesores(
	id int primary key auto_increment,
    Nombre varchar(30),
    Telefono varchar(30),
    Correo varchar(30)
);

create table Materias(
	id int primary key auto_increment,
    Nombre_Curso varchar(30),
    Creditos varchar(30),
    Horario varchar(30),
    idProfesor int,
    Fecha_Creacion date,
    foreign key (idProfesor) references Profesores(id)
);

create table Asignacion(
	id int primary key,
    idMateria int not null,
    idEstudiante int not null,
    foreign key (idMateria) references Estudiantes(id),
    foreign key (idEstudiante) references Materias(id)
);

use college;
INSERT INTO Materias VALUES (null,'Gerson Aaron','3232','4:30-5:40','9',NOW());
select * from Profesores;

