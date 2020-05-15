import React from 'react'
import { connect } from 'react-redux'
import flights from '../../api/flights'
import { addFlightsLuton, addFlightsHeathrow } from '../../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})
const FLIGHTSECTION = props => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Airport</TableCell>
            <TableCell align='right'>Arriving From</TableCell>
            <TableCell align='right'>Flight</TableCell>
            <TableCell align='right'>Scheduled</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Terminal</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.luton.map(row => (
            <TableRow key={row._id}>
              <TableCell component='th' scope='row'>
                {row.airport}
              </TableCell>
              <TableCell align='right'>{row.arriving_from}</TableCell>
              <TableCell align='right'>{row.flight}</TableCell>
              <TableCell align='right'>{row.scheduled}</TableCell>
              <TableCell align='right'>{row.status}</TableCell>
              <TableCell align='right'>{row.terminal}</TableCell>
            </TableRow>
          ))}
          {props.heathrow.map(row => (
            <TableRow key={row._id}>
              <TableCell component='th' scope='row'>
                {row.airport}
              </TableCell>
              <TableCell align='right'>{row.arriving_from}</TableCell>
              <TableCell align='right'>{row.flight}</TableCell>
              <TableCell align='right'>{row.scheduled}</TableCell>
              <TableCell align='right'>{row.status}</TableCell>
              <TableCell align='right'>{row.terminal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(FLIGHTSECTION)
