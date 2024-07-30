'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Agencies', [{
      name: 'Cathy Chang',
      phone_number: '0922334455',
      company: '抬灣房屋',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Dora Wu',
      phone_number: '0987678876',
      company: '大種房屋',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Ella Fu',
      phone_number: '0918273643',
      company: '八風不動產租賃',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Agencies', null, {})
  }
}
