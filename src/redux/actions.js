export const ADD_FLIGHTS_LUTON = "ADD_FLIGHTS_LUTON";
export const ADD_FLIGHTS_HEATHROW = "ADD_FLIGHTS_HEATHROW";
export const SHOW_DATA_LUTON = "SHOW_DATA_LUTON";
export const SHOW_DATA_HEATHROW = "SHOW_DATA_HEATHROW";
export const ADD_SEARCH_TERM = "ADD_SEARCH_TERM";

export function addFlightsLuton(data) {
  return { type: ADD_FLIGHTS_LUTON, data: data };
}

export function addSearchTerm(data) {
  return { type: ADD_SEARCH_TERM, data: data };
}

export function addFlightsHeathrow(data) {
  return { type: ADD_FLIGHTS_HEATHROW, data: data };
}

export function setDataShowLuton(data) {
  return { type: SHOW_DATA_LUTON, data: data };
}

export function setDataShowHeathrow(data) {
  return { type: SHOW_DATA_HEATHROW, data: data };
}
