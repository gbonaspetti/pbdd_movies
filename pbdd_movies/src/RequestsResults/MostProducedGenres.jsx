import React from 'react'
import { getMostProducedGenres } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class MostProducedGenres extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostProducedGenres: []
    }
  }

  async componentDidMount() {
    const fetchGetMostProducedGenres = await generateFetchResponse(await getMostProducedGenres())

    this.setState({mostProducedGenres: fetchGetMostProducedGenres.body.data})
  }

  render () {
    return (
      <div>
        {this.state.mostProducedGenres.map(genre =>
          <p key={genre.name}>
            {genre.name} - {genre.quantity}
          </p>
        )}
      </div>
    )
  }
}
export default MostProducedGenres
