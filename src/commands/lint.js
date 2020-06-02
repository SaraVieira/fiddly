const markdownlint = require('markdownlint')
const DEFAULT_FILENAMES = require('../utils/DEFAULT_FILENAMES')

module.exports = {
  name: 'lint',
  alias: 'l',
  description: 'Lint your linked markdown files',
  run: async (toolbox) => {
    const {
      print: { success, error },
      filesystem,
    } = toolbox

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
      files.push(options.additionalFiles)
    }

    markdownlint({ files }, (err, result) => {
      if (!err) {
        if (result.toString()) {
          error('We found some errors 😢')
          error(result.toString())
        } else {
          success('All clear ✅')
        }
      }
    })
  },
}
