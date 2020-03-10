var express = require('express');
var router = express.Router();
var seRegistro = require('../controllers/registrado');

/* GET home page. */
router.get('/', function(req, res, next) {
 
  if(seRegistro.registrado){
    res.render('jobs', { title: 'Github Empleos' });
  }else{
    res.render('index', { title: 'Github Empleos - Opcional 2', message: ''});
  }
});

module.exports = router;
