'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      liker: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        as: 'liker',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      liked: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        as: 'liked',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('likes')
  }
}
