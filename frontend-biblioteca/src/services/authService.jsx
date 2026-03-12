import { lanzarErrorResponse } from '../utils/error'

const API_URL = 'http://localhost:8080/api/auth'

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    await lanzarErrorResponse(response, 'Error al iniciar sesión')
  }

  return await response.json()
}