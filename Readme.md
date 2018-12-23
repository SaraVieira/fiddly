# Fiddly

Create beautiful and simple HTML pages from your Readme.md files

```bash
yarn add fiddly --dev
```

```bash
npm install fiddly --save-dev
```

## Usage

```json
{
  ...
  "scripts": {
    "build:demo": "fiddly",
    ....
  }
```

Deploy automatically to netlify 🎉

[This Readme on Netlify](https://fiddly.netlify.com/)

## Options

Options are placed in a `.fiddly.config.json` and it contains the following options:

| Option      | Default                     | Description                                                                           |
| ----------- | --------------------------- | ------------------------------------------------------------------------------------- |
| file        | Readme                      | Your Readme.md name                                                                   |
| name        | name in package.json        | The project name that is in the title and the header                                  |
| logo        | null                        | The project logo that is in the header                                                |
| description | description in package.json | The project description for metaTags                                                  |
| noHeader    | false                       | Show no header and just the markdown content                                          |
| darkTheme   | false                       | Dark theme ofc 🎉                                                                     |
| favicon     | null                        | Favicon url                                                                           |
| dist        | public                      | To what folder to render your HTML                                                    |
| styles      | {}                          | Styles to apply to the page. This will override everything else. Use any css selector |

Example of styles:

```json
{
  "styles": {
    "h1": {
      "color": "blue",
      "backgroundColor": "red"
    }
  }
}
```

This will override all the H1 styles

## Github Corner

The Github corner comes from the repository url in your `package.json`. If none is present it will not be shown.

## Todo

- [ ] Work with loaded images by the markdown files when those are local
- [ ] Being able to add local URL's to logo in config
- [ ] Add social things to head

## Acknowledgements

- Base styles from [medium.css](https://github.com/lucagez/medium.css)
- Logo from [OpenMoji](http://www.openmoji.org/library.html?search=beautiful&emoji=2728)

## License

MIT - see [LICENSE](https://github.com/SaraVieira/fiddly/blob/master/LICENSE)
