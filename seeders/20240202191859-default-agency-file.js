'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Agencies', [{
      name: 'Anna Wang',
      phone_number: '0912345678',
      company: '信亦房屋',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Ben Yang',
      phone_number: '0921876543',
      company: '詠慶房屋',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Agencies', {})
  }
}
