import { useState } from 'react'
import AutorReporteCard from '../components/AutorReporteCard'
import { obtenerReporteAutorPorCedula } from '../services/reporteService'
import { validarCedula } from '../utils/validaciones'

function ReportesPage() {
  const [cedula, setCedula] = useState('')
  const [errorCedula, setErrorCedula] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)
  const [reporte, setReporte] = useState(null)

  function handleChange(e) {
    const valor = e.target.value.replace(/\D/g, '')
    setCedula(valor)
    setErrorCedula(validarCedula(valor))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const errorValidacion = validarCedula(cedula)
    setErrorCedula(errorValidacion)

    if (errorValidacion) return

    try {
      setLoading(true)
      setError('')
      setMensaje('')
      const data = await obtenerReporteAutorPorCedula(cedula.trim())
      setReporte(data)
      setMensaje('Reporte generado correctamente')
    } catch (err) {
      setReporte(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function limpiarConsulta() {
    setCedula('')
    setErrorCedula('')
    setError('')
    setMensaje('')
    setReporte(null)
  }

  return (
    <div>
      <h1>Reporte de autores por cédula</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <h3>Consulta de autor con libros</h3>

        <input
          type="text"
          placeholder="Ingresa la cédula del autor"
          value={cedula}
          onChange={handleChange}
        />
        {errorCedula && <p className="field-error">{errorCedula}</p>}

        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Consultando...' : 'Consultar'}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={limpiarConsulta}
          >
            Limpiar
          </button>
        </div>
      </form>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {!loading && reporte && <AutorReporteCard reporte={reporte} />}
    </div>
  )
}

export default ReportesPage