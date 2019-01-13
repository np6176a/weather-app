// import axios from 'axios'
import { getLocationFromOpenCage } from '../externalApiUtils/openCageUtils'
import { getOpenWeatherDataByGeo } from '../externalApiUtils/openWeatherMapUtils'

export const getWeatherFromQuery = async (query) => {
  const { lat, lng } = await getLocationFromOpenCage(query)
  const { cityId, name, forecast } = await getOpenWeatherDataByGeo({ lat, lng })
  return { cityId, name, forecast, query }
}
