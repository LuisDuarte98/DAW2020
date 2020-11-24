/*
    Module Static - to serve html pages
*/


// Geração form para adicionar uma tarefa
function criaAddTarefa(){
    return `
        <h1> TO-DO LIST </h1><hr>
        <h2> Adicionar uma tarefa: </h2>
        <form method="POST" action="/tarefas">
            <div class="add">
                Nome da tarefa:
                <input type="text" name="id" maxlength="30"/>
                </br>
                Descrição da tarefa:</br> 
                <textarea rows="5" cols="60" wrap="physical" name="descricao">
                </textarea>
                </br>
                Data início: &nbsp&nbsp&nbsp&nbsp
                <input type="text" name="data_inicial" maxlength="30"/>
                </br>
                Data fim: &nbsp&nbsp&nbsp
                <input type="text" name="data_final" maxlength="30"/>
                </br>
                Status atual: </br>
                <select name="status">
                    <option>Pendente</option>
                    <option>Em execução</option>
                    <option>Cancelado</option>
                    <option>Concluido</option>
                </select>
                <input type="submit" value="Enviar" />
            </div>
        </form>
        <hr>
        
    `
}

// Geração da pagina html principal
function criaPagTarefas(tarefas){
    // Geração da base da pagina
    let pagHTML = `
    <html>
    <head>
        <title>To-Do List</title>
        <meta charset="utf-8"/>
        <style>
            h1 {
                text-align:center;
            }
            ul{
                list-style-type: square;
            }
            .row{
                clear:both;
            }
            .column{
                width: 50%;
                float: left;
            }
            hr.style-one {
                border: 0;
                height: 1px;
                background: #333;
                background-image: linear-gradient(to right, #ccc, #333, #ccc);
            }
            .add {
                width: 500px;
                clear: both;
            } 
            .add input {
                width: 100%;
                clear: both;
              }
        </style>
    </head>
    <body>
    `
    pagHTML += criaAddTarefa()
    pagHTML += `
        <h2>As Minhas Tarefas:</h2>
        <div class = "row">
    `

    // Geração da lista de tarefas pendentes
    pagHTML += `<div class = "column">
                    <h3>Pendente:</h3>
                    <ul>`
    tarefas.forEach(t=> {
        if (t.status == "Pendente"){
            pagHTML += `<li>
                            <a href="tarefas/${t.id}"> ${t.id}</a>
                            <form action="${t.id}?delete" method="POST">
                                <button type = "submit"> Delete
                                </button>
                            </form>   
                        </li>
                        `
        }
    })
    pagHTML += `    </ul>
                </div>`

    // Geração da lista de tarefas em execução
    pagHTML += `<div class = "column">
                    <h3>Em execução:</h3>
                    <ul>`
    tarefas.forEach(t=> {
        if (t.status == "Em execução"){
            pagHTML += `<li>
                            <a href="tarefas/${t.id}"> ${t.id} </a>
                            <form action="${t.id}?delete" method="POST">
                                <button type = "submit"> Delete
                                </button>
                            </form>   
                        </li>
                        `
        }
    })
    pagHTML += `    </ul>
                </div>`

    // Geração da lista de tarefas canceladas
    pagHTML += `<div class = "column">
                    <h3>Cancelado:</h3>
                    <ul>`
    tarefas.forEach(t=> {
        if (t.status == "Cancelado"){
            pagHTML += `<li>
                            <a href="tarefas/${t.id}"> ${t.id} </a>
                            <form action="${t.id}?delete" method="POST">
                                <button type = "submit"> Delete
                                </button>
                            </form>   
                        </li>
                        `
        }
    })
    pagHTML += `    </ul>
                </div>`
    
    // Geração da lista de tarefas conculídas
    pagHTML += `<div class = "column">
                    <h3>Concluído :</h3>
                    <ul>`
    tarefas.forEach(t=> {
        if (t.status == "Concluido"){
            pagHTML += `<li>
                            <a href="tarefas/${t.id}"> ${t.id} </a>
                            <form action="${t.id}?delete" method="POST">
                                <button type = "submit"> Delete
                                </button>
                            </form>   
                        </li>
                        `
        }
    })
    pagHTML += `    </ul>
                </div>
            </div>
               `
    pagHTML += `<script src="server.js">
                </script>`

    return pagHTML
}

// Geração da pagina de uma tarefa especifica
function criaPagTarefa(tarefa){
    return `
    <head>
        <title>Tarefa ${tarefa.id}</title> 
    </head>
    <body>
        <form method="POST" action="/tarefas/${tarefa.id}?put">
                <div class="add">
                    Nome da tarefa:
                    <input type="text" name="id" maxlength="30" value="${tarefa.id}"/>
                    </br>
                    Descrição da tarefa:</br> 
                    <textarea rows="5" cols="60" wrap="physical" name="descricao"">
                        ${tarefa.descricao}
                    </textarea>
                    </br>
                    Data início: &nbsp&nbsp&nbsp&nbsp
                    <input type="text" name="data_inicial" maxlength="30" value="${tarefa.data_inicial}"/>
                    </br>
                    Data fim: &nbsp&nbsp&nbsp
                    <input type="text" name="data_final" maxlength="30" value="${tarefa.data_final}""/>
                    </br>
                    Status atual: </br>
                    <select name="status" value="${tarefa.status}">
                        <option>Pendente</option>
                        <option>Em execução</option>
                        <option>Cancelado</option>
                        <option>Concluido</option>
                    </select>
                    <input type="submit" value="Enviar" />
                    </br>
                    <a href ="/"> Voltar à página inicial </a>
                </div>
            </form>
        </body>
    `

}


// Geração da pagina de uma tarefa especifica após inserida
function criaPagTarefaConfirm(tarefa){
    return `
    <html>
        <head>
            <title>Tarefa inserida</title>
            <meta charset="utf-8"/>
            <style>
                ul{
                    list-style-type: none;
                }
            </style>
        </head>
        <body>
            <h3>Tarefa adicionada/alterada com sucesso</h3>
            <ul>
                <li>
                    <p><b>Id : </b>${tarefa.id}</p>
                    <p><b>Descrição : </b>${tarefa.descricao}</p>
                    <p><b>Data início :</b>${tarefa.data_inicial}</p>
                    <p><b>Data fim : </b>${tarefa.data_final}</p>
                    <p><b>Status : </b>${tarefa.status}</p>
                    <p><a href="/">Voltar à página inicial</a></p>
                </li>
            </ul>
        </body>
    </html>     
    `
}

exports.criaAddTarefa = criaAddTarefa
exports.criaPagTarefas = criaPagTarefas
exports.criaPagTarefa = criaPagTarefa
exports.criaPagTarefaConfirm = criaPagTarefaConfirm