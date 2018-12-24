module.exports = (options, name) => {
  return options && !options.noHeader
    ? `<header>${name ? `<h1>${name}</h1>` : ''}${
        options.logo
          ? `<img class="logo" src="${options.logo}" alt="logo" />`
          : ''
      }</header>`
    : ''
}
