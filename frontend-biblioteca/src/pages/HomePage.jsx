import { estaAutenticado, obtenerUsuario } from '../utils/auth'

function HomePage() {
  const autenticado = estaAutenticado()
  const usuario = obtenerUsuario()

  return (
    <div className="home-card">
      <h1>Sistema de Biblioteca</h1>
      <p>Frontend en React conectado con Spring Boot.</p>

      {autenticado ? (
        <>
          <p>
            Sesión activa: <strong>{usuario.userName}</strong> ({usuario.tipo})
          </p>

          {usuario.tipo === 'ADMINISTRADOR' ? (
            <p>Tienes acceso a los módulos administrativos y al módulo de reportes.</p>
          ) : (
            <p>Tienes acceso al módulo de reportes de autores por cédula.</p>
          )}
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  )
}

export default HomePage