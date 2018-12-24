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

## HTML in Markdown

If you have any HTML in your markdown that has children that are markdown, for example a div like this:

```markdown
<div align="center">
  [![Hello](./image)](https://link.url)
</div>
```

In order for fiddly to render the inner contents as markdown you will need to add `data-markdown="1"` to the surroun ding element like so:

```markdown
<div align="center" data-markdown="1">
  [![Hello](./image)](https://link.url)
</div>
```

This is not needed for anything without children like images or `<br>` tags.

You can see the issue regarding showdown [here](https://github.com/showdownjs/showdown/issues/178)

## Github Corner

The Github corner comes from the repository url in your `package.json`. If none is present it will not be shown.

## Todo

- [x] Work with loaded images by the markdown files when those are local
- [ ] Being able to add local URL's to logo in config
- [x] Add social things to head

## Acknowledgements

- Base styles from [medium.css](https://github.com/lucagez/medium.css)
- Logo from [OpenMoji](http://www.openmoji.org/library.html?search=beautiful&emoji=2728)

## License

MIT - see [LICENSE](https://github.com/SaraVieira/fiddly/blob/master/LICENSE)
