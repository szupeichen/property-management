'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Units', 'income', { type: Sequelize.INTEGER })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Units', 'income')
  }
}
