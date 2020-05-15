import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import flights from '../../api/flights'
import { addFlights } from '../../redux/actions'
import FLIGHTSECTION from '../Sections/flightsSection'

const HOMEPAGE = props => {
  useEffect(() => {
    getAllData()
  }, [])

  // TODO: heathrow and luton not in the same state []

  const getAllData = () => {
    lutonGet()
    heathrowGet()
  }

  const flightsGet = async text => {
    const response = await flights.get('/flights', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    props.addFlights(response.data)
  }

  const lutonGet = async text => {
    const response = await flights.get('/luton', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(JSON.stringify(response.data))
    flightsGet()
  }

  const heathrowGet = async text => {
    const response = await flights.get('/luton', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(JSON.stringify(response.data))
    flightsGet()
  }

  return (
    <div>
      <button
        onClick={() => {
          getAllData()
        }}
      >
        REFRESH
      </button>
      <FLIGHTSECTION />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    visModal: state.visModal,
    flights: state.flights,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFlights: payload => dispatch(addFlights(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE)
