import React from 'react'
import 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-react'
import '../../src/css/App.css'
import MAINPAGE from '../components/Pages/homepage'
import { addScheduledGoals } from '../redux/actions'
class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <MAINPAGE />
          </Route>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    visual: state.visual,
    scheduled: state.scheduled,
    actualUser: state.actualUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addScheduledGoals: payload => dispatch(addScheduledGoals(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
