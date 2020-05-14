import React from 'react'
import 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-react'
import '../../src/css/App.css'
import HOMEPAGE from '../components/Pages/homepage'
import { addFlights } from '../redux/actions'
class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/main'>
            <HOMEPAGE />
          </Route>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    visModal: state.visModal,
    flights: state.flights
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFlights: payload => dispatch(addFlights(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
