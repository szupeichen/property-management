'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Units', 'annualIncome', 'annual_income')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'annual_income', 'annualIncome')
  }
}
