import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import flights from '../../api/flights'

import { addFlightsLuton, addFlightsHeathrow } from '../../redux/actions'
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

  const flightsGetLuton = async text => {
    const response = await flights.get('/flights/luton', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    props.addFlightsLuton(response.data)
  }

  const flightsGetHeathrow = async text => {
    const response = await flights.get('/flights/heathrow', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    props.addFlightsHeathrow(response.data)
  }

  const lutonGet = async text => {
    const response = await flights.get('/luton', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(JSON.stringify(response.data))
    flightsGetLuton()
  }

  const heathrowGet = async text => {
    const response = await flights.get('/heathrow', null, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(JSON.stringify(response.data))
    flightsGetHeathrow()
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
    luton: state.luton,
    heathrow: state.heathrow,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFlightsLuton: payload => dispatch(addFlightsLuton(payload)),
    addFlightsHeathrow: payload => dispatch(addFlightsHeathrow(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE)
