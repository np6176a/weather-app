import React, { Component } from 'react'
import reject from 'lodash/reject'
import unionBy from 'lodash/unionBy'
import find from 'lodash/find'
import moment from 'moment'
import 'flexboxgrid'
import './App.scss'
import LocationInput from './components/LocationInput'
import { readLocationData, saveLocationData } from './utils/persistenceUtils'
import { getWeatherFromQuery } from './utils/weatherUtils'
import TemperatureDisplay from './components/TemperatureDisplay'
import { getOpenWeatherDateByCityId } from './utils/externalApiUtils/openWeatherMapUtils'
import PrevLocationBubble from './components/PrevLocationBubble'
import WeatherInfoDisplay from './components/WeatherInfoDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import ErrorMessage from './components/ErrorMessage'
import LoadingDisplay from './components/LoadingDisplay'
import InitialDisplay from './components/InitialDisplay'

// import TemperatureDisplay from './components/TemperatureDisplay'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      hasError: false,
      weatherData: {},
      allLocations: readLocationData(),
      selectedDate: null,
      userInput: ''
    }
    this.removeLocation = this.removeLocation.bind(this)
    this.mergeLocation = this.mergeLocation.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.updateAllLocations = this.updateAllLocations.bind(this)
    this.onSelectPrevLocation = this.onSelectPrevLocation.bind(this)
    this.onSelectedDateChange = this.onSelectedDateChange.bind(this)
    this.onUserInputChange = this.onUserInputChange.bind(this)
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

  async onLocationChange (e) {
    e.preventDefault()
    this.setState({ loading: true, hasError: false })
    const userInput = e.target.elements.userInput.value
    try {
      const { cityId, name, forecast } = await getWeatherFromQuery(userInput)
      const updatedLocations = this.mergeLocation({ cityId, userInput })
      this.updateAllLocations({ allLocations: updatedLocations })
      this.setState({
        weatherData: { cityId, name, forecast, userInput },
        selectedDate: forecast[0].dt
      })
    } catch (e) {
      console.log(e)
      this.setState({ hasError: true })
    }
    this.setState({ loading: false })
  }
  async onSelectPrevLocation (event) {
    event.preventDefault()
    this.setState({ loading: true, hasError: false })
    const cityId = event.target.getAttribute('keyName')
    const userInput = find(this.state.allLocations.userInput, { cityId: event.target.getAttribute('keyName') })
    try {
      const { name, forecast } = await getOpenWeatherDateByCityId(cityId)
      this.setState({
        weatherData: { cityId, name, forecast, userInput },
        selectedDate: forecast[0].dt,
        userInput: name
      })
    } catch (e) {
      console.log(e)
      this.setState({ hasError: true })
    }
    this.setState({ loading: false })
  }
  render () {
    const { allLocations, weatherData: { forecast }, selectedDate, userInput, loading, hasError } = this.state
    const currentWeather = find(forecast, { dt: selectedDate })
    const time = moment()
    const beforeTime = moment('07:30:00', 'hh:mm:ss')
    const afterTime = moment('18:30:00', 'hh:mm:ss')
    return (
      <div className={`weatherApp ${(time.isBetween(beforeTime, afterTime) ? 'day' : 'night')}`}>
        {loading && <LoadingDisplay />}
        <LocationInput
          onLocationChange={this.onLocationChange}
          userInput={userInput}
          onUserInputChange={this.onUserInputChange}
        />
        <PrevLocationBubble
          onSelectPrevLocation={this.onSelectPrevLocation}
          allLocations={allLocations}
          removeLocation={this.removeLocation}
        />
        {forecast === undefined && <InitialDisplay />}
        {hasError && <ErrorMessage />}
        {forecast !== undefined && <div className='row maxWidth middle-xs'>
          <TemperatureDisplay currentWeather={currentWeather} />
          <WeatherInfoDisplay currentWeather={currentWeather} />
        </div>}
        {forecast !== undefined && <ForecastDisplay onSelectedDateChange={this.onSelectedDateChange} weatherData={forecast} />}
      </div>
    )
  }
}

export default App
