import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
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
      selectedActorList: [],
      actorsNumber: 2,
      movieList: undefined
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

  handleChangeActorsInput = (actor, index) => this.state.selectedActorList[index] = actor

  render() {
    const { state } = this

    return (
      <div>
        <h2>Filmes feitos por dois ou mais atores</h2>

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
      </div>
    )
  }
}
export default MoviesMadeByMultipleActors
