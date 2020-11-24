/*
<=== Main node server ===>
*/

// Imports
var http = require('http')
var axios = require('axios')
var {parse} = require('querystring')
var cp = require('./create_pages.js')
var st = require('./static.js')
const { url } = require('inspector')

// Funções auxiliares

// Devolução informação presente no body 
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// Main server
var server = http.createServer(function (req,res) {

    // Logger: Que pedido chegou e quando 
    var date = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + date)
    if(st.recursoEstatico(req)){
        st.sirvoRecursoEstatico(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // Página inicial 
                if((req.url == "/") || (req.url == "/tarefas")){
                    axios.get("http://localhost:3000/tarefas")
                        .then(response => {
                            var tarefas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(cp.criaPagTarefas(tarefas))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas.</p>")
                            res.end()
                        })
                }
                else{
                    // Pagina de uma tarefa especifica
                    if (/\/tarefas\/[a-zA-Z0-9\%]+$/.test(req.url)){
                        var idTarefa = req.url.split("/")[2]
                        axios.get("http://localhost:3000/tarefas/" + idTarefa)
                        .then(response => {
                            var tarefa = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(cp.criaPagTarefa(tarefa))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a Tarefa " + idTarefa + "</p>")
                            res.end()
                        })
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Recebi um GET não suportado.</p>')
                        res.write('<p><a href="/">Voltar atrás</a></p>')
                        res.end()
                    }
                }
                break
            case "POST":
                // Delete de uma tarefa
                if( (/\/[a-zA-Z0-9\%]+\?delete$/.test(req.url))){
                    var tarefa = req.url.split("/")
                    console.log(tarefa)
                    var idTarefa = tarefa[1].split("?")[0]
                    var url = "http://localhost:3000/tarefas/" + idTarefa
                    console.log(url)
                    axios.delete(url)
                        .then(response => {
                            axios.get("http://localhost:3000/tarefas")
                                .then(response => {
                                    var tarefas = response.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(cp.criaPagTarefas(tarefas))
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tarefas.</p>")
                                    res.end()
                                })
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível eliminar a tarefa " + idTarefa + ".</p>")
                            res.end()
                        })
                }
                else{
                    // Alterar informação
                    if((/\/tarefas\/[a-zA-Z0-9\%]+\?put$/.test(req.url))){
                            idTarefa = req.url.split("/")[2]
                            recuperaInfo(req, resultado => {
                                console.log('PUT de tarefa:' + JSON.stringify(resultado))
                                axios.put('http://localhost:3000/tarefas/' + idTarefa, resultado)
                                    .then(resp => {
                                        var tarefa = resp.data
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(cp.criaPagTarefaConfirm(tarefa))
                                        res.end()
                                    })
                                    .catch(erro => {
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write('<p>Erro no POST: ' + erro + '</p>')
                                        res.write('<p><a href="/">Voltar</a></p>')
                                        res.end()
                                    })
                            })
                    }
                    else{
                        if(req.url == "/tarefas"){
                            recuperaInfo(req, resultado => {
                                console.log('POST de tarefa:' + JSON.stringify(resultado))
                                axios.post('http://localhost:3000/tarefas', resultado)
                                    .then(resp => {
                                        var tarefa = resp.data
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(cp.criaPagTarefaConfirm(tarefa))
                                        res.end()
                                    })
                                    .catch(erro => {
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write('<p>Erro no POST: ' + erro + '</p>')
                                        res.write('<p><a href="/">Voltar</a></p>')
                                        res.end()
                                    })
                            })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Recebi um POST não suportado.</p>')
                            res.write('<p><a href="/">Voltar atrás</a></p>')
                            res.end()
                        }
                    }
                }
                break
            default : 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + "Pedido = " + req.method + " não suportado. </p>")
                res.end()
                break
        }
    }


}).listen(7777)
console.log("Servidor à escuta na porta 7777")