import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className='principal'>
    <h2>404!</h2>
    <p>
      Página não encontrada ou removida.
    </p>
      <Link to='/'>ir para Home Page</Link>
  </main>
)

export default NotFound