const express = require('express')
const app = express()
var db = require('./database.js')
const port = 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({'message':'Ok'})
});

// Insert here other API endpoints
app.get("/api/genres", (req, res, next) => {
  var sql = "select * from genres"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
