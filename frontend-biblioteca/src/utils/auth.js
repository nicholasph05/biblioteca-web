export function guardarSesion(data) {
  localStorage.setItem('token', data.token)
  localStorage.setItem('userName', data.userName)
  localStorage.setItem('tipo', data.tipo)
  localStorage.setItem('userId', data.id)
}

export function cerrarSesion() {
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('tipo')
  localStorage.removeItem('userId')
}

export function obtenerToken() {
  return localStorage.getItem('token')
}

export function obtenerUsuario() {
  return {
    token: localStorage.getItem('token'),
    userName: localStorage.getItem('userName'),
    tipo: localStorage.getItem('tipo'),
    id: localStorage.getItem('userId')
  }
}

export function estaAutenticado() {
  return !!localStorage.getItem('token')
}

export function esAdministrador() {
  return localStorage.getItem('tipo') === 'ADMINISTRADOR'
}