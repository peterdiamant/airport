export const ADD_FLIGHTS_LUTON = 'ADD_FLIGHTS_LUTON'
export const ADD_FLIGHTS_HEATHROW = 'ADD_FLIGHTS_HEATHROW'

export function addFlightsLuton (data) {
  return { type: ADD_FLIGHTS_LUTON, data: data }
}

export function addFlightsHeathrow (data) {
  return { type: ADD_FLIGHTS_HEATHROW, data: data }
}
