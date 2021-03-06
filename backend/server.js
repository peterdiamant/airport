const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const $ = require("cheerio");
const puppeteer = require("puppeteer");
const cors = require("cors");
const mongoose = require("mongoose");
const airportRoutes = express.Router();
const request = require("request");
const exphbs = require("express-handlebars");

const PORT = 4000;

let Flights = require("../backend/models/flights.model");
let Heathrow = require("../backend/models/heathrow.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://mizuqa:Kormi__90__@ds215229.mlab.com:15229/heroku_hrr5zt6l",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.get("/airport/luton", function (req, res) {
  Flights.collection.remove();
  request("https://www.london-luton.co.uk/flights", function (
    error,
    response,
    html
  ) {
    const length = $(
      "div.flight-details.saveflightList.arrivals > div.flight-info > span.flightOrgDest",
      html
    ).length;

    for (let i = 0; i < length; i++) {
      var fromData = $(
        "div.flight-details.saveflightList.arrivals > div.flight-info > span.flightOrgDest",
        html
      )[i].lastChild.data;

      var flightNumber = $(
        "div.flight-details.saveflightList.arrivals > div.logo-flightNo > span.flightNumber",
        html
      )[i].lastChild.data;

      var arrivalTime = $(
        "div.flight-details.saveflightList.arrivals > div.flight-info > span.flightTime",
        html
      )[i].lastChild.data;

      if (
        $(
          "div.flight-details.saveflightList.arrivals > div.flight-info > span.flightStatus",
          html
        )[i].lastChild === null
      ) {
        var status = "No Info";
      } else {
        status = $(
          "div.flight-details.saveflightList.arrivals > div.flight-info > span.flightStatus",
          html
        )[i].lastChild.data;
      }

      Flights.create(
        {
          airport: "Luton",
          scheduled: arrivalTime,
          flight: flightNumber,
          arriving_from: fromData,
          status: status,
          terminal: "N/A",
        },
        function (err, inserted) {
          if (err) {
            console.log(err);
          } else {
            console.log(inserted);
          }
        }
      );
      console.log(i);
      if (i === length - 1) {
        return res.sendStatus(200);
      }
    }
  });
});

app.get("/airport/heathrow", function (req, res) {
  Heathrow.collection.remove();
  const url = "https://www.heathrow.com/arrivals";

  puppeteer
    .launch()
    .then(function (browser) {
      return browser.newPage();
    })
    .then(function (page) {
      return page.goto(url).then(function () {
        return page.content();
      });
    })
    .then(function (html) {
      const length = $(
        "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-arriving-from",
        html
      ).length;
      console.log("LENGTH    " + length);

      if (length === 0) {
        return res.status(200).send("Length: " + length);
      }
      for (let i = 0; i < length; i++) {
        var fromData = $(
          "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-arriving-from",
          html
        )[i].lastChild.data;

        var flightNumber = $(
          "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-flight",
          html
        )[i].lastChild.data;

        var arrivalTime = $(
          "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-scheduled",
          html
        )[i].lastChild.data;

        var terminal = $(
          "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-terminal > p",
          html
        )[i].lastChild.data;

        if (
          $(
            "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-status.sm-hide > p",
            html
          )[i].lastChild === null
        ) {
          var status = "No Info";
        } else {
          status = $(
            "div.airline-listing-table > a.airline-listing-line-item.sm-px3.lg-px3.py4.md-py3 > div.col-status.sm-hide > p",
            html
          )[i].lastChild.data;
        }

        Heathrow.create(
          {
            airport: "Heathrow",
            scheduled: arrivalTime,
            flight: flightNumber,
            arriving_from: fromData,
            status: status,
            terminal: terminal,
          },
          function (err, inserted) {
            if (err) {
              console.log(err);
              return res.sendStatus(503);
            } else {
              console.log(inserted);
            }
          }
        );
        console.log(i);
        if (i === length - 1) {
          return res.status(200).send("Found: " + length + " arrival");
        }
      }
    });
});

airportRoutes.route("/").get(function (req, res) {
  Flights.find(function (err, flights) {
    if (err) {
      console.log(err);
      return res.status(500).send("The query did not succeed, try again");
    } else {
      res.json(flights);
      return res.status(200).send("adding new flight failed");
    }
  });
});

airportRoutes.route("/flights/luton").get(function (req, res) {
  Flights.find(function (err, flights) {
    if (err) {
      console.log(err);
    } else {
      res.json(flights);
    }
  });
});

airportRoutes.route("/flights/luton/:id").get(function (req, res) {
  let id = req.params.id;
  Flights.find({ flight: id }, function (err, flights) {
    res.json(flights);
  });
});

airportRoutes.route("/flights/heathrow").get(function (req, res) {
  Heathrow.find(function (err, heathrow) {
    if (err) {
      console.log(err);
    } else {
      res.json(heathrow);
    }
  });
});

airportRoutes.route("/flights/heathrow/:id").get(function (req, res) {
  let id = req.params.id;
  Heathrow.find({ flight: id }, function (err, flights) {
    res.json(flights);
  });
});

airportRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Flights.findById(id, function (err, flights) {
    res.json(flights);
  });
});

airportRoutes.route("/flights/add").post(function (req, res) {
  let flights = new Flights(req.body);
  flights
    .save()
    .then((flights) => {
      res.status(200).json({ flights: "flight added successfully" });
    })
    .catch((err) => {
      res.status(500).send("adding new flight failed");
    });
});

airportRoutes.route("/heathrow/add").post(function (req, res) {
  let heathrow = new Heathrow(req.body);
  heathrow
    .save()
    .then((heathrow) => {
      res.status(200).json({ flights: "flight added successfully" });
    })
    .catch((err) => {
      res.status(500).send("adding new flight failed");
    });
});

app.use("/airport", airportRoutes);

var server = app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

module.exports = server