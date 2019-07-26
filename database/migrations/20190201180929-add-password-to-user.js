'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'users',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'password'
    )
  }
}
