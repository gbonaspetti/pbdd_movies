import React from 'react'
import { getBestRatedMovies } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class BestYearMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestYearMovies: []
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedMovies = await generateFetchResponse(await getBestRatedMovies())

    this.setState({ bestYearMovies: fetchGetBestRatedMovies.body.data })
  }

  render () {
    return (
      <div>
        {this.state.bestYearMovies.map(year =>
          <p key={year.year}>
            {year.year} - {year.rating}
          </p>
        )}
      </div>
    )
  }
}
export default BestYearMovies
