import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  getAllPossibleActors,
  getMoviesMadeByMultipleActors
} from '../async.js'
import { generateFetchResponse } from '../helper.js'
import AutoCompleteTextInput from '../AutoCompleteTextIput.jsx'

require('./MoviesMadeByMultipleActors.css')

class MoviesMadeByMultipleActors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorList: [],
      actorsNumber: 2,
      movieList: undefined,
      request: false,
      selectedActorList: []
    }
  }

  async componentDidMount() {
    const fetchGetAllPossibleActors = await generateFetchResponse(await getAllPossibleActors())

    this.setState({ actorList: fetchGetAllPossibleActors.body.data })
  }

  handleClickSearch = async () => {
    const fetchGetMoviesMadeByMultipleActors = await generateFetchResponse(
      await getMoviesMadeByMultipleActors(this.state.selectedActorList)
    )

    this.setState({ movieList: fetchGetMoviesMadeByMultipleActors.body.data })
  }

  handleClickPlus = () => this.setState(prev => ({ actorsNumber: prev.actorsNumber + 1 }))

  // eslint-disable-next-line react/no-direct-mutation-state
  handleChangeActorsInput = (actor, index) => this.state.selectedActorList[index] = actor

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render() {
    const { state } = this

    return (
      <div>
        <h2 onClick={this.handleToggleRequest}>Filmes feitos por dois ou mais atores</h2>

        <div className='multipleActors_actorInput'>
          {[...Array(state.actorsNumber)].map((actor, id) =>
            <AutoCompleteTextInput
              key={id}
              options={state.actorList.map(actor => actor.name)}
              placeholder='Adicione um ator'
              onChange={(actor) => this.handleChangeActorsInput(actor, id)}
            />
          )}
          <IconButton
            onClick={this.handleClickPlus}
          >
            +
          </IconButton>
        </div>

        <Button
          className='multipleActors_searchMovies'
          variant='outlined'
          onClick={this.handleClickSearch}
        >
          Procurar
        </Button>

        {state.movieList && (
          <div>
            {state.movieList.map(movie =>
              <p key={movie.id.age}>
                {movie.title} - {movie.actorsNames.replaceAll(',', ', ')}
              </p>
            )}
          </div>
        )}

        {state.movieList && state.movieList.length === 0 && (
          <p>Nenhum filme foi encontrado</p>
        )}

        <Dialog
          open={state.request}
          onClose={this.handleToggleRequest}
        >
          <DialogTitle>Código da consulta principal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>SELECT id, title, actorsNames</p>
              <p>FROM (</p>
              <p>  SELECT movies.id as id, title, COUNT(name) as actorsNumber, GROUP_CONCAT(name) as actorsNames</p>
              <p>  FROM movies</p>
              <p>  INNER JOIN castings ON castings.movie_id = movies.id</p>
              <p>  INNER JOIN actors ON actors.id = castings.actor_id</p>
              <p>  WHERE name IN ({state.selectedActorList.join(',')})</p>
              <p>  GROUP BY movies.id</p>
              <p>)</p>
              <p>WHERE actorsNumber {'>'} 1</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default MoviesMadeByMultipleActors
