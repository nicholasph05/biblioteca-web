import { useEffect, useState } from 'react'
import UsuarioForm from '../components/UsuarioForm'
import UsuarioList from '../components/UsuarioList'
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../services/usuarioService'

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null)
  const [idBusqueda, setIdBusqueda] = useState('')
  const [modoBusqueda, setModoBusqueda] = useState(false)

  async function cargarUsuarios() {
    try {
      setLoading(true)
      setError('')
      const data = await obtenerUsuarios()
      setUsuarios(data)
      setModoBusqueda(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGuardar(usuario) {
    setError('')
    setMensaje('')

    if (usuarioEnEdicion) {
      await actualizarUsuario(usuarioEnEdicion.id, usuario)
      setUsuarioEnEdicion(null)
      setMensaje('Usuario actualizado correctamente')
    } else {
      await crearUsuario(usuario)
      setMensaje('Usuario registrado correctamente')
    }

    await cargarUsuarios()
  }

  function handleEditar(usuario) {
    setUsuarioEnEdicion(usuario)
    setMensaje('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleEliminar(id) {
    const confirmado = window.confirm('¿Deseas eliminar este usuario?')
    if (!confirmado) return

    try {
      setError('')
      setMensaje('')
      await eliminarUsuario(id)

      if (usuarioEnEdicion?.id === id) {
        setUsuarioEnEdicion(null)
      }

      setMensaje('Usuario eliminado correctamente')
      await cargarUsuarios()
    } catch (err) {
      setError(err.message)
    }
  }

  function cancelarEdicion() {
    setUsuarioEnEdicion(null)
  }

  async function handleBuscar(e) {
    e.preventDefault()

    if (!idBusqueda.trim()) {
      await cargarUsuarios()
      return
    }

    try {
      setLoading(true)
      setError('')
      setMensaje('')
      const usuario = await obtenerUsuarioPorId(Number(idBusqueda.trim()))
      setUsuarios([usuario])
      setModoBusqueda(true)
    } catch (err) {
      setUsuarios([])
      setModoBusqueda(true)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function limpiarBusqueda() {
    setIdBusqueda('')
    setError('')
    setMensaje('')
    await cargarUsuarios()
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  return (
    <div>
      <h1>Gestión de usuarios</h1>

      <UsuarioForm
        onGuardar={handleGuardar}
        usuarioEnEdicion={usuarioEnEdicion}
        onCancelarEdicion={cancelarEdicion}
      />

      <form onSubmit={handleBuscar} className="form-card search-card">
        <h3>Buscar usuario por ID</h3>

        <div className="search-row">
          <input
            type="number"
            placeholder="Ingresa el ID"
            value={idBusqueda}
            onChange={(e) => setIdBusqueda(e.target.value)}
            min="1"
          />

          <button type="submit">Buscar</button>
          <button
            type="button"
            className="secondary-button"
            onClick={limpiarBusqueda}
          >
            Mostrar todos
          </button>
        </div>
      </form>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}
      {loading && <p>Cargando usuarios...</p>}

      {!loading && (
        <>
          {modoBusqueda && !error && (
            <p className="info-text">Resultado de búsqueda por ID.</p>
          )}

          <UsuarioList
            usuarios={usuarios}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        </>
      )}
    </div>
  )
}

export default UsuariosPage