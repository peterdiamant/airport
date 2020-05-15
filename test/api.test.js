let mongoose = require("mongoose");
let Flights = require("../backend/models/flights.model");
let Heathrow = require("../backend/models/heathrow.model");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../backend/server");
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("Flights", () => {
  describe("/GET flights", () => {
    it("it should GET all the flights", (done) => {
      Flights.deleteOne({}, (err) => {
        console.log("removed");
      });
      chai
        .request(server)
        .get("/airport/flights/luton")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST Flight Luton", () => {
    it("it should POST a Luton flight", (done) => {
      const mockFlight = {
        airport: "Sample",
        scheduled: "15:50",
        flight: "AA1234",
        arriving_from: "London",
        status: "Landed",
        terminal: "",
      };
      chai
        .request(server)
        .post("/airport/flights/add")
        .send(mockFlight)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("/GET flights", () => {
    it("it should GET the proper mockdata", (done) => {
      chai
        .request(server)
        .get("/airport/flights/luton")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.stringify(res.body)).to.contain("airport");
          expect(JSON.stringify(res.body)).to.contain("Sample");
          expect(JSON.stringify(res.body)).to.contain("scheduled");
          expect(JSON.stringify(res.body)).to.contain("15:50");
          expect(JSON.stringify(res.body)).to.contain("flight");
          expect(JSON.stringify(res.body)).to.contain("AA1234");
          expect(JSON.stringify(res.body)).to.contain("London");
          expect(JSON.stringify(res.body)).to.contain("Landed");

          done();
        });
    });
  });

  describe("/GET flights from Heathrow", () => {
    it("it should GET all the flights", (done) => {
      Heathrow.remove({}, (err) => {
        console.log("removed");
      });
      chai
        .request(server)
        .get("/airport/flights/heathrow")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST Flight Heathrow", () => {
    it("it should POST a Heathrow flight", (done) => {
      const mockFlight = {
        airport: "SampleH",
        scheduled: "14:50",
        flight: "AB1234",
        arriving_from: "Budapest",
        status: "Landed",
        terminal: "T2",
      };
      chai
        .request(server)
        .post("/airport/heathrow/add")
        .send(mockFlight)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("/GET flights", () => {
    it("it should GET the proper mockdata", (done) => {
      chai
        .request(server)
        .get("/airport/flights/heathrow")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.stringify(res.body)).to.contain("airport");
          expect(JSON.stringify(res.body)).to.contain("SampleH");
          expect(JSON.stringify(res.body)).to.contain("scheduled");
          expect(JSON.stringify(res.body)).to.contain("14:50");
          expect(JSON.stringify(res.body)).to.contain("flight");
          expect(JSON.stringify(res.body)).to.contain("AB1234");
          expect(JSON.stringify(res.body)).to.contain("Budapest");
          expect(JSON.stringify(res.body)).to.contain("Landed");
          expect(JSON.stringify(res.body)).to.contain("T2");

          done();
        });
    });
  });
});
