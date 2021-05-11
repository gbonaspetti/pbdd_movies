import React from 'react'
import { getQuantityMoviesByYear } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class YearQuantityMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yearQuantityMovies: []
    }
  }

  async componentDidMount() {
    const fetchGetQuantityMoviesByYear = await generateFetchResponse(await getQuantityMoviesByYear())

    this.setState({ yearQuantityMovies: fetchGetQuantityMoviesByYear.body.data })
  }

  render () {
    return (
      <div>
        {this.state.yearQuantityMovies.map(year =>
          <p key={year.year}>
            {year.year} - {year.quantity}
          </p>
        )}
      </div>
    )
  }
}
export default YearQuantityMovies
