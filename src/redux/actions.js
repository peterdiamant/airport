export const ADD_FLIGHTS = 'ADD_FLIGHTS'

export function addFlights (data) {
  return { type: ADD_FLIGHTS, data: data }
}
