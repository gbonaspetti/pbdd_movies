import React from 'react'
import Button from '@material-ui/core/Button'
import { getMostMoviesActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'

require('./ActorsWithMoreMovies.css')

class ActorsWithMoreMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorFilter: '',
      mostMoviesActors: [],
      displayedMoviesList: []
    }
  }

  async componentDidMount() {
    const fetchGetMostMoviesActors = await generateFetchResponse(await getMostMoviesActors())

    this.setState({ mostMoviesActors: fetchGetMostMoviesActors.body.data })
  }

  handleChangeActorFilter = e => this.setState({ actorFilter: e.target.value })

  handleToggleDisplayMovies = (id) => {
    const { state } = this
    if (state.displayedMoviesList.includes(id)) {
      const newDisplayedMoviesList = state.displayedMoviesList.filter(actorId => actorId !== id)
      this.setState({ displayedMoviesList: newDisplayedMoviesList })
    } else this.setState(prev => ({ displayedMoviesList: [...prev.displayedMoviesList, id] }))
  }

  render() {
    const { state } = this
    const commaBetweenLettersRegex = /(,(?=\S)|:)/g
    return (
      <div>
        <h2>Atores que participaram de mais filmes</h2>


        <label htmlFor='filter'>Procurando por um ator específico? Filtre a lista aqui: </label>
        <input
          id='filter'
          onChange={this.handleChangeActorFilter}
          placeholder='Procurar ator...'
          type='text'
          value={state.actorFilter}
        />

        {state.mostMoviesActors.length > 0
          ? (state.mostMoviesActors.filter(actor =>
            actor.name.toUpperCase().includes(
              state.actorFilter.toUpperCase()
            ))
            .map(actor =>
              <div key={actor.id}>
                <p>{actor.name} - {actor.quantity} filmes</p>

                <div className='actorsWithMoreMovies_displayMovies'>
                  <Button
                    size='small'
                    onClick={() => this.handleToggleDisplayMovies(actor.id)}
                  >
                    {state.displayedMoviesList.includes(actor.id)
                      ? 'Esconder'
                      : 'Ver'} filmes de {actor.name}
                  </Button>
                </div>
                {state.displayedMoviesList.includes(actor.id) && (
                  <p>Filmes: {actor.titles.replace(commaBetweenLettersRegex, ' - ')}</p>
                )}
              </div>
            ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default ActorsWithMoreMovies
