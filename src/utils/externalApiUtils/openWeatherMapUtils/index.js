import axios from 'axios'

const KEY = process.env.REACT_APP_WEATHER_KEY
const DEFAULT_PARAMS = {
  units: 'imperial',
  mode: 'json'
}
const BUILD_URL_GEO = 'https://api.openweathermap.org/data/2.5/forecast'
const BUILD_URL_CITY_ID = 'https://api.openweathermap.org/data/2.5/forecast'

export const getOpenWeatherDataByGeo = async ({ lat, lng }) => {
  const result = await axios.get(BUILD_URL_GEO,
    {
      params: {
        ...DEFAULT_PARAMS,
        lat: lat,
        lon: lng,
        appid: KEY
      }
    })
  return {
    cityId: result.data.city.id,
    name: result.data.city.name,
    forecast: result.data.list
  }
}

export const getOpenWeatherDateByCityId = async (cityId) => {
  const result = await axios.get(BUILD_URL_CITY_ID,{
    params: {
      ...DEFAULT_PARAMS,
      id: cityId,
      appId: KEY
    }
  })
  return {
    name: result.data.city.name,
    forecast: result.data.list
  }
}
