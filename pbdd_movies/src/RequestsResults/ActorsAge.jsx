import React from 'react'
import { getActorsAgeList } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class ActorsAge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorsAgeList: [],
      actorFilter: ''
    }
  }

  async componentDidMount() {
    const fetchGetActorsAgeList = await generateFetchResponse(await getActorsAgeList())

    this.setState({ actorsAgeList: fetchGetActorsAgeList.body.data })
  }

  handleChangeActorFilter = e => this.setState({ actorFilter: e.target.value })

  render() {
    const { state } = this

    return (
      <div>
        <div className='titleWithInformation'>
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
      </div>
    )
  }
}
export default ActorsAge
