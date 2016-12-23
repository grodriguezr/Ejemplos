var http = require('http');
var modulo1 = require('./modulo1');
var modulo2 = require('./modulo2');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.write(modulo2.miVariable);//llamo al string de módulo1
    modulo2.miFuncion();//ejecuto la función
    response.end();
}).listen(8000);