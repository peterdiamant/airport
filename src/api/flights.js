import axios from 'axios'

export default axios.create({
  baseURL: 'https://diamant-airport.herokuapp.com/airport',
  headers: {
    'Content-Type': 'application/json'
  }
})
