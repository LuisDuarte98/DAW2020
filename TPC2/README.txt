Para o web browser, Mozilla Firefox, conseguir estabelecer a linkagem entre o ficheiro xml
e o ficheiro xsl referenciado foi necessário mudar na sua configuração a flag: "security.fileuri.strict_origin_policy"
para false. 
Isto acontece devido á especificação de segurança "CORS", que estava a falhar no momento em
que o browser tentava obter via HTTP o ficheiro ".xsl" => O seguinte código de erro era apresentado:
"cors request not http local file"