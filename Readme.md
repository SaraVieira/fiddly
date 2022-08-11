# Fiddly

Create beautiful and simple HTML pages from your Readme.md files

- 🛠 No config
- 👩‍💻 Code Highlighting
- 💯 Emoji Support
- ✨ Creates Static files (only JS is prism)
- 🏳️‍🌈 Pretty Pages
- 🦄 Customizable
- 🖼 Image minification
- 🧠 Custom Meta Tags
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

[This Readme with white theme](https://5c2678b67b891f18dc5a2a42--fiddly.netlify.com/)

## Usage with npx

<!-- markdownlint-disable -->

If you just want a quick fancy HTML page from the Readme but don't care about running this in continuous deployment you can also use `npx` to run it as a one time thing.

<!-- markdownlint-enable -->

```bash
  npx fiddly
```

By running this in the root folder you will also get a public folder

## Options

Options are placed in a `.fiddly.config.json` or as a `fiddly` key in `package.json`.
It can contain the following options:

<!-- markdownlint-disable -->

| Option          | Default                            | Description                                                                                                  |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| file            | Readme.md, readme.md, or README.md | Your Readme.md name                                                                                          |
| name            | name in package.json               | The project name that is in the title and the header                                                         |
| logo            | ''                                 | The project logo that is in the header                                                                       |
| shareCard       | ''                                 | URL to social media preview image for meta tags (recommended size: 1200x628, URL cannot be relative)         |
| description     | description in package.json        | The project description for meta tags                                                                        |
| homepage        | null                               | The project homepage for meta tags                                                                           |
| noHeader        | false                              | Show no header and just the markdown content                                                                 |
| darkTheme       | false                              | Dark theme ofc 🎉                                                                                            |
| favicon         | ''                                 | Favicon url or local path                                                                                    |
| dist            | public                             | To what folder to render your HTML                                                                           |
| styles          | {}                                 | Styles to apply to the page. Object or path to css/scss file                                                 |
| additionalFiles | []                                 | Any other pages to create. It expects an array of paths of markdown files                                    |
| repo            | null                               | Link to point the github corner                                                                              |
| pathPrefix      | Environment var PATH_PREFIX or '/' | Host your fiddly files at e.g. /my-fiddly-project                                                            |
| meta            | []                                 | Any extra meta tags you would like                                                                           |
| remoteStyles    | []                                 | Array of any remote styles you want to include (eg: Google Fonts)                                            |
| remoteScripts   | []                                 | Array of any remote scripts you want to include (eg: Google Analytics)                                       |
| deployment      | {}                                 | Deployment options for github pages. Accepts all options [here](https://github.com/tschaub/gh-pages#options) |

<!-- markdownlint-enable -->

### Example of styles

For styles you can either use a style object like so and that will override the
default styles applied. Like so:

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

Another option is to give the path to a local css or scss file.
In this case you need to override any specificity issues.
You can by using the `#fiddly` id.
Example:

```css
body {
  background: #fff;
}

#fiddly {
  h1 {
    text-transform: uppercase;
  }
}
```

## Meta Tags

To create any meta tags it uses an array system like so:

```json
  "meta": [
    { "name": "description", "content": "A cool page" },
    { "property": "robots", "content": "robots.txt" }
  ]
```

This will create the following HTML:

```html
<meta name="description" content="A cool page" />
<meta property="robots" content="robots.txt" />
```

The first key on the object can have any name and will be applied as presented, the second one must have the name of content and will work as presented above.

## Images

Any images linked in your markdown that are local will be minified and copied to your dist folder.
If some image is not found it will be ignored.

## GitHub Corner

The GitHub corner comes from either the `repo` option in your `.fiddly.config.json`
or from the repository url in your `package.json`.
If none is present it will not be shown.

## Lint

Fiddly also exports a command to let you lint all the markdown files you specified.

You can run this by using the `lint` command

```json
"lint:md" : "fiddly lint"
```

## Deploy

Fiddly also exports a command to let you deploy your new site to GitHub pages

You can run this by using the `deploy` command

```json
"deploy" : "fiddly deploy"
```

Options for this can be passed in a `deployment` key in your config file.
All options can be found here: [https://github.com/tschaub/gh-pages#options](https://github.com/tschaub/gh-pages#options)

## Acknowledgements

- Base styles from [medium.css](https://github.com/lucagez/medium.css)
- Logo from [OpenMoji](http://www.openmoji.org/library.html?search=beautiful&emoji=2728)

## Contributors

<!-- markdownlint-disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/1051509?v=4" width="100px;"/><br /><sub><b>Sara Vieira</b></sub>](http://iamsaravieira.com)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=SaraVieira "Code") [🎨](#design-SaraVieira "Design") [🤔](#ideas-SaraVieira "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/4772980?v=4" width="100px;"/><br /><sub><b>Bruno Scheufler</b></sub>](https://brunoscheufler.com)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=BrunoScheufler "Code") | [<img src="https://avatars0.githubusercontent.com/u/1863771?v=4" width="100px;"/><br /><sub><b>Siddharth Kshetrapal</b></sub>](https://sid.studio)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=siddharthkp "Code") | [<img src="https://avatars3.githubusercontent.com/u/1479215?v=4" width="100px;"/><br /><sub><b>Jamon Holmgren</b></sub>](https://jamonholmgren.com)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=jamonholmgren "Code") | [<img src="https://avatars0.githubusercontent.com/u/1695613?v=4" width="100px;"/><br /><sub><b>Timothy</b></sub>](http://timothy.is)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=timothyis "Code") | [<img src="https://avatars2.githubusercontent.com/u/13808724?v=4" width="100px;"/><br /><sub><b>Andrew Cherniavskii</b></sub>](https://github.com/cherniavskii)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=cherniavskii "Code") | [<img src="https://avatars2.githubusercontent.com/u/16899513?v=4" width="100px;"/><br /><sub><b>timkolberger</b></sub>](https://github.com/TimKolberger)<br />[💻](https://github.com/SaraVieira/fiddly/commits?author=TimKolberger "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- ALL-CONTRIBUTORS-LIST: START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- markdownlint-enable -->

## License

MIT - see [LICENSE](https://github.com/SaraVieira/fiddly/blob/master/LICENSE.md)
