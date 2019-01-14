import moment from 'moment-timezone'

export const timeOfDay = () => {
  const hour = moment().hour()
  return (hour < 7 || hour > 18) ? 'night' : 'day'
}
