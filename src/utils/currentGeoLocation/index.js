export const getCurrentGeoLocation = async () => (
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      resolve({ lat, lng })
    }, reject)
  })
)
