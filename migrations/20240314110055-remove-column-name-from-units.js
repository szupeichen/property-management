'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Units', 'name')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Units', 'name', {
      type: Sequelize.STRING
    })
  }
}
