var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Validación de formulario', success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
  req.session.success = null;
});

router.post('/submit', function (req, res, next) {
    req.check('email', 'Dirección de correo inválida').isEmail();
    req.check('password', 'Contraseña incorrecta').isLength({min: 4}).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }else{
        req.session.success = true;
        console.log(req.session.success);
    }
    res.redirect('/');
});

module.exports = router;
