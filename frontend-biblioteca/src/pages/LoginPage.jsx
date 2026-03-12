import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { guardarSesion } from '../utils/auth'

function LoginPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!formData.userName.trim() || !formData.password.trim()) {
      setError('Debes completar todos los campos')
      return
    }

    try {
      setCargando(true)

      const data = await loginUser(formData)
      guardarSesion(data)

      navigate('/autores')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="form-card login-card">
        <h2>Iniciar sesión</h2>

        <input
          type="text"
          name="userName"
          placeholder="Nombre de usuario"
          value={formData.userName}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage