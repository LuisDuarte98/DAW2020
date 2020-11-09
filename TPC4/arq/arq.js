var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
    console.log("Chegou pedido: Método=" + req.method + "; URL=" + req.url)
    /*
        Avaliação do pedido é feito dentro da var flag:
        0 = Pedido errado
        1 = FavIcon
        2 = Pedido do indice
        3 = Pedido de uma pag especifica
    */
    var flag = 0
    if (req.url.match("/favicon.ico")) flag = 1
    if (req.url.match(/\/arqs\/index\.html$/)) flag = 2
    if (req.url.match(/(\/arqs\/[0-9]\.html$)|(\/arqs\/[0-9]{2}\.html$)|(\/arqs\/1[0-1][0-9]\.html$)|(\/arqs\/12[0-1]\.html$)/)) flag = 3
    console.log("Veredicto do pedido = " + flag)

    switch(flag){

        case 0:
            console.log(req.url)
            res.writeHead(400,{'Content-Type':'text/html;charset=utf-8;'})
            res.write("<p>O URL não corresponde ao esperado.</p>")
            res.end() 
            break

        case 1:
            console.log("Não há favicon!")
            break
        
        case 2:
            fs.readFile('arq_website/'+ 'index.html',function(err,data){
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
            res.write(data)
            res.end()
            })
            break
        
        case 3:
            var num  = req.url.replace(".html","").split("/")[2]
            console.log("Ficheiro = " + 'arq_website/'+ num + '.html')
            fs.readFile('arq_website/'+ num + '.html',function(err,data){
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
            res.write(data)
            res.end()
            })
            break
        default:
            break    
    }
}).listen(7777)