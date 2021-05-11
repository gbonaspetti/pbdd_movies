import React from 'react'
import {
  getActorsLifeExpectancyAverage,
  getActorsLifeExpectancyList
} from '../async.js'
import { generateFetchResponse } from '../helper.js'

class ActorsLifeExpectancy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorsLifeExpectancyAverage: 0,
      actorsLifeExpectancyList: []
    }
  }

  async componentDidMount() {
    const fetchGetActorsLifeExpectancyAverage = await generateFetchResponse(await getActorsLifeExpectancyAverage())
    const fetchGetActorsLifeExpectancyList = await generateFetchResponse(await getActorsLifeExpectancyList())

    this.setState({
      actorsLifeExpectancyAverage: fetchGetActorsLifeExpectancyAverage.body.data[0].deathAvg,
      actorsLifeExpectancyList: fetchGetActorsLifeExpectancyList.body.data
    })
  }

  render () {
    return (
      <div>
        <p>Média: {this.state.actorsLifeExpectancyAverage}</p>
        {this.state.actorsLifeExpectancyList.map(actorsAge =>
          <p key={actorsAge.age}>
            {actorsAge.actors} - {actorsAge.age}
          </p>
        )}
      </div>
    )
  }
}
export default ActorsLifeExpectancy
