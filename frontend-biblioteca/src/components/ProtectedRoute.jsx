import { Navigate } from 'react-router-dom'
import { estaAutenticado, esAdministrador } from '../utils/auth'

function ProtectedRoute({ children, requireAdmin = false }) {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !esAdministrador()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute