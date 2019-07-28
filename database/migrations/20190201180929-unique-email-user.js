'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.changeColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    )
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'email'
    )
  }
}
