const helpers = require('./helpers')

exports.get_all = function (req, res) {
  // validate that user has enough permissions
  helpers.result(req, res, 200, 'success', 'list of providers', {})
}
