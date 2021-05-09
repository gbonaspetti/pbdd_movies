import React from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import { PAGE } from './helper.js'

class RequestOptions extends React.Component {
  render () {
    return (
      <div>
        Funcionalidades
        <ul>
          <li>
            <Link to={PAGE.ACTORS.AGE}>
              Idade dos atores
            </Link>
          </li>
          <li>
            <Link to={PAGE.MOVIES.YEAR('2020')}>
              Filmes produzidos em um ano especifico
            </Link>
          </li>
          <li>
            <Link to={PAGE.MOVIES.QUANTITY_YEAR}>
              A quantidade de filmes produzida em cada ano
            </Link>
          </li>
          <li>
            <Link to={PAGE.MOVIES.BEST_YEAR}>
              Anos que produziram mais filmes de “qualidades” (notas mais altas no IMDb)
            </Link>
          </li>
          <li>
            <Link to={PAGE.ACTORS.LIFE_EXPECTANCY}>
              Expectativa de vida de atores
            </Link>
          </li>
          <li>
            <Link to={PAGE.GENRES.RATED}>
              Quais são os gêneros mais bem classificados
            </Link>
          </li>
          <li>
            <Link to={PAGE.ACTORS.RATED}>
              Atores que produziram mais filmes de “qualidades” (notas mais altas no IMDb)
            </Link>
          </li>
          <li>
            <Link to={PAGE.ACTORS.MOVIES}>
              Quais atores fizeram mais filmes
            </Link>
          </li>
          <li>
            <Link to={PAGE.GENRES.PRODUCED}>
              Quais são os gêneros mais produzidos
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(RequestOptions)
