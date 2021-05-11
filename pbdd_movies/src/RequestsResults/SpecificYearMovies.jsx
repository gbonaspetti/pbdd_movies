import React from 'react'
import { getMoviesFromSpecificYear } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class SpecificYearMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesFromYearList: []
    }
  }

  async componentDidMount() {
    const fetchGetMoviesFromSpecificYear = await generateFetchResponse(await getMoviesFromSpecificYear('2020'))

    this.setState({ moviesFromYearList: fetchGetMoviesFromSpecificYear.body.data })
  }

  render () {
    return (
      <div>
        {this.state.moviesFromYearList.map(movie =>
          <p key={movie.title}>
            {movie.title} - {movie.rating} - {movie.votes}
          </p>
        )}
      </div>
    )
  }
}
export default SpecificYearMovies
