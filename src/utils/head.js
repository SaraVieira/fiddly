module.exports = (description, name, options = {}, homepage) => `
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  ${
    options.favicon
      ? `
      <meta name="image" content="${options.favicon}">
      <meta itemprop="image" content="${options.favicon}">
      `
      : ''
  }
  <meta property="og:type" content="website">
  ${
    name
      ? `
      <meta itemprop="name" content="${name}">
      <meta property="og:title" content="${name}">
      <meta property="og:site_name" content="${name}">
      `
      : ''
  }
  ${
    description
      ? `
      <meta name="description" content="${description}">
      <meta itemprop="description" content="${description}">
      <meta property="og:description" content="${description}">
      `
      : ''
  }
  ${homepage ? `<meta property="og:url" content="${homepage}">` : ''}
  ${
    options.shareCard && options.shareCard.includes('http')
      ? `
      <meta name="twitter:card" content="summary_large_image">
      <meta property="og:image" content="${options.shareCard}">
      `
      : ''
  }
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="${
    options.darkTheme ? 'dark' : 'white'
  }">
`
