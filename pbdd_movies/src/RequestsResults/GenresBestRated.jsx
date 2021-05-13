import React from 'react'
import { getBestRatedGenres } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class GenresBestRated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestRatedGenres: []
    }
  }

  async componentDidMount() {
    const fetchGetBestRatedGenres = await generateFetchResponse(await getBestRatedGenres())

    this.setState({ bestRatedGenres: fetchGetBestRatedGenres.body.data })
  }

  render () {
    return (
      <div>
        <div className='titleWithInformation'>
          <h2>Gêneros de mais qualidade</h2>
          <p>(notas mais altas no IMDb)</p>
        </div>

        {this.state.bestRatedGenres.length > 0
          ? (this.state.bestRatedGenres.map(genre =>
            <p key={genre.name}>
              {genre.name} - nota média {genre.rating}
            </p>
          ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default GenresBestRated
