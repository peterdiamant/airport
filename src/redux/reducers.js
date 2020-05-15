import {
  ADD_FLIGHTS_LUTON,
  ADD_FLIGHTS_HEATHROW,
  SHOW_DATA_LUTON,
  SHOW_DATA_HEATHROW,
} from "./actions";

const initialState = {
  visual: true,
  luton: [],
  heathrow: [],
  showDataLuton: false,
  showDataHeathrow: false,
};

function flightsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FLIGHTS_LUTON:
      return {
        ...state,
        luton: action.data,
      };
    case ADD_FLIGHTS_HEATHROW:
      return {
        ...state,
        heathrow: action.data,
      };

    case SHOW_DATA_LUTON:
      return {
        ...state,
        showDataLuton: action.data,
      };

    case SHOW_DATA_HEATHROW:
      return {
        ...state,
        showDataHeathrow: action.data,
      };

    default:
      return state;
  }
}

export default flightsReducer;
