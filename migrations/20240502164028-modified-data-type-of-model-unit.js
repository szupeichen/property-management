'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Units', 'start_date', {
      type: Sequelize.DATE(6),
      allowNull: true
    })
    await queryInterface.changeColumn('Units', 'end_date', {
      type: Sequelize.DATE(6),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Units', 'start_date', {
      type: Sequelize.DATE,
      allowNull: true
    })
    await queryInterface.changeColumn('Units', 'end_date', {
      type: Sequelize.DATE,
      allowNull: true
    })
  }
}
