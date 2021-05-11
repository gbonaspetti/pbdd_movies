export const getBestRatedGenres = () =>
  fetch('http://localhost:4000/api/genres/rating', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getMostProducedGenres = () =>
  fetch('http://localhost:4000/api/genres/count', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getActorsAgeList = () =>
  fetch('http://localhost:4000/api/actors/ages', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getMostMoviesActors = () =>
  fetch('http://localhost:4000/api/actors/movies', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getActorsLifeExpectancyList = () =>
  fetch('http://localhost:4000/api/actors/dead', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getActorsLifeExpectancyAverage = () =>
    fetch('http://localhost:4000/api/actors/deadAVG', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

export const getMoviesFromSpecificYear = (year) =>
  fetch(`http://localhost:4000/api/movies/year/${year}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getQuantityMoviesByYear = () =>
  fetch('http://localhost:4000/api/movies/year', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getBestRatedActors = () =>
  fetch('http://localhost:4000/api/actors/most/year', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

export const getBestRatedMovies = () =>
  fetch('http://localhost:4000/api/movies/most/year', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
