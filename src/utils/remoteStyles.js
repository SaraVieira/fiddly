const axios = require('axios')

const getRemoteStyles = async () => {
  const { data: normalize } = await axios.get(
    'https://unpkg.com/normalize.css@8.0.1/normalize.css'
  )
  const { data: lato } = await axios.get(
    'https://fonts.googleapis.com/css?family=Lato'
  )
  const { data: playfair } = await axios.get(
    'https://fonts.googleapis.com/css?family=Playfair+Display:700i,900'
  )

  return normalize.concat(lato).concat(playfair)
}

module.exports = getRemoteStyles
