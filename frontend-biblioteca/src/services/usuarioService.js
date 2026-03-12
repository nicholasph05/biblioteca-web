import { lanzarErrorResponse } from '../utils/error'

const API_URL = 'http://localhost:8080/api/usuarios'

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export async function obtenerUsuarios() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible obtener los usuarios')
  }

  return await response.json()
}

export async function obtenerUsuarioPorId(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible buscar el usuario')
  }

  return await response.json()
}

export async function crearUsuario(usuario) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(usuario)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible registrar el usuario')
  }

  return await response.json()
}

export async function actualizarUsuario(id, usuario) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(usuario)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible actualizar el usuario')
  }

  return await response.json()
}

export async function eliminarUsuario(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'No fue posible eliminar el usuario')
  }
}