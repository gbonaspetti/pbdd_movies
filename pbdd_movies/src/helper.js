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
    BEST_YEAR: '/movies/bestyear',
    MULTIPLE_ACTORS: '/movies/multipleactors',
    QUANTITY_YEAR: '/movies/quantity',
    YEAR: '/movies/year'
  },
  CUSTOMIZED: '/customized'
}


export const generateFetchResponse = async fetchResult => {
  const resultJson = await fetchResult.clone().json()
  return new Promise((resolve, reject) => resolve({
    apiResponse: fetchResult,
    body: resultJson,
    ok: fetchResult.ok
  }))
}
