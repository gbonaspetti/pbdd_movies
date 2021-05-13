import React from 'react'
import { getBestRatedGenres } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class GenresBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestRatedGenres: []
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedGenres = await generateFetchResponse(await getBestRatedGenres())

    this.setState({ bestRatedGenres: fetchGetBestRatedGenres.body.data })
  }

  render () {
    return (
      <div>
        {this.state.bestRatedGenres.map(genre =>
          <p key={genre.name}>
            {genre.name} - {genre.rating}
          </p>
        )}
      </div>
    )
  }
}
export default GenresBestRated
