const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./database.js')
const port = 4000

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// Get all the actors who have already died and their age
// Note: To be able to calculate their age, the birth must be known
app.get('/api/actors/dead', (req, res, next) => {
  const sql = `SELECT COUNT(id) as actors, (death_year - birth_year) as age
    FROM actors
    WHERE death_year IS NOT NULL
      AND birth_year IS NOT NULL
    GROUP BY age`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all possible years
app.get('/api/years', (req, res, next) => {
  const sql = `SELECT year
  FROM movies
  WHERE year IS NOT NULL
  GROUP BY year`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get the age average of the actors who have already died
// Note: To be able to calculate their age, the birth must be known
app.get('/api/actors/deadAVG', (req, res, next) => {
  const sql = `SELECT AVG(age) as deathAvg
  FROM (
    SELECT (death_year - birth_year) as age
    FROM actors
    WHERE death_year IS NOT NULL
      AND birth_year IS NOT NULL
  )`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all the actors who are still alived group by age
// Note: To be able to calculate their age, the birth must be known
app.get('/api/actors/ages', (req, res, next) => {
  const sql = `SELECT GROUP_CONCAT(name) as names, (2021 - birth_year) as age
    FROM actors
    WHERE death_year IS NULL
      AND birth_year IS NOT NULL
    GROUP BY birth_year`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all the movies (title, rating, votes) from a specific year
app.get('/api/movies/year/:year', (req, res, next) => {
  const sql = `SELECT id, title, rating, votes
    FROM movies
    WHERE year = ?
    ORDER BY rating DESC
    LIMIT 3000`

  const params = [req.params.year]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get quantity of movies each year
app.get('/api/movies/year', (req, res, next) => {
  const sql = `SELECT COUNT(id) as quantity, year
    FROM movies
    WHERE year IS NOT NULL
    GROUP BY year
    ORDER BY year DESC`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get the years that produced better rating movies
app.get('/api/movies/most/year', (req, res, next) => {
  const sql = `SELECT year, AVG(rating) as rating
    FROM movies
    WHERE rating IS NOT NULL
      AND year IS NOT NULL
    GROUP BY year
    ORDER BY rating DESC`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get the actors that produced better rated movies
// Note: the original list has a lot actors that only made one 10 rated
// movie, to leave the results more exciting I added the "more than one" filter
app.get('/api/actors/most/year', (req, res, next) => {
  const sql = `SELECT *
    FROM (
      SELECT id, name, AVG(rating) as rating, COUNT(movie_id) as movies
      FROM actors
      INNER JOIN castings ON castings.actor_id = actors.id
      INNER JOIN movies ON castings.movie_id = movies.id
      WHERE rating IS NOT NULL
      GROUP BY actors.id
      ORDER BY rating DESC
    )
    WHERE movies > 1
    LIMIT 3000`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get actors with that made more movies
app.get('/api/actors/movies', (req, res, next) => {
  const sql = `SELECT actors.id as id, name, COUNT(movie_id) as quantity, GROUP_CONCAT(title) as titles
    FROM castings
    INNER JOIN movies ON castings.movie_id = movies.id
    INNER JOIN actors ON castings.actor_id = actors.id
    GROUP BY actor_id
    ORDER BY quantity DESC
    LIMIT 3000`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all genres with rating average
app.get('/api/genres/rating', (req, res, next) => {
  const sql = `SELECT name, AVG(rating) as rating
    FROM classifications
    INNER JOIN movies ON movies.id = classifications.movie_id
    INNER JOIN genres ON genres.id = classifications.genre_id
    GROUP BY genre_id
    ORDER BY rating DESC`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all genres with number of movies
app.get('/api/genres/count', (req, res, next) => {
  const sql = `SELECT name, COUNT(movie_id) as quantity
    FROM classifications
    INNER JOIN movies ON movies.id = classifications.movie_id
    INNER JOIN genres ON genres.id = classifications.genre_id
    GROUP BY genre_id
    ORDER BY quantity DESC`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all possible actors
app.get('/api/actors', (req, res, next) => {
  const sql = `SELECT name
  FROM actors
  WHERE name IS NOT NULL
  GROUP BY id
  LIMIT 3000`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get movies made by 2 or more actors
app.get('/api/actors/multiple', (req, res, next) => {
  const sql = `SELECT id, title, actorsNames
    FROM (
      SELECT movies.id as id, title, COUNT(name) as actorsNumber, GROUP_CONCAT(name) as actorsNames
      FROM movies
      INNER JOIN castings ON castings.movie_id = movies.id
      INNER JOIN actors ON actors.id = castings.actor_id
      WHERE name IN (${req.query.actorList})
      GROUP BY movies.id
    )
    WHERE actorsNumber > 1`

  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.status(200).json({
      'message': 'success',
      'data': rows
    })
  })
})

// Default response for any other request
app.use(function (req, res) {
  res.status(404)
})
