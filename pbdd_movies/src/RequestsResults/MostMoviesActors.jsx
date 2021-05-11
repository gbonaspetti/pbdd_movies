import React from 'react'
import { getMostMoviesActors } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class MostMoviesActors extends React.Component {
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
    return (
      <div>
        {this.state.mostMoviesActors.map(actor =>
          <p key={actor.id}>
            {actor.name} - {actor.quantity} - {actor.titles}
          </p>
        )}
      </div>
    )
  }
}
export default MostMoviesActors
