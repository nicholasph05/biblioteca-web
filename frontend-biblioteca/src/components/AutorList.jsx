function AutorList({ autores, onEditar, onEliminar }) {
  if (autores.length === 0) {
    return <p>No hay autores registrados.</p>
  }

  return (
    <div className="list-card">
      <h3>Lista de autores</h3>

      <ul className="autor-list">
        {autores.map((autor) => (
          <li key={autor.cedula} className="autor-item">
            <div>
              <strong>{autor.nombreCompleto}</strong>
              <p>Cédula: {autor.cedula}</p>
              <p>Nacionalidad: {autor.nacionalidad}</p>
            </div>

            <div className="actions">
              <button onClick={() => onEditar(autor)}>Editar</button>
              <button
                className="delete-button"
                onClick={() => onEliminar(autor.cedula)}
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

export default AutorList