import { Link, useNavigate } from 'react-router-dom'
import { cerrarSesion, estaAutenticado, obtenerUsuario } from '../utils/auth'

function Navbar() {
  const navigate = useNavigate()
  const autenticado = estaAutenticado()
  const usuario = obtenerUsuario()

  function handleLogout() {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h2>Biblioteca</h2>

      <div className="nav-links">
        <Link to="/">Inicio</Link>

        {autenticado && <Link to="/reportes">Reportes</Link>}

        {autenticado && usuario.tipo === 'ADMINISTRADOR' && (
          <>
            <Link to="/autores">Autores</Link>
            <Link to="/libros">Libros</Link>
            <Link to="/usuarios">Usuarios</Link>
          </>
        )}

        {!autenticado ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <span className="user-badge">
              {usuario.userName} - {usuario.tipo}
            </span>
            <button className="logout-button" onClick={handleLogout}>
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar