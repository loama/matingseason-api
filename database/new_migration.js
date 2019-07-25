var path = require('path')
var fs = require('fs')

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val)
})

let date = new Date()
let year = (date.getYear() + 1900).toString()

let month = (date.getMonth() + 1).toString()
if (month.length === 1) {
  month = '0' + month
}

let day = date.getDate().toString()
if (date.length === 1) {
  day = '0' + day
}

let hours = date.getHours().toString()
if (hours.length === 1) {
  hours = '0' + hours
}

let minutes = date.getMinutes().toString()
if (minutes.length === 1) {
  minutes = '0' + minutes
}

let seconds = date.getSeconds().toString()
if (seconds.length === 1) {
  seconds = '0' + seconds
}

let dateString = year + month + day + hours + minutes + seconds

var fileContent = `'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tableA', 'columnC', Sequelize.STRING, {
    })
      .then(() => {
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tableA', 'columnC')
  }
}
`
// The absolute path of the new file with its name
var filepath = path.join(__dirname, '/migrations/' + dateString + '-' + process.argv[2]) + '.js'

console.log(filepath)

fs.writeFile(filepath, fileContent, (err) => {
  if (err) throw err
  console.log(dateString + process.argv[2] + '.js' + ' migration was created successfully')
})
