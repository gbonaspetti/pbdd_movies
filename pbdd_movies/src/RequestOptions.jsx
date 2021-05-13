import React from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import { PAGE } from './helper.js'

class RequestOptions extends React.Component {
  render() {
    return (
      <div>
        <h2>Funcionalidades</h2>
        <ul>
          <li>Sobre atores:
            <ul>
              <li>
                <Link to={PAGE.ACTORS.AGE}>
                  Idade dos atores
                </Link>
              </li>
              <li>
                <Link to={PAGE.ACTORS.LIFE_EXPECTANCY}>
                  Expectativa de vida de atores
                </Link>
              </li>
              <li>
                <Link to={PAGE.ACTORS.RATED}>
                  Atores que produziram os filmes mais bem classificados
                </Link>
              </li>
              <li>
                <Link to={PAGE.ACTORS.MOVIES}>
                  Atores que participaram de mais filmes
                </Link>
              </li>
            </ul>
          </li>
          <li>Sobre filmes:
            <ul>
              <li>
                <Link to={PAGE.MOVIES.YEAR}>
                  Filmes produzidos em um ano específico
                </Link>
              </li>
              <li>
                <Link to={PAGE.MOVIES.QUANTITY_YEAR}>
                  Quantidade de filmes produzida em cada ano
                </Link>
              </li>
              <li>
                <Link to={PAGE.MOVIES.BEST_YEAR}>
                  Anos que produziram os filmes mais bem classificados
                </Link>
              </li>
              <li>
                <Link to={PAGE.MOVIES.MULTIPLE_ACTORS}>
                  Filmes feitos por um ou mais atores
                </Link>
              </li>
            </ul>
          </li>
          <li>Sobre gêneros:
            <ul>
              <li>
                <Link to={PAGE.GENRES.RATED}>
                  Gêneros mais bem classificados
                </Link>
              </li>
              <li>
                <Link to={PAGE.GENRES.PRODUCED}>
                  Gêneros mais produzidos
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(RequestOptions)
