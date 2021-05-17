import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'

class CustomizedRequestMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: null,
      rate: 0
    }
  }

  handleChangeYear = e => this.setState({ year: e.target.value })

  handleSetValue = rate => this.setState({ rate })

  handleSliderChange = (e, newRate) => {
    this.handleSetValue(newRate)
  }

  handleInputChange = e => {
    this.handleSetValue(e.target.value === '' ? '' : Number(e.target.value))
  }

  handleBlur = () => {
    const { state } = this
    if (state.rate < 0) {
      this.handleSetValue(0)
    } else if (state.rate > 10) {
      this.handleSetValue(10)
    }
  }

  render() {
    const { props, state } = this
    return (
      <div>
        <FormControl variant='outlined' className=''>
          <InputLabel id='year'>Ano de lançamento</InputLabel>
          <Select
            labelId='year'
            id='year'
            value={state.year}
            onChange={this.handleChangeYear}
            label='Escolha o ano'
          >
            <MenuItem value={null}>
              ----
        </MenuItem>
            {props.yearList.map(possibleYear =>
              <MenuItem key={possibleYear.year} value={possibleYear.year}>
                {possibleYear.year}
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <Typography id='rate' gutterBottom>
          Nota IMDb maior que
      </Typography>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs>
            <Slider
              value={typeof state.rate === 'number' ? state.rate : 0}
              onChange={this.handleSliderChange}
              max={10}
            />
          </Grid>
          <Grid item>
            <OutlinedInput
              value={state.rate}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 10,
                type: 'number'
              }}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default CustomizedRequestMovies
