function AutorReporteCard({ reporte }) {
  if (!reporte) return null

  return (
    <div className="list-card">
      <h3>Resultado del reporte</h3>

      <div className="report-block">
        <p><strong>Cédula:</strong> {reporte.cedula}</p>
        <p><strong>Nombre completo:</strong> {reporte.nombreCompleto}</p>
        <p><strong>Nacionalidad:</strong> {reporte.nacionalidad}</p>
      </div>

      <div className="report-block">
        <h4>Libros asociados</h4>

        {reporte.libros?.length > 0 ? (
          <ul className="autor-list">
            {reporte.libros.map((libro) => (
              <li key={libro.isbn} className="autor-item">
                <div>
                  <strong>{libro.titulo}</strong>
                  <p><strong>ISBN:</strong> {libro.isbn}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Este autor no tiene libros registrados.</p>
        )}
      </div>
    </div>
  )
}

export default AutorReporteCard