var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/get-data', function (req, res, next) {
    var resultArray = [];//array que contendrá los valores que regresa la base de datos
    /*var data = userData.find({});
    data.on('success', function (docs) {
        res.render('index', {items: docs});
    });*/
    userData.find({}, function(err, docs) {
        if (err) throw err;
        res.render('index', {items: docs});
    });
});

router.post('/insert', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    userData.insert(item);

    res.redirect('/get-data');
});

router.post('/update', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var id = req.body.id;
    //userData.update({"_id": db.id(id)}, item);
    userData.update(id, item);

    res.redirect('/get-data');
});

router.post('/delete', function (req, res, next) {
    var id = req.body.id;
    userData.remove(id);

    res.redirect('/get-data');
});

module.exports = router;