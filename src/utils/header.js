const DEFAULT_FILENAMES = ['readme.md', 'Readme.md', 'README.md']

const capitalize = name =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

module.exports = (options, name, pages) => {
  const fileName = file => {
    const isIndex = DEFAULT_FILENAMES.includes(file)
    return isIndex
      ? 'Home'
      : (file.split('/')[file.split('/').length - 1] || '').split('.md')[0]
  }

  return options && !options.noHeader
    ? `<header>${name ? `<h1>${name}</h1>` : ''}${
        options.logo !== ''
          ? `<img class="logo" src="${options.logo}" alt="${name} logo" />`
          : ''
      }
      ${
        pages.length > 1
          ? `<nav><ul>${pages
              .map(
                page =>
                  `<li><a href="/${
                    fileName(page) === 'Home' ? '' : fileName(page)
                  }">${capitalize(fileName(page))}</a></li>`
              )
              .join('')}</ul></nav>`
          : ''
      }
      </header>`
    : ''
}
