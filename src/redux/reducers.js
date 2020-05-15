import { ADD_FLIGHTS_LUTON, ADD_FLIGHTS_HEATHROW, ADD_LOADING } from './actions'

const initialState = {
  visual: true,
  luton: [],
  heathrow: []
}

function flightsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_FLIGHTS_LUTON:
      return {
        ...state,
        luton: action.data
      }
    case ADD_FLIGHTS_HEATHROW:
      return {
        ...state,
        heathrow: action.data
      }

    default:
      return state
  }
}

export default flightsReducer
