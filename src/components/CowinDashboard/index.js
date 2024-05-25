import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    coverageData: [],
    genderData: [],
    ageData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const coverageDataFormatted = data.last_7_days_vaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )
      const genderDataFormatted = data.vaccination_by_gender
      const ageDataFormatted = data.vaccination_by_age

      this.setState({
        coverageData: coverageDataFormatted,
        genderData: genderDataFormatted,
        ageData: ageDataFormatted,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {coverageData, genderData, ageData} = this.state

    return (
      <>
        <VaccinationCoverage coverageData={coverageData} />
        <VaccinationByGender genderData={genderData} />
        <VaccinationByAge ageData={ageData} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderSwitchStatement = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="website-logo-container">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="cowin-title">Co-WIN</h1>
          </div>
          <h1 className="cowin-heading">CoWIN Vaccination in India </h1>
          {this.renderSwitchStatement()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
