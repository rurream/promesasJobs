var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();
var seRegistro = require('../controllers/registrado');

/* Post user  */
router.post('/', function(req, res, next) {
  userController.user_create(req, res, next);
});

// Esta es la ruta que se debe llamar para traer todos los usuarios del sistema.1
router.get('/', function(req, res, next) {
console.log("Estado de usuario registrado: " + seRegistro.registrado);
  if(seRegistro.registrado){
    res.render('users', { title: 'Github Empleos', message: "" });
  }else{
    res.render('index', { title: 'Github Empleos - Opcional 2', message:"LogIn requerido" });
  }
});

// Esta es la ruta que se debe llamar para traer todos los usuarios del sistema.2
router.get('/lista', function(req, res, next) {
  console.log("Estado de usuario registrado: " + seRegistro.registrado);
    if(seRegistro.registrado){
      userController.all_users(req, res, next);
    }else{

    }
  });

router.post('/login', function (req, res, next) {
  if(req.body.email && req.body.password) {
    userController.login(req, res, next);
  } else {
    return res.status(400).json({
        message : 'Faltan Datos',  error: true
    });
  }
});

module.exports = router;
