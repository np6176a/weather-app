import axios from 'axios'

const buildUrl = (userInput) => `https://api.opencagedata.com/geocode/v1/json?q=${userInput}&key=${process.env.REACT_APP_OPEN_CAGE_KEY}`

export const getLocationFromOpenCage = async (userInput) => {
  const result = await axios.get(buildUrl(userInput))
  const { lat, lng } = result.data.results[0].geometry
  return ({ lat, lng })
}
