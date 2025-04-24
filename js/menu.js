document.addEventListener("DOMContentLoaded", function() {
    fetch('menu.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('menuContainer').innerHTML = data;
      })
      .catch(error => {
        console.error('Error_cargando_el_menú:', error);

      });
  });
  
