import { useEffect, useState } from 'react'
import styled from 'styled-components'
import db from '../firebase/firebaseConfig'
import Contacto from './Contacto'
import { collection, getDocs, doc, onSnapshot, query, limit } from 'firebase/firestore'

const ListaContactos = () => {
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: 'Carksi',
      correo: 'Fasd',
    },
    {
      id: 2,
      nombre: 'Ger',
      correo: 'Correo2',
    },
  ])

  useEffect(() => {
    const q = query(collection(db, 'usuarios'), limit(3))
    onSnapshot(q, (querySnapshot) => {
      setContactos(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
      )
    })
   
  }, [])

  return contactos.length > 0 ? (
    <ContenedorContactos>
      {contactos.map(({ id, nombre, correo }) => {
        return <Contacto key={id} id={id} nombre={nombre} email={correo} />
      })}
    </ContenedorContactos>
  ) : (
    <h1>No hay contactos</h1>
  )
}

const ContenedorContactos = styled.div`
  margin-top: 40px;
`
export default ListaContactos
