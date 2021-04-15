var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = './movie_database.db'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }
})

module.exports = db
