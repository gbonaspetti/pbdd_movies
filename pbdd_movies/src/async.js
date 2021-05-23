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

export const getAllPossibleMoviesYears = () => fetchGet('movies/years')

export const getAllPossibleBirthYears = () => fetchGet('birth/years')

export const getAllPossibleDeathYears = () => fetchGet('death/years')

export const getAllPossibleActors = () => fetchGet('actors')

export const getMaxVoteNumber = () => fetchGet('maxVote')

export const getMoviesMadeByMultipleActors = (actorList) => fetchGet(`actors/multiple?actorList=${
  actorList.map(actor => `'${actor}'`).join(',')
}`)

export const getCustomizedSearchResult = (from, query) => fetchGet(`customized?from=${from}${query}`)
