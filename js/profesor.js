document.addEventListener('DOMContentLoaded', function() {
    consultarProfesores();
  
    const formProfesor = document.getElementById('formProfesor');
    formProfesor.addEventListener('submit', function(event) {
      event.preventDefault();
      insertarProfesor();
    });
  });
  
  // Consultar profesores
  function consultarProfesores() {
    const url = 'https://paginas-web-cr.com/Api/apis/ListaProfesores.php';
  
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarProfesores(data.data))
      .catch(error => console.error('Error consultando profesores:', error));
  }
  
  // Mostrar profesores
  function mostrarProfesores(profesores) {
    const container = document.getElementById('profesoresContainer');
    container.innerHTML = '';
  
    if (!profesores.length) {
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
  
  function insertarProfesor() {
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const fechanacimiento = document.getElementById('fechanacimiento').value;
    const sexo = document.getElementById('sexo').value;
    const direccion = document.getElementById('direccion').value;
    const idCarreras = document.getElementById('idCarreras').value;
    const usuario = document.getElementById('usuario').value;
    const nacionalidad = document.getElementById('nacionalidad').value;
  
    const url = 'https://paginas-web-cr.com/Api/apis/InsertarProfesores.php';
  
    const datos = {
      cedula: cedula,
      nombre: nombre,
      apellidopaterno: apellidoPaterno,
      apellidomaterno: apellidoMaterno,
      correoelectronico: correo,
      telefono: telefono,
      telefonocelular: telefono,
      fechanacimiento: fechanacimiento,
      sexo: sexo,
      direccion: direccion,
      idCarreras: idCarreras,
      usuario: usuario,
      nacionalidad: nacionalidad
    };
  
    fetch(url, {
      method: 'POST',
     
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del API:', data);
      alert('Profesor agregado exitosamente');
      document.getElementById('formProfesor').reset();
      consultarProfesores(); // Actualiza la lista
    })
    .catch(error => console.error('Error insertando profesor:', error));
  }
  