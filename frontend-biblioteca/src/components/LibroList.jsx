function LibroList({ libros, onEditar, onEliminar }) {
  if (libros.length === 0) {
    return <p>No hay libros registrados.</p>
  }

  return (
    <div className="list-card">
      <h3>Lista de libros</h3>

      <ul className="autor-list">
        {libros.map((libro) => (
          <li key={libro.isbn} className="autor-item">
            <div>
              <strong>{libro.titulo}</strong>
              <p><strong>ISBN:</strong> {libro.isbn}</p>
              <p><strong>Editorial:</strong> {libro.editorial}</p>
              <p><strong>Género:</strong> {libro.genero}</p>
              <p><strong>Año:</strong> {libro.anioPublicacion}</p>
              <p><strong>Autor:</strong> {libro.autorNombre} ({libro.autorCedula})</p>
            </div>

            <div className="actions">
              <button onClick={() => onEditar(libro)}>Editar</button>
              <button
                className="delete-button"
                onClick={() => onEliminar(libro.isbn)}
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

export default LibroList