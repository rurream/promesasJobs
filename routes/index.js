var express = require('express');
var router = express.Router();
var seRegistro = require('../controllers/registrado');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Github Empleos - Opcional 2', message:"Bienvenido !!!"});
});



module.exports = router;
