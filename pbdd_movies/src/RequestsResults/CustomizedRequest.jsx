import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CustomizedRequestActors from './CustomizedRequest/CustomizedRequestActors.jsx'
import CustomizedRequestGenres from './CustomizedRequest/CustomizedRequestGenres.jsx'
import CustomizedRequestMovies from './CustomizedRequest/CustomizedRequestMovies.jsx'
import {
  getAllPossibleYears
} from '../async.js'
import { generateFetchResponse } from '../helper.js'

require('./CustomizedRequest.css')

class CustomizedRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      from: 'actors',
      yearList: []
    }
  }

  async componentDidMount() {
    const fetchGetAllPossibleYears = await generateFetchResponse(
      await getAllPossibleYears()
    )

    this.setState({
      yearList: fetchGetAllPossibleYears.body.data
    })
  }

  render() {
    const { state } = this

    return (
      <div>
        <h2>Monte sua própria consulta</h2>

        <FormControl variant='outlined' className='customized_from'>
          <InputLabel id='from'>O que você deseja procurar?</InputLabel>
          <Select
            labelId='from'
            id='from'
            value={state.from}
            onChange={e => this.setState({ from: e.target.value })}
            label='O que você deseja procurar?'
          >
            <MenuItem value='movies'>
              Um filme
            </MenuItem>
            <MenuItem value='actors'>
              Um ator
            </MenuItem>
            <MenuItem value='genres'>
              Um gênero
            </MenuItem>
          </Select>
        </FormControl>

        {state.from === 'actors' && (
          <CustomizedRequestActors
            yearList={state.yearList}
          />
        )}

        {state.from === 'genres' && (
          <CustomizedRequestGenres/>
        )}

        {state.from === 'movies' && (
          <CustomizedRequestMovies
            yearList={state.yearList}
          />
        )}
      </div>
    )
  }
}
export default CustomizedRequest
