import React from 'react'
import { getBestRatedActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class BestRatedActors extends React.Component {
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

  render () {
    return (
      <div>
        {this.state.bestRatedActors.map(actor =>
          <p key={`${actor.name}_${actor.rating}`}>
            {actor.name} - {actor.rating} - {actor.movies}
          </p>
        )}
      </div>
    )
  }
}
export default BestRatedActors
