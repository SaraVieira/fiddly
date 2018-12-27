# Fiddly

Create beautiful and simple HTML pages from your Readme.md files

- 🛠 No config
- 👩‍💻 Code Highlighting
- 💯Emoji Support
- ✨Creates Static files (only JS is prism)
- 🏳️‍🌈 Pretty Pages
- 🦄 Customizable
- 🇳🇱 [CodeSandbox](https://codesandbox.io) and iframe Support

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

[This Readme with white theme](https://5c211293454e136fac543e8d--fiddly.netlify.com/)

## Usage with npx

If you just want a quick fancy HTML page from the Readme but don't care about running this in continuous deployment you can also use `npx` to run it as a one time thing.

```bash
  npx fiddly
```

By running this in the root folder you will also get a public folder

## Options

Options are placed in a `.fiddly.config.json` or as a "fiddly" key in `package.json` and it contains the following options:

| Option      | Default                     | Description                                                                           |
| ----------- | --------------------------- | ------------------------------------------------------------------------------------- |
| file        | Readme                      | Your Readme.md name                                                                   |
| name        | name in package.json        | The project name that is in the title and the header                                  |
| logo        | ''                          | The project logo that is in the header                                                |
| description | description in package.json | The project description for metaTags                                                  |
| noHeader    | false                       | Show no header and just the markdown content                                          |
| darkTheme   | false                       | Dark theme ofc 🎉                                                                     |
| favicon     | ''                          | Favicon url or local path                                                             |
| dist        | public                      | To what folder to render your HTML                                                    |
| styles      | {}                          | Styles to apply to the page. This will override everything else. Use any css selector |

### Example of styles

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

Or in `package.json`:

```json
{
  "name": "my-package",
  // ...
  "fiddly": {
    "styles": {
      "h1": {
        "color": "blue",
        "backgroundColor": "red"
      }
    }
  }
}
```

This will override all the H1 styles since what I do is use all of this with an id before hand so that it overrides everything.

## HTML in Markdown

If you have any HTML in your markdown that has children that are markdown, for example a div like this:

```markdown
<div align="center">
  [![Hello](./image)](https://link.url)
</div>
```

In order for fiddly to render the inner contents as markdown you will need to add `data-markdown="1"` to the surrounding element like so:

```markdown
<div align="center" data-markdown="1">
  [![Hello](./image)](https://link.url) [![Build Status](https://travis-ci.org/SaraVieira/fiddly.svg)](https://travis-ci.org/SaraVieira/fiddly)
</div>
```

This is not needed for anything without children like images or `<br>` tags.

You can see the issue regarding showdown [here](https://github.com/showdownjs/showdown/issues/178)

## Images

Any images linked in your markdown that are local will be copied to your public folder. If some image is not found it will be ignored.

## Github Corner

The Github corner comes from the repository url in your `package.json`. If none is present it will not be shown.

## TODO

- [ ] Deploy using magic to GH Pages too
- [ ] Support Multiple pages (if this exists in the config create several HTML files with a header and links to each page)
- [ ] Allow users to input a css file to override the styles instead of all the styles in a json
- [ ] Use sass so that the user can use sass too
- [x] Make All Contributors look nice
- [ ] Allow option to change prism theme
- [ ] Optimize images on copy
- [ ] Have tests with cypress to make sure page looks okay
- [ ] Have more tests and find way to mock the input file in it

## Acknowledgements

- Base styles from [medium.css](https://github.com/lucagez/medium.css)
- Logo from [OpenMoji](http://www.openmoji.org/library.html?search=beautiful&emoji=2728)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/1051509?v=4" width="100px;"/><br /><sub><b>Sara Vieira</b></sub>](http://iamsaravieira.com)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=SaraVieira "Code") [🎨](#design-SaraVieira "Design") [🤔](#ideas-SaraVieira "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/4772980?v=4" width="100px;"/><br /><sub><b>Bruno Scheufler</b></sub>](https://brunoscheufler.com)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=BrunoScheufler "Code") | [<img src="https://avatars0.githubusercontent.com/u/1863771?v=4" width="100px;"/><br /><sub><b>Siddharth Kshetrapal</b></sub>](https://sid.studio)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=siddharthkp "Code") |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- ALL-CONTRIBUTORS-LIST: START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT - see [LICENSE](https://github.com/SaraVieira/fiddly/blob/master/LICENSE)
