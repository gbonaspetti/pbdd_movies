import React from 'react'
import { getBestRatedActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class ActorsBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestRatedActors: []
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedActors = await generateFetchResponse(await getBestRatedActors())

    this.setState({ bestRatedActors: fetchGetBestRatedActors.body.data })
  }

  render() {
    return (
      <div>
        <div className='titleWithInformation'>
          <h2>Atores que produziram mais filmes de qualidades</h2>
          <p>(notas mais altas no IMDb)</p>
        </div>

        {this.state.bestRatedActors.length > 0
          ? (this.state.bestRatedActors.map(actor =>
              <p key={`${actor.name}_${actor.rating}`}>
                {actor.name} - nota {actor.rating} - {actor.movies} filme(s)
              </p>
            ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default ActorsBestRated
