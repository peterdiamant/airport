import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import flights from '../../api/flights'
import { addFlights } from '../../redux/actions'

const HOMEPAGE = props => {
  useEffect(() => {
    flightsGet()
  }, [])

  const flightsGet = async text => {
    const response = await flights.get('/flights', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    props.addFlights(response.data)
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
