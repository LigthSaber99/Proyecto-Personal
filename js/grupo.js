document.addEventListener('DOMContentLoaded', function() {
    consultarGrupos();
  });
  
  function consultarGrupos() {
    const url = 'https://paginas-web-cr.com/Api/apis/ListaGrupos.php';
  
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarGrupos(data.data))
      .catch(error => console.error('Error consultando grupos:', error));
  }
  
  function mostrarGrupos(grupos) {
    const container = document.getElementById('gruposContainer');
    container.innerHTML = '';
  
    if (grupos.length === 0) {
      container.innerHTML = '<p>No hay grupos registrados.</p>';
      return;
    }
  
    const table = document.createElement('table');
    table.className = 'table table-striped';
  
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        ${grupos.map(grupo => `
          <tr>
            <td>${grupo.id}</td>
            <td>${grupo.nombre}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  
    container.appendChild(table);
  }
  document.addEventListener('DOMContentLoaded', function() {
    consultarGrupos();
  
    const formGrupo = document.getElementById('formGrupo');
    formGrupo.addEventListener('submit', function(event) {
      event.preventDefault();
      insertarGrupo();
    });
  });
  
  // Consultar grupos (GET)
  function consultarGrupos() {
    const url = 'https://paginas-web-cr.com/Api/apis/ListaGrupo.php';
  
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarGrupos(data.data))
      .catch(error => console.error('Error consultando grupos:', error));
  }
  
  // Mostrar grupos en la tabla
  function mostrarGrupos(grupos) {
    const container = document.getElementById('gruposContainer');
    container.innerHTML = '';
  
    if (grupos.length === 0) {
      container.innerHTML = '<p>No hay grupos registrados.</p>';
      return;
    }
  
    const table = document.createElement('table');
    table.className = 'table table-striped';
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        ${grupos.map(grupo => `
          <tr>
            <td>${grupo.id}</td>
            <td>${grupo.nombre}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }
  
  // Insertar grupo (POST)
  function insertarGrupo() {
    const nombre = document.getElementById('nombreGrupo').value;
  
    const url = 'https://paginas-web-cr.com/Api/apis/InsertarGrupo.php';
  
    const datos = { nombre: nombre };
  
    fetch(url, {
      method: 'POST',
    
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del API:', data);
      alert('Grupo agregado exitosamente');
      document.getElementById('formGrupo').reset();
      consultarGrupos();
    })
    .catch(error => console.error('Error insertando grupo:', error));
  }
  