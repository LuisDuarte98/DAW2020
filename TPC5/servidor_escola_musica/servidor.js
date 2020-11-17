var http = require('http')
var axios = require('axios')


http.createServer(function(req,res){
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.write('<h2> Escola de música </h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos"> Lista de alunos </a></li>')
            res.write('<li><a href="/cursos"> Lista de cursos </a></li>')
            res.write('<li><a href="/instrumentos"> Lista de instrumentos </a></li>')
            res.write('</ul>')
        }
        else{
            if (req.url == '/alunos'){
                axios.get('http://localhost:3000/alunos')
                .then(resp => {
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                    res.write('<h2> Lista de Alunos </h2>')
                    res.write('<ul>')
                    alunos = resp.data
                    alunos.forEach(a=>{
                        res.write('<li><a href=/alunos/' + a.id + '>' + a.id + ' - ' + a.nome + '<a></li>')
                    })
                    res.write('</ul>')
                    res.write('<address>[<a href="/"> Volta à página incial </a>]</address>')
                    res.end()
                })
                .catch(error => {
                    console.log("Erro na obtenção da lista de alunos: " + error)
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                    res.write("<p>Erro na obtenção da lista de alunos</p>")
                    res.end()
                })
            }
            else{
                if(req.url == '/cursos'){
                    axios.get('http://localhost:3000/cursos')
                        .then(resp => {
                            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                            res.write('<h2> Lista de Cursos </h2>')
                            res.write('<ul>')
                            cursos = resp.data
                            cursos.forEach(c=>{
                                res.write('<li><a href=/cursos/' + c.id + '>' + c.id + ' - ' + c.designacao + '</li>')
                            })
                            res.write('</ul>')
                            res.write('<address>[<a href="/"> Volta à página incial </a>]</address>')
                            res.end()
                        })
                        .catch(error => {
                            console.log("Erro na obtenção da lista de cursos: " + error)
                            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Erro na obtenção da lista de cursos</p>")
                            res.end()
                        })
                }
                else{
                    if(req.url == '/instrumentos'){
                        axios.get('http://localhost:3000/instrumentos')
                        .then(resp => {
                            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                            res.write('<h2> Lista de Intrumentos </h2>')
                            res.write('<ul>')
                            instrumentos = resp.data
                            instrumentos.forEach(i=>{
                                res.write('<li><a href=/instrumentos/' + i.id + '>' + i.id + '</li>')
                            })
                            res.write('</ul>')
                            res.write('<address>[<a href="/"> Volta à página incial </a>]</address>')
                            res.end()
                        })
                        .catch(error => {
                            console.log("Erro na obtenção da lista de instrumentos: " + error)
                        })
                    }
                    else{
                        if(req.url.match(/\/alunos\/[A-Z][0-9]{4}[0-9]?$/) || req.url.match(/\/alunos\/AE-[0-9]{3}$/) ){
                            cod_aluno = req.url.split("/")[2]
                            axios.get('http://localhost:3000/alunos/' + cod_aluno)
                            .then(resp => {
                                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})                          
                                aluno = resp.data
                                res.write("<ul>")
                                res.write("<li> Id = " + aluno.id + "</li>")
                                res.write("<li> Nome = " + aluno.nome + "</li>")
                                res.write("<li> Data Nascimento = " + aluno.dataNasc + "</li>")
                                res.write("<li> Curso = " + aluno.curso + "</li>")
                                res.write("<li> Ano do curso = " + aluno.anoCurso + "</li>")
                                res.write("<li> instrumentos = " + aluno.instrumento + "</li>")
                                res.write("</ul>")
                                res.write('<address>[<a href="/alunos"> Volta à lista de alunos </a>]</address>')
                                res.end()
                            })
                            .catch(error => {
                                console.log("Erro na obtenção do aluno: " + error)
                                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                                res.write("<p>Codigo de aluno não existe: " + cod_aluno + "</p>")
                                res.end()
                            })
                        }
                        else{
                            if(req.url.match(/\/cursos\/C(S|B)[0-9][0-9]?$/)){
                                cod_curso = req.url.split("/")[2]
                                axios.get('http://localhost:3000/cursos/' + cod_curso)
                                .then(resp => {
                                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})                          
                                    curso = resp.data
                                    res.write("<ul>")
                                    res.write("<li> Id = " + curso.id + "</li>")
                                    res.write("<li> Designação = " + curso.designacao + "</li>")
                                    res.write("<li> Duração = " + curso.duracao + "</li>")
                                    res.write("<li> Instrumento = " + curso.instrumento['#text'] + "</li>")
                                    res.write("</ul>")
                                    res.write('<address>[<a href="/cursos"> Volta à lista de cursos </a>]</address>')
                                    res.end()
                                })
                                .catch(error => {
                                    console.log("Erro na obtenção do curso: " + error)
                                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                                    res.write("<p>Codigo de curso não existe: " + cod_curso + "</p>")
                                    res.end()
                                })
                            }
                            else{
                                if(req.url.match(/\/instrumentos\/(I|X)[0-9][0-9]?$/)){
                                    cod_instrumento = req.url.split("/")[2]
                                    axios.get('http://localhost:3000/instrumentos/' + cod_instrumento)
                                    .then(resp => {
                                        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})                          
                                        instrumento = resp.data
                                        res.write("<ul>")
                                        res.write("<li> Id = " + instrumento.id + "</li>")
                                        res.write("<li> Nome = " + instrumento['#text'] + "</li>")
                                        res.write("</ul>")
                                        res.write('<address>[<a href="/instrumentos"> Volta à lista de instrumentos </a>]</address>')
                                        res.end()
                                    })
                                    .catch(error => {
                                        console.log("Erro na obtenção do instrumento: " + error)
                                        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                                        res.write("<p>Codigo de instrumento não existe: " + cod_instrumento + "</p>")
                                        res.end()
                                    })
                                }
                                else{
                                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                                    res.end()
                                }
                            }
                        }
                       
                    }
                }

            }
        }
    }
    else{
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
}).listen(4000)

