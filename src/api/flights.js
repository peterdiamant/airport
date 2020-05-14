import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:4000/airport',
  headers: {
    'Content-Type': 'application/json'
  }
})
