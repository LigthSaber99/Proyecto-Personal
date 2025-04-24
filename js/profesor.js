document.addEventListener('DOMContentLoaded', function() {
    consultarProfesores();
  });
  
  // Función para consultar profesores
  function consultarProfesores() {
    const url = 'https://paginas-web-cr.com/Api/apis/ListaProfesores.php';
  
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarProfesores(data.data))
      .catch(error => console.error('Error consultando profesores:', error));
  }
  
  // Función para mostrar profesores en la tabla
  function mostrarProfesores(profesores) {
    const container = document.getElementById('profesoresContainer');
    container.innerHTML = ''; // Limpiar contenedor
  
    if (profesores.length === 0) {
      container.innerHTML = '<p>No hay profesores registrados.</p>';
      return;
    }
  
    const table = document.createElement('table');
    table.className = 'table table-striped';
  
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        ${profesores.map(prof => `
          <tr>
            <td>${prof.id}</td>
            <td>${prof.nombre} ${prof.apellidopaterno} ${prof.apellidomaterno}</td>
            <td>${prof.correoelectronico}</td>
            <td>${prof.telefono}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  
    container.appendChild(table);
  }
  