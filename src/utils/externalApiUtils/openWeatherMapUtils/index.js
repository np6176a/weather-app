import axios from 'axios'

const KEY = process.env.REACT_APP_WEATHER_KEY

const BUILD_URL_GEO = 'http://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json'
const BUILD_URL_CITY_ID = 'http://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json'

export const getOpenWeatherDataByGeo = async ({ lat, lng }) => {
  const result = await axios.get(BUILD_URL_GEO,
    {
      params: {
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
      id: cityId,
      appId: KEY
    }
  })
  return {
    name: result.data.city.name,
    forecast: result.data.list
  }
}
