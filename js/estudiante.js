document.addEventListener('DOMContentLoaded', function() {
    consultarEstudiantes();
  
    const formEstudiante = document.getElementById('formEstudiante');
    formEstudiante.addEventListener('submit', function(event) {
      event.preventDefault();
      insertarEstudiante();
    });
  });
  
  // Función para consultar estudiantes
  function consultarEstudiantes() {
    const url = 'https://paginas-web-cr.com/Api/apis/ListaEstudiantes.php';
  
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarEstudiantes(data.data))
      .catch(error => console.error('Error consultando estudiantes:', error));
  }
  
  // Función para mostrar estudiantes en la tabla
  function mostrarEstudiantes(estudiantes) {
    const container = document.getElementById('estudiantesContainer');
    container.innerHTML = ''; // Limpiar contenedor
  
    if (estudiantes.length === 0) {
      container.innerHTML = '<p>No hay estudiantes registrados.</p>';
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
        ${estudiantes.map(est => `
          <tr>
            <td>${est.id}</td>
            <td>${est.nombre}</td>
            <td>${est.correoelectronico}</td> <!-- Corregido -->
            <td>${est.telefono}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  
    container.appendChild(table);
  }
  
  // Función para insertar un nuevo estudiante
  function insertarEstudiante() { 
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
  
    const url = 'https://corsproxy.io/?https://paginas-web-cr.com/Api/apis/InsertarEstudiantes.php';




  
    const datos = {
      cedula: cedula,
      nombre: nombre,
      correoelectronico: correo,
      telefono: telefono,
      telefonoCelular: telefono
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // <-- Aquí agregamos esto
      },
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del API:', data);
      alert('Estudiante agregado exitosamente');
      document.getElementById('formEstudiante').reset();
      setTimeout(() => {
        consultarEstudiantes();
      }, 500);
    })
    .catch(error => console.error('Error insertando estudiante:', error));
  }
  