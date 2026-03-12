import { lanzarErrorResponse } from '../utils/error'

const API_URL = 'http://localhost:8080/api/reportes'

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export async function obtenerReporteAutorPorCedula(cedula) {
  const response = await fetch(`${API_URL}/autores/${cedula}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible obtener el reporte del autor')
  }

  return await response.json()
}