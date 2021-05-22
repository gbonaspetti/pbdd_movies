import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getQuantityMoviesByYear } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class MoviesYearQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      request: false,
      yearQuantityMovies: []
    }
  }

  async componentDidMount() {
    const fetchGetQuantityMoviesByYear = await generateFetchResponse(await getQuantityMoviesByYear())

    this.setState({ yearQuantityMovies: fetchGetQuantityMoviesByYear.body.data })
  }

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render () {
    const { state } = this
    return (
      <div>
        <h2 onClick={this.handleToggleRequest}>
          Quantidade de filmes produzida em cada ano
        </h2>
        {state.yearQuantityMovies.length > 0
          ? (state.yearQuantityMovies.map(year =>
            <p key={year.year}>
              {year.year} - {year.quantity} filmes
            </p>
          ))
          : <p>Carregando...</p>
        }

        <Dialog
          open={state.request}
          onClose={this.handleToggleRequest}
        >
          <DialogTitle>Código da consulta principal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>SELECT COUNT(id) as quantity, year</p>
              <p>FROM movies</p>
              <p>WHERE year IS NOT NULL</p>
              <p>GROUP BY year</p>
              <p>ORDER BY year DESC</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default MoviesYearQuantity
