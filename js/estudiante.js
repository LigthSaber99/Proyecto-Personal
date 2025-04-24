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
            <td>${est.correoelectronico}</td>
            <td>${est.telefono}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  
    container.appendChild(table);
  }
  
  function insertarEstudiante() {
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const telefonoCelular = document.getElementById('telefonoCelular').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const sexo = document.getElementById('sexo').value;
    const direccion = document.getElementById('direccion').value;
    const nacionalidad = document.getElementById('nacionalidad').value;
    const idCarreras = document.getElementById('idCarreras').value;
    const usuario = document.getElementById('usuario').value;
  
    const url = 'https://paginas-web-cr.com/Api/apis/InsertarEstudiantes.php';
  
    const datos = {
      cedula: cedula,
      nombre: nombre,
      apellidopaterno: apellidoPaterno,
      apellidomaterno: apellidoMaterno,
      correoelectronico: correo,
      telefono: telefono,
      telefonocelular: telefonoCelular,
      fechanacimiento: fechaNacimiento,
      sexo: sexo,
      direccion: direccion,
      nacionalidad: nacionalidad,
      idCarreras: idCarreras,
      usuario: usuario
    };
  
    fetch(url, {
      method: 'POST',
      
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del API:', data);
      alert('Estudiante agregado exitosamente');
      document.getElementById('formEstudiante').reset();
      consultarEstudiantes();
    })
    .catch(error => console.error('Error insertando estudiante:', error));
  }
  