'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Agencies', [{
      name: 'Anna Wang',
      phoneNumber: '0912345678',
      company: '信亦房屋',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ben Yang',
      phoneNumber: '0912345678',
      company: '詠慶房屋',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Agencies', {})
  }
}
