import React from 'react'
import {
  Route,
  withRouter
} from 'react-router-dom'
import { PAGE } from './helper.js'
import RequestOptions from './RequestOptions.jsx'
import MostProducedGenres  from './RequestsResults/MostProducedGenres.jsx'
import ActorsAge  from './RequestsResults/ActorsAge.jsx'
import ActorsLifeExpectancy  from './RequestsResults/ActorsLifeExpectancy.jsx'
import BestRatedGenres  from './RequestsResults/BestRatedGenres.jsx'
import BestRatedActors  from './RequestsResults/BestRatedActors.jsx'
import MostMoviesActors  from './RequestsResults/MostMoviesActors.jsx'
import BestYearMovies  from './RequestsResults/BestYearMovies.jsx'
import SpecificYearMovies  from './RequestsResults/SpecificYearMovies.jsx'
import YearQuantityMovies  from './RequestsResults/YearQuantityMovies.jsx'

class Homepage extends React.Component {
  render () {
    return (
      <div>
        <h1>Projeto de banco de dados usando IMDb</h1>
        <h3>Giulia Bonaspetti Martins</h3>

        <p>
          Esse projeto utiliza o banco de dados disponibilizado pelo IMDb.
          Ele foi gerado em março de 2021, qualquer mudança realizada no banco de dados
          original não é atualizada no banco de dados utilizado aqui.
        </p>

        <Route exact path={PAGE.HOME} component={RequestOptions} />
        <Route path={PAGE.ACTORS.AGE} component={ActorsAge} />
        <Route path={PAGE.ACTORS.LIFE_EXPECTANCY} component={ActorsLifeExpectancy} />
        <Route path={PAGE.GENRES.RATED} component={BestRatedGenres} />
        <Route path={PAGE.ACTORS.RATED} component={BestRatedActors} />
        <Route path={PAGE.ACTORS.MOVIES} component={MostMoviesActors} />
        <Route path={PAGE.MOVIES.BEST_YEAR} component={BestYearMovies} />
        <Route path={PAGE.GENRES.PRODUCED} component={MostProducedGenres} />
        <Route path={PAGE.MOVIES.YEAR(':year')} component={SpecificYearMovies} />
        <Route path={PAGE.MOVIES.QUANTITY_YEAR} component={YearQuantityMovies} />
      </div>
    )
  }
}
export default withRouter(Homepage)
