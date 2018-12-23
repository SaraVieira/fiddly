const showdown = require('showdown')
var toCss = require('to-css')
const CleanCSS = require('clean-css')
const createHTML = require('create-html')

require('showdown-twitter')
showdown.extension('header-anchors', function() {
  var ancTpl =
    '$1<a id="user-content-$3" class="anchor" href="#$3" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>$4'

  return [
    {
      type: 'html',
      regex: /(<h([1-3]) id="([^"]+?)">)(.*<\/h\2>)/g,
      replace: ancTpl
    }
  ]
})
const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  openLinksInNewWindow: true,
  backslashEscapesHTMLTags: true,
  emoji: true,
  tablesHeaderId: true,
  extensions: ['header-anchors', require('showdown-footnotes')]
})
converter.setFlavor('github')

module.exports = {
  name: 'fiddly',
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info, success },
      filesystem
    } = toolbox
    const options =
      filesystem.read(`${process.cwd()}/.fiddly.config.json`, 'json') || {}
    const dist = options.dist || 'public'

    // CSS

    const styleString = style =>
      Object.entries(style).reduce((styleString, [propName, propValue]) => {
        propName = propName.replace(
          /([A-Z])/g,
          matches => `-${matches[0].toLowerCase()}`
        )
        return `${styleString}${propName}:${propValue};`
      }, '')
    const css = filesystem.read(`${__dirname}/css/css.css`).concat(
      toCss(options.styles, {
        selector: s => `#fiddly ${s}`,
        property: p =>
          p.replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`)
      })
    )
    await filesystem.write(
      `${process.cwd()}/public/style.css`,
      new CleanCSS().minify(css).styles
    )

    // HTML
    const name = options.file || 'Readme'
    const markdown = filesystem.read(`${process.cwd()}/${name}.md`)

    const header =
      options.name && !options.noHeader
        ? `<header><h1>${options.name}</h1><img class="logo" src="${
            options.logo
          }" /></header>`
        : ''

    var html = createHTML({
      title: options.name,
      css: [
        'https://rawcdn.githack.com/yegor256/tacit/42137b0c4369dbc6616aef1b286cda5aff467314/tacit-css-1.3.5.min.css',
        'style.css',
        'https://unpkg.com/prismjs@1.15.0/themes/prism.css'
      ],
      scriptAsync: true,
      script: [
        'https://unpkg.com/prismjs@1.15.0/prism.js',
        'https://unpkg.com/prismjs@1.15.0/components/prism-json.min.js'
      ],
      lang: 'en',
      head: `<meta charset="utf-8" /><meta http-equiv="x-ua-compatible" content="ie=edge" /><meta name="description" content="${
        options.description
      }" /><meta name="viewport" content="width=device-width, initial-scale=1" />`,
      body: `<div id="fiddly"><div class="body ${
        options.darkTheme ? 'dark' : ''
      }"><div class="container">${header}${converter.makeHtml(
        markdown
      )}</div></div></div>`,
      favicon: options.favicon || null
    })

    await filesystem.write(`${process.cwd()}/${dist}/index.html`, html)

    info(`Generated your static files at ${dist}/`)
    success(`You can deploy the ${dist} folder to a static server 🎉`)
  }
}
