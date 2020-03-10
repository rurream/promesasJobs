window.onload = function () {

    //consultar por logIn
    $.ajax({
 
        type: "get",
        url: "http://localhost:3000/login/estadoLog",
       accept: "application/json",
        success: function (data) {

            if(data){
                if(data.resultado){
                    $('#usuario').show();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: " + XMLHttpRequest + "Status: " + textStatus + "Error: " + errorThrown)
        }
    });

    //llamado a formulario ListaJobs
     $('#jobs').click(function () {
        
        location.href = "http://localhost:3000/jobs";
       
     });
 
 
     //Llamado a Mostrar Lista de Registrados
     $('#listaRegistrados').click(function () {

        location.href = "http://localhost:3000/users";

     });


     $('#opSalir').on('click', function(){
        $.ajax({
 
            type: "post",
            url: "http://localhost:3000/login/desLog",
           accept: "application/json",
            success: function (data) {
        
                if(data){
                    if(data.resultado){
                        location.href = "http://localhost:3000/";
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("XMLHttpRequest: " + XMLHttpRequest + "Status: " + textStatus + "Error: " + errorThrown)
            }
        });
     });
 
 
    
 };