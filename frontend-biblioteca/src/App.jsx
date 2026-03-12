import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AutoresPage from './pages/AutoresPage'
import LibrosPage from './pages/LibrosPage'
import UsuariosPage from './pages/UsuariosPage'
import ReportesPage from './pages/ReportesPage'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/autores"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AutoresPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/libros"
            element={
              <ProtectedRoute requireAdmin={true}>
                <LibrosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute requireAdmin={true}>
                <UsuariosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reportes"
            element={
              <ProtectedRoute>
                <ReportesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App