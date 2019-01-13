const LOCAL_STORAGE_KEY = 'NIYA_WEATHER_APP_LOCATION_DATA'

export const saveLocationData = (data) => {
  const json = JSON.stringify(data)
  window.localStorage.setItem(LOCAL_STORAGE_KEY, json)
}

export const readLocationData = () => {
  const str = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (str === null) {
    return []
  }
  return JSON.parse(str)
}
