import React from 'react'
import {
  Route,
  withRouter
} from 'react-router-dom'
import { PAGE } from './helper.js'
import RequestOptions from './RequestOptions.jsx'
import ActorsAge from './RequestsResults/ActorsAge.jsx'
import ActorsBestRated from './RequestsResults/ActorsBestRated.jsx'
import ActorsLifeExpectancy from './RequestsResults/ActorsLifeExpectancy.jsx'
import ActorsWithMoreMovies from './RequestsResults/ActorsWithMoreMovies.jsx'
import GenresBestRated from './RequestsResults/GenresBestRated.jsx'
import GenresMostProduced from './RequestsResults/GenresMostProduced.jsx'
import MoviesFromSpecificYear from './RequestsResults/MoviesFromSpecificYear.jsx'
import MoviesYearBestRated from './RequestsResults/MoviesYearBestRated.jsx'
import MoviesYearQuantity from './RequestsResults/MoviesYearQuantity.jsx'

require('./Homepage.css')

class Homepage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        <div className='homepage_header'>
          <h1>Projeto de banco de dados usando IMDb</h1>
          <h3>Giulia Bonaspetti Martins</h3>

          <p>
            Esse projeto utiliza o banco de dados disponibilizado pelo IMDb.
            Ele foi gerado em março de 2021, qualquer mudança realizada no banco de dados
            original não é atualizada no banco de dados utilizado aqui.
          </p>
        </div>

        <Route exact path={PAGE.HOME} component={RequestOptions} />
        <Route path={PAGE.ACTORS.AGE} component={ActorsAge} />
        <Route path={PAGE.ACTORS.RATED} component={ActorsBestRated} />
        <Route path={PAGE.ACTORS.LIFE_EXPECTANCY} component={ActorsLifeExpectancy} />
        <Route path={PAGE.ACTORS.MOVIES} component={ActorsWithMoreMovies} />
        <Route path={PAGE.GENRES.RATED} component={GenresBestRated} />
        <Route path={PAGE.GENRES.PRODUCED} component={GenresMostProduced} />
        <Route path={PAGE.MOVIES.YEAR} component={MoviesFromSpecificYear} />
        <Route path={PAGE.MOVIES.BEST_YEAR} component={MoviesYearBestRated} />
        <Route path={PAGE.MOVIES.QUANTITY_YEAR} component={MoviesYearQuantity} />
      </div>
    )
  }
}
export default withRouter(Homepage)
