<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<title>
					<xsl:value-of select="parent/caption"/>
				</title>
			</head>
			<body title="{parent/caption}" style="background-color: #777; font-family: georgia">
				<h3>
					<xsl:value-of select="parent/caption"/>
				</h3>
				<ul>
					<xsl:for-each select="parent/sibling">
					<li style="color: #0000ff; margin: 5px">
						<xsl:value-of select="@title"/>
						<xsl:for-each select="child">
							<ul>
								<li style="color: #ff0000; list-style: square; margin: 5px">
								<xsl:value-of select="child::text()"/>
									<xsl:for-each select="branch">
										<ul>
											<li style="margin: 5px; list-style: circle">
												<xsl:value-of select="."/>
											</li>
										</ul>
									</xsl:for-each>
								</li>
							</ul>
						</xsl:for-each>
					</li>
					</xsl:for-each>
				</ul>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>