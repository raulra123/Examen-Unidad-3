$(function () {

  const URI = '/api/products';

  // GET 
  $('#getAlumnos').on('click', () => {
    $.ajax({
      url: URI,
      success: function (datos) {
        let tbody = $('tbody');
        tbody.html('');
        datos.forEach(p => {
          tbody.append(`
              <tr>
                <td class="id">${p.id}</td>
                <td>
                  <input type="text" class="name" value="${p.name}"/>
                </td>
                
                <td>
                  <button class="update-button">Actualizar</button>
                  <button class="delete-button">Eliminar</button>
                </td>
              </tr>
          `)
        })
      }
    });
  });

  // POST 
  $('#alumnoForm').on('submit', (e) => {
    e.preventDefault();
    let newAlumno = $('#newAlumno');
    

    $.ajax({
      url: URI,
      method: 'POST',
      data: {
        name: newAlumno.val()
      },
      success: function(response) {
        newAlumno.val('');
        newApellido.val('');
       $('#getAlumnos').click();
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
  

  //UPDATE
  $('table').on('click', '.update-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let name = row.find('.name').val();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'PUT',
      data: {
        name: name 
      },
      success: function(response) {
        console.log(response);
        $('#getAlumnos').click();
      }
    });
  });

  //DELETE
  $('table').on('click', '.delete-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'DELETE',
      success: function (response) {
       $('#getAlumnos').click();
      }
    });
  });

});
