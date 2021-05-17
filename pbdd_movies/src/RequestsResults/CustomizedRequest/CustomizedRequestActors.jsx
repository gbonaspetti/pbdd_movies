import React from 'react'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class CustomizedRequestActors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorList: undefined,
      birth: null,
      death: null
    }
  }

  handleChangeBirth = e => this.setState({ birth: e.target.value })
  handleChangeDeath = e => this.setState({ death: e.target.value })

  handleClickSearch = () => {

  }

  render() {
    const { props, state } = this
    return (
      <div className='customized_options'>
        <span>
          <FormControl variant='outlined' className='customized_year'>
            <InputLabel id='birth'>Data de nascimento</InputLabel>
            <Select
              labelId='birth'
              id='birth'
              value={state.birth}
              onChange={this.handleChangeBirth}
              label='Data de nascimento'
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
        </span>
        <span>
          <FormControl variant='outlined' className='customized_year'>
            <InputLabel id='death'>Data de falecimento</InputLabel>
            <Select
              labelId='death'
              id='death'
              value={state.death}
              onChange={this.handleChangeDeath}
              label='Data de falecimento'
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
        </span>

        <Button
          variant='outlined'
          onClick={this.handleClickSearch}
        >
          Procurar
        </Button>

        {state.actorList &&
          state.actorList.length > 0 &&
          state.actorList.map(actor =>
            <div>
              {actor.name}
              {actor.birth_year ? actor.birth_year : 'Ano de nascimento não registrado'}
              {actor.death_year ? actor.death_year : 'Ano de falecimento não registrado'}
            </div>
        )}

        {state.actorList && state.actorList.length === 0 && (
          <div>Nenhum ator encontrado</div>
        )}
      </div>
    )
  }
}
export default CustomizedRequestActors
