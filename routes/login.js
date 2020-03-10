var express = require('express');
var router = express.Router();
var seRegistro = require('../controllers/registrado');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Github Empleos' });
});



/* post home page. */
router.post('/login', function(req, res, next) {
  var userController = require('../controllers/users');
  userController.login(req, res, next);
});



 /* POST estado de LogIn. */
 router.post('/estadoLog', function(req, res, next) {
  seRegistro.registrado = req.body.estado;
  let data = {resultado: "ok"};
  res.send(data);
});

/* GET estado LonIn. */
router.get('/estadoLog', function(req, res, next) {
  let data = {resultado: seRegistro.registrado};
  res.send(data);
});

/* GET estado recienIngresado. */
router.get('/estadoRecianIngresado', function(req, res, next) {
  let data = {resultado: seRegistro.recienIngresado};
  res.send(data);
  seRegistro.recienIngresado = false;
});

/* POST estado de LogIn. */
router.post('/desLog', function(req, res, next) {
  seRegistro.registrado = false;
  seRegistro.recienIngresado = true;
  let data = {resultado: true};
  res.send(data);
});





module.exports = router;
