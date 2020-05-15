import React from 'react'
import 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-react'
import '../../src/css/App.css'
import HOMEPAGE from '../components/Pages/homepage'
import { addFlightsLuton, addFlightsHeathrow } from '../redux/actions'
class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
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
    luton: state.luton,
    heathrow: state.heathrow
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFlightsLuton: payload => dispatch(addFlightsLuton(payload)),
    addFlightsHeathrow: payload => dispatch(addFlightsHeathrow(payload))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
