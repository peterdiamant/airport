import { ADD_FLIGHTS } from './actions'

const initialState = {
  visual: true,
  flights: []
}

function flightsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_FLIGHTS:
      return {
        ...state,
        flights: action.data
      }

    default:
      return state
  }
}

export default flightsReducer
