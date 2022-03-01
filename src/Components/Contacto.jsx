import { useState } from 'react'
import styled from 'styled-components'
import db from '../firebase/firebaseConfig'
import { doc, setDoc, deleteDoc} from 'firebase/firestore'

function Contacto({ id, nombre, email }) {
  const [editandoTarea, setEditandoTarea] = useState(false)

  const [nuevoNombre, setNuevoNombre] = useState(nombre)
  const [nuevoCorreo, setNuevoCorreo] = useState(email)

  const actualizarContacto = (e) => {
    e.preventDefault()

    async function cambiarContacto() {
      try{
      await setDoc(doc(db, 'usuarios', id), {
          nombre: nuevoNombre,
          correo: nuevoCorreo,
        })
        console.log("el usuario se actualizo correctamente")
      }catch(e){
        console.log(e)
      }
    }
    cambiarContacto()

    setEditandoTarea(!editandoTarea)
  }


async function borrarContacto() {
  try{
   await deleteDoc(doc(db, 'usuarios', id))
    console.log("el usuario se borró correctamente" )
  }catch(e){
    console.log(e)
  }
}

  return (
    <ContenedorContacto>
      {editandoTarea === false ? (
        <>
          <Nombre>{nombre}</Nombre>
          <Correo>{email}</Correo>
          <Boton onClick={() => setEditandoTarea(!editandoTarea)}>Editar</Boton>
          <Boton onClick={borrarContacto}>Eliminar</Boton>
        </>
      ) : (
        <form action="" onSubmit={actualizarContacto}>
          <Input
            type="text"
            name="nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Nombre"
          />
          <Input
            type="email"
            name="email"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
            placeholder="Email"
          />
          <Boton type="submit">Actualizar</Boton>
        </form>
      )}
    </ContenedorContacto>
  )
}
const ContenedorContacto = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`

const Nombre = styled.p`
  font-weight: bold;
`

const Correo = styled.p`
  font-style: italic;
  color: #6b6b6b;
  margin: 5px 0;
`

const Boton = styled.button`
  padding: 5px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  margin: 0px 2px;
  margin-bottom: 10px;
  transition: 0.3s ease all;
  outline: none;
  background: #c4c4c4;
  color: #fff;
  font-size: 12px;

  &:hover {
    background: #3d76e9;
  }
`

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 100%;
  margin-bottom: 10px;
  transition: 0.2s ease all;
  outline: none;
  text-align: center;

  &:focus {
    border: 2px solid #3d76e9;
  }
`
export default Contacto
