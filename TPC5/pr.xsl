<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
            <html>
                <head>
                    <title>Project record do tpc5</title>
                    <style>
                        hr {
                            border-top: 3px double dashed black;
                        }
                    </style>
                </head>
                <body>
                    <h1 style="text-align:center;">Project record de do tpc5</h1>
                    <xsl:apply-templates/>
                </body>
            </html>         
    </xsl:template>
    
    <!-- Templates do conteudo -->
    <xsl:template match="meta">
        <ul style="list-style-type: none;">
            <hr>
                <h3>META_INFO:</h3>
                <li><b>KEYNAME: </b><xsl:value-of select="key"/></li>
                <li><b>TITLE: </b><xsl:value-of select="title"/></li>
                <li><b>SUBTITLE: </b><xsl:value-of select="subtitle"/></li>
                <li><b>BEGIN DATE: </b><xsl:value-of select="bdate"/></li>
                <li><b>END DATE: </b><xsl:value-of select="edate"/></li>
                <li><b>SUPERVISOR: </b> <a href="{supervisor/@url}"><xsl:value-of select="supervisor"/></a></li>
            </hr>
        </ul>
    </xsl:template>
    
    <xsl:template match="team">
        <hr>
            <ul style="list-style-type: none;">
                <h3>WORKTEAM:</h3>
                <xsl:apply-templates mode="te"/>
            </ul>
        </hr>
    </xsl:template>
    
    <xsl:template match="member" mode="te">
        <li>
            <p><b>NAME: </b><xsl:value-of select="name"/></p>
            <p><b>ID: </b><xsl:value-of select="@id"/></p>
            <p><b>GIT: </b><a href="{url}"> <xsl:value-of select="url"/></a></p>
        </li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <hr>
            <h3>ABSTRACT:</h3>
            <xsl:apply-templates/>
        </hr>   
    </xsl:template>

    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <hr>
            <ul>
                <h3>DELIVERABLES:</h3>
                <xsl:apply-templates mode="dl"/>
            </ul>
        </hr>
    </xsl:template>
    
    <xsl:template match="link" mode="dl">
        <li>
            <a href="{@url}"> <xsl:value-of select="."/> </a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>