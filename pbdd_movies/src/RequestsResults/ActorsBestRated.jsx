import React from 'react'
import { getBestRatedActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class ActorsBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestRatedActors: [],
      actorFilter: ''
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedActors = await generateFetchResponse(await getBestRatedActors())

    this.setState({ bestRatedActors: fetchGetBestRatedActors.body.data })
  }

  handleChangeActorFilter = e => this.setState({ actorFilter: e.target.value })

  render() {
    const { state } = this

    return (
      <div>
        <div className='titleWithInformation'>
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
      </div>
    )
  }
}
export default ActorsBestRated
