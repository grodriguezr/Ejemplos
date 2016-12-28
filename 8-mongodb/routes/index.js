var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');//modulo para comparaciones
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/get-data', function (req, res, next) {
    var resultArray = [];//array que contendrá los valores que regresa la base de datos
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();//la variable cursor tendrálos valores extraidos de la base de datos
        cursor.forEach(function (doc, err) {//cada valor es colocado en el array
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {//segunda función callback para mostrar los datos en la vista, se hce con tra función para asegurarse que sí hayan datos en la variablle cursor
            db.close();
            res.render('index', {items: resultArray});//se envían los datos a la vista
        });
    });
});

router.post('/insert', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    mongo.connect(url, function (err, db) {//conexión a base de datos, esto puede resultar en error o en éxito
        assert.equal(null, err);
        db.collection('user-data').insertOne(item, function (err, result) {//tabla? (colección) en la que se insertarán los datos
            assert.equal(null, err);
            console.log('Item insertado');
            db.close();
        });
    });
    res.redirect('/get-data');
});

router.post('/update', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var id = req.body.id;
    mongo.connect(url, function (err, db) {//conexión a base de datos, esto puede resultar en error o en éxito
        assert.equal(null, err);
        db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function (err, result) {//tabla? (colección) en la que se insertarán los datos
            assert.equal(null, err);
            console.log('Item actualizado');
            db.close();
        });
    });
    res.redirect('/get-data');
});

router.post('/delete', function (req, res, next) {
    var id = req.body.id;
    mongo.connect(url, function (err, db) {//conexión a base de datos, esto puede resultar en error o en éxito
        assert.equal(null, err);
        db.collection('user-data').deleteOne({"_id": objectId(id)}, function (err, result) {//tabla? (colección) en la que se insertarán los datos
            assert.equal(null, err);
            console.log('Item eliminado');
            db.close();
        });
    });
    res.redirect('/get-data');
});

module.exports = router;