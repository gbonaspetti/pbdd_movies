import React from 'react'
import { getMostProducedGenres } from '../async.js'
import { generateFetchResponse } from '../helper.js'

class GenresMostProduced extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostProducedGenres: []
    }
  }

  async componentDidMount() {
    const fetchGetMostProducedGenres = await generateFetchResponse(await getMostProducedGenres())

    this.setState({mostProducedGenres: fetchGetMostProducedGenres.body.data})
  }

  render () {
    return (
      <div>
        <h2>Gêneros mais produzidos</h2>
        {this.state.mostProducedGenres.length > 0
          ? (this.state.mostProducedGenres.map(genre =>
            <p key={genre.name}>
              {genre.name} - {genre.quantity} filmes
            </p>
          ))
          : <p>Carregando...</p>
        }
      </div>
    )
  }
}
export default GenresMostProduced
