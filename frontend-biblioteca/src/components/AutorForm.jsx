import { useEffect, useState } from 'react'
import { NACIONALIDADES } from '../data/catalogos'
import {
  validarCedula,
  validarNombreCompleto,
  validarNacionalidad
} from '../utils/validaciones'

const estadoInicial = {
  cedula: '',
  nombreCompleto: '',
  nacionalidad: ''
}

const erroresIniciales = {
  cedula: '',
  nombreCompleto: '',
  nacionalidad: ''
}

function AutorForm({ onGuardar, autorEnEdicion, onCancelarEdicion }) {
  const [formData, setFormData] = useState(estadoInicial)
  const [errores, setErrores] = useState(erroresIniciales)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (autorEnEdicion) {
      setFormData({
        cedula: autorEnEdicion.cedula || '',
        nombreCompleto: autorEnEdicion.nombreCompleto || '',
        nacionalidad: autorEnEdicion.nacionalidad || ''
      })
    } else {
      setFormData(estadoInicial)
    }

    setErrores(erroresIniciales)
  }, [autorEnEdicion])

  function validarCampo(name, value) {
    switch (name) {
      case 'cedula':
        return validarCedula(value)
      case 'nombreCompleto':
        return validarNombreCompleto(value)
      case 'nacionalidad':
        return validarNacionalidad(value)
      default:
        return ''
    }
  }

  function handleChange(e) {
    const { name, value } = e.target

    let nuevoValor = value

    if (name === 'cedula') {
      nuevoValor = value.replace(/\D/g, '')
    }

    if (name === 'nombreCompleto') {
      nuevoValor = value.replace(/\s{2,}/g, ' ')
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
      cedula: validarCedula(formData.cedula),
      nombreCompleto: validarNombreCompleto(formData.nombreCompleto),
      nacionalidad: validarNacionalidad(formData.nacionalidad)
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
        cedula: formData.cedula.trim(),
        nombreCompleto: formData.nombreCompleto.trim(),
        nacionalidad: formData.nacionalidad.trim()
      })

      if (!autorEnEdicion) {
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
      <h3>{autorEnEdicion ? 'Editar autor' : 'Registrar autor'}</h3>

      <input
        type="text"
        name="cedula"
        placeholder="Cédula"
        value={formData.cedula}
        onChange={handleChange}
        disabled={!!autorEnEdicion}
      />
      {errores.cedula && <p className="field-error">{errores.cedula}</p>}

      <input
        type="text"
        name="nombreCompleto"
        placeholder="Nombre completo"
        value={formData.nombreCompleto}
        onChange={handleChange}
      />
      {errores.nombreCompleto && (
        <p className="field-error">{errores.nombreCompleto}</p>
      )}

      <select
        name="nacionalidad"
        value={formData.nacionalidad}
        onChange={handleChange}
      >
        <option value="">Selecciona una nacionalidad</option>
        {NACIONALIDADES.map((nacionalidad) => (
          <option key={nacionalidad} value={nacionalidad}>
            {nacionalidad}
          </option>
        ))}
      </select>
      {errores.nacionalidad && (
        <p className="field-error">{errores.nacionalidad}</p>
      )}

      <div className="button-group">
        <button type="submit" disabled={cargando}>
          {cargando
            ? autorEnEdicion
              ? 'Actualizando...'
              : 'Guardando...'
            : autorEnEdicion
            ? 'Actualizar'
            : 'Guardar'}
        </button>

        {autorEnEdicion && (
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

export default AutorForm