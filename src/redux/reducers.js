import {
  ADD_SCHEDULED_GOALS,
  ADD_MERGED_GOALS,
  SHOW_RESULTS,
  ADD_KEY,
  ADD_USER_DATA,
  ADD_USER,
  ADD_PIRATE,
  ADD_SERVER,
} from "./actions";
import { parseTwoDigitYear } from "moment";

const initialState = {
  visual: false,
  keys: "",
  server: "",
  merged: [],
  actualUser: [],
  user: "",
  pirate: "",
  parseTwoDigitYear: "",
  scheduled: [],
};
function goalReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SCHEDULED_GOALS:
      return {
        ...state,
        scheduled: action.data,
      };
    case ADD_USER_DATA:
      return {
        ...state,
        actualUser: action.data,
      };
    case ADD_SERVER:
      return {
        ...state,
        server: action.data,
      };

    case ADD_USER:
      return {
        ...state,
        user: action.data,
      };
    case ADD_PIRATE:
      return {
        ...state,
        pirate: action.data,
      };

    case ADD_MERGED_GOALS:
      return {
        ...state,
        merged: action.data,
      };
    case SHOW_RESULTS:
      return {
        ...state,
        visual: action.data,
      };
    case ADD_KEY:
      return {
        ...state,
        keys: action.data,
      };

    default:
      return state;
  }
}

export default goalReducer;
