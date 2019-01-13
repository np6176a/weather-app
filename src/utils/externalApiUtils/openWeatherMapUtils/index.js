import axios from 'axios'
const KEY = process.env.REACT_APP_WEATHER_KEY

const buildUrlGeo = ({ lat, lng }) => `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${KEY}&units=imperial&mode=json`
const buildUrlCityId = (cityId) => `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${KEY}&units=imperial&mode=json`

export const getOpenWeatherDataByGeo = async ({ lat, lng }) => {
  const result = await axios.get(buildUrlGeo({ lat, lng }))
  return {
    cityId: result.data.city.id,
    name: result.data.city.name,
    forecast: result.data.list
  }
}

export const getOpenWeatherDateByCityId = async (cityId) => {
  const result = await axios.get(buildUrlCityId(cityId))
  return {
    name: result.data.city.name,
    forecast: result.data.list
  }
}
