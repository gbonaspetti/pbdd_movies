export const getBestRatedGenres = () =>
  fetch('http://localhost:4000/api/genres/rating', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
