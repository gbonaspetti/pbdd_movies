import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  getAllPossibleYears,
  getMoviesFromSpecificYear
} from '../async.js'
import { generateFetchResponse } from '../helper.js'

require('./MoviesFromSpecificYear.css')

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
        <div className='titleWithInformation'>
          <h2>Filmes produzidos no ano {state.year}</h2>
          <p>ordenados por melhor nota no IMDb</p>
        </div>

        <FormControl variant='outlined' className='moviesFromSpecificYear_year'>
          <InputLabel id='year'>Escolha o ano</InputLabel>
          <Select
            labelId='year'
            id='year'
            value={state.year}
            onChange={this.handleChangeYear}
            label='Escolha o ano'
          >
            {state.yearList.map(possibleYear =>
              <MenuItem key={possibleYear.year} value={possibleYear.year}>
                {possibleYear.year}
              </MenuItem>
            )}
          </Select>
        </FormControl>

        {state.moviesFromYearList.length > 0 ? (
          <div>
            {state.moviesFromYearList.map(movie =>
              <p key={movie.id} className='moviesFromSpecificYear_information'>
                {movie.title} -&nbsp;
                {(movie.rating && movie.votes)
                  ? <span>nota {movie.rating} - {movie.votes} votos</span>
                  : <span className='moviesFromSpecificYear_notRated'>Filme ainda não avaliado </span>
                }
              </p>
            )}
          </div>
        ) : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default MoviesFromSpecificYear
