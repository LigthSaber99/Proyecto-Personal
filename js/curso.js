document.addEventListener('DOMContentLoaded', function() {
  consultarCursos();

  const formCurso = document.getElementById('formCurso');
  formCurso.addEventListener('submit', function(event) {
    event.preventDefault();
    insertarCurso();
  });
});

function consultarCursos() {
  const url = 'https://paginas-web-cr.com/Api/apis/ListaCurso.php';  // Sin la "s"


  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta completa de la API:', data); // Debug, muéstrame esto
      
      // Forzar a usar data.data siempre
      const cursos = data.data || [];
      mostrarCursos(cursos);
    })
    .catch(error => console.error('Error consultando cursos:', error));
}



function mostrarCursos(cursos) {
  const container = document.getElementById('cursosContainer');
  container.innerHTML = ''; // Limpiar contenedor

  console.log('Cursos recibidos en mostrarCursos:', cursos); // Debug

  if (!Array.isArray(cursos) || cursos.length === 0) {
    container.innerHTML = '<p>No hay cursos registrados.</p>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'table table-striped';

  const thead = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Duración</th>
        <th>Usuario</th>
      </tr>
    </thead>`;

  const tbody = `
    <tbody>
      ${cursos.map(curso => `
        <tr>
          <td>${curso.id}</td>
          <td>${curso.nombre}</td>
          <td>${curso.descripcion}</td>
          <td>${curso.tiempo}</td>
          <td>${curso.usuario}</td>
        </tr>
      `).join('')}
    </tbody>`;

  table.innerHTML = thead + tbody;
  container.appendChild(table);
}


function insertarCurso() {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const tiempo = document.getElementById('tiempo').value;
  const usuario = document.getElementById('usuario').value;

  const url = 'https://paginas-web-cr.com/Api/apis/InsertarCursos.php';

  const datos = {
    nombre: nombre,
    descripcion: descripcion,
    tiempo: tiempo,
    usuario: usuario
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del API:', data);
    alert('Curso agregado exitosamente');
    document.getElementById('formCurso').reset();
    consultarCursos();
  })
  .catch(error => console.error('Error insertando curso:', error));
}
