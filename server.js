'use strict'

const express = require('express')
const app = express()

const cors = require('cors')

// FUNCTIONS IMPORTS
const helpers = require('./functions/helpers')

const users = require('./functions/users')

app
  .use(express.json())
  .use(cors())

  .get('/', (req, res) => index(req, res))

// users
  .post('/landing_users', (req, res) => users.landingRegister(req, res))

// catch all routes, 404
  .all('*', (req, res) => notFound(req, res))

function index (req, res) {
  helpers.result(req, res, 200, 'success', 'welcome to Zeel API', {})
}

function notFound (req, res) {
  helpers.result(req, res, 404, 'error', 'route not found or incorrect HTTP method', {})
}

module.exports = app
