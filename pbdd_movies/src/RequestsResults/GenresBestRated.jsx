import React from 'react'
import { getBestRatedGenres } from '../async.js'
import { generateFetchResponse } from '../helper.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class GenresBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestRatedGenres: [],
      request: false
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedGenres = await generateFetchResponse(await getBestRatedGenres())

    this.setState({ bestRatedGenres: fetchGetBestRatedGenres.body.data })
  }

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render () {
    const { state } = this

    return (
      <div>
        <div className='titleWithInformation' onClick={this.handleToggleRequest}>
          <h2>Gêneros de mais qualidade</h2>
          <p>(notas mais altas no IMDb)</p>
        </div>

        {state.bestRatedGenres.length > 0
          ? (state.bestRatedGenres.map(genre =>
            <p key={genre.name}>
              {genre.name} - nota média {genre.rating}
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
              <p>SELECT name, AVG(rating) as rating</p>
              <p>FROM classifications</p>
              <p>INNER JOIN movies ON movies.id = classifications.movie_id</p>
              <p>INNER JOIN genres ON genres.id = classifications.genre_id</p>
              <p>GROUP BY genre_id</p>
              <p>ORDER BY rating DESC</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default GenresBestRated
