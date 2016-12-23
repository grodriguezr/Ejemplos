var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile('./index.html', null, function (error, data) {
        if(error){//si ocurre un error leyéndo el archivo
            response.writeHead(404);
            response.write('Archivo no encontrado');
        }else{
            response.write(data);
        }
        response.end();
    });
}).listen(8000);