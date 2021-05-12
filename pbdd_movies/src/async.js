const fetchGet = (apiURL) =>
  fetch(`http://localhost:4000/api/${apiURL}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
})

export const getBestRatedGenres = () => fetchGet('genres/rating')

export const getMostProducedGenres = () => fetchGet('genres/count')

export const getActorsAgeList = () => fetchGet('actors/ages')

export const getMostMoviesActors = () => fetchGet('actors/movies')

export const getActorsLifeExpectancyList = () => fetchGet('actors/dead')

export const getActorsLifeExpectancyAverage = () => fetchGet('actors/deadAVG')

export const getMoviesFromSpecificYear = (year) => fetchGet(`movies/year/${year}`)

export const getQuantityMoviesByYear = () => fetchGet('movies/year')

export const getBestRatedActors = () => fetchGet('actors/most/year')

export const getBestRatedMovies = () => fetchGet('movies/most/year')

export const getAllPossibleYears = () => fetchGet('years')
