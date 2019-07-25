'use strict'

const express = require('express')
const app = express()

const cors = require('cors')

// FUNCTIONS IMPORTS
const helpers = require('./functions/helpers')

// const providers = require('./functions/providers')

app
  .use(express.json())
  .use(cors())
  .use((req, res, next) => helpers.takeTime(req, res, next))
  .use((req, res, next) => helpers.validateToken(req, res, next))

  .get('/', (req, res) => index(req, res))

// providers
  // .get('/v1/providers', (req, res) => providers.get_all(req, res))

// catch all routes, 404
  .all('*', (req, res) => notFound(req, res))

function index (req, res) {
  helpers.result(req, res, 200, 'success', 'welcome to Zeel API', {})
}

function notFound (req, res) {
  helpers.result(req, res, 404, 'error', 'route not found or incorrect HTTP method', {})
}

module.exports = app
