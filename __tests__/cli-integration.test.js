const { system, filesystem } = require('gluegun')
const { resolve } = require('path')

const src = resolve(__dirname, '..')
const success = `Generated your static files at public/`

const cli = async cmd =>
  system.run('node ' + resolve(src, 'bin', 'fiddly') + ` ${cmd}`)

test('generates html', async () => {
  const output = await cli()

  expect(output).toContain(success)
  const index = filesystem.read('public/index.html')

  expect(index).toContain(`<!doctype html>`)

  // cleanup artifact
  filesystem.remove('public')
})

test('generates css', async () => {
  const output = await cli()

  expect(output).toContain(success)
  const css = filesystem.read('public/style.css')

  expect(css).toContain(`body{`)

  // cleanup artifact
  filesystem.remove('public')
})

test('generates dark', async () => {
  const output = await cli('--config=one.json')

  expect(output).toContain(success)
  const css = filesystem.read('public/style.css')

  expect(css).toContain(`body{`)

  // cleanup artifact
  filesystem.remove('public')
})
