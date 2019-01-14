import moment from 'moment-timezone'
import uniqBy from 'lodash/uniqBy'

export const groupWeatherByDate = ({ weatherData }) => {
  const newData = weatherData.map(eDay => ({
    ...eDay,
    dateStr: moment.unix(eDay['dt']).format('YYYY-MM-DD')
  }))
  return uniqBy(newData, 'dateStr')
}
