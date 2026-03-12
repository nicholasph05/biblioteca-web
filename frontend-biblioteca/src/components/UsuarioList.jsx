function UsuarioList({ usuarios, onEditar, onEliminar }) {
  if (usuarios.length === 0) {
    return <p>No hay usuarios registrados.</p>
  }

  return (
    <div className="list-card">
      <h3>Lista de usuarios</h3>

      <ul className="autor-list">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="autor-item">
            <div>
              <strong>{usuario.userName}</strong>
              <p><strong>ID:</strong> {usuario.id}</p>
              <p><strong>Tipo:</strong> {usuario.tipo}</p>
            </div>

            <div className="actions">
              <button onClick={() => onEditar(usuario)}>Editar</button>
              <button
                className="delete-button"
                onClick={() => onEliminar(usuario.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsuarioList