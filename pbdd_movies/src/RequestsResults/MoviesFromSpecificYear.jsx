import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  getAllPossibleMoviesYears,
  getMoviesFromSpecificYear
} from '../async.js'
import { generateFetchResponse } from '../helper.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

require('./MoviesFromSpecificYear.css')

class MoviesFromSpecificYear extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesFromYearList: [],
      request: false,
      year: 2021,
      yearList: []
    }
  }

  async componentDidMount() {
    const fetchGetMoviesFromSpecificYear = await generateFetchResponse(
      await getMoviesFromSpecificYear(this.state.year)
    )

    const fetchGetAllPossibleMoviesYears = await generateFetchResponse(
      await getAllPossibleMoviesYears()
    )

    this.setState({
      moviesFromYearList: fetchGetMoviesFromSpecificYear.body.data,
      yearList: fetchGetAllPossibleMoviesYears.body.data
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

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render() {
    const { state } = this
    return (
      <div>
        <div className='titleWithInformation' onClick={this.handleToggleRequest}>
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

        <Dialog
          open={state.request}
          onClose={this.handleToggleRequest}
        >
          <DialogTitle>Código da consulta principal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>SELECT id, title, rating, votes</p>
              <p>FROM movies</p>
              <p>WHERE year = {state.year}</p>
              <p>ORDER BY rating DESC</p>
              <p>LIMIT 3000</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default MoviesFromSpecificYear
