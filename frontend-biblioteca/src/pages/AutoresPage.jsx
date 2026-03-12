import { useEffect, useState } from 'react'
import AutorForm from '../components/AutorForm'
import AutorList from '../components/AutorList'
import {
  obtenerAutores,
  crearAutor,
  actualizarAutor,
  eliminarAutor
} from '../services/autorService'

function AutoresPage() {
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [autorEnEdicion, setAutorEnEdicion] = useState(null)

  async function cargarAutores() {
    try {
      setLoading(true)
      setError('')
      const data = await obtenerAutores()
      setAutores(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGuardar(autor) {
    if (autorEnEdicion) {
      await actualizarAutor(autorEnEdicion.cedula, autor)
      setAutorEnEdicion(null)
    } else {
      await crearAutor(autor)
    }

    await cargarAutores()
  }

  function handleEditar(autor) {
    setAutorEnEdicion(autor)
  }

  async function handleEliminar(cedula) {
    const confirmado = window.confirm('¿Deseas eliminar este autor?')
    if (!confirmado) return

    try {
      await eliminarAutor(cedula)

      if (autorEnEdicion?.cedula === cedula) {
        setAutorEnEdicion(null)
      }

      await cargarAutores()
    } catch (err) {
      alert(err.message)
    }
  }

  function cancelarEdicion() {
    setAutorEnEdicion(null)
  }

  useEffect(() => {
    cargarAutores()
  }, [])

  return (
    <div>
      <h1>Gestión de autores</h1>

      <AutorForm
        onGuardar={handleGuardar}
        autorEnEdicion={autorEnEdicion}
        onCancelarEdicion={cancelarEdicion}
      />

      {loading && <p>Cargando autores...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <AutorList
          autores={autores}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}
    </div>
  )
}

export default AutoresPage