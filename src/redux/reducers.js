import { ADD_FLIGHTS, ADD_LOADING } from './actions'

const initialState = {
  visual: true,
  flights: [],
  loading: true
}

function flightsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_FLIGHTS:
      return {
        ...state,
        flights: action.data,
        loading: false
      }

    default:
      return state
  }
}

export default flightsReducer
