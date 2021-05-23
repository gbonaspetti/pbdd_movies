import React from 'react'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import {
  getAllPossibleMoviesYears,
  getCustomizedSearchResult,
  getMaxVoteNumber
} from '../../async.js'
import { generateFetchResponse } from '../../helper.js'

class CustomizedRequestMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maxVote: 0,
      movieList: undefined,
      rate: 0,
      votes: 0,
      year: '',
      yearList: []
    }
  }

  async componentDidMount() {
    const fetchGetMaxVoteNumber = await generateFetchResponse(
      await getMaxVoteNumber()
    )

    const fetchGetAllPossibleMoviesYears = await generateFetchResponse(
      await getAllPossibleMoviesYears()
    )

    this.setState({
      maxVote: fetchGetMaxVoteNumber.body.data[0].vote,
      yearList: fetchGetAllPossibleMoviesYears.body.data
    })
  }

  handleChangeYear = e => this.setState({ year: e.target.value })

  handleSetRateValue = rate => this.setState({ rate })

  handleRateSliderChange = (e, newRate) => {
    this.handleSetRateValue(newRate)
  }

  handleRateInputChange = e => {
    this.handleSetRateValue(e.target.value === '' ? '' : Number(e.target.value))
  }

  handleRateBlur = () => {
    const { state } = this
    if (state.rate < 0) {
      this.handleSetRateValue(0)
    } else if (state.rate > 10) {
      this.handleSetRateValue(10)
    }
  }

  handleSetVoteValue = votes => this.setState({ votes })

  handleVoteSliderChange = (e, newVote) => {
    this.handleSetVoteValue(newVote)
  }

  handleVoteInputChange = e => {
    this.handleSetVoteValue(e.target.value === '' ? '' : Number(e.target.value))
  }

  handleVoteBlur = () => {
    const { state } = this
    if (state.votes < 0) {
      this.handleSetVoteValue(0)
    } else if (state.votes > state.maxVote) {
      this.handleSetVoteValue(state.maxVote)
    }
  }

  handleClickSearch = async () => {
    const { state } = this
    let query = ''
    if (state.rate) query = query.concat(`&rate=${state.rate}`)
    if (state.votes) query = query.concat(`&votes=${state.votes}`)
    if (state.year) query = query.concat(`&year=${state.year}`)

    const fetchGetMovies = await generateFetchResponse(
      await getCustomizedSearchResult('movies', query)
    )

    this.setState({ movieList: fetchGetMovies.body.data })
  }

  render() {
    const { state } = this
    return (
      <div className='customized_options'>
        <span>
          <FormControl variant='outlined' className='customized_year'>
            <InputLabel id='year'>Ano de lançamento</InputLabel>
            <Select
              labelId='year'
              id='year'
              value={state.year}
              onChange={this.handleChangeYear}
              label='Escolha o ano'
            >
              <MenuItem value={''}>
                ----
              </MenuItem>
              {state.yearList.map(possibleYear =>
                <MenuItem key={possibleYear.year} value={possibleYear.year}>
                  {possibleYear.year}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </span>
        <span>
          <Typography id='rate' gutterBottom>
            Nota IMDb maior que
          </Typography>
          <Grid className='customized_slider'>
            <Grid xs>
              <Slider
                value={typeof state.rate === 'number' ? state.rate : 0}
                onChange={this.handleRateSliderChange}
                max={10}
              />
            </Grid>
            <Grid item>
              <OutlinedInput
                value={state.rate}
                onChange={this.handleRateInputChange}
                onBlur={this.handleRateBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 10,
                  type: 'number'
                }}
              />
            </Grid>
          </Grid>
        </span>

        <span>
          <Typography id='votes' gutterBottom>
            Número mínimo de votos
          </Typography>
          <Grid className='customized_slider'>
            <Grid xs>
              <Slider
                value={typeof state.votes === 'number' ? state.votes : 0}
                onChange={this.handleVoteSliderChange}
                max={state.maxVote}
              />
            </Grid>
            <Grid item>
              <OutlinedInput
                value={state.votes}
                onChange={this.handleVoteInputChange}
                onBlur={this.handleVoteBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: state.maxVote,
                  type: 'number'
                }}
              />
            </Grid>
          </Grid>
        </span>

        <span>
          <Button
            variant='outlined'
            onClick={this.handleClickSearch}
          >
            Procurar
          </Button>
        </span>

        {state.movieList &&
          state.movieList.length > 0 &&
          state.movieList.map(movie =>
            <div>
              {movie.title}&nbsp;-&nbsp;
              {movie.year && `${movie.year} -`}&nbsp;
              {movie.rating ? movie.rating : 'Filme não avaliado'}
              {movie.votes && ` - ${movie.votes} votos`}
            </div>
          )}

        {state.movieList && state.movieList.length === 0 && (
          <div>Nenhum filme encontrado</div>
        )}
      </div>
    )
  }
}
export default CustomizedRequestMovies
