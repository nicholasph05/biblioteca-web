import { useEffect, useState } from 'react'
import LibroForm from '../components/LibroForm'
import LibroList from '../components/LibroList'
import {
  obtenerLibros,
  obtenerLibroPorIsbn,
  crearLibro,
  actualizarLibro,
  eliminarLibro
} from '../services/libroService'
import { obtenerAutores } from '../services/autorService'

function LibrosPage() {
  const [libros, setLibros] = useState([])
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [libroEnEdicion, setLibroEnEdicion] = useState(null)
  const [isbnBusqueda, setIsbnBusqueda] = useState('')
  const [modoBusqueda, setModoBusqueda] = useState(false)

  async function cargarAutoresDisponibles() {
    const data = await obtenerAutores()
    setAutores(data)
  }

  async function cargarLibros() {
    try {
      setLoading(true)
      setError('')
      const data = await obtenerLibros()
      setLibros(data)
      setModoBusqueda(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function cargarDatosIniciales() {
    try {
      setLoading(true)
      setError('')
      const [librosData, autoresData] = await Promise.all([
        obtenerLibros(),
        obtenerAutores()
      ])
      setLibros(librosData)
      setAutores(autoresData)
      setModoBusqueda(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGuardar(libro) {
    setError('')
    setMensaje('')

    if (libroEnEdicion) {
      await actualizarLibro(libroEnEdicion.isbn, libro)
      setLibroEnEdicion(null)
      setMensaje('Libro actualizado correctamente')
    } else {
      await crearLibro(libro)
      setMensaje('Libro registrado correctamente')
    }

    await cargarLibros()
    await cargarAutoresDisponibles()
  }

  function handleEditar(libro) {
    setLibroEnEdicion(libro)
    setMensaje('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleEliminar(isbn) {
    const confirmado = window.confirm('¿Deseas eliminar este libro?')
    if (!confirmado) return

    try {
      setError('')
      setMensaje('')
      await eliminarLibro(isbn)

      if (libroEnEdicion?.isbn === isbn) {
        setLibroEnEdicion(null)
      }

      setMensaje('Libro eliminado correctamente')
      await cargarLibros()
    } catch (err) {
      setError(err.message)
    }
  }

  function cancelarEdicion() {
    setLibroEnEdicion(null)
  }

  async function handleBuscar(e) {
    e.preventDefault()

    if (!isbnBusqueda.trim()) {
      await cargarLibros()
      return
    }

    try {
      setLoading(true)
      setError('')
      setMensaje('')
      const libro = await obtenerLibroPorIsbn(isbnBusqueda.trim())
      setLibros([libro])
      setModoBusqueda(true)
    } catch (err) {
      setLibros([])
      setModoBusqueda(true)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function limpiarBusqueda() {
    setIsbnBusqueda('')
    setError('')
    setMensaje('')
    await cargarLibros()
  }

  useEffect(() => {
    cargarDatosIniciales()
  }, [])

  return (
    <div>
      <h1>Gestión de libros</h1>

      <LibroForm
        onGuardar={handleGuardar}
        libroEnEdicion={libroEnEdicion}
        onCancelarEdicion={cancelarEdicion}
        autores={autores}
      />

      <form onSubmit={handleBuscar} className="form-card search-card">
        <h3>Buscar libro por ISBN</h3>

        <div className="search-row">
          <input
            type="text"
            placeholder="Ingresa el ISBN"
            value={isbnBusqueda}
            onChange={(e) => setIsbnBusqueda(e.target.value)}
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
      {loading && <p>Cargando libros...</p>}

      {!loading && (
        <>
          {modoBusqueda && !error && (
            <p className="info-text">Resultado de búsqueda por ISBN.</p>
          )}

          <LibroList
            libros={libros}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        </>
      )}
    </div>
  )
}

export default LibrosPage