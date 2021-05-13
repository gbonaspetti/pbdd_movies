import React from 'react'
import { getQuantityMoviesByYear } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class MoviesYearQuantity extends React.Component {
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
        <h2>Quantidade de filmes produzida em cada ano</h2>
        {this.state.yearQuantityMovies.length > 0
          ? (this.state.yearQuantityMovies.map(year =>
            <p key={year.year}>
              {year.year} - {year.quantity} filmes
            </p>
          ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default MoviesYearQuantity
