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

| Option      | Default | Description                                                                           |
| ----------- | ------- | ------------------------------------------------------------------------------------- |
| file        | Readme  | Your Readme.md name                                                                   |
| name        | null    | The project name that is in the title and the header                                  |
| logo        | null    | The project logo that is in the header                                                |
| description | null    | The project description for metaTags                                                  |
| noHeader    | false   | Show no header and just the markdown content                                          |
| darkTheme   | false   | Dark theme ofc 🎉                                                                     |
| favicon     | null    | Favicon url                                                                           |
| dist        | public  | To what folder to render your HTML                                                    |
| styles      | {}      | Styles to apply to the page. This will override eberything else. Use any css selector |

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

MIT - see LICENSE
