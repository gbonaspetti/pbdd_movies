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
  var sql = `SELECT name, (death_year - birth_year) as age
    FROM actors
    WHERE death_year IS NOT NULL
      AND birth_year IS NOT NULL`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
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
        return;
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
    WHERE year = ?`

  var params = [req.params.year]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get quantity of movies each year
app.get('/api/movies/year', (req, res, next) => {
  var sql = `SELECT COUNT(id) as quant, year
    FROM movies
    WHERE year IS NOT NULL
    GROUP BY year
    ORDER BY quant DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})


// Get the years that produced better rating movies
app.get('/api/movies/year/most', (req, res, next) => {
  var sql = `SELECT id, year, AVG(rating) as rating
    FROM movies
    GROUP BY year
    ORDER BY rating DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get the actors that produced better rating movies
app.get('/api/actors/year/most', (req, res, next) => {
  var sql = `SELECT actors.id, name, AVG(rating) as rating, COUNT(movie_id)
    FROM actors
    INNER JOIN castings ON castings.actor_id = actors.id
    INNER JOIN movies ON castings.movie_id = movies.id
    GROUP BY actors.id
    ORDER BY rating DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get actors with that made more movies
app.get('/api/actors/movies', (req, res, next) => {
  var sql = `SELECT name, COUNT(movie_id) as quant, GROUP_CONCAT(title) as titles
    FROM castings
    INNER JOIN movies ON castings.movie_id = movies.id
    INNER JOIN actors ON castings.actor_id = actors.id
    GROUP BY actor_id
    ORDER BY quant DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.status(200).json({
          'message':'success',
          'data':rows
      })
    })
})

// Get all genres with rating average and number of movies
app.get('/api/genres', (req, res, next) => {
  var sql = `SELECT classifications.id as id, AVG(rating) as rating, COUNT(movie_id) as quant, name
    FROM classifications
    INNER JOIN movies ON movies.id = classifications.movie_id
    INNER JOIN genres ON genres.id = classifications.genre_id
    GROUP BY genre_id
    ORDER BY rating DESC`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
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
