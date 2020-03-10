// PRUEBA FINAL ->

    $('#clave').click(function(){
        if($(this).prop("checked") == true){
            $('#filtroClave').show();
        }
        else if($(this).prop("checked") == false){
            $('#filtroClave').hide();
        }
    });

    $('#localidad').click(function(){
        if($(this).prop("checked") == true){
            $('#filtroLocalidad').show();
        }
        else if($(this).prop("checked") == false){
            $('#filtroLocalidad').hide();
        }
    });

    $('#jornada').click(function(){
        if($(this).prop("checked") == true){
            $('#filtroTipoJornada').show();
        }
        else if($(this).prop("checked") == false){
            $('#filtroTipoJornada').hide();
        }
    });

    $("#filtroClave").change(function(){
        limpiarTabla();
        $('#containerTabla').hide();
      });
      $("#filtroLocalidad").change(function(){
        limpiarTabla();
        $('#containerTabla').hide();
      });
      $("#filtroTipoJornada").change(function(){
        limpiarTabla();
        $('#containerTabla').hide();
      });


    $('#formBuscaJobs').submit(function (e) { 
        e.preventDefault();

        limpiarTabla();

        if($('#clave').prop("checked") == true && $('#filtroClave').val() == ""){
            // console.log("filtroClave");
            Swal.fire('Se debe ingresar un criterio de búsqueda (clave) !');
            return false;
        }
        if($('#localidad').prop("checked") == true && $('#filtroLocalidad').val() == ""){
            Swal.fire('Se debe ingresar un criterio de búsqueda (localidad) !');
            return false;}
        if( $('#jornada').prop("checked") == true && $('#filtroTipoJornada').val() == ""){
            Swal.fire('Se debe seleccionar tipo de jornada !');
            return false;}

        let clave = "";
        let location = "";
        let jornada = "";
        let urlBase = "https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json?";

        if($('#clave').prop("checked") == true){
            clave = "&description=" + $.trim($('#filtroClave').val()).replace(" ", "+");
        }
        if($('#localidad').prop("checked") == true){
            location = "&location=" + $.trim($('#filtroLocalidad').val()).replace(" ", "+");
        }
        if($('#jornada').prop("checked") == true){
            if($('#filtroTipoJornada').val() == "completo"){
                jornada = "&full_time=true" ;
            }else{
                jornada = "&full_time=false" ;
            }
            
        }
        
        geJobs(urlBase + clave + location + jornada);

        
    });

    let x = 0;
    const geJobs = async (urlBusqueda) => {
        $('#modal').show();
        try {
            let lista = await axios(urlBusqueda);

            if (lista && lista.data.length > 0) {
                let contenidoTablaEncabezado = "";
                let contenidoTabla = "";
                lista.data.forEach(function (ITEM) {
                    if (contenidoTablaEncabezado == "") {
                        contenidoTablaEncabezado = "<tr><th>Título (position)</th><th>Compañía</th><th>Localidad</th></tr>";
                    }
                    contenidoTabla = contenidoTabla + `<tr><td>${ITEM.title}</td><td>${ITEM.company}</td><td>${ITEM.location}</td></tr>`;
                });
                $('#tablaListaJobs thead').html(contenidoTablaEncabezado);                              
                $('#tablaListaJobs tbody').html(contenidoTabla);

                if( ! $.fn.DataTable.isDataTable( '#tablaListaJobs' )){
                    $('#tablaListaJobs').DataTable({
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
                }

                
                $('#containerTabla').show();

               
    $('#tablaListaJobs_next').on('click', function(){
        x++;
        console.log("object: " + x);
        // $('#tablaListaJobs_next2').hide();
    });
            }
        } catch (error) {
            
        }
        $('#modal').hide();
    }

    const limpiarTabla = function(){
        $('#tablaListaJobs thead').html("");                              
                $('#tablaListaJobs tbody').html("");
    }



    // $('#tablaListaJobs_next').click(function(){
    //     x++;
    //     console.log("object2: " + x);
    //     // $('#tablaListaJobs_next2').hide();
    // });
   
// }