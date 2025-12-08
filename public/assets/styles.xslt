<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">

  <xsl:output method="html" encoding="utf-8" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/>
          <xsl:value-of select="/atom:feed/atom:title"/>
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="stylesheet" href="https://fonts.upset.dev/css2?family=Mochiy+Pop+One&amp;display=swap"/>
        <link rel="stylesheet" href="/assets/css/feed.css"/>
        <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon"/>
      </head>
      <body id="web-feed" class="bg-primary d-flex justify-content-center align-items-center">
        <div class="container-wrapper d-flex flex-column justify-content-center align-items-center py-4">
          <div class="container bg-body p-4 d-flex flex-column flex-gap-3">
            <header class="d-flex flex-column flex-gap-3">
              <div class="about-feed p-3 d-flex flex-column flex-gap-3">
                <p>Hi! <strong>This is a web feed</strong>, also known as an RSS or Atom feed. You can <strong>subscribe</strong> by copying the following URL into your newsreader.</p>
                <p><code>
                  <xsl:value-of select="/rss/channel/atom:link/@href"/>
                  <xsl:value-of select="/atom:feed/atom:link/@href"/>
                </code></p>
                <p>Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more about feeds and to get started with newsreaders and subscribing. It's completely free!</p>
              </div>
              <h1 class="d-flex align-items-center flex-gap-3">
                <img src="/assets/images/rss.svg" aria-hidden="true" class="img-svg" alt="" />
                <xsl:value-of select="/rss/channel/title"/>
                <xsl:value-of select="/atom:feed/atom:title"/>
              </h1>
              <p class="subtitle">
                <xsl:value-of select="/rss/channel/description"/>
                <xsl:value-of select="/atom:feed/atom:subtitle"/>
              </p>
              <div class="d-flex align-items-center flex-gap-2"><span class="text-lg">&#x2190;</span><a class="head-link"><xsl:attribute name="href">/home</xsl:attribute>go back home?</a></div>
            </header>
            <h2>Recent Updates</h2>
            <main>
              
              <xsl:for-each select="/atom:feed/atom:entry[position() &lt; 5]">
                <div class="ps-2 d-flex flex-column flex-gap-3">
                  <h3>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="atom:link/@href"/>
                      </xsl:attribute>
                      <xsl:value-of select="atom:title"/>
                    </a>
                  </h3>
                  <xsl:if test="atom:content">
                    <xsl:apply-templates select="atom:content"/>
                  </xsl:if>
                </div>
                <xsl:if test="position() != 4">
                  <hr class="small"/>
                </xsl:if>
              </xsl:for-each>

              
              <xsl:for-each select="/rss/channel/item[position() &lt; 5]">
                <div class="ps-2 d-flex flex-column flex-gap-3">
                  <h3>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="link"/>
                      </xsl:attribute>
                      <xsl:value-of select="title"/>
                    </a>
                  </h3>
                  <div class="feed-entry">
                    <xsl:value-of select="description"/>
                  </div>
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
        <script>
          let entries = document.querySelectorAll('.feed-entry');
          let parser = new DOMParser();
          for (const entry of entries) {
            let html = parser.parseFromString(entry.innerHTML, 'text/html')
            entry.innerHTML = html.body.textContent;
          }
        </script>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="atom:content">
		<xsl:choose>
			<xsl:when test="@type='html'">
				<div><xsl:value-of select="."/></div>
				<script>(e=&gt;e.outerHTML=e.textContent)(document.currentScript.previousElementSibling),document.currentScript.remove()</script>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>