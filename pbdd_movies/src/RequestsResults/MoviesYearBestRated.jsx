import React from 'react'
import { getBestRatedMovies } from '../async.js'
import { generateFetchResponse } from '../helper.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class MoviesYearBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestYearMovies: [],
      request: false
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedMovies = await generateFetchResponse(await getBestRatedMovies())

    this.setState({ bestYearMovies: fetchGetBestRatedMovies.body.data })
  }

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render () {
    const { state } = this
    return (
      <div>
        <div className='titleWithInformation' onClick={this.handleToggleRequest}>
          <h2>Anos que produziram mais filmes de qualidades</h2>
          <p>(notas mais altas no IMDb)</p>
        </div>

        {state.bestYearMovies.length > 0
          ? (state.bestYearMovies.map(year =>
            <p key={year.year}>
              {year.year} - média das notas: {year.rating}
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
              <p>SELECT year, AVG(rating) as rating</p>
              <p>FROM movies</p>
              <p>WHERE rating IS NOT NULL</p>
              <p>  AND year IS NOT NULL</p>
              <p>GROUP BY year</p>
              <p>ORDER BY rating DESC</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default MoviesYearBestRated
