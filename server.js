const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const airportRoutes = express.Router()
const PORT = 4000

let Flights = require('./backend/models/flights.model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(
  'mongodb://mizuqa:Kormi__90__@ds215229.mlab.com:15229/heroku_hrr5zt6l',
  { useNewUrlParser: true }
)
const connection = mongoose.connection

connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

airportRoutes.route('/').get(function (req, res) {
  Flights.find(function (err, flights) {
    if (err) {
      console.log(err)
    } else {
      res.json(flights)
    }
  })
})

airportRoutes.route('/flights').get(function (req, res) {
  Flights.find(function (err, flights) {
    if (err) {
      console.log(err)
    } else {
      res.json(flights)
    }
  })
})

airportRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id
  Flights.findById(id, function (err, todo) {
    res.json(flights)
  })
})

airportRoutes.route('/flights/add').post(function (req, res) {
  let flights = new Flights(req.body)
  flights
    .save()
    .then(flights => {
      res.status(200).json({ flights: 'flight added successfully' })
    })
    .catch(err => {
      res.status(400).send('adding new flight failed')
      console.log(res)
    })
})

app.use('/airport', airportRoutes)

app.listen(PORT, function () {
  console.log('Server is running on Port: ' + PORT)
})
