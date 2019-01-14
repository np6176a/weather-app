import axios from 'axios'

const OPEN_CAGE_URL = 'https://api.opencagedata.com/geocode/v1/json'

export const getLocationFromOpenCage = async (userInput) => {
  const result = await axios.get(
    OPEN_CAGE_URL,
    { params: { key: process.env.REACT_APP_OPEN_CAGE_KEY, q: userInput } }
  )
  const { lat, lng } = result.data.results[0].geometry
  return ({ lat, lng })
}
