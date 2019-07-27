const db = require('../database')
const helpers = require('./helpers')

const crypto = require('crypto')

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
  db.sequelize.query('SELECT * FROM users WHERE email = :email',
    {
      replacements: {
        email: req.body.email
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(users => {
      console.log(users[0])
      let savedPassword = users[0].password
      let givenPassword = crypto.createHash('sha256').update(req.body.password).digest('base64')

      if (savedPassword === givenPassword) {
        helpers.result(req, res, 200, 'success', 'logged in', users[0])
      } else {
        helpers.result(req, res, 401, 'error', 'wrong login', {})
      }
    })
}

exports.register = function (req, res) {
  let password = crypto.createHash('sha256').update(req.body.password).digest('base64')

  db.sequelize.query('INSERT INTO users (email, status, password, created_at, updated_at) VALUES (:email, :status, :password, :created_at, :updated_at)',
    {
      replacements: {
        email: req.body.email,
        status: 'inactive',
        password: password,
        created_at: new Date(),
        updated_at: new Date()
      },
      type: db.sequelize.QueryTypes.INSERT
    })
    .then(users => {
      db.sequelize.query('SELECT * FROM users WHERE email = :email',
        {
          replacements: {
            email: req.body.email
          },
          type: db.sequelize.QueryTypes.SELECT
        })
        .then(usersA => {
          helpers.result(req, res, 200, 'success', 'registered', usersA[0])
        })
    })
    .catch(err => {
      req.error = err
      helpers.result(req, res, 500, 'error', 'unknown error', {})
    })
}

exports.status = function (req, res) {
  let status

  if (req.body.status) {
    status = 'active'
  } else {
    status = 'inactive'
  }

  db.sequelize.query('UPDATE users SET status = :status WHERE email = :email',
    {
      replacements: {
        email: req.body.email,
        status: status
      },
      type: db.sequelize.QueryTypes.UPDATE
    })
    .then(users => {
      helpers.result(req, res, 200, 'success', 'updated', {})
    })
    .catch(err => {
      req.error = err
      helpers.result(req, res, 500, 'error', 'unknown error', {})
    })
}

exports.logout = function (req, res) {
  helpers.result(req, res, 200, 'success', 'logged out', {})
}

exports.updateLocation = function (req, res) {
  db.sequelize.query('INSERT INTO user_locations ("user", lat, lng, created_at, updated_at) VALUES (:id, :lat, :lng, :created_at, :updated_at)',
    {
      replacements: {
        id: req.body.id,
        lat: req.body.lat,
        lng: req.body.lng,
        created_at: new Date(),
        updated_at: new Date()
      },
      type: db.sequelize.QueryTypes.INSERT
    })
    .then(users => {
      helpers.result(req, res, 200, 'success', 'updated location', {})
    })
    .catch(err => {
      req.error = err
      helpers.result(req, res, 500, 'error', 'unknown error', {})
    })
}
