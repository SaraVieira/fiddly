# Fiddly CLI

Create beautiful and simple HTML pages from your Readme.md files

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

## Options

Options are placed in a `.fiddly.config.json` and it contains the following options:

| Option      | Default | Description                                          |
| ----------- | ------- | ---------------------------------------------------- |
| name        | null    | The project name that is in the title and the header |
| logo        | null    | The project logo that is in the header               |
| description | null    | The project description for metaTags                 |
| noHeader    | false   | Show no header and just the markdown content         |
| darkTheme   | false   | Dark theme ofc 🎉                                    |
| favicon     | null    | Favicon url                                          |

MIT - see LICENSE
