const showdown = require('showdown')
const toCss = require('to-css')
const CleanCSS = require('clean-css')
const createHTML = require('create-html')
const corner = require('../utils/githubCorner')
const capitalize = require('../utils/capitalize')
const fiddlyImports = require('../utils/fiddlyImports.js')
const head = require('../utils/head.js')
const header = require('../utils/header.js')

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  openLinksInNewWindow: true,
  backslashEscapesHTMLTags: true,
  emoji: true,
  omitExtraWLInCodeBlocks: true,
  parseImgDimensions: true,
  strikethrough: true,
  smoothLivePreview: true,
  literalMidWordUnderscores: true,
  simplifiedAutoLink: true,
  encodeEmails: true,
  extensions: [
    require('../utils/header-anchors'),
    require('showdown-footnotes')
  ]
})

const defaultOptions = {
  dist: 'public',
  darkTheme: false,
  noHeader: false,
  file: null,
  name: null,
  description: null,
  styles: {},
  logo: '',
  favicon: ''
}

module.exports = {
  name: 'fiddly',
  run: async toolbox => {
    const {
      print: { info, success, error, warning },
      filesystem
    } = toolbox

    const options = {
      ...defaultOptions,
      ...(filesystem.read(`${process.cwd()}/.fiddly.config.json`, 'json') || {})
    }
    const dist = options.dist
    const packageJSON =
      filesystem.read(`${process.cwd()}/package.json`, 'json') || {}

    // CSS
    const css = filesystem
      .read(`${__dirname}/css/normalize.css`)
      .concat(filesystem.read(`${__dirname}/css/tacit.css`))
      .concat(filesystem.read(`${__dirname}/css/prism.css`))
      .concat(filesystem.read(`${__dirname}/css/gh-corner.css`))
      .concat(filesystem.read(`${__dirname}/css/style.css`))
      .concat(filesystem.read(`${__dirname}/css/dark.css`))
      .concat(
        toCss(options.styles, {
          selector: s => `#fiddly ${s}`,
          property: p =>
            p.replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`)
        })
      )

    await filesystem.write(
      `${process.cwd()}/${dist}/style.css`,
      new CleanCSS().minify(css).styles
    )

    // HTML
    // Set default filenames list to check for
    const DEFAULT_FILENAMES = ['readme.md', 'Readme.md', 'README.md']
    let file

    // Check for `options.file`, if null, check if a default file exists, or error
    if (options.file === null) {
      file = DEFAULT_FILENAMES.find(filename => {
        return filesystem.exists(filename) ? filename : null
      })

      // Throw error if no default file could be found
      if (file === null) {
        throw new TypeError(`No default file ("readme.md", "Readme.md", or "README.md") can be found. Please use the "file" option if using a differing filename.`)
      }
    } else {
      // Set file to the given `options.file` value
      file = options.file
    }

    // Get markdown contents of given file
    const markdown = filesystem.read(`${process.cwd()}/${file}`)

    // Throw error if file does not exist and subsequently can't get markdown from the file.
    if (typeof markdown === 'undefined') {
      throw new TypeError(`Cannot find file "${file}". Please ensure file exists.`)
    }

    const description = options.description || packageJSON.description
    const name = options.name || packageJSON.name
    const githubCorner = packageJSON.repository
      ? corner(packageJSON.repository.url, options.darkTheme)
      : ''
    const dark = options.darkTheme ? 'dark' : ''

    const images = (markdown.match(/(?:!\[(.*?)\]\((?!http)(.*?)\))/gim) || [])
      .filter(i => !i.includes('https'))
      .map(image => (image.split('./')[1] || '').split(')')[0])

    try {
      images.map(i =>
        filesystem.copy(
          `${process.cwd()}/${i}`,
          `${process.cwd()}/${dist}/${i}`,
          { overwrite: true }
        )
      )
    } catch (e) {
      warning('Some images referenced were not found.')
    }

    if (!options.favicon.includes('http') && options.favicon !== '') {
      filesystem.copy(
        `${process.cwd()}/${options.favicon}`,
        `${process.cwd()}/${dist}/${options.favicon}`,
        { overwrite: true }
      )
    }

    if (!options.logo.includes('http') && options.logo !== '') {
      filesystem.copy(
        `${process.cwd()}/${options.logo}`,
        `${process.cwd()}/${dist}/${options.logo}`,
        { overwrite: true }
      )
    }

    var html = createHTML({
      title: capitalize(name),
      css: fiddlyImports.css,
      script: fiddlyImports.js,
      lang: 'en',
      head: head(description, name, options, packageJSON.homepage),
      body: `<div id="fiddly"><div class="body ${dark}"><div class="container">${githubCorner}${header(
        options,
        name
      )}${converter.makeHtml(markdown)}</div></div></div>`,
      favicon: options.favicon
    })

    try {
      await filesystem.write(`${process.cwd()}/${dist}/index.html`, html)
      info(`

                Generated your static files at ${dist}/
      `)
      success(`
      🎉   You can deploy the ${dist} folder to a static server    🎉

      `)
    } catch (e) {
      error('Oh no, there has been an error making your files')
    }
  }
}
