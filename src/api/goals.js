import axios from "axios";
import HEADER from "../components/Comps/header";

export default axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://athservices.test.msrareservices.com/campaign/app/api",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYngiOiJSQVJFLjUwIiwidHZyIjoiMS45My45Mzk5LjAiLCJyLXN2ciI6IjEifQ.i2gIOEKsONsMSC_uBGiYpqLXc0VJQLz7iJmYqZPjB8A",
  },
});
