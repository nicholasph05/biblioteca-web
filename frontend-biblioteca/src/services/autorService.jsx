import { lanzarErrorResponse } from '../utils/error'

const API_URL = 'http://localhost:8080/api/autores'

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export async function obtenerAutores() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible obtener los autores')
  }

  return await response.json()
}

export async function obtenerAutorPorCedula(cedula) {
  const response = await fetch(`${API_URL}/${cedula}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible buscar el autor')
  }

  return await response.json()
}

export async function crearAutor(autor) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(autor)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible registrar el autor')
  }
}

export async function actualizarAutor(cedula, autor) {
  const response = await fetch(`${API_URL}/${cedula}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(autor)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible actualizar el autor')
  }
}

export async function eliminarAutor(cedula) {
  const response = await fetch(`${API_URL}/${cedula}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible eliminar el autor')
  }
}