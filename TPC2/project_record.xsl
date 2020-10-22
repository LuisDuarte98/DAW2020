<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/project_record">
        <html>
            <head>
                <title>Project Record</title>
                <style>
                    body{
                        background-color: lightgray;
                    }

                    h1 {
                        display: flex;
                        justify-content: center;
                        background-color: lightcyan;
                    }
                    
                    ul {
                        list-style-type: none;
                    }

                    .Container{
                        display: block;
                        background-color: lightcyan;
                    }                   
                </style>
            </head>
            <body>
                <h1>PROJECT RECORD</h1>
                <div class="Container">
                    <h2><b>META-INFO: </b></h2>
                    <xsl:for-each select="meta_info">
                        <ul>
                            <li><b>KEYNAME: </b><xsl:value-of select="keyname"/></li>
                            <li><b>TITLE: </b><xsl:value-of select="title"/></li>
                            <li><b>BEGIN_DATE: </b><xsl:value-of select="begin_date"/></li>
                            <li><b>END_DATE: </b><xsl:value-of select="end_date"/></li>
                            <li><b>SUPERVISOR: </b><a href="{supervisor/@link}"> <xsl:value-of select="supervisor"/></a></li>
                        </ul>
                    </xsl:for-each>
                </div>
                <div class="Container">
                    <h2><b>WORKTEAM: </b></h2>
                    <xsl:for-each select="workteam">
                        <xsl:for-each select="team_element">
                            <ul>
                                <li><b>ID: </b><xsl:value-of select="@id"/></li>
                                <li><b>NAME: </b><xsl:value-of select="name"/></li>
                                <li><b>GIT: </b><a href="{@git}"> <xsl:value-of select="@git"/></a></li>
                            </ul>
                        </xsl:for-each>
                    </xsl:for-each>
                </div>
                <div class="Container">
                    <h2><b>ABSTRACT: </b></h2>
                    <xsl:for-each select="abstract">
                        <xsl:for-each select="text">
                            <ul>
                                <li><xsl:value-of select="."/></li>
                            </ul>
                        </xsl:for-each>
                    </xsl:for-each>
                </div>
                <div class="Container">
                    <h2><b>DELIVERABLES: </b></h2>
                    <xsl:for-each select="deliverables">
                        <xsl:for-each select="link">
                            <ul>
                                <li><a href="{@link}"> <xsl:value-of select="."/></a></li>
                            </ul>
                        </xsl:for-each>
                    </xsl:for-each>
                </div>
            </body>    
        </html>
    </xsl:template>
</xsl:stylesheet> 
