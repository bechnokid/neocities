<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">


  <xsl:output method="html" encoding="utf-8" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" data-theme="light">
      <head>
        <title><xsl:value-of select="/atom:feed/atom:title"/></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="stylesheet" href="https://fonts.upset.dev/css2?family=Mochiy+Pop+One&amp;display=swap"/>
        <link rel="stylesheet" href="/assets/stylesheets/css/feed.css"/>
        <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon"/>
      </head>
      <body id="web-feed" class="bg-primary d-flex justify-content-center align-items-center">
        <div class="container-wrapper d-flex flex-column justify-content-center align-items-center">
          <div class="container bg-body p-4 pt-2">
            <header>
              <h1 class="d-flex align-items-center mt-3"><img src="/assets/images/rss.svg" aria-hidden="true" class="img-svg me-2" alt="" /><xsl:value-of select="/atom:feed/atom:title"/></h1>
              <p class="subtitle"><xsl:value-of select="/atom:feed/atom:subtitle"/></p>
              <div class="d-flex align-items-center my-4"><span class="text-lg me-2">&#x2190;</span><a class="head-link"><xsl:attribute name="href">/home</xsl:attribute>go back home?</a></div>
              <div class="about-feed mx-3 my-4 p-3"><p>Hi! <strong>This is a web feed,</strong> also known as an RSS or Atom feed. You can <strong>subscribe</strong> by copying the below URL into your newsreader.</p>
<p><code>https://bechnokid.neocities.org/feed.xml</code></p>
<p>Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more about feeds and to get started with newsreaders and subscribing. It's completely free!</p>
</div>
            </header>
            <h2>Recent Updates</h2>
            <main>
              <xsl:for-each select="/atom:feed/atom:entry[position() &lt; 5]">
                <div class="ps-2 mb-0">
                  <p class="mb-2">
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="atom:link/@href"/>
                      </xsl:attribute>
                      <xsl:value-of select="atom:title"/>
                    </a>
                  </p>
                  <xsl:if test="atom:content">
                    <xsl:apply-templates select="atom:content"/>
                  </xsl:if>
                </div>
                <xsl:if test="position() != 4">
                  <hr class="small"/>
                </xsl:if>
              </xsl:for-each>
            </main>
          </div>
          <footer>
            <p>© Bechno Kid 2023 - 20XX</p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="atom:content">
		<xsl:param name="copy-xml-attributes" select="true"/>
		<xsl:if test="$copy-xml-attributes">
			<xsl:call-template name="copy-xml-attributes"/>
		</xsl:if>
		<xsl:choose>
			<xsl:when test="@type='xhtml'">
				<!-- TODO: test this actually works -->
				<xsl:copy-of select="child::div/*"/>
			</xsl:when>
			<xsl:when test="@type='html'">
				<!-- Might be nice to use disable-output-escaping="yes", which could obviate the DOMContentLoaded JavaScript, but itâ€™s not universally supported, and Iâ€™m not going to try to conditional it because thatâ€™d be awful messy, if possible at all. -->
				<div><xsl:value-of select="."/></div>
				<script>(e=&gt;e.outerHTML=e.textContent)(document.currentScript.previousElementSibling),document.currentScript.remove()</script>
			</xsl:when>
			<xsl:when test="@type='text' or not(@type)">
				<xsl:value-of select="."/>
			</xsl:when>
			<xsl:otherwise>
				<p>(<code><xsl:value-of select="name()"/></code> is in an unknown format, <code><xsl:value-of select="@type"/></code>.)</p>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
  <xsl:template name="copy-xml-attributes">
		<xsl:for-each select="@xml:lang">
			<xsl:attribute name="lang">
				<xsl:value-of select="."/>
			</xsl:attribute>
		</xsl:for-each>
		<xsl:for-each select="@xml:base">
			<xsl:copy/>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>