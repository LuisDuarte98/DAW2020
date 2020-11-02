<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
            <html>
                <head>
                    <title>Project record de arqueosítios</title>
                    <style>
                        hr {
                            border-top: 3px double dashed black;
                        }
                    </style>
                </head>
                <body>
                    <h1 style="text-align:center;">Project record de arqueossitíos</h1>
                    <xsl:apply-templates/>
                </body>
            </html>         
    </xsl:template>
    
    <!-- Templates do conteudo -->
    <xsl:template match="meta_info">
        <ul style="list-style-type: none;">
            <hr>
                <h3>META_INFO:</h3>
                <li><b>KEYNAME: </b><xsl:value-of select="keyname"/></li>
                <li><b>TITLE: </b><xsl:value-of select="title"/></li>
                <li><b>BEGIN DATE: </b><xsl:value-of select="begin_date"/></li>
                <li><b>END DATE: </b><xsl:value-of select="end_date"/></li>
                <li><b>SUPERVISOR: </b> <a href="{supervisor/@link}"><xsl:value-of select="supervisor"/></a></li>
            </hr>
        </ul>
    </xsl:template>
    
    <xsl:template match="workteam">
        <hr>
            <ul style="list-style-type: none;">
                <h3>WORKTEAM:</h3>
                <xsl:apply-templates mode="te"/>
            </ul>
        </hr>
    </xsl:template>
    
    <xsl:template match="team_element" mode="te">
        <li>
            <p><b>NAME: </b><xsl:value-of select="name"/></p>
            <p><b>ID: </b><xsl:value-of select="@id"/></p>
            <p><b>GIT: </b><a href="{@git}"> <xsl:value-of select="@git"/></a></p>
        </li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <hr>
            <h3>ABSTRACT:</h3>
            <xsl:apply-templates mode="txt"/>
        </hr>   
    </xsl:template>
    
    <xsl:template match="text" mode="txt">
        <p>
            <xsl:value-of select="."/>
        </p>
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
            <a href="{@link}"> <xsl:value-of select="."/> </a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>