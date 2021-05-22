import React from 'react'
import CanvasJSReact from '../assets/canvasjs.react'
import {
  getActorsLifeExpectancyAverage,
  getActorsLifeExpectancyList
} from '../async.js'
import { generateFetchResponse } from '../helper.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
      actorsLifeExpectancyList: [],
      request: false
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

  handleToggleRequest = () => this.setState(prev => ({ request: !prev.request }))

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
        <h2 onClick={this.handleToggleRequest}>Expectativa de vida dos atores</h2>

        <p>Média: {state.actorsLifeExpectancyAverage} anos</p>
        <CanvasJSChart options={graphicData} />

        <Dialog
          open={state.request}
          onClose={this.handleToggleRequest}
        >
          <DialogTitle>Código das consultas principais</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>SELECT AVG(age) as deathAvg</p>
              <p>FROM (</p>
              <p>  SELECT (death_year - birth_year) as age</p>
              <p>  FROM actors</p>
              <p>  WHERE death_year IS NOT NULL</p>
              <p>    AND birth_year IS NOT NULL</p>
              <p>)</p>
              <p>-------------------------------------------------------------</p>
              <p>SELECT COUNT(id) as actors, (death_year - birth_year) as age</p>
              <p>FROM actors</p>
              <p>WHERE death_year IS NOT NULL</p>
              <p>  AND birth_year IS NOT NULL</p>
              <p>GROUP BY age</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default ActorsLifeExpectancy
