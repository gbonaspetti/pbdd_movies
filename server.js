const express = require('express')
const app = express()
var db = require('./database.js')
const port = 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// Get all the actors who have already died and their age
// Note: To be able to calculate their age, the birth must be known
app.get('/api/actors/dead', (req, res, next) => {
  var sql = `SELECT COUNT(id) as actors, (death_year - birth_year) as age
    FROM actors
    WHERE death_year IS NOT NULL
      AND birth_year IS NOT NULL
    GROUP BY age`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get the age average of the actors who have already died
// Note: To be able to calculate their age, the birth must be known
app.get('/api/actors/deadAVG', (req, res, next) => {
  var sql = `SELECT AVG(age) as deathAvg
  FROM (
    SELECT (death_year - birth_year) as age
    FROM actors
    WHERE death_year IS NOT NULL
      AND birth_year IS NOT NULL
  )`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get all the actors who are still alived group by age
// Note: To be able to calculate their age, the birth must be known
app.get('/api/actors/ages', (req, res, next) => {
  var sql = `SELECT GROUP_CONCAT(name) as names, (2021 - birth_year) as age
    FROM actors
    WHERE death_year IS NULL
      AND birth_year IS NOT NULL
    GROUP BY birth_year`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get all the movies (title, rating, votes) from a specific year
app.get('/api/movies/year/:year', (req, res, next) => {
  var sql = `SELECT title, rating, votes
    FROM movies
    WHERE year = ?
    ORDER BY rating DESC`

  var params = [req.params.year]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get quantity of movies each year
app.get('/api/movies/year', (req, res, next) => {
  var sql = `SELECT COUNT(id) as quantity, year
    FROM movies
    WHERE year IS NOT NULL
    GROUP BY year
    ORDER BY year DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})


// Get the years that produced better rating movies
app.get('/api/movies/most/year', (req, res, next) => {
  var sql = `SELECT year, AVG(rating) as rating
    FROM movies
    WHERE rating IS NOT NULL
      AND year IS NOT NULL
    GROUP BY year
    ORDER BY rating DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get the actors that produced better rated movies
app.get('/api/actors/most/year', (req, res, next) => {
  var sql = `SELECT name, AVG(rating) as rating, COUNT(movie_id) as movies
    FROM actors
    INNER JOIN castings ON castings.actor_id = actors.id
    INNER JOIN movies ON castings.movie_id = movies.id
    WHERE rating IS NOT NULL
    GROUP BY actors.id
    ORDER BY rating DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get actors with that made more movies
app.get('/api/actors/movies', (req, res, next) => {
  var sql = `SELECT name, COUNT(movie_id) as quantity, GROUP_CONCAT(title) as titles
    FROM castings
    INNER JOIN movies ON castings.movie_id = movies.id
    INNER JOIN actors ON castings.actor_id = actors.id
    GROUP BY actor_id
    ORDER BY quantity DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get all genres with rating average and number of movies
app.get('/api/genres/rating', (req, res, next) => {
  var sql = `SELECT name, AVG(rating) as rating
    FROM classifications
    INNER JOIN movies ON movies.id = classifications.movie_id
    INNER JOIN genres ON genres.id = classifications.genre_id
    GROUP BY genre_id
    ORDER BY rating DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get all genres with rating average and number of movies
app.get('/api/genres/count', (req, res, next) => {
  var sql = `SELECT name, COUNT(movie_id) as quantity
    FROM classifications
    INNER JOIN movies ON movies.id = classifications.movie_id
    INNER JOIN genres ON genres.id = classifications.genre_id
    GROUP BY genre_id
    ORDER BY quantity DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Default response for any other request
app.use(function(req, res){
    res.status(404)
})
