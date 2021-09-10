const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')
const success = 'Generated your static files at public/'

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'fiddly') + ` ${cmd}`)

test('generates html', async () => {
  const output = await cli()

  expect(output).toContain(success)
  expect(filesystem.exists('public/index.html')).toBeTruthy()

  filesystem.remove('public')
})

test('generates css', async () => {
  const output = await cli()
  expect(output).toContain(success)

  expect(filesystem.exists('public/style.css')).toBeTruthy()

  filesystem.remove('public')
})

test('generates dark', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/dark/')

  const output = await cli()

  expect(output).toContain(success)
  const html = filesystem.read('public/index.html')

  expect(html).toContain('<div class="body dark">')

  filesystem.remove('public')
  process.chdir(prevDir)
})

test('reads config from package.json', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/package-json')

  const output = await cli()

  expect(output).toContain(success.replace('public', 'testoutput'))
  const css = filesystem.read('testoutput/style.css')

  expect(css).toContain('font-size:18em')

  filesystem.remove('testoutput')
  process.chdir(prevDir)
})

test('generates several files', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/several-files')

  const output = await cli()

  expect(output).toContain(success)

  expect(filesystem.exists('public/index.html')).toBeTruthy()
  expect(filesystem.exists('public/one.html')).toBeTruthy()

  filesystem.remove('public')
  process.chdir(prevDir)
})

test('spectrum test', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/spectrum')

  const output = await cli()

  expect(output).toContain(success)
  const html = filesystem.read('public/index.html')

  expect(html).toContain('Simple, powerful online communities')

  expect(filesystem.exists('public/index.html')).toBeTruthy()

  filesystem.remove('public')
  process.chdir(prevDir)
})

test('noHeader test', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/noHeader')

  const output = await cli()

  expect(output).toContain(success)

  const html = filesystem.read('public/index.html')

  expect(html).not.toContain('<header')

  expect(filesystem.exists('public/index.html')).toBeTruthy()

  filesystem.remove('public')
  process.chdir(prevDir)
})

test('logo test', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/logo')

  const output = await cli()

  expect(output).toContain(success)

  expect(filesystem.exists('public/logo.png')).toBeTruthy()

  filesystem.remove('public')
  process.chdir(prevDir)
})

test('Image test', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/duplicate-images')

  const output = await cli()

  expect(output).toContain(success)

  expect(filesystem.exists('public/logo.png')).toBeTruthy()

  filesystem.remove('public')
  process.chdir(prevDir)
})

test('Prefixes logo and additional file paths', async () => {
  const prevDir = process.cwd()

  process.chdir('./__tests__/test-readme/path-prefix')

  const output = await cli()

  expect(output).toContain(success)
  expect(filesystem.exists('public/index.html')).toBeTruthy()
  const html = filesystem.read('public/index.html')

  expect(html).toContain('href="/fiddly-rocks/one.html"')
  expect(html).toContain('src="/fiddly-rocks/logo.png"')

  filesystem.remove('public')
  process.chdir(prevDir)
})
