'use strict'

let PORT = process.env.PORT
let HOST = process.env.HOST

const server = require('./server.js')
// MODULE IMPORTS
const throng = require('throng')

// depending on dyno type and desired memory for each process
const WORKERS = process.env.WEB_CONCURRENCY || 1

function start () {
  server
    .listen(PORT, function () {
      console.log('Listening on PORT: ' + PORT)
      console.log(`HOST: ${HOST}`)
    })
}

// Heroku in-dyno cluster configuration
throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: start
})
