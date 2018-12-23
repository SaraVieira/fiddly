const showdown = require('showdown')
var toCss = require('to-css')
const CleanCSS = require('clean-css')
const createHTML = require('create-html')
const corner = require('../utils/githubCorner')
const capitalize = require('../utils/capitalize')
const fiddlyImports = require('../utils/fiddlyImports.js')
const header = require('../utils/header.js')

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
      print: { info, success },
      filesystem
    } = toolbox
    const options =
      filesystem.read(`${process.cwd()}/.fiddly.config.json`, 'json') || {}
    const dist = options.dist || 'public'
    const packageJSON =
      filesystem.read(`${process.cwd()}/package.json`, 'json') || {}

    // CSS
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
    const file = options.file || 'Readme' || 'readme' || 'README'
    const markdown = filesystem.read(`${process.cwd()}/${file}.md`)
    const description = options.description || packageJSON.description
    const name = options.name || packageJSON.name

    var html = createHTML({
      title: capitalize(name),
      css: fiddlyImports.css,
      scriptAsync: true,
      script: fiddlyImports.js,
      lang: 'en',
      head: `<meta charset="utf-8" /><meta http-equiv="x-ua-compatible" content="ie=edge" /><meta name="description" content="${description}" /><meta name="viewport" content="width=device-width, initial-scale=1" />`,
      body: `<div id="fiddly"><div class="body ${
        options.darkTheme ? 'dark' : ''
      }"><div class="container">${
        packageJSON.repository
          ? corner(packageJSON.repository.url, options.darkTheme)
          : ''
      }${header(options, name)}${converter.makeHtml(
        markdown
      )}</div></div></div>`,
      favicon: options.favicon || null
    })

    await filesystem.write(`${process.cwd()}/${dist}/index.html`, html)

    info(`Generated your static files at ${dist}/`)
    success(`You can deploy the ${dist} folder to a static server 🎉`)
  }
}
