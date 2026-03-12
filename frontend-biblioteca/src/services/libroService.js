import { lanzarErrorResponse } from '../utils/error'

const API_URL = 'http://localhost:8080/api/libros'

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export async function obtenerLibros() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible obtener los libros')
  }

  return await response.json()
}

export async function obtenerLibroPorIsbn(isbn) {
  const response = await fetch(`${API_URL}/${isbn}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible buscar el libro')
  }

  return await response.json()
}

export async function crearLibro(libro) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(libro)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible registrar el libro')
  }

  return await response.json()
}

export async function actualizarLibro(isbn, libro) {
  const response = await fetch(`${API_URL}/${isbn}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(libro)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible actualizar el libro')
  }

  return await response.json()
}

export async function eliminarLibro(isbn) {
  const response = await fetch(`${API_URL}/${isbn}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible eliminar el libro')
  }
}