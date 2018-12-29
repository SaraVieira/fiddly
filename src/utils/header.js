const DEFAULT_FILENAMES = require('./DEFAULT_FILENAMES')

const capitalize = name =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

module.exports = (options, name, pages) => {
  const fileName = file => {
    const isIndex = DEFAULT_FILENAMES.includes(file)
    return isIndex
      ? 'Home'
      : (file.split('/')[file.split('/').length - 1] || '').split('.md')[0]
  }

  const absoluteURL = path => `${options.pathPrefix}${path}`

  const fileHref = file =>
    fileName(file) === 'Home' ? '' : fileName(file).toLowerCase()

  return options && !options.noHeader
    ? `<header>${name ? `<h1>${name}</h1>` : ''}${
        options.logo !== ''
          ? `<img class="logo" src="${absoluteURL(
              options.logo
            )}" alt="${name} logo" />`
          : ''
      }
      ${
        pages.length > 1
          ? `<nav><ul>${pages
              .map(
                page =>
                  `<li><a href="${absoluteURL(fileHref(page))}">${capitalize(
                    fileName(page)
                  )}</a></li>`
              )
              .join('')}</ul></nav>`
          : ''
      }
      </header>`
    : ''
}
