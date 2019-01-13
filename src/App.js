import React, { Component } from 'react'
import dropWhile from 'lodash/dropWhile'
import unionBy from 'lodash/unionBy'
import find from 'lodash/find'
import 'flexboxgrid'
import './App.scss'
import LocationInput from './components/LocationInput'
import { readLocationData, saveLocationData } from './utils/persistenceUtils'
import { getWeatherFromQuery } from './utils/weatherUtils'
import TemperatureDisplay from './components/TemperatureDisplay'
import { getOpenWeatherDateByCityId } from './utils/externalApiUtils/openWeatherMapUtils'

// import TemperatureDisplay from './components/TemperatureDisplay'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      hasError: false,
      weatherData: {},
      allLocations: readLocationData(),
      selectedDate: null
    }
    this.removeLocation = this.removeLocation.bind(this)
    this.mergeLocation = this.mergeLocation.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onSelectPrevLocation = this.onSelectPrevLocation.bind(this)
    this.onSelectedDateChange = this.onSelectedDateChange.bind(this)
  }

  removeLocation ({ id }) {
    const updatedLocations = dropWhile(this.state.allLocations, { id })
    this.setState({
      allLocations: updatedLocations
    })
  }

  mergeLocation ({ cityId, userInput }) {
    return unionBy(this.state.allLocations, [{ cityId, userInput }], 'cityId')
  }

  onSelectedDateChange ({ selectedDate }) {
    this.setState({ selectedDate })
  }

  async onLocationChange (e) {
    e.preventDefault()
    this.setState({ loading: true, hasError: false })
    const userInput = e.target.elements.userInput.value
    try {
      const { cityId, name, forecast } = await getWeatherFromQuery(userInput)
      const updatedLocations = this.mergeLocation({ cityId, userInput })
      saveLocationData(updatedLocations)
      this.setState({
        weatherData: { cityId, name, forecast, userInput },
        allLocations: updatedLocations,
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
        selectedDate: forecast[0].dt
      })
    } catch (e) {
      console.log(e)
      this.setState({ hasError: true })
    }
    this.setState({ loading: false })
  }

  render () {
    const { allLocations, weatherData: { forecast }, selectedDate } = this.state
    const currentWeather = find(forecast, { dt: selectedDate })
    return (
      <div className='weatherApp day'>
        <LocationInput
          onLocationChange={this.onLocationChange}
          onSelectPrevLocation={this.onSelectPrevLocation}
          allLocations={allLocations}
          removeLocation={this.removeLocation}
        />
        {/*previousloc*/}
        <div className='row'>
          <TemperatureDisplay currentWeather={currentWeather} />
        </div>
      </div>
    )
  }
}

export default App
