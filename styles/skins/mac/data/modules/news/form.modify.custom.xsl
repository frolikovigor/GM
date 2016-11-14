<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:umi="http://www.umi-cms.ru/TR/umi">
    <xsl:template match="field[@type = 'string' and @name = 'list_news']" mode="form-modify">
        <style>
            .news{border:1px solid #ccc; margin:0px 20px 30px 0px; display:inline-block; width:300px; padding:10px; vertical-align:top;}
            .paginated li {display:inline;}
            .paginated li a{border:1px solid #ccc; padding:5px 10px; display:inline;}
            .paginated li.active a{border:1px solid red;}
            .news .title{height: 50px;overflow: auto; margin-bottom:5px;font-size: 11pt;}
            .news .date{margin-bottom:5px; color:#999;}
            .news .description{height: 50px;overflow: auto; margin-bottom:5px;}
            .news .image{margin-bottom:5px;height: 190px;}
            .news .full_text{height: 250px;overflow: auto; margin-bottom:15px;}
            .news .symlink {width:100% !important;}
            .news .label acronym {font-weight:bold !important;}
            .news .buttons {margin-top:10px;}
        </style>
        <script>
            function del_news(id){
                $.ajax({
                    url : "/udata/news/delNewsMysql/"+id,
                    type : "POST",
                    dataType : 'html',
                    success : function(data) {
                        $(".news[data-id='"+id+"']").remove();
                    }
                });
            };
        </script>
        <xsl:variable name="listNews" select="document(concat('udata://news/listNewsSql/',//page/@object-id))" />
        <xsl:apply-templates select="$listNews//items/item" mode="list_news"></xsl:apply-templates>
        <ul class="paginated">
            <xsl:apply-templates select="document(concat('udata://system/numpages/',$listNews//total,'/',$listNews//per_page,'///30'))//item" mode="numpages"/>
        </ul>
    </xsl:template>

    <xsl:template match="item" mode="list_news">
        <div class="news" data-id="{@id}">
            <div class="title"><a target="_blank" href="{@link}"><xsl:value-of select=".//title" disable-output-escaping="yes" /></a></div>
            <div class="date"><xsl:value-of select="@date" /></div>
            <div class="description"><xsl:value-of select=".//description" disable-output-escaping="yes" /></div>
            <div class="image"><img src="{@image}" width="300" /></div>
            <div class="full_text"><xsl:value-of select=".//content" disable-output-escaping="yes" /></div>
            <div class="buttons">
                <div style="float:left;">
                    <input type="button" class="del_news" onclick="del_news({@id})" value="Удалить новость" data-id="{@id}" /><span class="l"></span><span class="r"></span>
                </div>
                <div>
                    <!--<a href="/polls/new_poll/?fnm={@id}" target="_blank"><input type="button" value="Создать опрос" data-id="{@id}" /><span class="l"></span><span class="r"></span></a>-->
                    <a href="/vote/addArticleFromNews/{@id}" target="_blank"><input type="button" value="Создать статью" data-id="{@id}" /><span class="l"></span><span class="r"></span></a>
                </div>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="total" mode="paginated" />

    <xsl:template match="udata[@method = 'numpages'][count(items)]" mode="paginated" />


    <xsl:template match="udata[@method = 'numpages']" mode="paginated" >

        <ul class="paginated">

            <xsl:apply-templates select="toprev_link" />
            <xsl:apply-templates select="items/item" mode="numpages" />
            <xsl:apply-templates select="tonext_link" />

            <li class="clear"></li>
        </ul>

    </xsl:template>


    <xsl:template match="item" mode="numpages">
        <li>
            <xsl:if test="@is-active">
                <xsl:attribute name="class">
                    <xsl:text>active</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <a href="{@link}">
                <xsl:value-of select="." />
            </a>
        </li>
    </xsl:template>


</xsl:stylesheet>