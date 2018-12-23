const { system, filesystem } = require('gluegun')
const { resolve } = require('path')

const src = resolve(__dirname, '..')

const cli = async cmd =>
  system.run('node ' + resolve(src, 'bin', 'fiddly') + ` ${cmd}`)

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('0.0.1')
})

test('generates file', async () => {
  const output = await cli('generate foo')

  expect(output).toContain('Generated file at models/foo-model.js')
  const foomodel = filesystem.read('models/foo-model.js')

  expect(foomodel).toContain(`module.exports = {`)
  expect(foomodel).toContain(`name: 'foo'`)

  // cleanup artifact
  filesystem.remove('models')
})
