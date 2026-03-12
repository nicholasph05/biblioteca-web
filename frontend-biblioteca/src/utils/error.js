export async function extraerMensajeError(response, mensajeBase = 'Ocurrió un error') {
  try {
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const data = await response.json()

      if (typeof data === 'string') {
        return data
      }

      if (data.message) return data.message
      if (data.mensaje) return data.mensaje
      if (data.error) return data.error

      if (data.errors && typeof data.errors === 'object') {
        const mensajes = Object.values(data.errors).flat()
        if (mensajes.length > 0) {
          return mensajes.join(', ')
        }
      }

      if (Array.isArray(data)) {
        return data.join(', ')
      }
    } else {
      const texto = await response.text()
      if (texto?.trim()) return texto
    }
  } catch {
    // si no se puede leer el cuerpo, se usa el mensaje base
  }

  switch (response.status) {
    case 400:
      return 'La solicitud no fue válida'
    case 401:
      return 'No has iniciado sesión o tu sesión expiró'
    case 403:
      return 'No tienes permisos para realizar esta acción'
    case 404:
      return 'No se encontró el recurso solicitado'
    case 409:
      return 'Ya existe un registro con esos datos'
    case 500:
      return 'Ocurrió un error interno en el servidor'
    default:
      return mensajeBase
  }
}

export async function lanzarErrorResponse(response, mensajeBase) {
  const mensaje = await extraerMensajeError(response, mensajeBase)
  throw new Error(mensaje)
}