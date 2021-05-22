import React from 'react'
import { getBestRatedActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class ActorsBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorFilter: '',
      bestRatedActors: [],
      request: false
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedActors = await generateFetchResponse(await getBestRatedActors())

    this.setState({ bestRatedActors: fetchGetBestRatedActors.body.data })
  }

  handleChangeActorFilter = e => this.setState({ actorFilter: e.target.value })

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render() {
    const { state } = this

    return (
      <div>
        <div className='titleWithInformation' onClick={this.handleToggleRequest}>
          <h2>Atores que produziram mais filmes de qualidades</h2>
          <p>(notas mais altas no IMDb; obrigatoriamente mais de 10 filmes)</p>
        </div>

        <label htmlFor='filter'>Procurando por um ator específico? Filtre a lista aqui: </label>
        <input
          id='filter'
          onChange={this.handleChangeActorFilter}
          placeholder='Procurar ator...'
          type='text'
          value={state.actorFilter}
        />

        {state.bestRatedActors.length > 0
          ? (state.bestRatedActors.filter(actor =>
            actor.name.toUpperCase().includes(
              state.actorFilter.toUpperCase()
            ))
            .map(actor =>
              <p key={actor.id}>
                {actor.name} - nota média {actor.rating} - {actor.movies} filmes
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
              <p>SELECT *</p>
              <p>FROM (</p>
              <p>  SELECT actors.id as id, name, AVG(rating) as rating, COUNT(movie_id) as movies</p>
              <p>  FROM actors</p>
              <p>  INNER JOIN castings ON castings.actor_id = actors.id</p>
              <p>  INNER JOIN movies ON castings.movie_id = movies.id</p>
              <p>  WHERE rating IS NOT NULL</p>
              <p>  GROUP BY actors.id</p>
              <p>  ORDER BY rating DESC</p>
              <p>)</p>
              <p>WHERE movies {'>'} 10</p>
              <p>LIMIT 3000</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default ActorsBestRated
