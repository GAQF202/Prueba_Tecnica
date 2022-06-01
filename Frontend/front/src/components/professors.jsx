import React, { useEffect, useState,/* setState */} from "react";


function Professor(){

    const [datos, setDatos] = useState({
        nombre: '',
        telefono: '',
        correo: ''
    })  

    const [id, setId] = useState({
        id: ''
    })

    const [mod, setMod] = useState({

    })

    const createProfessor = (event)=>{
        console.log("entraaa")
        event.preventDefault()
        fetch('http://localhost:4000/profesores',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                "nombre" : datos.nombre,
                "telefono" : datos.telefono,
                "correo" : datos.correo
            })
        })
    }

    const handleInputChange = (event)=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    return(
        <div>
            
            <div className="div-insert-professor">
                <form className="form-professor" onSubmit={createProfessor}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="nombre" placeholder="" onChange={handleInputChange}/>
                    <label htmlFor="">Numero telefónico</label>
                    <input type="number" name="telefono" placeholder="" onChange={handleInputChange} />
                    <label htmlFor="">Correo electrónico</label>
                    <input type="email" name="correo" placeholder="" onChange={handleInputChange} />

                    <button type="submit">Registrar profesor</button>
                </form>
            </div>

        </div>
    )
}

export default Professor;