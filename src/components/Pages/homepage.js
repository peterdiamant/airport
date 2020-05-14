import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import flights from '../../api/flights'
import { addFlights } from '../../redux/actions'

const HOMEPAGE = props => {
  useEffect(() => {
    lutonGet()
    heathrowGet()
  }, [])

  // TODO: heathrow and luton not in the same state []

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

  return <div>HELLO</div>
}

const mapStateToProps = state => {
  return {
    visModal: state.visModal,
    flights: state.flights
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFlights: payload => dispatch(addFlights(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE)
