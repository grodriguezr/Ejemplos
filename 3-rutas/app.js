var url = require('url');
var fs = require('fs');

function renderHTML(path, res) {
    fs.readFile(path, null, function (error, data) {
        if(error){//si ocurre un error leyéndo el archivo
            res.writeHead(404);
            res.write('Archivo no encontrado');
        }else{
            res.write(data);
        }
        res.end();
    });
}

module.exports = {
    handleRequest: function (req, res) {
        res.writeHead(200, {'Content-type': 'text/html'});
        var path = url.parse(req.url).pathname;
        switch (path) {
            case '/':
                renderHTML('./index.html', res);
                break;
            case '/login':
                renderHTML('./login.html', res);
                break;
            default:
                res.writeHead(404);
                res.write('Ruta no definida');
                res.end();
        }
    }

}
