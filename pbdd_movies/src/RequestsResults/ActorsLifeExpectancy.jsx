import React from 'react'
import CanvasJSReact from '../assets/canvasjs.react'
import {
  getActorsLifeExpectancyAverage,
  getActorsLifeExpectancyList
} from '../async.js'
import { generateFetchResponse } from '../helper.js'

const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart
CanvasJS.addCultureInfo('pt_BR',
  {
    decimalSeparator: ',',
    digitGroupSeparator: '.'
  })

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

  render() {
    const { state } = this
    const graphicData = {
      animationEnabled: true,
      axisX: {
        title: "Idade"
      },
      axisY: {
        title: 'Quantidade de atores'
      },
      culture: 'pt_BR',
      data: [{
        type: "line",
        toolTipContent: "{y} atores morreram aos {x} anos",
        dataPoints: state.actorsLifeExpectancyList.map(actorsAge => ({
          x: actorsAge.age,
          y: actorsAge.actors
        }))
      }],
      theme: 'light2'
    }

    return (
      <div>
        <h2>Expectativa de vida dos atores</h2>

        <p>Média: {state.actorsLifeExpectancyAverage} anos</p>
        <CanvasJSChart options={graphicData} />
      </div>
    )
  }
}
export default ActorsLifeExpectancy
