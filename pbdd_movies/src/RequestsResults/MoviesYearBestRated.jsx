import React from 'react'
import { getBestRatedMovies } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class MoviesYearBestRated extends React.Component {
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
        <div className='titleWithInformation'>
          <h2>Anos que produziram mais filmes de qualidades</h2>
          <p>(notas mais altas no IMDb)</p>
        </div>

        {this.state.bestYearMovies.length > 0
          ? (this.state.bestYearMovies.map(year =>
            <p key={year.year}>
              {year.year} - média das notas: {year.rating}
            </p>
          ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default MoviesYearBestRated
