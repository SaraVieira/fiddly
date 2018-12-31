const ghpages = require('gh-pages')
const { run } = require('./fiddly')

module.exports = {
  name: 'deploy',
  alias: 'd',
  description: 'Deploy your static site to Github pages',
  run: async toolbox => {
    const {
      print: { spin, warning },
      filesystem
    } = toolbox

    const packageJSON =
      filesystem.read(`${process.cwd()}/package.json`, 'json') || {}

    const options = {
      ...{ dist: 'public' },
      ...(packageJSON.fiddly || {}),
      ...(filesystem.read(`${process.cwd()}/.fiddly.config.json`, 'json') || {})
    }

    const dist = options.dist
    const distFolder = `${process.cwd()}/${dist}`
    const deploymentOptions = options.deployment || {}

    if (!filesystem.exists(distFolder)) {
      warning(`Seems there is no ${dist} folder. Building it...`)
      await run(toolbox)
    }

    const spinner = spin('Deploying your site')
    ghpages.publish(distFolder, deploymentOptions, err => {
      if (err) {
        return spinner.fail('There was an error publishing your site 😢')
      }
      return spinner.succeed(`Website Published 🎉`)
    })
  }
}
