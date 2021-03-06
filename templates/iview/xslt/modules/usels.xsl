<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE xsl:stylesheet SYSTEM "ulang://i18n/constants.dtd:file"[
    <!ENTITY nbsp  "&#xA0;">
    <!ENTITY copy  "&#169;">
    <!ENTITY mdash "&#8212;">
    
    <!ENTITY laquo  "&#171;">
    <!ENTITY raquo  "&#187;">
    
    <!ENTITY rarr  "&#8594;">
    <!ENTITY larr  "&#8592;">  
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<!-- [Usel comment] -->

	<xsl:template match="udata" mode="usel_mode">
		
		<xsl:apply-templates select="page" mode="usel_mode" />
		    	
	</xsl:template>
	
	
	<xsl:template match="page" mode="usel_mode">
		
		
		
	</xsl:template>

	<!-- /[Usel comment] -->

</xsl:stylesheet>