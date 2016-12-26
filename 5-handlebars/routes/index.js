var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condicion: true, miArray: [1,2,3]});
});

router.get('/detalle', function(req, res, next) {
    res.send('detalle');
});

module.exports = router;
