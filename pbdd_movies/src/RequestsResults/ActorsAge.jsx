import React from 'react'
import { getActorsAgeList } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class ActorsAge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actorsAgeList: []
    }
  }

  async componentDidMount() {
    const fetchGetActorsAgeList = await generateFetchResponse(await getActorsAgeList())

    this.setState({ actorsAgeList: fetchGetActorsAgeList.body.data })
  }

  render () {
    return (
      <div>
        {this.state.actorsAgeList.map(actors =>
          <p key={actors.age}>
            {actors.names} - {actors.age}
          </p>
        )}
      </div>
    )
  }
}
export default ActorsAge
