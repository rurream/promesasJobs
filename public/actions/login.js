// DESAFÍO 2 ->





// console.log("evaluando logeo");
    //consultar por logIn
    let usuarioLogeado = false;
    $.ajax({
 
        type: "get",
        url: "http://localhost:3000/login/estadoLog",
       accept: "application/json",
        success: function (data) {
    
            if(data){
                if(data.resultado){
                    $('#formLogIn').hide();
                    $('#usuario').show();
                    usuarioLogeado=true;
                }else{
                    $('#formLogIn').show();
                    $('#usuario').hide();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: " + XMLHttpRequest + "Status: " + textStatus + "Error: " + errorThrown)
        }
    });

    $.ajax({
 
        type: "get",
        url: "http://localhost:3000/login/estadoRecianIngresado",
       accept: "application/json",
        success: function (data) {
    
            if(data){
                if(!data.resultado && !usuarioLogeado){
                    Swal.fire('Para acceder al contenido del sitio, debe ingresar credenciales !');
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: " + XMLHttpRequest + "Status: " + textStatus + "Error: " + errorThrown)
        }
    });















const base_url = 'http://localhost:3000';

let form = document.getElementById('login');


form.addEventListener('submit', function (event) {
    event.preventDefault()
    // console.log("click");

    const email = document.querySelector('#log-mail').value;
    const password = document.querySelector('#log-pass').value;

    const data = {
        email,
        password
    };

    logIn(data);
    //trabajos();
})


const logIn = async (data) => {
    $('#login-error').html("");
    try {
        const resp = await axios.post(`${base_url}/login/login`, data);
        if (resp.data) {
            //data exist
            // console.log(resp.data);
            if (resp.data.respuesta == "OK") { //vanilla JS

                //trabajos();
                const data = {
                    estado: true
                }
                declararEstadoLogIn(data);

            } else {
                const data = {
                    estado: false
                }
                declararEstadoLogIn(data);
                $('#login-error').html(resp.data.respuesta);
            }
        }
    } catch (e) {
        console.error(e);
    }
}


const declararEstadoLogIn = async (estado) => {

    try {
        // console.log("Entrando en actions/login (declarar ...) estado:   " +estado);
        // console.log(estado);
        const resp = await axios.post(`${base_url}/login/estadoLog`, estado);
        // console.log("desde actions/login respuesta:   " +resp);
        if (resp.data) {
            if (resp.data.resultado == "ok") {
                // mostrar usuario
                $('#usuario').show();
                $('#formLogIn').hide();
                $('.bienvenida').show("slow");
                setTimeout(function(){
                    $(".bienvenida").fadeOut("slow");
                },3000)

            } else {
                $('#formLogIn').show();
            }
        }
    } catch (error) {
        console.log("Resultado de declararEstadoLogIn: " + error);
    }
}


const trabajos = async () => {
    $('#trabajos').html("");
    let contenido = "";
    try {
        let URL = "https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json";

        const listaJobs = await axios.get(URL);
        console.log(listaJobs);

        if (listaJobs) {
            if (listaJobs.data.length > 0) {
                listaJobs.data.forEach(function (ITEM) {

                    if (contenido == "") {
                        contenido = "<table><thead><tr><th>Titulo</th><th>Compañía</th><th>Tipo</th></tr></thead><tbody><tr><td>" + ITEM.title + "</td><td>" + ITEM.company + "</td><td>" + ITEM.type + "</td></tr>";
                    } else {
                        contenido = contenido + "<tr><td>" + ITEM.title + "</td><td>" + ITEM.company + "</td><td>" + ITEM.type + "</td></tr>";
                    }
                });
                contenido = contenido + "</tbody></table>";
                $('#trabajos').html(contenido);
                $('#trabajos').show("slow");

                $('#trabajos').parent().children(':first-child').addClass('acortar');

            } else {
                console.log("Error1");
            }
        }
    } catch (error) {
        console.log(error);
    }
};
// }




