import React from 'react'
import { getActorsAgeList } from '../async.js'
import { generateFetchResponse } from '../helper.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class ActorsAge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorsAgeList: [],
      actorFilter: '',
      request: false
    }
  }

  async componentDidMount() {
    const fetchGetActorsAgeList = await generateFetchResponse(await getActorsAgeList())

    this.setState({ actorsAgeList: fetchGetActorsAgeList.body.data })
  }

  handleChangeActorFilter = e => this.setState({ actorFilter: e.target.value })

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

  render() {
    const { state } = this

    return (
      <div>
        <div className='titleWithInformation' onClick={this.handleToggleRequest}>
          <h2>Idade dos atores</h2>
          <p>em 2021</p>
        </div>

        <label htmlFor='filter'>Procurando por um ator específico? Filtre a lista aqui: </label>
        <input
          id='filter'
          onChange={this.handleChangeActorFilter}
          placeholder='Procurar ator...'
          type='text'
          value={state.actorFilter}
        />

        {state.actorsAgeList.length > 0
          ? (
            <div>
              {state.actorsAgeList.filter(actors =>
                actors.names.toUpperCase().includes(
                  state.actorFilter.toUpperCase()
                )
              ).map(actors =>
                <p key={actors.age}>
                  {actors.age} anos - {actors.names.replaceAll(',', ', ')}
                </p>
              )}
            </div>
          )
          : (
            <p>Carregando...</p>
          )}

        <Dialog
          open={state.request}
          onClose={this.handleToggleRequest}
        >
          <DialogTitle>Código da consulta principal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>SELECT GROUP_CONCAT(name) as names, (2021 - birth_year) as age</p>
              <p>FROM actors</p>
              <p>WHERE death_year IS NULL</p>
              <p>  AND birth_year IS NOT NULL</p>
              <p>GROUP BY birth_year</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default ActorsAge
