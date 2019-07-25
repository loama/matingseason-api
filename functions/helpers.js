// const db = require('../database')

// const CryptoJS = require('crypto-js')

function result (req, res, status, result, detail, data) {
  let response = {
    result: result, // success or error
    detail: detail, // detail about the result "order created", "user logged in"
    data: data // json with the result
  }
  res.status(status).send(response)
}

module.exports = { result }
