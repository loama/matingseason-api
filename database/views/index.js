var path = require('path')
var fs = require('fs')

const db = require('../index.js')

let sqlFiles = []

fs.readdir(__dirname, function (err, files) {
  if (err) throw err

  for (let i = 0; i < files.length; i++) {
    if (files[i].split('.')[1] === 'sql') { // if file is .sql
      sqlFiles.push(files[i])
    }
  }

  createView(0)
})

function createView (j) {
  fs.readFile(path.join(__dirname, '/' + sqlFiles[j]), 'utf8', function (err, data) {
    if (err) throw err
    db.sequelize.query(data, { type: db.sequelize.QueryTypes.RAW })
      .then(view => {
        console.log('view ' + sqlFiles[j] + ' created')
        if (sqlFiles.length === j + 1) {
          process.exit()
        } else {
          createView(j + 1)
        }
      })
  })
}
