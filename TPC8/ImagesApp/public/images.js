function showImage(name, type){
    if(type == 'image/png' || type == 'image/jpeg'){
        var ficheiro = $('<img src="/fileStore/' + name + '"width="80%"/>')
    }
    else
        var ficheiro = $('<p>' + name + ', ' + type + '</p>')
var download = $('<div><a href="/files/download/' + name + '">Download</a></div>"')
$("#display").empty()
$("#display").append(ficheiro, download)
$("#display").modal()
}