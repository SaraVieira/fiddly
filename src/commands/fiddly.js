const showdown = require('showdown')
const toCss = require('to-css')
const CleanCSS = require('clean-css')
var sass = require('node-sass')
const createHTML = require('create-html')
const corner = require('../utils/githubCorner')
const fiddlyImports = require('../utils/fiddlyImports.js')
const head = require('../utils/head.js')
const header = require('../utils/header.js')
const DEFAULT_FILENAMES = require('../utils/DEFAULT_FILENAMES')

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
  favicon: '',
  additionalFiles: []
}

module.exports = {
  name: 'fiddly',
  run: async toolbox => {
    const {
      print: { info, success, error, warning },
      filesystem
    } = toolbox

    const packageJSON =
      filesystem.read(`${process.cwd()}/package.json`, 'json') || {}

    const options = {
      ...defaultOptions,
      ...(packageJSON.fiddly || {}),
      ...(filesystem.read(`${process.cwd()}/.fiddly.config.json`, 'json') || {})
    }
    const dist = options.dist

    // CSS
    const getAdditionalStyles = () => {
      if (typeof options.styles === 'string') {
        return filesystem.read(`${process.cwd()}/${options.styles}`)
      }

      return toCss(options.styles, {
        selector: s => `#fiddly ${s}`,
        property: p =>
          p.replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`)
      })
    }

    const css = sass
      .renderSync({
        data: filesystem
          .read(`${__dirname}/css/style.scss`)
          .concat(getAdditionalStyles()),
        includePaths: [`${__dirname}/css`]
      })
      .css.toString()

    await filesystem.write(
      `${process.cwd()}/${dist}/style.css`,
      new CleanCSS().minify(css).styles
    )

    // HTML

    // Check for `options.file`, if null, check if a default file exists, or error
    if (options.file === null) {
      options.additionalFiles.unshift(
        DEFAULT_FILENAMES.find(filename => {
          return filesystem.exists(filename) ? filename : null
        })
      )
      // Throw error if no default file could be found
      if (
        options.additionalFiles[options.additionalFiles.length - 1] === null
      ) {
        return error(
          `No default file ("readme.md", "Readme.md", or "README.md") can be found. Please use the "file" option if using a differing filename.`
        )
      }
    } else {
      // Set file to the given `options.file` value
      options.additionalFiles.unshift(options.file)
    }

    options.additionalFiles.map(async file => {
      // Get markdown contents of given file
      const markdown = filesystem.read(`${process.cwd()}/${file}`)

      // Throw error if file does not exist and subsequently can't get markdown from the file.
      if (typeof markdown === 'undefined') {
        return error(`Cannot find file "${file}". Please ensure file exists.`)
      }

      const description = options.description || packageJSON.description
      const name = options.name || packageJSON.name
      const githubCorner = packageJSON.repository
        ? corner(packageJSON.repository.url, options.darkTheme)
        : ''
      const dark = options.darkTheme ? 'dark' : ''

      const images = (
        markdown.match(/(?:!\[(.*?)\]\((?!http)(.*?)\))/gim) || []
      )
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
        warning(`

                Some images referenced were not found.
      `)
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

      const isIndex = DEFAULT_FILENAMES.includes(file)

      const fileName = isIndex
        ? 'index'
        : (file.split('/')[file.split('/').length - 1] || '').split('.md')[0]

      const title = name.charAt(0).toUpperCase() + name.slice(1)

      var html = createHTML({
        title,
        css: fiddlyImports.css,
        script: fiddlyImports.js,
        lang: 'en',
        head: head(description, name, options, packageJSON.homepage),
        body: `<div id="fiddly"><div class="body ${dark}"><div class="container">${githubCorner}${header(
          options,
          name,
          options.additionalFiles
        )}${converter.makeHtml(markdown)}</div></div></div>`,
        favicon: options.favicon
      })
      try {
        await filesystem.write(
          `${process.cwd()}/${dist}/${fileName.toLowerCase()}.html`,
          html
        )
      } catch (e) {
        error('Oh no, there has been an error making your file', file)
      }
    })

    info(`

                Generated your static files at ${dist}/
      `)
    success(`
      🎉   You can deploy the ${dist} folder to a static server    🎉

      `)
  }
}

exports.DEFAULT_FILENAMES = DEFAULT_FILENAMES
