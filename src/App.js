import React, { Component } from 'react'
import reject from 'lodash/reject'
import unionBy from 'lodash/unionBy'
import find from 'lodash/find'
import 'flexboxgrid'
import './App.scss'
import LocationInput from './components/LocationInput'
import { readLocationData, saveLocationData } from './utils/persistenceUtils'
import TemperatureDisplay from './components/TemperatureDisplay'
import { getOpenWeatherDataByGeo, getOpenWeatherDateByCityId } from './utils/externalApiUtils/openWeatherMapUtils'
import PrevLocationBubble from './components/PrevLocationBubble'
import WeatherInfoDisplay from './components/WeatherInfoDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import ErrorMessage from './components/ErrorMessage'
import LoadingDisplay from './components/LoadingDisplay'
import InitialDisplay from './components/InitialDisplay'
import { getLocationFromOpenCage } from './utils/externalApiUtils/openCageUtils'
import { timeOfDay } from './utils/dateUtils'
import { getCurrentGeoLocation } from './utils/currentGeoLocation'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      invalidLocation: false,
      loading: false,
      hasError: false,
      weatherData: {},
      allLocations: readLocationData(),
      selectedDate: null,
      userInput: '',
      currentGeo: {}
    }
    this.removeLocation = this.removeLocation.bind(this)
    this.handleError = this.handleError.bind(this)
    this.mergeLocation = this.mergeLocation.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.updateAllLocations = this.updateAllLocations.bind(this)
    this.onSelectPrevLocation = this.onSelectPrevLocation.bind(this)
    this.onNewLocation = this.onNewLocation.bind(this)
    this.onSelectedDateChange = this.onSelectedDateChange.bind(this)
    this.onUserInputChange = this.onUserInputChange.bind(this)
    this.onInitialLocation = this.onInitialLocation.bind(this)
  }

  removeLocation ({ cityId }) {
    const updatedLocations = reject(this.state.allLocations, ['cityId', cityId])
    this.updateAllLocations({ allLocations: updatedLocations })
  }

  mergeLocation ({ cityId, userInput }) {
    return unionBy(this.state.allLocations, [{ cityId, userInput }], 'cityId')
  }

  updateAllLocations ({ allLocations }) {
    this.setState({ allLocations })
    saveLocationData(allLocations)
  }

  onSelectedDateChange ({ selectedDate }) {
    this.setState({ selectedDate })
  }

  onUserInputChange (event) {
    const userInput = event.target.value
    this.setState({ userInput })
  }

  onNewLocation ({ cityId, name, forecast, userInput }) {
    const updatedLocations = this.mergeLocation({ cityId, userInput })
    this.updateAllLocations({ allLocations: updatedLocations })
    this.setState({
      weatherData: { cityId, name, forecast, userInput },
      selectedDate: forecast[0].dt
    })
  }

  handleError (e) {
    console.log(e)
    this.setState({ hasError: true })
  }

  async onInitialLocation () {
    this.setState({ loading: true, hasError: false, invalidLocation: false })
    try {
      const { lat, lng } = await getCurrentGeoLocation()
      if (!lat) {
        this.setState({ loading: false, invalidLocation: true })
        return
      }
      const { cityId, name, forecast } = await getOpenWeatherDataByGeo({ lat, lng })
      this.onNewLocation({ cityId, name, forecast, userInput: name })
    } catch (e) { this.handleError(e) }
    this.setState({ loading: false })
  }

  async onLocationChange (e) {
    e.preventDefault()
    this.setState({ loading: true, hasError: false, invalidLocation: false })
    const userInput = e.target.elements.userInput.value
    try {
      const { lat, lng } = await getLocationFromOpenCage(userInput)
      if (!lat) {
        this.setState({ loading: false, invalidLocation: true })
        return
      }
      const { cityId, name, forecast } = await getOpenWeatherDataByGeo({ lat, lng })
      this.onNewLocation({ cityId, name, forecast, userInput })
    } catch (e) { this.handleError(e) }
    this.setState({ loading: false })
  }

  async onSelectPrevLocation (event) {
    event.preventDefault()
    this.setState({ loading: true, hasError: false, invalidLocation: false })
    const cityId = event.target.getAttribute('keyName')
    const userInput = find(this.state.allLocations.userInput, { cityId: event.target.getAttribute('keyName') })
    try {
      const { name, forecast } = await getOpenWeatherDateByCityId(cityId)
      this.setState({
        weatherData: { cityId, name, forecast, userInput },
        selectedDate: forecast[0].dt,
        userInput: name
      })
    } catch (e) { this.handleError(e) }
    this.setState({ loading: false })
  }

  render () {
    const {
      allLocations,
      weatherData: { forecast },
      selectedDate,
      userInput,
      loading,
      hasError,
      invalidLocation
    } = this.state
    const currentWeather = find(forecast, { dt: selectedDate })
    if (hasError) return <ErrorMessage />
    return (
      <div className={`weatherApp ${timeOfDay()}`}>
        {loading && <LoadingDisplay />}
        <LocationInput
          invalidLocation={invalidLocation}
          onLocationChange={this.onLocationChange}
          userInput={userInput}
          onUserInputChange={this.onUserInputChange}
        />
        <PrevLocationBubble
          onSelectPrevLocation={this.onSelectPrevLocation}
          allLocations={allLocations}
          removeLocation={this.removeLocation}
        />
        {!forecast && <InitialDisplay onInitialLocation={this.onInitialLocation} />}
        {
          forecast && (
            <>
              <div className='row maxWidth middle-xs'>
                <TemperatureDisplay currentWeather={currentWeather} />
                <WeatherInfoDisplay currentWeather={currentWeather} />
              </div>
              <ForecastDisplay
                onSelectedDateChange={this.onSelectedDateChange}
                weatherData={forecast}
                selectedDate={selectedDate}
              />
            </>
          )
        }
      </div>
    )
  }
}

export default App
