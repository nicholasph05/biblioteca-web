import { useEffect, useState } from 'react'
import { GENEROS_LIBRO } from '../data/catalogos'
import {
  validarIsbn,
  validarTitulo,
  validarEditorial,
  validarGenero,
  validarAnioPublicacion,
  validarAutorCedula
} from '../utils/validaciones'

const estadoInicial = {
  isbn: '',
  titulo: '',
  editorial: '',
  genero: '',
  anioPublicacion: '',
  autorCedula: ''
}

const erroresIniciales = {
  isbn: '',
  titulo: '',
  editorial: '',
  genero: '',
  anioPublicacion: '',
  autorCedula: ''
}

function LibroForm({
  onGuardar,
  libroEnEdicion,
  onCancelarEdicion,
  autores = []
}) {
  const [formData, setFormData] = useState(estadoInicial)
  const [errores, setErrores] = useState(erroresIniciales)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (libroEnEdicion) {
      setFormData({
        isbn: libroEnEdicion.isbn || '',
        titulo: libroEnEdicion.titulo || '',
        editorial: libroEnEdicion.editorial || '',
        genero: libroEnEdicion.genero || '',
        anioPublicacion: libroEnEdicion.anioPublicacion || '',
        autorCedula: libroEnEdicion.autorCedula || ''
      })
    } else {
      setFormData(estadoInicial)
    }

    setErrores(erroresIniciales)
  }, [libroEnEdicion])

  function validarCampo(name, value) {
    switch (name) {
      case 'isbn':
        return validarIsbn(value)
      case 'titulo':
        return validarTitulo(value)
      case 'editorial':
        return validarEditorial(value)
      case 'genero':
        return validarGenero(value)
      case 'anioPublicacion':
        return validarAnioPublicacion(value)
      case 'autorCedula':
        return validarAutorCedula(value)
      default:
        return ''
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    let nuevoValor = value

    if (name === 'anioPublicacion') {
      nuevoValor = value.replace(/\D/g, '')
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nuevoValor
    }))

    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, nuevoValor)
    }))
  }

  function validarFormulario() {
    const nuevosErrores = {
      isbn: validarIsbn(formData.isbn),
      titulo: validarTitulo(formData.titulo),
      editorial: validarEditorial(formData.editorial),
      genero: validarGenero(formData.genero),
      anioPublicacion: validarAnioPublicacion(formData.anioPublicacion),
      autorCedula: validarAutorCedula(formData.autorCedula)
    }

    setErrores(nuevosErrores)
    return !Object.values(nuevosErrores).some(Boolean)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validarFormulario()) return

    try {
      setCargando(true)

      await onGuardar({
        ...formData,
        isbn: formData.isbn.trim(),
        titulo: formData.titulo.trim(),
        editorial: formData.editorial.trim(),
        genero: formData.genero.trim(),
        anioPublicacion: Number(formData.anioPublicacion),
        autorCedula: formData.autorCedula.trim()
      })

      if (!libroEnEdicion) {
        setFormData(estadoInicial)
        setErrores(erroresIniciales)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>{libroEnEdicion ? 'Editar libro' : 'Registrar libro'}</h3>

      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        disabled={!!libroEnEdicion}
      />
      {errores.isbn && <p className="field-error">{errores.isbn}</p>}

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formData.titulo}
        onChange={handleChange}
      />
      {errores.titulo && <p className="field-error">{errores.titulo}</p>}

      <input
        type="text"
        name="editorial"
        placeholder="Editorial"
        value={formData.editorial}
        onChange={handleChange}
      />
      {errores.editorial && (
        <p className="field-error">{errores.editorial}</p>
      )}

      <select
        name="genero"
        value={formData.genero}
        onChange={handleChange}
      >
        <option value="">Selecciona un género</option>
        {GENEROS_LIBRO.map((genero) => (
          <option key={genero} value={genero}>
            {genero}
          </option>
        ))}
      </select>
      {errores.genero && <p className="field-error">{errores.genero}</p>}

      <input
        type="number"
        name="anioPublicacion"
        placeholder="Año de publicación"
        value={formData.anioPublicacion}
        onChange={handleChange}
        min="1450"
        max={new Date().getFullYear()}
      />
      {errores.anioPublicacion && (
        <p className="field-error">{errores.anioPublicacion}</p>
      )}

      <select
        name="autorCedula"
        value={formData.autorCedula}
        onChange={handleChange}
      >
        <option value="">Selecciona un autor</option>
        {autores.map((autor) => (
          <option key={autor.cedula} value={autor.cedula}>
            {autor.nombreCompleto} - {autor.cedula}
          </option>
        ))}
      </select>
      {errores.autorCedula && (
        <p className="field-error">{errores.autorCedula}</p>
      )}

      <div className="button-group">
        <button type="submit" disabled={cargando}>
          {cargando
            ? libroEnEdicion
              ? 'Actualizando...'
              : 'Guardando...'
            : libroEnEdicion
            ? 'Actualizar'
            : 'Guardar'}
        </button>

        {libroEnEdicion && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default LibroForm