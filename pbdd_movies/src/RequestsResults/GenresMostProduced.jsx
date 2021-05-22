import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getMostProducedGenres } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class GenresMostProduced extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostProducedGenres: [],
      request: false
    }
  }

  async componentDidMount() {
    const fetchGetMostProducedGenres = await generateFetchResponse(await getMostProducedGenres())

    this.setState({mostProducedGenres: fetchGetMostProducedGenres.body.data})
  }

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render () {
    const { state } = this

    return (
      <div>
        <h2 onClick={this.handleToggleRequest}>Gêneros mais produzidos</h2>
        {state.mostProducedGenres.length > 0
          ? (state.mostProducedGenres.map(genre =>
            <p key={genre.name}>
              {genre.name} - {genre.quantity} filmes
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
              <p>SELECT name, COUNT(movie_id) as quantity</p>
              <p>FROM classifications</p>
              <p>INNER JOIN movies ON movies.id = classifications.movie_id</p>
              <p>INNER JOIN genres ON genres.id = classifications.genre_id</p>
              <p>GROUP BY genre_id</p>
              <p>ORDER BY quantity DESC</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default GenresMostProduced
