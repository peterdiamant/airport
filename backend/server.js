const express = require('express')
const app = express()
const rp = require('request-promise')
const bodyParser = require('body-parser')
const $ = require('cheerio')

const cors = require('cors')
const mongoose = require('mongoose')
const airportRoutes = express.Router()
const request = require('request')
const cheerio = require('cheerio')
const exphbs = require('express-handlebars')
const PORT = 4000

let Flights = require('../backend/models/flights.model')

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

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

app.get('/airport/luton', function (req, res) {
  request('https://www.london-luton.co.uk/flights', function (
    error,
    response,
    html
  ) {
    const length = $(
      'div.flight-details.saveflightList.arrivals > div.flight-info > span.flightOrgDest',
      html
    ).length

    for (let i = 0; i < length; i++) {
      var fromData = $(
        'div.flight-details.saveflightList.arrivals > div.flight-info > span.flightOrgDest',
        html
      )[i].lastChild.data

      var flightNumber = $(
        'div.flight-details.saveflightList.arrivals > div.logo-flightNo > span.flightNumber',
        html
      )[i].lastChild.data

      var arrivalTime = $(
        'div.flight-details.saveflightList.arrivals > div.flight-info > span.flightTime',
        html
      )[i].lastChild.data

      if (
        $(
          'div.flight-details.saveflightList.arrivals > div.flight-info > span.flightStatus',
          html
        )[i].lastChild === null
      ) {
        var status = 'No Info'
      } else {
        var status = $(
          'div.flight-details.saveflightList.arrivals > div.flight-info > span.flightStatus',
          html
        )[i].lastChild.data
      }

      Flights.create(
        {
          scheduled: arrivalTime,
          flight: flightNumber,
          arriving_from: fromData,
          status: status
        },
        function (err, inserted) {
          if (err) {
            console.log(err)
          } else {
            console.log(inserted)
          }
        }
      )
      console.log(i)
      if (i === length - 1) {
        Flights.collection.remove()
        return res.sendStatus(200)
      }
    }
  })
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
