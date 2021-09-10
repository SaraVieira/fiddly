const DEFAULT_FILENAMES = require('../utils/DEFAULT_FILENAMES')
const fs = require('fs')
const { run } = require('./fiddly')

module.exports = {
  name: 'watch',
  alias: 'w',
  description: 'Watch your markdown files for changes and build automatically',
  run: async (toolbox) => {
    const {
      print: { success },
      filesystem,
    } = toolbox
    success('Watching your files')
    const packageJSON =
      filesystem.read(`${process.cwd()}/package.json`, 'json') || {}

    const options = {
      ...(packageJSON.fiddly || {}),
      ...(filesystem.read(`${process.cwd()}/.fiddly.config.json`, 'json') ||
        {}),
    }
    const files = []

    DEFAULT_FILENAMES.find((filename) => {
      return filesystem.exists(filename) ? files.push(filename) : null
    })

    if (options.additionalFiles) {
      files.push(...options.additionalFiles)
    }

    files.map((file) => {
      fs.watch(file, (e, filename) => {
        if (filename && e === 'change') {
          success(`${filename} changed. Building`)
          run(toolbox)
        }
      })

      return null
    })
  },
}
