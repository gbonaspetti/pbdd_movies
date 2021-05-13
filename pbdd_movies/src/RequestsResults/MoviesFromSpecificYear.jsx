import React from 'react'
import {
  getAllPossibleYears,
  getMoviesFromSpecificYear
} from '../async.js'
import { generateFetchResponse } from '../helper.js'

class MoviesFromSpecificYear extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesFromYearList: [],
      year: 2021,
      yearList: []
    }
  }

  async componentDidMount() {
    const fetchGetMoviesFromSpecificYear = await generateFetchResponse(
      await getMoviesFromSpecificYear(this.state.year)
    )

    const fetchGetAllPossibleYears = await generateFetchResponse(
      await getAllPossibleYears()
    )

    this.setState({
      moviesFromYearList: fetchGetMoviesFromSpecificYear.body.data,
      yearList: fetchGetAllPossibleYears.body.data
    })
  }

  handleChangeYear = async e => {
    const newYear = e.target.value
    const fetchGetMoviesFromSpecificYear = await generateFetchResponse(
      await getMoviesFromSpecificYear(newYear)
    )

    this.setState({
      moviesFromYearList: fetchGetMoviesFromSpecificYear.body.data,
      year: newYear
    })
  }

  render() {
    const { state } = this
    return (
      <div>
        <label htmlFor='year'>Escolha aqui o ano: </label>
        <select
          id='year'
          onChange={this.handleChangeYear}
          value={state.year}
        >
          {state.yearList.map(possibleYear =>
            <option key={possibleYear.year} value={possibleYear.year}>
              {possibleYear.year}
            </option>
          )}
        </select>

        <div className='titleWithInformation'>
          <h2>Filmes produzidos no ano {state.year}</h2>
          <p>ordenados por melhor nota no IMDb</p>
        </div>

        {state.moviesFromYearList.length > 0 ? (
          <div>
            {state.moviesFromYearList.map(movie =>
              <p key={movie.id}>
                {movie.title} - nota {movie.rating} - {movie.votes} votos
              </p>
            )}
          </div>
        ) : (
            <div>Carregando...</div>
          )}
      </div>
    )
  }
}
export default MoviesFromSpecificYear
