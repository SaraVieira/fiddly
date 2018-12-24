module.exports = (description, name, options, homepage) => `
<meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${description}">
  <meta name="image" content="${options.favicon}">
  <meta itemprop="name" content="${name}">
  <meta itemprop="description" content="${description}">
  <meta itemprop="image" content="${options.favicon}">
  <meta name="og:title" content="${name}">
  <meta name="og:description" content="${description}">
  <meta name="og:url" content="${homepage}">
  <meta name="og:site_name" content="${name}">
  <meta name="og:type" content="website">
`
