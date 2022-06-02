import React, { useEffect, useState,/* setState */} from "react";
import '../App.css';

function Courses(){

    const [datos, setDatos] = useState({
        nombre: '',
        creditos: '',
        horario: '',
        idProfesor: ''
    })  

    const [id, setId] = useState({
        id: ''
    })

    const [mod, setMod] = useState({
        id: '',
        nombre: '',
        creditos: '',
        horario: '',
        idProfesor: ''
    })

    const [professors, setProfessors] = useState([])

    const [sCreate,setsCreate] = useState(false)
    const [sUpdate,setsUpdate] = useState(false)
    const [sDelete,setsDelete] = useState(false)
    const [sConsult,setsConsult] = useState(false)

    function showWhat(action){
        if(action == 1){
            setsCreate(true);setsUpdate(false);setsDelete(false);setsConsult(false)
        }else if(action == 2){
            setsCreate(false);setsUpdate(true);setsDelete(false);setsConsult(false)
        }else if(action == 3){
            setsCreate(false);setsUpdate(false);setsDelete(true);setsConsult(false)
        }else if(action == 4){
            setsCreate(false);setsUpdate(false);setsDelete(false);setsConsult(true)
        }
        
        //console.log(sCreate,sUpdate,sDelete)
    }

    useEffect(()=>{
        fetch("http://localhost:4000/cursos",{method:"GET"})
        .then((data)=>data.json())
        .then((json)=>{setProfessors(json)})
    },[professors])

    // METODO POST
    const createProfessor = (event)=>{
        console.log("entraaa")
        event.preventDefault()
        fetch('http://localhost:4000/cursos',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                "nombre" : datos.nombre,
                "creditos" : datos.creditos,
                "horario" : datos.horario,
                "idProfesor" : datos.idProfesor
            })
        })
    }
    // METODO DELETE
    const deleteProfessor = (event)=>{
        event.preventDefault()
        fetch('http://localhost:4000/cursos/'+id.id,{method: 'DELETE'})
        .then((data)=>data.json())
        .then((json)=>{
            console.log(json.isDeleted)
            if (json.isDeleted == 0){
                alert("Error: el curso con el id indicado no existe")
            }else{
                alert("Curso eliminado correctamente")
            }
        })
    }
    // METODO PUT
    const updateProfessor = (event)=>{
        event.preventDefault()
        fetch('http://localhost:4000/cursos/'+mod.id,{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                "nombre" : mod.nombre,
                "creditos" : mod.creditos,
                "horario"  : mod.horario,
                "idProfesor" : mod.idProfesor
            })
        })
        .then((data)=>data.json())
        .then((json)=>{
            console.log(json.isUpdated)
            if (json.isUpdated == 0){
                alert("Error: el curso con el id indicado no existe")
            }else{
                alert("Datos del curso actualizados correctamente")
            }
        })
    }
    // MODIFICAR DATOS DE CREACION
    const handleInputChange = (event)=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    // MODIFICAR DATOS DE ELIMINACION
    const handleInputChange1 = (event)=>{
        setId({
            ...id,
            [event.target.name] : event.target.value
        })
    }
    // MODIFICAR DATOS DE ACTUALIZACION
    const handleInputChange3 = (event)=>{
        setMod({
            ...mod,
            [event.target.name] : event.target.value
        })
    }

    return(
        <div>
            <div className="div-principal">
                <button className="button-menu" onClick={()=>showWhat(1)}>Registrar Curso</button>
                <button className="button-menu" onClick={()=>showWhat(2)}>Modificar Datos de Curso</button>
                <button className="button-menu" onClick={()=>showWhat(3)}>Eliminar Curso</button>
                <button className="button-menu" onClick={()=>showWhat(4)}>Ver Registros</button>
                <div className="div-insert-professor">
                    <form className="form-create-professor" onSubmit={createProfessor} style={{display:sCreate?'block':'none'}}>
                        <label htmlFor="">Nombre del curso</label><br />
                        <input className="field" type="text" name="nombre" placeholder="" onChange={handleInputChange}/><br />
                        <label htmlFor="">Créditos</label><br />
                        <input className="field" type="number" name="creditos" placeholder="" onChange={handleInputChange} /><br />
                        <label htmlFor="">Horario</label><br />
                        <input className="field" type="text" name="horario" placeholder="" onChange={handleInputChange} /><br />
                        <label htmlFor="">Id del Profesor</label><br />
                        <input className="field" type="number" name="idProfesor" placeholder="" onChange={handleInputChange} /><br />

                        <button type="submit" className="button-send">Registrar profesor</button>
                    </form>


                    <form className="form-delete-professor" onSubmit={deleteProfessor} style={{display:sDelete?'block':'none'}}>
                        <label htmlFor="">Id del Curso</label><br />
                        <input className="field" type="number" name="id" placeholder="" onChange={handleInputChange1}/><br />

                        <button type="submit" className="button-send">Eliminar Curso</button>
                    </form>


                    <form className="form-update-professor" onSubmit={updateProfessor} style={{display:sUpdate?'block':'none'}}>
                        <label htmlFor="">Id del Curso</label><br />
                        <input className="field" type="number" name="id" placeholder="" onChange={handleInputChange3}/><br />
                        <label htmlFor="">Nombre del curso</label><br />
                        <input className="field" type="text" name="nombre" placeholder="" onChange={handleInputChange3}/><br />
                        <label htmlFor="">Creditos</label><br />
                        <input className="field" type="number" name="creditos" placeholder="" onChange={handleInputChange3} /><br />
                        <label htmlFor="">Horario</label><br />
                        <input className="field" type="text" name="horario" placeholder="" onChange={handleInputChange3} /><br />
                        <label htmlFor="">Id del Profesor</label><br />
                        <input className="field" type="number" name="idProfesor" placeholder="" onChange={handleInputChange3} /><br />

                        <button type="submit" className="button-send">Actualizar datos de Curso</button>
                    </form>
                    <div className="div-results" style={{display:sConsult?'block':'none'}}>
                        <table className="div-registers" style={{display:sConsult?'block':'none'}}>
                            <tr>
                                <th>id</th>
                                <th>Curso</th>
                                <th>Creditos</th>
                                <th>Horario</th>
                                <th>id Profesor</th>
                                <th>Fecha de Creación</th>
                            </tr>
                            {
                                professors?.result?.map(elem=>(
                                    <tr>
                                        <td>{elem.id}</td>
                                        <td>{elem.Nombre_Curso}</td>
                                        <td>{elem.Creditos}</td>
                                        <td>{elem.Horario}</td>
                                        <td>{elem.idProfesor}</td>
                                        <td>{elem.Fecha_Creacion}</td>
                                    </tr>
                                ))
                            }   
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Courses;