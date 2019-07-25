let url

if (process.env.DATABASE_URL !== undefined) {
  url = process.env.DATABASE_URL
} else {
  // the shared development db, we change this string if we are deploying to either staging on production on heroku
  url = 'postgres://gvvaeagxxkoppx:5986a6861141a6e6f32bb85785eb9d0156d0d5a5064f55309a71bb512b40bba7@ec2-174-129-227-205.compute-1.amazonaws.com:5432/dbv57mn8fth2tc'
}

const WORKERS = process.env.WEB_CONCURRENCY || 1 // we need to update this if we upgrade dyno type. More info on https://devcenter.heroku.com/articles/node-concurrency
const MAX_DB_CONNECTIONS = 20 // if we upgrade to a database with higher connection limit, we also should update this value.

const username = url.split('//')[1].split(':')[0]
const password = url.split(':')[2].split('@')[0]
const database = url.split('/')[3]
const host = url.split('@')[1].split(':')[0]

module.exports = {
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: MAX_DB_CONNECTIONS / WORKERS,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  },
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: MAX_DB_CONNECTIONS / WORKERS,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  },
  staging: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: MAX_DB_CONNECTIONS / WORKERS,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: MAX_DB_CONNECTIONS / WORKERS,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
}
