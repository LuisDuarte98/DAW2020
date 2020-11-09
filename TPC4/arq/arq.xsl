<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:result-document href="arq_website/index.html">
            <html>
                <head>
                    <title>Arquivo de arqueossitíos</title>
                </head>
                <body>
                    <h1 style="text-align:center;">Arquivo de arqueossitíos</h1>
                    <h2 style="text-align:center;">Indíce de arqueossitíos</h2>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="pages"/>
    </xsl:template>
    
    <!-- Template do indice -->
    <xsl:template match="ARQELEM" mode="indice">
        <xsl:variable name ="nr" select="count( preceding-sibling::*)" />
        <li>
            <a name="i{$nr}"/>
            <a href="{$nr}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates do conteudo -->
    <xsl:template match="ARQELEM" mode="pages">
        <xsl:variable name ="nr" select="count( preceding-sibling::*)" />
        <xsl:result-document href="arq_website/{$nr}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <a name="{generate-id()}"/>
                    <xsl:apply-templates mode="content"/>
                </body>
                <footer><address><a href="index.html#i{$nr}">Voltar ao índice</a></address></footer>
            </html>
        </xsl:result-document>
    </xsl:template>

    <xsl:template match="IDENTI" mode="content">
        <p><b>Identificação: </b> <xsl:value-of select="."/></p>
    </xsl:template>
   
    <xsl:template match="IMAGEM" mode="content">
        <p><b>Imagem: </b></p>
        <img src="{@NOME}"/>
    </xsl:template>
    
    <xsl:template match="DESCRI" mode="content">
        <p><b>Descrição: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
   
    <xsl:template match="LUGAR" mode="content">
        <p><b>Lugar: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
    
    <xsl:template match="FREGUE" mode="content">
        <p><b>Freguesia: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
    
    <xsl:template match="CONCEL" mode="content">
        <p><b>Concelho: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
   
    <xsl:template match="DESARQ" mode="content">
        <p><b>Desenho arqueológico: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
   
    <xsl:template match="CRONO" mode="content">
        <p><b>Cronologia: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="CODADM" mode="content">
        <p><b>Código administrativo: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LATITU" mode="content">
        <p><b>Latitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="LONGIT" mode="content">
        <p><b>Longitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ALTITU" mode="content">
        <p><b>Altitude: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="ACESSO" mode="content">
        <p><b>Acesso: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="QUADRO" mode="content">
        <p><b>Enquadramento: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="TRAARQ" mode="content">
        <p><b>Trajeto arqueológico: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="DEPOSI" mode="content">
        <p><b>Depósito: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERE" mode="content">
        <p><b>Interesse: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="INTERP" mode="content">
        <p><b>Interpretação: </b> <xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="AUTOR" mode="content">
        <p><b>Autor: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
    
    <xsl:template match="DATA" mode="content">
        <p><b>Data: </b> <xsl:value-of select="."/> </p>
    </xsl:template>
    
    <xsl:template match="BIBLIO" mode="content">
        <p><b>Bibliografia: </b><xsl:value-of select="."/> </p>
    </xsl:template>
    
</xsl:stylesheet>