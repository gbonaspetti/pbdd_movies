import React from 'react'
import { getMostMoviesActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class ActorsWithMoreMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostMoviesActors: []
    }
  }

  async componentDidMount() {
    const fetchGetMostMoviesActors = await generateFetchResponse(await getMostMoviesActors())

    this.setState({ mostMoviesActors: fetchGetMostMoviesActors.body.data })
  }

  render () {
    const commaBetweenLettersRegex = /(,(?=\S)|:)/g
    return (
      <div>
        <h2>Atores que participaram de mais filmes</h2>

        {this.state.mostMoviesActors.length > 0
          ? (this.state.mostMoviesActors.map(actor =>
            <p key={actor.id}>
              {actor.name} - {actor.quantity} filmes - Filmes: {actor.titles.replace(commaBetweenLettersRegex, ' - ')}
            </p>
          ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default ActorsWithMoreMovies
