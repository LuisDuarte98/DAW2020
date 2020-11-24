/*
    Module Static - to serve static resources in public folder
*/

var fs = require('fs')


function recursoEstatico(request){
    return /\/favicon.png$/.test(request.url)

                
}

function sirvoRecursoEstatico(req, res){
    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){
            console.log('Erro: ficheiro nÃ£o encontrado ' + erro)
            res.statusCode = 404
            res.end()
        }
        else{
            if(file == '/favicon.ico')
                res.setHeader('Content-Type', 'image/x-icon')
            res.end(dados)
        }
    })
}

exports.sirvoRecursoEstatico = sirvoRecursoEstatico
exports.recursoEstatico = recursoEstatico