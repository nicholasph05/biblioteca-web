import { useEffect, useState } from 'react'
import {
  validarUserName,
  validarPassword,
  validarTipoUsuario
} from '../utils/validaciones'

const estadoInicial = {
  userName: '',
  password: '',
  tipo: ''
}

const erroresIniciales = {
  userName: '',
  password: '',
  tipo: ''
}

function UsuarioForm({ onGuardar, usuarioEnEdicion, onCancelarEdicion }) {
  const [formData, setFormData] = useState(estadoInicial)
  const [errores, setErrores] = useState(erroresIniciales)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (usuarioEnEdicion) {
      setFormData({
        userName: usuarioEnEdicion.userName || '',
        password: '',
        tipo: usuarioEnEdicion.tipo || ''
      })
    } else {
      setFormData(estadoInicial)
    }

    setErrores(erroresIniciales)
  }, [usuarioEnEdicion])

  function validarCampo(name, value) {
    switch (name) {
      case 'userName':
        return validarUserName(value)
      case 'password':
        return validarPassword(value)
      case 'tipo':
        return validarTipoUsuario(value)
      default:
        return ''
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    let nuevoValor = value

    if (name === 'userName') {
      nuevoValor = value.trimStart()
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
      userName: validarUserName(formData.userName),
      password: validarPassword(formData.password),
      tipo: validarTipoUsuario(formData.tipo)
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
        userName: formData.userName.trim(),
        password: formData.password.trim(),
        tipo: formData.tipo
      })

      if (!usuarioEnEdicion) {
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
      <h3>{usuarioEnEdicion ? 'Editar usuario' : 'Registrar usuario'}</h3>

      <input
        type="text"
        name="userName"
        placeholder="User name"
        value={formData.userName}
        onChange={handleChange}
      />
      {errores.userName && <p className="field-error">{errores.userName}</p>}

      <input
        type="password"
        name="password"
        placeholder={usuarioEnEdicion ? 'Nueva password' : 'Password'}
        value={formData.password}
        onChange={handleChange}
      />
      {errores.password && <p className="field-error">{errores.password}</p>}

      <select
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
      >
        <option value="">Selecciona un tipo de usuario</option>
        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
        <option value="EMPLEADO">EMPLEADO</option>
      </select>
      {errores.tipo && <p className="field-error">{errores.tipo}</p>}

      <div className="button-group">
        <button type="submit" disabled={cargando}>
          {cargando
            ? usuarioEnEdicion
              ? 'Actualizando...'
              : 'Guardando...'
            : usuarioEnEdicion
            ? 'Actualizar'
            : 'Guardar'}
        </button>

        {usuarioEnEdicion && (
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

export default UsuarioForm