const db = require('../database')
const helpers = require('./helpers')

exports.landingRegister = function (req, res) {
  db.sequelize.query('INSERT INTO landing_users (email, created_at, updated_at) VALUES (:email, :created_at, :updated_at)',
    {
      replacements: {
        email: req.body.email,
        created_at: new Date(),
        updated_at: new Date()
      },
      type: db.sequelize.QueryTypes.INSERT
    })
    .then(users => {
      helpers.result(req, res, 200, 'success', 'registered', {})
    })
    .catch(err => {
      req.error = err
      helpers.result(req, res, 500, 'error', 'unknown error', {})
    })
}

exports.get_all = function (req, res) {
  // validate that user has enough permissions
  helpers.result(req, res, 200, 'success', 'list of users', {})
}

exports.login = function (req, res) {
  helpers.result(req, res, 200, 'success', 'logged in', {})
}

exports.logout = function (req, res) {
  helpers.result(req, res, 200, 'success', 'logged out', {})
}

exports.updateLocation = function (req, res) {
  helpers.result(req, res, 200, 'success', 'updated location', {})
}
