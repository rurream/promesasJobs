// $(document).ready( function () {
//     $('#users_table').DataTable();
// } );

    const base_url = 'http://localhost:3000';
   
    // Desafío 1 ->
    const getUsers = async () => {
      
        try {
            let lista = await axios(base_url + "/users/lista");
           
            if (lista && lista.data.length > 0) {
                let contenidoTablaEncabezado = "";
                let contenidoTabla = "";
                lista.data.forEach(function (ITEM) {
                    if (contenidoTablaEncabezado == "") {
                        contenidoTablaEncabezado = "<tr><th>Nombre</th><th>Apellido</th><th>Correo</th></tr>";
                    }
                    contenidoTabla = contenidoTabla + `<tr><td>${ITEM.name}</td><td>${ITEM.lastname}</td><td>${ITEM.email}</td></tr>`;
                });
                $('#users_table thead').html(contenidoTablaEncabezado);
                $('#users_table tbody').html(contenidoTabla);
                $('#users_table').DataTable({
                    language: {
                        emptyTable: "No se encontraron datos.",
                        info:       "Mostrando _START_ a _END_ de _TOTAL_ registros.",
                        infoEmpty:  "Mostrando 0 a 0 de 0 registros",
                        lengthMenu:     "Mostrando _MENU_ registros",
                        search: "Buscar:",
                        paginate: {
                            first:      "Primera",
                            last:       "Ultima",
                            next:       "Siguiente",
                            previous:   "Anterior"
                        },
                    }
                });
            } else {
                alert("No se encuentran usuarios registrados.");
            }

        } catch (error) {
            console.log(error);
        }

    }


    getUsers();



