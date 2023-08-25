import React from 'react'
import ConnexionForm from '../components/ConnexionForm'
import { Container } from 'react-bootstrap'

function Connexion({auth}) {
  return (
    <Container>
      <ConnexionForm />
    </Container>
  )
}

export default Connexion