export const PAGE = {
  HOME: '/',
  GENRES: {
    PRODUCED: '/genres/produced',
    RATED: '/genres/rated'
  },
  ACTORS: {
    AGE: '/actors/age',
    LIFE_EXPECTANCY: '/actors/lifeexpectancy',
    RATED: '/actors/rated',
    MOVIES: '/actors/movies'
  },
  MOVIES: {
    YEAR: (year = ':year') => `/movies/year/${year}`,
    BEST_YEAR: '/movies/bestyear',
    QUANTITY_YEAR: '/movies/quantity'
  }
}


export const generateFetchResponse = async fetchResult => {
  const resultJson = await fetchResult.clone().json()
  return new Promise((resolve, reject) => resolve({
    apiResponse: fetchResult,
    body: resultJson,
    ok: fetchResult.ok
  }))
}
