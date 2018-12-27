const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')
const success = `Generated your static files at public/`

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'fiddly') + ` ${cmd}`)

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

test('reads config from package.json', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/testpkg')

  const output = await cli()

  expect(output).toContain(success.replace('public', 'testoutput'))
  const css = filesystem.read('testoutput/style.css')

  expect(css).toContain(`font-size:18em`)

  // cleanup artifact
  filesystem.remove('testoutput')
  process.chdir(prevDir)
})
