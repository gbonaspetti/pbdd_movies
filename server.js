const express = require('express')
const app = express()
var db = require('./database.js')
const port = 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// Get all the actors who have already died
app.get('/api/actors/dead', (req, res, next) => {
  var sql = `SELECT *
    FROM actors
    WHERE death_year IS NOT NULL`

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.json({
          'message':'success',
          'data':rows
      })
    })
})

// Get all the movies from a specific year
app.get('/api/movies/year/:year', (req, res, next) => {
  var sql = `SELECT *
    FROM movies
    WHERE year = ?`

  var params = [req.params.year]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error':err.message})
        return;
      }
      res.json({
          'message':'success',
          'data':rows
      })
    })
})

// Default response for any other request
app.use(function(req, res){
    res.status(404)
})
